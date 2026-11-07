/*
 * Vehicles and people. Everything here moves only as the camera moves: when the road is stopped, so are they.
 * Vehicles are modelled in code as smooth bodies with glass, wheels and lights, and are drawn through instancing.
 * A vehicle's frame: x right, y up, -z forwards.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const R = D.Route, rgb = D.rgb, shade = D.shade, Rng = D.Rng;

    /* A smooth body made from cross-sections along its length */
    function loft(k, mat, sec, col, n) {
        n = n || 10;
        const rows = [];
        for (const s of sec) {
            const row = [];
            for (let i = 0; i <= n; i++) {
                // Around the upper half and sides: from the lower right, over the top, to the lower left
                const a = i / n * Math.PI;
                const cx = Math.cos(a), cy = Math.sin(a);
                // A superellipse keeps the sides flat and the shoulders rounded
                const p = s.sq || 3.2;
                const X = Math.sign(cx) * Math.pow(Math.abs(cx), 2 / p) * s.w;
                const Y = s.y0 + Math.pow(cy, 2 / p) * (s.y1 - s.y0);
                let nx = Math.sign(cx) * Math.pow(Math.abs(cx), 2 - 2 / p) / Math.max(.01, s.w);
                let ny = Math.pow(cy, 2 - 2 / p) / Math.max(.01, s.y1 - s.y0);
                const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
                row.push([X, Y, s.z, nx, ny]);
            }
            rows.push(row);
        }
        const B = k.bucket(mat);
        for (let r = 0; r < rows.length - 1; r++) {
            const a = rows[r], b = rows[r + 1];
            for (let i = 0; i < n; i++) {
                const base = B.count;
                const pts = [a[i], a[i + 1], b[i + 1], b[i]];
                for (const p of pts) {
                    const q = k.tp(p[0], p[1], p[2]), nv = k.td(p[3], p[4], 0);
                    B.p.push(q[0], q[1], q[2]); B.n.push(nv[0], nv[1], nv[2]); B.uv.push(p[0], p[1]); B.c.push(col[0], col[1], col[2]);
                }
                B.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
                B.count += 4;
            }
        }
    }
    function capEnd(k, mat, s, col, facing) {
        k.quad(mat, facing > 0 ? [-s.w, s.y0, s.z] : [s.w, s.y0, s.z], facing > 0 ? [s.w, s.y0, s.z] : [-s.w, s.y0, s.z], facing > 0 ? [s.w, s.y1, s.z] : [-s.w, s.y1, s.z], facing > 0 ? [-s.w, s.y1, s.z] : [s.w, s.y1, s.z], col, null, [0, 0, facing]);
    }
    function wheel(k, x, y, z, r, w, side) {
        const tyre = rgb('#16171a'), rim = rgb('#9a9ea2');
        k.tube('rubber', x - w / 2, y, z, x + w / 2, y, z, r, r, 12, tyre);
        const fx = side > 0 ? x + w / 2 + .002 : x - w / 2 - .002;
        // The hub
        const B = [];
        void B;
        const seg = 10;
        for (let i = 0; i < seg; i++) {
            const a0 = i / seg * Math.PI * 2, a1 = (i + 1) / seg * Math.PI * 2, rr = r * .62;
            const p0 = [fx, y, z], p1 = [fx, y + Math.cos(a0) * rr, z + Math.sin(a0) * rr], p2 = [fx, y + Math.cos(a1) * rr, z + Math.sin(a1) * rr];
            const n = [side, 0, 0];
            if (side > 0) { k.quad('steel', p0, p2, p1, p1, rim, null, n); } else { k.quad('steel', p0, p1, p2, p2, rim, null, n); }
        }
    }

    /* The dark inner curve of a wheel arch, on a body side */
    function arch(k, z, y, r, xw) {
        const c = rgb('#0c0d0f');
        for (const side of [-1, 1]) {
            const x = side * (xw + .003);
            for (let i = 0; i < 8; i++) {
                const a0 = i / 8 * Math.PI, a1 = (i + 1) / 8 * Math.PI;
                const p1 = [x, y + Math.sin(a0) * r, z + Math.cos(a0) * r], p2 = [x, y + Math.sin(a1) * r, z + Math.cos(a1) * r], p0 = [x, y, z];
                const n = [side, 0, 0];
                if (side > 0) { k.quad('plain', p0, p2, p1, p1, c, null, n); } else { k.quad('plain', p0, p1, p2, p2, c, null, n); }
            }
        }
    }
    /* Lights: a lens that shows by day and a glow added after dark */
    function lightPair(k, x, y, z, w, h, day, night, facing) {
        for (const side of [-1, 1]) {
            const cx = side * x;
            const a = [cx - w / 2, y - h / 2, z], b = [cx + w / 2, y - h / 2, z], c = [cx + w / 2, y + h / 2, z], d = [cx - w / 2, y + h / 2, z];
            if (facing > 0) {
                k.quad('gloss', a, b, c, d, day, null, [0, 0, 1]);
                k.quad('vlamp', [a[0], a[1], z + .004], [b[0], b[1], z + .004], [c[0], c[1], z + .004], [d[0], d[1], z + .004], night, null, [0, 0, 1]);
            } else {
                k.quad('gloss', b, a, d, c, day, null, [0, 0, -1]);
                k.quad('vlamp', [b[0], b[1], z - .004], [a[0], a[1], z - .004], [d[0], d[1], z - .004], [c[0], c[1], z - .004], night, null, [0, 0, -1]);
            }
        }
    }

    /* A soft dark patch on the road beneath a vehicle, which seats it on the ground at any time of day */
    function groundShade(k, hw, hl) {
        k.quad('shadowblob', [-hw, .018, hl], [hw, .018, hl], [hw, .018, -hl], [-hw, .018, -hl], [.78, .78, .78], [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 0]);
    }

    /* ---------- A hatchback, Indian cities' most common car ---------- */
    function hatchback(wheelR) {
        const k = new D.Kit(), P = [1, 1, 1];
        const bodySec = [
            { z: -1.86, w: .62, y0: .34, y1: .66, sq: 3 }, { z: -1.78, w: .76, y0: .29, y1: .74, sq: 3 }, { z: -1.42, w: .82, y0: .24, y1: .84, sq: 3.4 },
            { z: -.72, w: .84, y0: .22, y1: .92, sq: 3.6 }, { z: .4, w: .85, y0: .22, y1: .95, sq: 3.6 }, { z: 1.4, w: .83, y0: .24, y1: .98, sq: 3.4 },
            { z: 1.78, w: .76, y0: .3, y1: .96, sq: 3 }, { z: 1.86, w: .62, y0: .4, y1: .86, sq: 3 }
        ];
        loft(k, 'vpaint', bodySec, P);
        capEnd(k, 'vpaint', bodySec[0], P, -1); capEnd(k, 'vpaint', bodySec[bodySec.length - 1], P, 1);
        // The cabin, all glass
        const G = rgb('#ffffff');
        const glass = [
            { z: -.88, w: .73, y0: .86, y1: .9, sq: 2.6 }, { z: -.3, w: .69, y0: .9, y1: 1.4, sq: 2.6 }, { z: .9, w: .67, y0: .93, y1: 1.46, sq: 2.6 }, { z: 1.46, w: .64, y0: .95, y1: 1.34, sq: 2.6 }, { z: 1.7, w: .6, y0: .94, y1: .98, sq: 2.6 }
        ];
        loft(k, 'vglass', glass, G, 8);
        // Roof and pillars in body colour
        const roof = [{ z: -.36, w: .6, y0: 1.38, y1: 1.415, sq: 2.6 }, { z: .9, w: .615, y0: 1.44, y1: 1.475, sq: 2.6 }, { z: 1.42, w: .57, y0: 1.32, y1: 1.355, sq: 2.6 }];
        loft(k, 'vpaint', roof, P, 6);
        for (const side of [-1, 1]) {
            k.bar('vpaint', side * .72, .9, -.86, side * .59, 1.4, -.34, .05, P);
            k.bar('vpaint', side * .68, .92, .3, side * .61, 1.45, .3, .05, P);
            k.bar('vpaint', side * .65, .95, 1.42, side * .56, 1.34, 1.42, .08, P);
            k.box('plain', side > 0 ? .85 : -.91, .9, -.5, side > 0 ? .91 : -.85, .97, -.4, rgb('#1a1b1d'));
        }
        arch(k, -1.16, .3, .36, .84); arch(k, 1.14, .3, .36, .84);
        const wr = wheelR || .29;
        for (const side of [-1, 1]) { for (const z of [-1.16, 1.14]) { wheel(k, side * .74, wr, z, wr, .19, side); } }
        // Bumpers, grille and lights
        const dk = rgb('#141516');
        k.box('plain', -.72, .3, -1.88, .72, .44, -1.8, dk, {});
        k.box('plain', -.42, .5, -1.87, .42, .62, -1.8, dk, {});
        k.box('plain', -.74, .32, 1.8, .74, .47, 1.88, dk, {});
        lightPair(k, .57, .68, -1.84, .3, .13, rgb('#e8ecef'), [13, 12, 10], -1);
        lightPair(k, .63, .78, 1.84, .2, .2, rgb('#8c1a1a'), [9, .5, .3], 1);
        k.box('plain', -.27, .56, 1.86, .27, .66, 1.875, rgb('#e0e0d8'), {});
        groundShade(k, 1.05, 2.2);
        return k;
    }
    /* ---------- A sedan or small taxi: same idea, with a boot ---------- */
    function sedan() {
        const k = new D.Kit(), P = [1, 1, 1];
        const body = [
            { z: -2.2, w: .64, y0: .34, y1: .64, sq: 3 }, { z: -2.1, w: .78, y0: .28, y1: .72, sq: 3 }, { z: -1.5, w: .84, y0: .24, y1: .8, sq: 3.4 }, { z: -.8, w: .86, y0: .22, y1: .88, sq: 3.6 },
            { z: .8, w: .86, y0: .22, y1: .92, sq: 3.6 }, { z: 1.7, w: .84, y0: .25, y1: .92, sq: 3.4 }, { z: 2.14, w: .78, y0: .32, y1: .9, sq: 3 }, { z: 2.22, w: .64, y0: .42, y1: .82, sq: 3 }
        ];
        loft(k, 'vpaint', body, P);
        capEnd(k, 'vpaint', body[0], P, -1); capEnd(k, 'vpaint', body[body.length - 1], P, 1);
        loft(k, 'vglass', [{ z: -.9, w: .74, y0: .84, y1: .88, sq: 2.6 }, { z: -.28, w: .69, y0: .88, y1: 1.34, sq: 2.6 }, { z: .9, w: .67, y0: .9, y1: 1.38, sq: 2.6 }, { z: 1.62, w: .64, y0: .9, y1: .94, sq: 2.6 }], [1, 1, 1], 8);
        loft(k, 'vpaint', [{ z: -.34, w: .6, y0: 1.32, y1: 1.355, sq: 2.6 }, { z: .9, w: .61, y0: 1.36, y1: 1.395, sq: 2.6 }], P, 6);
        for (const side of [-1, 1]) {
            k.bar('vpaint', side * .73, .88, -.88, side * .59, 1.34, -.32, .05, P);
            k.bar('vpaint', side * .68, .9, .3, side * .61, 1.37, .3, .05, P);
            k.bar('vpaint', side * .65, .92, 1.56, side * .58, 1.37, .92, .07, P);
        }
        arch(k, -1.32, .3, .36, .86); arch(k, 1.36, .3, .36, .86);
        for (const side of [-1, 1]) { for (const z of [-1.32, 1.36]) { wheel(k, side * .76, .3, z, .3, .19, side); } }
        const dk = rgb('#141516');
        k.box('plain', -.74, .3, -2.22, .74, .44, -2.14, dk, {});
        k.box('plain', -.42, .5, -2.21, .42, .6, -2.14, dk, {});
        k.box('plain', -.76, .34, 2.14, .76, .47, 2.24, dk, {});
        lightPair(k, .58, .66, -2.18, .34, .12, rgb('#e8ecef'), [13, 12, 10], -1);
        lightPair(k, .6, .76, 2.2, .3, .13, rgb('#8c1a1a'), [9, .5, .3], 1);
        groundShade(k, 1.05, 2.5);
        return k;
    }

    /* ---------- The three-wheeled auto-rickshaw ---------- */
    function autoRickshaw() {
        const k = new D.Kit();
        const paint = [1, 1, 1];                // the body takes its fleet colour
        const hood = rgb('#121314');
        const L = [{ z: -1.32, w: .34, y0: .3, y1: 1.1, sq: 2.6 }, { z: -1.0, w: .56, y0: .26, y1: 1.05, sq: 2.8 }, { z: -.2, w: .66, y0: .26, y1: .8, sq: 3 }, { z: 1.2, w: .68, y0: .26, y1: .8, sq: 3 }, { z: 1.32, w: .6, y0: .32, y1: .78, sq: 3 }];
        loft(k, 'vpaint', L, paint);
        capEnd(k, 'vpaint', L[L.length - 1], paint, 1);
        // Windscreen frame and pillars
        k.quad('vglass', [-.46, 1.05, -1.0], [.46, 1.05, -1.0], [.46, 1.55, -.72], [-.46, 1.55, -.72], [1, 1, 1], null, [0, .4, -.9]);
        for (const side of [-1, 1]) {
            k.bar('vpaint', side * .5, 1.02, -1.0, side * .5, 1.58, -.72, .05, paint);
            k.bar('vpaint', side * .64, .8, .2, side * .64, 1.62, .2, .05, paint);
            k.bar('vpaint', side * .64, .8, 1.1, side * .64, 1.56, 1.1, .05, paint);
        }
        // The black fabric hood
        const H = [{ z: -.8, w: .56, y0: 1.5, y1: 1.62, sq: 3 }, { z: -.2, w: .68, y0: 1.6, y1: 1.74, sq: 3 }, { z: 1.0, w: .7, y0: 1.56, y1: 1.72, sq: 3 }, { z: 1.28, w: .68, y0: 1.2, y1: 1.42, sq: 3 }, { z: 1.32, w: .66, y0: .84, y1: .94, sq: 3 }];
        loft(k, 'rubber', H, hood);
        // Seats and passengers' shade within
        k.box('plain', -.58, .78, .75, .58, 1.2, 1.05, rgb('#31302c'));
        k.box('plain', -.5, .9, -.55, .5, 1.15, -.25, rgb('#2c2b28'));
        // Wheels: one in front, two behind
        wheel(k, 0, .22, -1.05, .22, .12, 1);
        for (const side of [-1, 1]) { wheel(k, side * .68, .22, .9, .22, .13, side); }
        k.box('steel', -.38, 1.08, -1.34, .38, 1.13, -1.28, rgb('#b0b0a8'), {});
        lightPair(k, 0, .76, -1.3, .22, .15, rgb('#e8ecef'), [12, 11, 9], -1);
        lightPair(k, .56, .56, 1.33, .1, .13, rgb('#8c1a1a'), [8, .5, .3], 1);
        groundShade(k, .9, 1.6);
        return k;
    }

    /* ---------- A city bus ---------- */
    function bus() {
        const k = new D.Kit(), P = [1, 1, 1];
        const W = 1.25, L = 5.4;
        const B = [{ z: -L, w: 1.14, y0: .45, y1: 3, sq: 7 }, { z: -L + .12, w: 1.25, y0: .4, y1: 3.1, sq: 8 }, { z: L - .1, w: 1.25, y0: .4, y1: 3.12, sq: 8 }, { z: L, w: 1.18, y0: .48, y1: 3.02, sq: 7 }];
        loft(k, 'vpaint', B, P, 12);
        capEnd(k, 'vpaint', B[0], P, -1); capEnd(k, 'vpaint', B[B.length - 1], P, 1);
        // White lower panel and stripes, and long windows
        for (const side of [-1, 1]) {
            const x = side * (W + .012);
            const q = (a, b, c, d, mat, col, n) => (side > 0 ? k.quad(mat, a, b, c, d, col, null, n) : k.quad(mat, b, a, d, c, col, null, n));
            q([x, .48, L - .5], [x, .48, -L + .4], [x, 1.2, -L + .4], [x, 1.2, L - .5], 'plain', rgb('#e4e0d6'), [side, 0, 0]);
            q([x, 1.72, L - .4], [x, 1.72, -L + 1.2], [x, 2.72, -L + 1.2], [x, 2.72, L - .4], 'vglass', [1, 1, 1], [side, 0, 0]);
            for (let i = 0; i < 8; i++) {
                const z = -L + 1.2 + i * (2 * L - 1.6) / 8;
                k.bar('vpaint', x, 1.72, z, x, 2.72, z, .05, P);
            }
            // Door
            q([x + side * .004, .5, -L + 2], [x + side * .004, .5, -L + .9], [x + side * .004, 2.72, -L + .9], [x + side * .004, 2.72, -L + 2], 'vglass', [1, 1, 1], [side, 0, 0]);
        }
        // Windscreen and rear window
        k.quad('vglass', [1.1, 1.3, -L - .004], [-1.1, 1.3, -L - .004], [-1.1, 2.8, -L - .004], [1.1, 2.8, -L - .004], [1, 1, 1], null, [0, 0, -1]);
        k.quad('vglass', [-1.05, 1.9, L + .004], [1.05, 1.9, L + .004], [1.05, 2.75, L + .004], [-1.05, 2.75, L + .004], [1, 1, 1], null, [0, 0, 1]);
        arch(k, -3.2, .5, .62, W); arch(k, 3.2, .5, .62, W);
        for (const side of [-1, 1]) { for (const z of [-3.2, 3.2]) { wheel(k, side * 1.08, .5, z, .5, .3, side); } }
        k.box('plain', -1.2, .45, -L - .05, 1.2, .78, -L + .05, rgb('#1a1b1d'), {});
        lightPair(k, .9, .95, -L - .012, .32, .2, rgb('#e8ecef'), [14, 13, 11], -1);
        lightPair(k, 1, 1.0, L + .012, .2, .3, rgb('#8c1a1a'), [9, .5, .3], 1);
        groundShade(k, 1.55, 5.9);
        return k;
    }

    /* ---------- A truck, in the bright paint usual on Indian roads ---------- */
    function truck() {
        const k = new D.Kit(), P = [1, 1, 1];
        // Cab
        const C = [{ z: -3.9, w: 1.15, y0: .6, y1: 2.25, sq: 5 }, { z: -3.75, w: 1.22, y0: .55, y1: 2.5, sq: 5 }, { z: -2.5, w: 1.22, y0: .55, y1: 2.65, sq: 5 }];
        loft(k, 'vpaint', C, P);
        capEnd(k, 'vpaint', C[0], P, -1); capEnd(k, 'vpaint', C[C.length - 1], P, 1);
        k.quad('vglass', [1.04, 1.58, -3.915], [-1.04, 1.58, -3.915], [-1.04, 2.3, -3.8], [1.04, 2.3, -3.8], [1, 1, 1], null, [0, .2, -1]);
        for (const side of [-1, 1]) {
            const x = side * 1.225;
            if (side > 0) { k.quad('vglass', [x, 1.55, -2.85], [x, 1.55, -3.5], [x, 2.3, -3.6], [x, 2.3, -2.85], [1, 1, 1], null, [1, 0, 0]); } else { k.quad('vglass', [x, 1.55, -3.5], [x, 1.55, -2.85], [x, 2.3, -2.85], [x, 2.3, -3.6], [1, 1, 1], null, [-1, 0, 0]); }
        }
        // Chassis and open wooden load body
        k.box('plain', -.6, .5, -3, .6, .85, 4.2, rgb('#1a1b1d'), {});
        const wood = rgb('#b05a2a');
        k.box('wood', -1.25, .85, -2.35, 1.25, 1.0, 4.3, shade(wood, .8), {});
        k.box('vpaint', -1.28, 1, -2.35, -1.2, 2.4, 4.3, P, {});
        k.box('vpaint', 1.2, 1, -2.35, 1.28, 2.4, 4.3, P, {});
        k.box('vpaint', -1.28, 1, 4.22, 1.28, 2.4, 4.3, P, {});
        k.box('vpaint', -1.28, 1, -2.4, 1.28, 2.75, -2.32, P, {});
        // The load under a tarpaulin
        loft(k, 'rubber', [{ z: -2.3, w: 1.2, y0: 2.1, y1: 3.1, sq: 2.6 }, { z: 4.1, w: 1.2, y0: 2.1, y1: 3, sq: 2.6 }], rgb('#3f5f6a'), 8);
        arch(k, -2.95, .52, .6, 1.225);
        for (const side of [-1, 1]) { for (const z of [-3, 2.2, 3.2]) { wheel(k, side * 1.02, .52, z, .52, .3, side); } }
        k.box('plain', -1.2, .5, -3.95, 1.2, .8, -3.75, rgb('#7a2a20'), {});
        lightPair(k, .85, 1, -3.91, .3, .22, rgb('#e8ecef'), [14, 13, 11], -1);
        lightPair(k, 1, 1.05, 4.32, .2, .2, rgb('#8c1a1a'), [9, .5, .3], 1);
        groundShade(k, 1.55, 4.8);
        return k;
    }

    /* ---------- A motor scooter with its rider ---------- */
    function scooter() {
        const k = new D.Kit(), P = [1, 1, 1];
        const dk = rgb('#17181a');
        // Front apron, footboard, and the rounded body under the seat
        k.box('vpaint', -.17, .34, -.58, .17, 1.0, -.48, P);
        k.box('vpaint', -.17, .28, -.5, .17, .35, .12, P);
        loft(k, 'vpaint', [{ z: .02, w: .12, y0: .3, y1: .56, sq: 2.6 }, { z: .34, w: .2, y0: .28, y1: .76, sq: 2.8 }, { z: .72, w: .18, y0: .36, y1: .76, sq: 2.8 }, { z: .86, w: .1, y0: .46, y1: .72, sq: 2.6 }], P, 6);
        k.box('plain', -.15, .76, -.02, .15, .86, .76, dk);
        // Mudguard, wheels and handlebar
        k.box('vpaint', -.08, .42, -.84, .08, .47, -.42, P);
        wheel(k, 0, .22, -.62, .22, .1, 1);
        wheel(k, 0, .22, .64, .22, .1, 1);
        k.bar('plain', 0, .98, -.54, 0, 1.1, -.5, .05, dk);
        k.tube('plain', -.34, 1.1, -.5, .34, 1.1, -.5, .016, .016, 4, dk);
        lightPair(k, 0, .92, -.59, .13, .13, rgb('#e8ecef'), [12, 11, 9], -1);
        lightPair(k, 0, .68, .87, .12, .06, rgb('#8c1a1a'), [8, .5, .3], 1);
        // The rider, sitting upright, with a helmet
        const shirt = rgb('#3e5f8a'), legs = rgb('#2d3440'), skin = rgb('#8a5a3c'), hel = rgb('#b0231f');
        k.tube('plain', 0, .9, .4, 0, 1.44, .3, .17, .16, 8, shirt);
        k.ball('plain', 0, 1.44, .3, .165, shirt, .7);
        for (const side of [-1, 1]) {
            k.tube('plain', side * .1, .9, .36, side * .14, .74, -.1, .075, .058, 6, legs);
            k.tube('plain', side * .14, .74, -.1, side * .14, .38, -.2, .055, .045, 6, legs);
            k.box('plain', side * .14 - .05, .35, -.34, side * .14 + .05, .41, -.1, rgb('#1d1a18'));
            k.tube('plain', side * .2, 1.42, .3, side * .3, 1.2, .0, .05, .042, 5, shirt);
            k.tube('plain', side * .3, 1.2, .0, side * .32, 1.12, -.46, .04, .034, 5, skin);
        }
        k.tube('plain', 0, 1.5, .28, 0, 1.6, .26, .05, .05, 5, skin);
        k.ball('plain', 0, 1.68, .24, .1, skin, 1.1);
        k.ball('gloss', 0, 1.72, .25, .132, hel, 1.02);
        groundShade(k, .42, 1.05);
        return k;
    }

    /* ---------- People ---------- */
    // Standing or mid-stride. A tunic reaches the knee, as with a kurta; otherwise a shirt and trousers.
    function person(shirt, trousers, skinC, tunic, stride) {
        const k = new D.Kit();
        const skin = rgb(skinC), sh = rgb(shirt), tr = rgb(trousers), hair = rgb('#15110e');
        const st = stride || 0;
        for (const side of [-1, 1]) {
            const fz = side * st;
            k.tube('plain', side * .085, .92, 0, side * .09, .5, fz * .5, .082, .06, 6, tr);
            k.tube('plain', side * .09, .5, fz * .5, side * .09, .07, fz, .056, .042, 6, tr);
            k.box('plain', side * .09 - .045, 0, fz - .15, side * .09 + .045, .07, fz + .09, rgb('#1d1a18'));
            // Arms swing against the legs
            k.tube('plain', side * .215, 1.38, 0, side * .245, 1.1, -fz * .4, .047, .04, 5, sh);
            k.tube('plain', side * .245, 1.1, -fz * .4, side * .25, .86, -fz * .7, .037, .032, 5, skin);
        }
        k.tube('plain', 0, tunic ? .58 : .88, 0, 0, 1.0, 0, tunic ? .205 : .155, .155, 8, sh);
        k.tube('plain', 0, 1.0, 0, 0, 1.38, 0, .155, .185, 8, sh);
        k.ball('plain', 0, 1.38, 0, .185, sh, .55);
        k.tube('plain', 0, 1.44, 0, 0, 1.54, 0, .048, .048, 5, skin);
        k.ball('plain', 0, 1.62, -.004, .098, skin, 1.14);
        k.ball('plain', 0, 1.655, .016, .104, hair, .94);
        return k;
    }

    /* ---------- The fleet: instanced drawing, one mesh per body part ---------- */
    const PAINTS = {
        car: ['#f2f2ee', '#cfd2d4', '#8d9196', '#26292c', '#7a1f1e', '#1f3f6e', '#b8b3a6', '#e8e8e4'],
        auto: ['#d7b52a', '#2f8f5a', '#d7b52a'],
        bus: ['#b53a2c', '#1f6f8f', '#2f7a4f'],
        truck: ['#c2522a', '#2f6f8f', '#d29a22', '#3f7a4f'],
        scooter: ['#2c2e30', '#8a1f1f', '#e4e2da', '#1f4f7e']
    };
    class Traffic {
        constructor(world, L, q) {
            this.world = world; this.L = L; this.q = q;
            this.group = new THREE.Group();
            world.scene.add(this.group);
            this.vmat();
            this.types = {};
            this.mk('hatch', hatchback(), 12); this.mk('sedan', sedan(), 8); this.mk('auto', autoRickshaw(), 12); this.mk('bus', bus(), 4); this.mk('truck', truck(), 4); this.mk('scooter', scooter(), 14);
            const pc = Math.round(26 * q.people);
            this.mk('man1', person('#d7dde2', '#2d3440', '#8a5a3c', false, .14), pc); this.mk('man2', person('#7f9a78', '#3f3a34', '#6d452d', false, .2), pc); this.mk('woman', person('#b5365a', '#d9cdbd', '#9a6b4c', true, .1), pc); this.mk('woman2', person('#3c6e8f', '#2d3440', '#7d5238', true, .16), pc);
            this.plan();
            this.lamps = [];
            this.lightGlow = this.mkGlow();
            this.lastC = null;
            this.m = new THREE.Matrix4(); this.q4 = new THREE.Quaternion(); this.p = new THREE.Vector3(); this.s = new THREE.Vector3(1, 1, 1); this.up = new THREE.Vector3(0, 1, 0); this.col = new THREE.Color();
        }
        vmat() {
            const L = this.L;
            if (L.vpaint) { return; }
            L.vpaint = D.Materials.patch(new THREE.MeshStandardMaterial({ roughness: .3, metalness: .15 }), { key: 'vpaint' });
            L.vglass = D.Materials.patch(new THREE.MeshStandardMaterial({ color: 0x0c1014, roughness: .06, metalness: .4 }), { key: 'vglass' });
            L.vlamp = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false });
            D.Materials.patch(L.vlamp, { key: 'vlamp', noSky: true });
            L.vlamp.onBeforeCompile = (function (orig) {
                return function (shader) {
                    orig(shader);
                    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', 'outgoingLight *= uLampOn;\n#include <opaque_fragment>');
                };
            })(L.vlamp.onBeforeCompile);
        }
        mk(name, kit, count) {
            const parts = [];
            kit.toGeometries(THREE).forEach((g, mat) => {
                const m = new THREE.InstancedMesh(g, this.L[mat], count);
                m.frustumCulled = false;
                m.castShadow = mat !== 'vlamp' && mat !== 'vglass' && mat !== 'shadowblob';
                m.receiveShadow = mat !== 'vlamp' && mat !== 'shadowblob';
                m.count = 0;
                if (mat === 'vpaint') { m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3); }
                this.group.add(m);
                parts.push(m);
            });
            this.types[name] = { parts, cap: count, used: 0 };
        }
        // Where every vehicle and person travels, as a function of how far the camera has come
        plan() {
            const r = Rng(90210);
            const v = this.vehicles = [];
            const pick = (l) => l[Math.floor(r() * l.length)];
            const add = (type, lane, dir, s0, k, sMin, sMax, paint) => v.push({ type, lane, dir, s0, k, sMin, sMax, col: rgb(paint || pick(PAINTS[type === 'hatch' || type === 'sedan' ? 'car' : type])), phase: r() });
            // The rural highway: lanes at +/- 1.75. India drives on the left: same direction on the left, oncoming on the right.
            let s = 40;
            for (let i = 0; i < 6; i++) { add(pick(['truck', 'hatch', 'bus', 'sedan', 'scooter', 'hatch']), -1.75, 1, s, .62, -100, 640); s += r.range(60, 120); }
            s = 200;
            for (let i = 0; i < 9; i++) { add(pick(['truck', 'hatch', 'auto', 'sedan', 'bus', 'scooter']), 1.75, -1, s, .85, -100, 640); s += r.range(70, 130); }
            // The city's lanes
            const city = ['hatch', 'hatch', 'sedan', 'auto', 'auto', 'scooter', 'scooter', 'bus', 'hatch'];
            const lanes = [[-5.25, 1], [-1.75, 1], [1.75, -1], [5.25, -1]];
            for (const [lane, dir] of lanes) {
                let q = 620 + r.range(0, 30);
                while (q < 1900) {
                    const t = pick(city);
                    const laneT = (t === 'scooter' || t === 'auto') && Math.abs(lane) < 2 ? lane * 3 : lane;
                    add(t, laneT, dir, q, dir > 0 ? .45 : .7, 590, 2000);
                    q += r.range(24, 62);
                }
            }
            // Parked on the kerb, not moving at all
            for (let i = 0; i < 26; i++) {
                const q = r.range(640, 1500), side = r() < .5 ? -1 : 1;
                if (D.Roadworks.mouthAt(q, side) || D.Roadworks.junctionBox(q, 12)) { continue; }
                const t = r() < .7 ? 'scooter' : r() < .6 ? 'hatch' : 'auto';
                v.push({ type: t, lane: side * 6.35, dir: 1, s0: q, k: 0, sMin: 0, sMax: 3000, col: rgb(pick(PAINTS[t === 'hatch' ? 'car' : t])), phase: 0, parked: true });
            }
            // Traffic on the side roads: crossing the junction while the camera waits, and queuing behind stop lines
            this.cross = [];
            for (const j of R.JUNCTIONS) {
                if (!j.urban) { continue; }
                const stop = j.s - R.JUNCTION_AFTER - 13;
                for (let n = 0; n < 4; n++) {
                    const fromLeft = n % 2 === 0;
                    const t = pick(['hatch', 'auto', 'scooter', 'bus', 'sedan', 'auto']);
                    this.cross.push({ type: t, j: j, s: j.s + (fromLeft ? 1 : -1) * (j.hw * .5), dir: fromLeft ? 1 : -1, t0: (fromLeft ? -1 : 1) * (r.range(-4, 12) + n * 5), k: 3.2, stop: stop, col: rgb(pick(PAINTS[t === 'hatch' || t === 'sedan' ? 'car' : t])) });
                }
                // Waiting behind the stop lines on the side arms
                for (const side of [-1, 1]) {
                    if (!(side > 0 ? j.right : j.left)) { continue; }
                    let q = D.Roadworks.edgeOf(j.s) + j.r + 7.5;
                    for (let n = 0; n < 3; n++) {
                        const t = pick(['hatch', 'auto', 'scooter', 'sedan']);
                        this.cross.push({ type: t, j, s: j.s - j.hw * .5 * side, dir: side > 0 ? -1 : 1, t0: side * q, k: 0, stop, col: rgb(pick(PAINTS[t === 'hatch' || t === 'sedan' ? 'car' : t])), waiting: true });
                        q += t === 'bus' ? 13 : 6;
                    }
                }
            }
            // People on the footpaths and at the crossings
            const peep = this.people = [];
            const kinds = ['man1', 'man2', 'woman', 'woman2'];
            for (let n = 0; n < Math.round(120 * this.q.people); n++) {
                const q = r.range(640, 1700), side = r() < .5 ? -1 : 1;
                if (D.Roadworks.mouthAt(q, side)) { continue; }
                const t = side * (D.Roadworks.edgeOf(q) + D.Roadworks.KERB_W + r.range(.6, 2.9));
                peep.push({ type: pick(kinds), s0: q, t, k: r() < .5 ? .018 : -.018, yaw: r() < .5 ? 0 : Math.PI, y: .17 });
            }
            this.walkers = [];
            for (const j of R.JUNCTIONS) {
                if (!j.urban) { continue; }
                const stop = j.s - R.JUNCTION_AFTER - 13;
                const zs = j.hw + j.r + 2.3;
                for (let n = 0; n < 4; n++) {
                    const side = n % 2 ? 1 : -1;
                    this.walkers.push({ type: pick(kinds), s: j.s - zs + r.range(-1, 1), t0: side * r.range(-2, 6), dir: side, stop: stop, k: .32 });
                }
            }
            for (const j of R.JUNCTIONS) { j.signal = 'red'; }
        }
        mkGlow() {
            const cap = 90;
            const g = new THREE.BufferGeometry();
            this.gp = new Float32Array(cap * 4 * 3); this.gd = new Float32Array(cap * 4 * 4);
            const corner = new Float32Array(cap * 4 * 2), colr = new Float32Array(cap * 4 * 3), idx = [];
            const C = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
            for (let i = 0; i < cap; i++) {
                for (let c = 0; c < 4; c++) { corner[(i * 4 + c) * 2] = C[c][0]; corner[(i * 4 + c) * 2 + 1] = C[c][1]; colr[(i * 4 + c) * 3] = 1; }
                const b = i * 4;
                idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
            }
            g.setAttribute('position', new THREE.BufferAttribute(this.gp, 3).setUsage(THREE.DynamicDrawUsage));
            g.setAttribute('aData', new THREE.BufferAttribute(this.gd, 4).setUsage(THREE.DynamicDrawUsage));
            g.setAttribute('aCorner', new THREE.BufferAttribute(corner, 2));
            g.setAttribute('color', new THREE.BufferAttribute(colr, 3));
            g.setIndex(idx);
            const mesh = new THREE.Mesh(g, D.Furniture.glowMaterial());
            mesh.frustumCulled = false; mesh.renderOrder = 6;
            this.group.add(mesh);
            this.glowCap = cap;
            return mesh;
        }
        glowPut(x, y, z, r, gr, b, size) {
            if (this.glowN >= this.glowCap) { return; }
            const i = this.glowN++;
            for (let c = 0; c < 4; c++) {
                const o = (i * 4 + c);
                this.gp[o * 3] = x; this.gp[o * 3 + 1] = y; this.gp[o * 3 + 2] = z;
                this.gd[o * 4] = r; this.gd[o * 4 + 1] = gr; this.gd[o * 4 + 2] = b; this.gd[o * 4 + 3] = size;
            }
        }
        // Lit lamps of the traffic signal at a junction, which change with the camera's progress
        addJunctionLamps(j, group) {
            const make = (positions, col, big) => {
                const b = new D.Furniture.GlowBatch();
                for (const p of positions) { b.add(p[0], p[1], p[2], col[0], col[1], col[2], big, 0); }
                const mat = D.Furniture.glowMaterial();
                mat.uniforms.uLampOn = { value: 0 };
                // These always show, gated by their own signal state
                const gm = b.build(mat);
                if (gm) { group.add(gm); }
                return mat;
            };
            const lp = j.lampPos;
            j.matR = make(lp.red, [7, .5, .35], .34);
            j.matA = make(lp.amber, [6.5, 3.4, .3], .34);
            j.matG = make(lp.green, [.4, 6, 2.4], .34);
            // A small panel counting down the seconds, as on Indian signals
            if (lp.count) {
                const cv = document.createElement('canvas');
                cv.width = 64; cv.height = 40;
                const tex = new THREE.CanvasTexture(cv);
                tex.colorSpace = THREE.SRGBColorSpace;
                const mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, fog: false });
                const g = new THREE.BufferGeometry();
                const c = lp.count;
                g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([c[0][0], c[0][1], c[0][2], c[1][0], c[1][1], c[1][2], c[2][0], c[2][1], c[2][2], c[3][0], c[3][1], c[3][2]]), 3));
                g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
                g.setIndex([0, 1, 2, 0, 2, 3]);
                g.computeBoundingSphere();
                const m = new THREE.Mesh(g, mat);
                m.matrixAutoUpdate = false;
                group.add(m);
                j.count = { cv, tex, last: null };
            }
        }
        setSignal(j, state) {
            j.signal = state;
            if (j.matR) {
                // Gate value 0 in the glow means "always on", so colour strength is set through the value of a shared uniform below
                j.matR.uniforms.uStrength = j.matR.uniforms.uStrength || { value: 0 };
            }
        }
        update(c, info) {
            if (this.lastC !== null && Math.abs(this.lastC - c) < .001 && !info.forceAll && !info.turning) { return; }
            this.lastC = c;
            for (const name in this.types) { this.types[name].used = 0; }
            this.glowN = 0;
            const lampsOn = D.Materials.U.uLampOn.value;
            const visible0 = c - 40, visible1 = c + (this.q.name === 'low' ? 320 : 560);
            const q = this.q4, up = this.up, m = this.m, p = this.p, scl = this.s;
            const place = (type, x, y, z, yaw, col, sc) => {
                const T = this.types[type];
                if (!T || T.used >= T.cap) { return; }
                const i = T.used++;
                q.setFromAxisAngle(up, yaw);
                p.set(x, y, z);
                scl.setScalar(sc || 1);
                m.compose(p, q, scl);
                for (const part of T.parts) {
                    part.setMatrixAt(i, m);
                    if (part.instanceColor && col) { part.instanceColor.setXYZ(i, col[0], col[1], col[2]); }
                }
            };
            const out = {};
            for (const v of this.vehicles) {
                let s = v.s0 + (v.dir > 0 ? v.k : -v.k) * c;
                if (v.k === 0) { s = v.s0; }
                if (s < v.sMin || s > v.sMax) { continue; }
                // The lanes next to the camera stay clear close by: a vehicle reaching this gap slips past in an instant
                if (v.k !== 0 && Math.abs(v.lane) < 4) {
                    const rel = s - c, big = v.type === 'bus' || v.type === 'truck';
                    const ahead = big ? 46 : 26, behind = 11;
                    if (rel < ahead && rel > ahead - 1.5) { s = c + behind * -1 + (rel - (ahead - 1.5)) / 1.5 * (ahead + behind); } else if (rel <= ahead - 1.5 && rel > -behind) { s = c - behind - (ahead - 1.5 - rel) * .4; }
                }
                if (s < visible0 || s > visible1) { continue; }
                // On the taper, lanes draw in with the road
                const w = R.halfWidth(s);
                let t = v.lane;
                if (!v.parked && Math.abs(t) > w) { continue; }
                R.at(s, t, 0, out);
                const yaw = -(out.th) + (v.dir > 0 ? 0 : Math.PI) + (v.parked ? 0 : 0);
                place(v.type, out.x, out.y + (v.parked ? .02 : 0), out.z, yaw, v.col);
                if (lampsOn > .05 && !v.parked && this.glowN < 80) { this.vehicleGlow(v, out, lampsOn); }
            }
            for (const v of this.cross) {
                const j = v.j;
                if (j.s < visible0 - 20 || j.s > visible1) { continue; }
                const t = v.waiting ? v.t0 : v.t0 + v.dir * (c - v.stop) * v.k;
                if (Math.abs(t) > 200) { continue; }
                R.at(v.s, t, 0, out);
                const yaw = -(out.th) + (v.dir > 0 ? -Math.PI / 2 : Math.PI / 2);
                place(v.type, out.x, out.y, out.z, yaw, v.col);
            }
            for (const w of this.people) {
                const s = w.s0 + w.k * c;
                if (s < visible0 || s > Math.min(visible1, c + 200)) { continue; }
                R.at(s, w.t, w.y, out);
                place(w.type, out.x, out.y, out.z, -(out.th) + w.yaw, null);
            }
            for (const w of this.walkers) {
                const dc = c - w.stop;
                const t = w.t0 + w.dir * dc * w.k;
                if (Math.abs(t) > 16 || w.s < visible0 || w.s > c + 200) { continue; }
                R.at(w.s, t, .02, out);
                place(w.type, out.x, out.y, out.z, -(out.th) + (w.dir > 0 ? -Math.PI / 2 : Math.PI / 2), null);
            }
            for (const name in this.types) {
                const T = this.types[name];
                for (const part of T.parts) {
                    part.count = T.used;
                    part.instanceMatrix.needsUpdate = true;
                    if (part.instanceColor) { part.instanceColor.needsUpdate = true; }
                }
            }
            this.updateSignals(c, info);
            // Unused glows shrink away
            for (let i = this.glowN; i < this.glowCap; i++) {
                for (let cc = 0; cc < 4; cc++) { this.gd[(i * 4 + cc) * 4 + 3] = 0; }
            }
            const g = this.lightGlow.geometry;
            g.attributes.position.needsUpdate = true;
            g.attributes.aData.needsUpdate = true;
        }
        vehicleGlow(v, o, on) {
            const th = o.th, fx = Math.sin(th), fz = -Math.cos(th), rx = Math.cos(th), rz = Math.sin(th);
            const len = v.type === 'bus' ? 5.4 : v.type === 'truck' ? 3.9 : v.type === 'scooter' ? .7 : v.type === 'auto' ? 1.3 : 2;
            const wid = v.type === 'bus' || v.type === 'truck' ? .95 : v.type === 'scooter' || v.type === 'auto' ? 0 : .58;
            const h = v.type === 'bus' || v.type === 'truck' ? 1 : .68;
            if (v.dir > 0) {
                // Moving away from the viewer: tail lights
                const rl = v.type === 'bus' ? 5.4 : v.type === 'truck' ? 4.3 : len;
                const x = o.x - fx * rl, z = o.z - fz * rl;
                if (wid) { this.glowPut(x + rx * wid, o.y + h, z + rz * wid, 1.5 * on, .08 * on, .05 * on, .55); this.glowPut(x - rx * wid, o.y + h, z - rz * wid, 1.5 * on, .08 * on, .05 * on, .55); } else { this.glowPut(x, o.y + h, z, 1.5 * on, .08 * on, .05 * on, .45); }
            } else {
                // Coming towards the viewer: headlights
                const x = o.x - fx * len, z = o.z - fz * len;
                if (wid) { this.glowPut(x + rx * wid, o.y + h, z + rz * wid, 1.1 * on, 1 * on, .82 * on, .62); this.glowPut(x - rx * wid, o.y + h, z - rz * wid, 1.1 * on, 1 * on, .82 * on, .62); } else { this.glowPut(x, o.y + h, z, 1.1 * on, 1 * on, .82 * on, .55); }
            }
        }
        // Each signal shows red while the camera waits at its board, then amber, then green as it drives on. The last one stays red unless a turn is chosen.
        updateSignals(c, info) {
            for (const j of R.JUNCTIONS) {
                if (!j.urban || !j.matR) { continue; }
                const stop = j.s - R.JUNCTION_AFTER - 13;
                let state = 'red';
                if (info && info.turnJunction === j.i) { state = 'green'; } else if (j.big) { state = 'red'; } else if (c > stop + 5) { state = 'green'; } else if (c > stop + 2) { state = 'amber'; }
                j.signal = state;
                if (j.count) {
                    // Seconds shown fall as the camera nears the moment the signal changes, and stay put while it waits
                    const left = state === 'red' ? Math.max(3, Math.round(12 + (stop - c) * .2)) : state === 'amber' ? 3 : Math.max(5, Math.round(30 - (c - stop) * .3));
                    const key = state + left;
                    if (key !== j.count.last) {
                        j.count.last = key;
                        const g2 = j.count.cv.getContext('2d');
                        g2.fillStyle = '#0a0b0c'; g2.fillRect(0, 0, 64, 40);
                        g2.fillStyle = state === 'red' ? '#ff3b2f' : state === 'amber' ? '#ffb300' : '#22e08a';
                        g2.font = 'bold 34px Consolas, monospace'; g2.textAlign = 'center'; g2.textBaseline = 'middle';
                        g2.fillText(String(left), 32, 22);
                        j.count.tex.needsUpdate = true;
                    }
                }
                j.matR.uniforms.uLampOn.value = state === 'red' ? 1 : .03;
                j.matA.uniforms.uLampOn.value = state === 'amber' ? 1 : .03;
                j.matG.uniforms.uLampOn.value = state === 'green' ? 1 : .03;
            }
        }
    }

    D.Traffic = Traffic;
})();
