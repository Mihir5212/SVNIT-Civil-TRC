/*
 * The ground and the road surface: terrain and fields, carriageway, side roads with rounded corners,
 * kerbs and footpaths, and all road markings.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const R = D.Route, rgb = D.rgb, shade = D.shade;
    const smooth = R.smooth;

    const P = (s, t, y) => { const o = R.at(s, t, y); return [o.x, o.y, o.z]; };
    const UP = [0, 1, 0];
    const WHITE = rgb('#e6e6df'), YELLOW = rgb('#e3a51c');
    const KERB_H = .16, KERB_W = .26, FOOT_W = 3.2;

    // How wide the sealed surface is on each side: the lanes plus a paved shoulder
    function edgeOf(s) { const k = R.kerbed(s); return R.halfWidth(s) + 1.5 - .9 * k; }
    function groundRel(s, t) { return R.groundAt(s, t) - R.elev(s); }

    // The stretch of a road edge taken up by a side road and its rounded corners
    function mouthAt(s, side) {
        for (const j of R.JUNCTIONS) {
            if ((side > 0 ? j.right : j.left) && Math.abs(s - j.s) < j.hw + j.r) { return j; }
        }
        return null;
    }
    function junctionBox(s, pad) {
        for (const j of R.JUNCTIONS) {
            if (j.left || j.right) { if (Math.abs(s - j.s) < j.hw + j.r + (pad || 0)) { return j; } }
        }
        return null;
    }

    /* ---------- Small helpers that add one part of the road ---------- */
    function roadQuad(kit, s0, t0, s1, t1, col0, col1, along, lat, y) {
        // A patch of asphalt between two rows and two offsets, with road coordinates for wear and tyre marks
        const B = kit.bucket('road');
        if (!B.st) { B.st = []; }
        y = y || 0;
        const c0 = col0, c1 = col1 || col0;
        const TILE = 5;
        const uv = [t0 / TILE, s0 / TILE, t1 / TILE, s0 / TILE, t1 / TILE, s1 / TILE, t0 / TILE, s1 / TILE];
        kit.quad('road', P(s0, t0, y), P(s0, t1, y), P(s1, t1, y), P(s1, t0, y), [c0, c1, c1, c0], uv, UP);
        const a0 = along ? along(s0, t0) : s0, a1 = along ? along(s1, t1) : s1;
        const l0 = lat ? lat(s0, t0) : t0, l1 = lat ? lat(s1, t1) : t1;
        B.st.push(a0, l0, a0, l1, a1, l1, a1, l0);
    }
    function paint(kit, s0, t0, s1, t1, col, y) {
        y = y === undefined ? .014 : y;
        const uv = [t0, s0, t1, s0, t1, s1, t0, s1];
        kit.quad('paint', P(s0, t0, y), P(s0, t1, y), P(s1, t1, y), P(s1, t0, y), col, uv, UP);
    }
    // A polygon of paint given as road coordinates, for arrows
    function paintPoly(kit, pts, col) {
        for (let i = 1; i < pts.length - 1; i += 2) {
            const a = pts[0], b = pts[i], c = pts[i + 1], d = pts[i + 2] || pts[i + 1];
            const uv = [a[1], a[0], b[1], b[0], c[1], c[0], d[1], d[0]];
            kit.quad('paint', P(a[0], a[1], .014), P(b[0], b[1], .014), P(c[0], c[1], .014), P(d[0], d[1], .014), col, uv, UP);
        }
    }
    // A strip following a line in road coordinates, offset to one side of it
    function strip(kit, mat, pts, off0, off1, y0, y1, col, tex, cols) {
        const n = pts.length;
        for (let i = 0; i < n - 1; i++) {
            const a = pts[i], b = pts[i + 1];
            const na = a.n, nb = b.n;
            const p0 = P(a.s + na[0] * off0, a.t + na[1] * off0, y0), p1 = P(a.s + na[0] * off1, a.t + na[1] * off1, y1);
            const q0 = P(b.s + nb[0] * off0, b.t + nb[1] * off0, y0), q1 = P(b.s + nb[0] * off1, b.t + nb[1] * off1, y1);
            const L0 = a.d / tex, L1 = b.d / tex, W0 = off0 / tex, W1 = off1 / tex + (y1 - y0) / tex;
            const c = cols ? cols[i] : col;
            // Keep every strip facing up or outwards, whichever way the line runs
            if (a.flip) { kit.quad(mat, p1, p0, q0, q1, c, [L0, W1, L0, W0, L1, W0, L1, W1]); } else { kit.quad(mat, p0, p1, q1, q0, c, [L0, W0, L0, W1, L1, W1, L1, W0]); }
        }
    }
    // Turn a list of [s, t] points into a line with direction, distance and the outward side
    function line(points, outSide, flip) {
        const out = [];
        let d = 0;
        for (let i = 0; i < points.length; i++) {
            const p = points[i], a = points[Math.max(0, i - 1)], b = points[Math.min(points.length - 1, i + 1)];
            let ds = b[0] - a[0], dt = b[1] - a[1];
            const l = Math.hypot(ds, dt) || 1; ds /= l; dt /= l;
            if (i > 0) { d += Math.hypot(p[0] - points[i - 1][0], p[1] - points[i - 1][1]); }
            out.push({ s: p[0], t: p[1], d: d, n: [-dt * outSide, ds * outSide], flip: !!flip });
        }
        return out;
    }

    /* A kerb and footpath along a line. Kerbs are painted black and white where asked. */
    function kerbAndFoot(kit, pts, k, painted, footW) {
        if (k <= .01) { return; }
        const h = KERB_H * k, w = KERB_W;
        const conc = rgb('#a8a49a');
        let colsF = null, colsT = null;
        if (painted) {
            colsF = []; colsT = [];
            const w1 = rgb('#d9d9d2'), b1 = rgb('#1d1f22');
            for (let i = 0; i < pts.length - 1; i++) {
                const c = Math.floor(pts[i].d) % 2 === 0 ? w1 : b1;
                colsF.push(c); colsT.push(c);
            }
        }
        // Face of the kerb, then its top, then the paving
        strip(kit, 'plain', pts, 0, 0, 0, h, conc, 1, colsF);
        strip(kit, 'plain', pts, 0, w, h, h, conc, 1, colsT);
        strip(kit, 'pavers', pts, w, w + footW, h, h + .01, rgb('#b5ada0'), 2.1);
        // Tactile strip for visually impaired walkers, along the middle of the footpath
        strip(kit, 'plain', pts, w + footW * .62, w + footW * .62 + .3, h + .018, h + .018, rgb('#c49a22'), 1);
        // The back edge of the path
        strip(kit, 'concrete', pts, w + footW, w + footW + .18, h + .04, h + .04, rgb('#8f8a80'), 1);
        strip(kit, 'concrete', pts, w + footW + .18, w + footW + .18, h + .04, -.2, rgb('#7a766c'), 1);
    }

    /* ---------- One stretch of the main road ---------- */
    function mainRoad(kit, s0, s1) {
        const STEP = 4;
        const base = rgb('#ffffff', .82);
        const dusty = [.98, .91, .78];
        const worn = rgb('#ffffff', .9);
        for (let s = s0; s < s1 - .01; s += STEP) {
            const a = s, b = Math.min(s1, s + STEP);
            const ea = edgeOf(a), eb = edgeOf(b), wa = R.halfWidth(a), wb = R.halfWidth(b);
            const k = (R.kerbed(a) + R.kerbed(b)) / 2;
            const edgeCol = D.mixc(dusty, base, k);
            // Lanes
            const rows = [[-1, 0], [-.5, 0], [0, 0], [.5, 0], [1, 0]];
            for (let i = 0; i < rows.length - 1; i++) {
                const f0 = rows[i][0], f1 = rows[i + 1][0];
                const B = kit.bucket('road');
                if (!B.st) { B.st = []; }
                const TILE = 5;
                const t00 = f0 * wa, t01 = f1 * wa, t10 = f0 * wb, t11 = f1 * wb;
                kit.quad('road', P(a, t00), P(a, t01), P(b, t11), P(b, t10),
                    [i === 0 ? worn : base, i === 3 ? worn : base, i === 3 ? worn : base, i === 0 ? worn : base],
                    [t00 / TILE, a / TILE, t01 / TILE, a / TILE, t11 / TILE, b / TILE, t10 / TILE, b / TILE], UP);
                B.st.push(a, t00, a, t01, b, t11, b, t10);
            }
            // Paved shoulders
            for (const side of [-1, 1]) {
                const B = kit.bucket('road');
                const t00 = side < 0 ? -ea : wa, t01 = side < 0 ? -wa : ea, t10 = side < 0 ? -eb : wb, t11 = side < 0 ? -wb : eb;
                const inner = worn, outer = edgeCol;
                const colsQ = side < 0 ? [outer, inner, inner, outer] : [inner, outer, outer, inner];
                kit.quad('road', P(a, t00), P(a, t01), P(b, t11), P(b, t10), colsQ, [t00 / 5, a / 5, t01 / 5, a / 5, t11 / 5, b / 5, t10 / 5, b / 5], UP);
                B.st.push(a, 1.75, a, 1.75, b, 1.75, b, 1.75);
            }
        }
        // Edge lines
        const EL = .15;
        for (let s = s0; s < s1 - .01; s += STEP) {
            const a = s, b = Math.min(s1, s + STEP);
            for (const side of [-1, 1]) {
                if (mouthAt((a + b) / 2, side)) { continue; }
                const ta = side * (R.halfWidth(a)), tb = side * (R.halfWidth(b));
                const k = kit;
                k.quad('paint', P(a, ta - EL / 2, .012), P(a, ta + EL / 2, .012), P(b, tb + EL / 2, .012), P(b, tb - EL / 2, .012), WHITE, [ta, a, ta + .15, a, tb + .15, b, tb, b], UP);
            }
        }
        // Centre line: broken white in the country, double yellow in the city
        const first = Math.ceil(s0 / 7.5) * 7.5;
        for (let s = first; s < s1; s += 7.5) {
            if (s < 606 && !junctionBox(s + 1.5, 2)) { paint(kit, s, -.075, Math.min(s + 3, s1), .075, WHITE); }
        }
        for (let s = s0; s < s1 - .01; s += STEP) {
            const b = Math.min(s1, s + STEP);
            if (b <= 606 || junctionBox((s + b) / 2, 7)) { continue; }
            const a = Math.max(s, 606);
            paint(kit, a, -.28, b, -.13, YELLOW);
            paint(kit, a, .13, b, .28, YELLOW);
        }
        // Lane lines in the city
        const fl = Math.ceil(s0 / 6) * 6;
        for (let s = fl; s < s1; s += 6) {
            if (s < 622 || junctionBox(s + 1.5, 7)) { continue; }
            paint(kit, s, -3.575, Math.min(s + 2.6, s1), -3.425, WHITE);
            paint(kit, s, 3.425, Math.min(s + 2.6, s1), 3.575, WHITE);
        }
        // Rural warning bars across the road before each country junction
        for (const j of R.JUNCTIONS) {
            if (j.urban || !(j.left || j.right)) { continue; }
            for (let n = 0; n < 5; n++) {
                const q = j.s - j.hw - j.r - 36 + n * 2.2;
                if (q >= s0 && q < s1) { paint(kit, q, -3.3, q + .4, -.3, WHITE); paint(kit, q, .3, q + .4, 3.3, WHITE); }
            }
        }
        // Old repairs in the asphalt, and iron drain gratings along the kerbs of the city
        const fix = D.Rng(Math.floor(s0) + 977);
        const tar = rgb('#3a3b3d');
        for (let n = 0; n < 3; n++) {
            const a = fix.range(s0, s1 - 4), L = fix.range(1.2, 3.8), w = fix.range(.9, 2.4);
            const t = fix.range(-R.halfWidth(a) + .5, R.halfWidth(a) - .5 - w);
            if (junctionBox(a, 8) || (t < .5 && t + w > -.5)) { continue; }
            kit.quad('paint', P(a, t, .006), P(a, t + w, .006), P(a + L, t + w, .006), P(a + L, t, .006), tar, [t, a, t + w, a, t + w, a + L, t, a + L], UP);
        }
        if (R.kerbed((s0 + s1) / 2) > .9) {
            const iron = rgb('#17181a');
            for (let q = Math.ceil(s0 / 22) * 22; q < s1; q += 22) {
                if (junctionBox(q, 3)) { continue; }
                const w = R.halfWidth(q);
                for (const side of [-1, 1]) {
                    if (mouthAt(q, side)) { continue; }
                    const t0 = side * (w + .1), t1 = side * (w + .5);
                    paint(kit, q, Math.min(t0, t1), q + .85, Math.max(t0, t1), iron, .01);
                }
            }
        }
        // Kerbs and footpaths
        for (const side of [-1, 1]) {
            let run = [];
            const flush = () => {
                if (run.length > 1) {
                    const pts = line(run, side, side > 0);
                    const k = R.kerbed((run[0][0] + run[run.length - 1][0]) / 2);
                    kerbAndFoot(kit, pts, k, Math.abs(run[0][0] - 640) < 2000, FOOT_W);
                }
                run = [];
            };
            for (let s = s0; s <= s1 + .001; s += 1) {
                const q = Math.min(s, s1);
                if (R.kerbed(q) < .01 || mouthAt(q, side)) { flush(); continue; }
                run.push([q, side * edgeOf(q)]);
            }
            flush();
        }
    }

    /* ---------- A junction: side road, rounded corners, kerbs, crossings and stop lines ---------- */
    function junction(kit, j) {
        const base = rgb('#ffffff', .86);
        const e = edgeOf(j.s), w = R.halfWidth(j.s);
        const hw = j.hw, r = j.r;
        for (const side of [-1, 1]) {
            if (!(side > 0 ? j.right : j.left)) { continue; }
            // Corners, each a fan of asphalt filling the curve between the main road and the side road
            for (const dir of [-1, 1]) {
                const cs = j.s + dir * (hw + r), ct = side * (e + r);     // centre of the corner's curve
                const K = [j.s + dir * hw, side * e];
                const arc = [];
                const N = 7;
                for (let i = 0; i <= N; i++) {
                    const a = i / N * Math.PI / 2;
                    arc.push([cs - dir * Math.sin(a) * r, ct - side * Math.cos(a) * r]);
                }
                for (let i = 0; i < N; i++) {
                    const a = arc[i], b = arc[i + 1];
                    const q0 = P(K[0], K[1]), q1 = P(a[0], a[1]), q2 = P(b[0], b[1]);
                    const flip = side * dir > 0;
                    const pts = flip ? [q0, q2, q1, q1] : [q0, q1, q2, q2];
                    const B = kit.bucket('road');
                    if (!B.st) { B.st = []; }
                    kit.quad('road', pts[0], pts[1], pts[2], pts[3], base,
                        [K[1] / 5, K[0] / 5, (flip ? b : a)[1] / 5, (flip ? b : a)[0] / 5, (flip ? a : b)[1] / 5, (flip ? a : b)[0] / 5, (flip ? a : b)[1] / 5, (flip ? a : b)[0] / 5], UP);
                    B.st.push(0, 1.75, 0, 1.75, 0, 1.75, 0, 1.75);
                }
                // Kerb round the corner and along the side road
                if (j.urban) {
                    const pl = [];
                    for (let i = 0; i <= N * 2; i++) {
                        const a = i / (N * 2) * Math.PI / 2;
                        pl.push([cs - dir * Math.sin(a) * r, ct - side * Math.cos(a) * r]);
                    }
                    const far = Math.min(j.length, 240);
                    for (let q = e + r + 2; q < far; q += q < 60 ? 2 : 10) { pl.push([j.s + dir * hw, side * q]); }
                    const pts = line(pl, -side * dir, side * dir < 0);
                    kerbAndFoot(kit, pts, 1, true, FOOT_W);
                }
            }
            // The side road
            const L = j.length;
            const step = 10;
            for (let q = e - .05; q < L; q += step) {
                const q1 = Math.min(L, q + step);
                const t0 = side * q, t1 = side * q1;
                const tA = side > 0 ? t0 : t1, tB = side > 0 ? t1 : t0;
                for (let c = 0; c < 2; c++) {
                    const s0 = j.s + (c - 1) * hw, s1 = j.s + c * hw;
                    const B = kit.bucket('road');
                    if (!B.st) { B.st = []; }
                    kit.quad('road', P(s0, tA), P(s0, tB), P(s1, tB), P(s1, tA), base,
                        [tA / 5, s0 / 5, tB / 5, s0 / 5, tB / 5, s1 / 5, tA / 5, s1 / 5], UP);
                    const lat0 = s0 - j.s, lat1 = s1 - j.s;
                    B.st.push(Math.abs(tA), lat0, Math.abs(tB), lat0, Math.abs(tB), lat1, Math.abs(tA), lat1);
                }
            }
            // Side road markings
            const startMark = e + r + (j.urban ? 6.5 : 3);
            for (let q = startMark; q < Math.min(L, 200); q += j.urban ? 6 : 7.5) {
                const t0 = side * q, t1 = side * (q + 2.8);
                if (j.median) { continue; }
                paint(kit, j.s - .07, Math.min(t0, t1), j.s + .07, Math.max(t0, t1), j.urban ? WHITE : WHITE);
            }
            if (j.urban) {
                // Crossing on the side road and its stop line
                const zt0 = e + r + .8;
                for (let b = -hw + .3; b < hw - .3; b += 1) {
                    const t0 = side * zt0, t1 = side * (zt0 + 3);
                    paint(kit, j.s + b, Math.min(t0, t1), j.s + b + .5, Math.max(t0, t1), WHITE);
                }
                const stopT = side * (zt0 + 4);
                paint(kit, j.s - hw + .2, Math.min(stopT, stopT + side * .4), j.s - (j.median ? .6 : .1), Math.max(stopT, stopT + side * .4), WHITE);
                // Edge lines
                for (let q = zt0 + 4.5; q < 200; q += 8) {
                    const t0 = side * q, t1 = side * (q + 8);
                    paint(kit, j.s - hw + .25, Math.min(t0, t1), j.s - hw + .37, Math.max(t0, t1), WHITE);
                    paint(kit, j.s + hw - .37, Math.min(t0, t1), j.s + hw - .25, Math.max(t0, t1), WHITE);
                }
                // A raised central divider on the largest side road
                if (j.median) {
                    const a = e + r + 9, b = Math.min(L, 240);
                    const conc = rgb('#a9a59b');
                    const pts = [];
                    for (let q = a; q <= b; q += 4) { pts.push([j.s - .7, side * q]); }
                    const l0 = line(pts, 1, side > 0);
                    const white = rgb('#d9d9d2'), black = rgb('#1d1f22');
                    strip(kit, 'plain', l0, 0, 0, 0, .3, conc, 1, l0.slice(0, -1).map((x, i) => (i % 2 ? black : white)));
                    strip(kit, 'plain', l0, 0, 1.4, .3, .3, rgb('#7f7a6a'), 1);
                    const pts2 = pts.map((p) => [p[0] + 1.4, p[1]]);
                    const l1 = line(pts2, -1, side < 0);
                    strip(kit, 'plain', l1, 0, 0, 0, .3, conc, 1, l1.slice(0, -1).map((x, i) => (i % 2 ? black : white)));
                }
            } else {
                // Give-way line where a country road meets the highway
                for (let b = -hw + .4; b < -.2; b += 1) {
                    const t0 = side * (e + .6), t1 = side * (e + 1);
                    paint(kit, j.s + b, Math.min(t0, t1), j.s + b + .55, Math.max(t0, t1), WHITE);
                }
            }
        }
        if (j.urban) {
            // Crossings and stop lines on the main road, on both sides of the junction
            const zs = hw + r + .8;
            for (let b = -w + .3; b < w - .3; b += 1) {
                paint(kit, j.s - zs - 3, b, j.s - zs, b + .5, WHITE);
                paint(kit, j.s + zs, b, j.s + zs + 3, b + .5, WHITE);
            }
            paint(kit, j.s - zs - 4.4, -w + .1, j.s - zs - 4, -.1, WHITE);
            // Lane arrows before the stop line
            const as = j.s - zs - 12;
            if (j.left) { arrow(kit, as, -5.25, -1); } else { arrow(kit, as, -5.25, 0); }
            arrow(kit, as, -1.75, j.right ? 1 : 0);
            const as2 = as - 26;
            arrow(kit, as2, -5.25, 0);
            arrow(kit, as2, -1.75, 0);
        }
    }
    // A painted lane arrow, seen from the driver's seat. dir: 0 straight, -1 left, 1 right.
    function arrow(kit, s, t, dir) {
        const W = WHITE, L = 4.2;
        paint(kit, s, t - .12, s + L * .62, t + .12, W);
        if (dir === 0) {
            paintPoly(kit, [[s + L * .62, t - .42], [s + L * .62, t + .42], [s + L, t], [s + L, t]], W);
        } else {
            const y = s + L * .46;
            paint(kit, y, Math.min(t, t + dir * .95), y + .24, Math.max(t, t + dir * .95), W);
            const hx = t + dir * .95;
            paintPoly(kit, dir > 0
                ? [[y - .34, hx], [y - .34, hx], [y + .12, hx + .62], [y + .58, hx]]
                : [[y - .34, hx], [y + .58, hx], [y + .12, hx - .62], [y + .12, hx - .62]], W);
            paint(kit, s + L * .62, t - .12, s + L * .62 + .001, t + .12, W);
        }
    }

    /* ---------- The land: fields, each with its own crop ---------- */
    const LAND = { s0: -300, t0: -1000, W: 1300, H: 1000, mpp: 2 };
    const plots = [];
    let landRect = null;
    function buildLand() {
        const rand = D.Rng(9024), W = LAND.W, H = LAND.H;
        const data = new Uint8Array(W * H * 4);
        // Base: pale meadow grass everywhere
        for (let i = 0; i < W * H; i++) {
            const o = i * 4;
            data[o] = 88; data[o + 1] = 124; data[o + 2] = 78; data[o + 3] = 0;
        }
        const fillRect = (s0, t0, s1, t1, col, a) => {
            const x0 = Math.max(0, Math.floor((s0 - LAND.s0) / LAND.mpp)), x1 = Math.min(W, Math.ceil((s1 - LAND.s0) / LAND.mpp));
            const y0 = Math.max(0, Math.floor((t0 - LAND.t0) / LAND.mpp)), y1 = Math.min(H, Math.ceil((t1 - LAND.t0) / LAND.mpp));
            for (let y = y0; y < y1; y++) {
                for (let x = x0; x < x1; x++) {
                    const o = (y * W + x) * 4;
                    data[o] = col[0]; data[o + 1] = col[1]; data[o + 2] = col[2]; data[o + 3] = a;
                }
            }
        };
        const CROPS = [
            { kind: 'wheat', col: [88, 140, 64], a: 0, weight: 3 },
            { kind: 'cane', col: [70, 122, 58], a: 0, weight: 3 },
            { kind: 'ploughed', col: [120, 110, 90], a: 255, weight: 2 },
            { kind: 'fallow', col: [116, 122, 76], a: 24, weight: 1.6 },
            { kind: 'mustard', col: [186, 170, 52], a: 0, weight: .7 },
            { kind: 'banana', col: [66, 114, 58], a: 0, weight: 1.6 },
            { kind: 'cotton', col: [92, 120, 80], a: 50, weight: 1.2 }
        ];
        const total = CROPS.reduce((n, c) => n + c.weight, 0);
        const pick = () => {
            let x = rand() * total;
            for (const c of CROPS) { x -= c.weight; if (x <= 0) { return c; } }
            return CROPS[0];
        };
        // Lay out plots in rows moving away from the road, on both sides, out to the far distance
        for (const side of [-1, 1]) {
            let t = 17;
            while (t < 900) {
                const depth = t < 120 ? rand.range(32, 62) : rand.range(50, 120);
                let s = -300 + rand.range(0, 40);
                while (s < 1600) {
                    const len = rand.range(38, 96);
                    const c = pick();
                    const limit = t < 200 ? 575 : 1000 - t * .22;
                    if (s + len < limit) {
                        const a0 = side > 0 ? t : -(t + depth), a1 = side > 0 ? t + depth : -t;
                        const v = rand.range(.92, 1.08);
                        fillRect(s + 1.2, a0 + 1.2, s + len - 1.2, a1 - 1.2, [c.col[0] * v | 0, c.col[1] * v | 0, c.col[2] * v | 0], c.a);
                        plots.push({ kind: c.kind, s0: s + 1.5, s1: s + len - 1.5, t0: a0 + 1.5, t1: a1 - 1.5, side: side });
                    }
                    s += len;
                }
                t += depth;
            }
        }
        landRect = function (s0, t0, s1, t1, col, a) { fillRect(s0, t0, s1, t1, col, a); tex.needsUpdate = true; };
        D.Roadworks.landRect = landRect;
        const tex = new THREE.DataTexture(data, W, H, THREE.RGBAFormat);
        tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearMipmapLinearFilter; tex.generateMipmaps = true;
        tex.colorSpace = THREE.NoColorSpace;
        tex.needsUpdate = true;
        D.Materials.U.tLand.value = tex;
        D.Materials.U.uLandBox.value.set(LAND.s0, LAND.t0, 1 / (W * LAND.mpp), 1 / (H * LAND.mpp));
    }
    // Is this spot on a side road or too close to one?
    function plotHit(s, t, margin) { return !!R.nearBranch(s, t, margin); }

    /* ---------- Terrain: a mesh that follows the road ---------- */
    const OFFSETS = [-1.2, .4, 1.6, 3, 4.2, 5.5, 7.5, 10.5, 14, 19, 26, 36, 50, 70, 96, 130, 175, 235, 320, 430, 580, 780, 1050];
    function buildTerrain(s0, s1) {
        const rows = [];
        for (let s = s0; s <= s1 + .01; s += 6) { rows.push(Math.min(s, s1)); }
        const cols = OFFSETS.length * 2;
        const nv = rows.length * cols;
        const pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), uv = new Float32Array(nv * 2), col = new Float32Array(nv * 3), st = new Float32Array(nv * 2), soil = new Float32Array(nv);
        let v = 0;
        const out = {};
        for (const s of rows) {
            const ea = edgeOf(s);
            const d = R.dev(s);
            for (let c = 0; c < cols; c++) {
                const side = c < OFFSETS.length ? -1 : 1;
                const off = side < 0 ? OFFSETS[OFFSETS.length - 1 - c] : OFFSETS[c - OFFSETS.length];
                const t = side * (ea + off);
                const h = groundRel(s, t);
                R.at(s, t, h, out);
                pos[v * 3] = out.x; pos[v * 3 + 1] = out.y; pos[v * 3 + 2] = out.z;
                // Slope, for shading
                const e = Math.max(.6, Math.abs(off) * .08);
                const hs = groundRel(s + e, t) - groundRel(s - e, t), ht = groundRel(s, t + e) - groundRel(s, t - e);
                const th = out.th, cx = Math.cos(th), sx = Math.sin(th);
                // Tangent directions in the world: along the road and across it
                const ax = sx * 2 * e, ay = hs, az = -cx * 2 * e;
                const bx = cx * 2 * e, by = ht, bz = sx * 2 * e;
                let nx = by * az - bz * ay, ny = bz * ax - bx * az, nz = bx * ay - by * ax;
                const ll = Math.hypot(nx, ny, nz) || 1;
                if (ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
                nor[v * 3] = nx / ll; nor[v * 3 + 1] = ny / ll; nor[v * 3 + 2] = nz / ll;
                uv[v * 2] = t * .31; uv[v * 2 + 1] = s * .31;
                st[v * 2] = s; st[v * 2 + 1] = t;
                // Bare soil beside the road and side roads; the city's ground is mostly bare too
                let so = 1 - smooth(2.2, 5, Math.abs(off) + (off < 0 ? -9 : 0));
                so = Math.max(so, smooth(.5, .85, d));
                for (const j of R.JUNCTIONS) {
                    if ((t > 0 && j.right) || (t < 0 && j.left)) {
                        so = Math.max(so, 1 - smooth(j.hw + .6, j.hw + 3.6, Math.abs(s - j.s)));
                    }
                }
                soil[v] = so;
                const tone = 1 - .12 * smooth(.3, 1, d);
                col[v * 3] = tone; col[v * 3 + 1] = tone; col[v * 3 + 2] = tone * (1 - .06 * d);
                v++;
            }
        }
        const idx = [];
        for (let r = 0; r < rows.length - 1; r++) {
            for (let c = 0; c < cols - 1; c++) {
                const a = r * cols + c, b = a + 1, cc = a + cols + 1, dd = a + cols;
                idx.push(a, b, cc, a, cc, dd);
            }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
        g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
        g.setAttribute('color', new THREE.BufferAttribute(col, 3));
        g.setAttribute('aST', new THREE.BufferAttribute(st, 2));
        g.setAttribute('aSoil', new THREE.BufferAttribute(soil, 1));
        g.setIndex(idx);
        g.computeBoundingSphere();
        return g;
    }

    D.Roadworks = { mainRoad, junction, buildLand, buildTerrain, plots, edgeOf, groundRel, mouthAt, junctionBox, plotHit, P, paint, FOOT_W, KERB_H, KERB_W };
})();
