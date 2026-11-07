/*
 * The route of the Home page drive: where the road runs, where each board and junction stands,
 * how the road changes from rural highway to city street, and how the day passes along the way.
 * This file needs no 3D library, so the boards can be placed and scrolled before the 3D world has loaded.
 *
 * Road coordinates: s = metres along the road, t = metres to the right of the centre line.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function smooth(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
    function smoother(t) { t = clamp(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); }
    function mix(a, b, t) { return a + (b - a) * t; }

    /* ---------- The boards and the junctions just beyond them ---------- */
    // Where each overhead board stands. Its junction is a little further on.
    const BOARD_S = [34, 176, 306, 436, 640, 772, 902, 1032, 1162, 1292];
    const JUNCTION_AFTER = 34;
    // Which side roads each junction has. These must match the arrows on the boards in index.html.
    const ARMS = [
        { left: true, right: true },
        { left: false, right: true },
        { left: true, right: false },
        { left: true, right: true },
        { left: false, right: true },
        { left: true, right: true },
        { left: true, right: true },
        { left: false, right: true },
        { left: false, right: true },
        { left: true, right: true }
    ];
    const END_S = BOARD_S[BOARD_S.length - 1] + 560;
    const START_S = -220;

    /* ---------- How developed the land is: 0 open country, 1 city ---------- */
    function dev(s) {
        return .34 * smooth(250, 436, s) + .66 * smooth(452, 626, s);
    }
    // Half the carriageway width: two lanes in the country, four in the city, with a long taper between them
    function halfWidth(s) { return 3.5 + 3.5 * smoother((s - 492) / 128); }
    // 0 where the road has open shoulders, 1 where it has kerbs and footpaths
    function kerbed(s) { return smooth(600, 618, s); }

    /* ---------- The line of the road: gentle bends and gentle rises, always straight and level at a board ---------- */
    const BENDS = [], RISES = [];
    (function () {
        const turns = [.052, -.068, .05, -.058, .034, -.04, .032, -.03, .022];
        const levels = [0, .7, 1.5, .9, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < BOARD_S.length - 1; i++) {
            const a = BOARD_S[i] + JUNCTION_AFTER + 26, b = BOARD_S[i + 1] - 30;
            BENDS.push({ c: (a + b) / 2, d: turns[i], l: b - a });
            RISES.push({ a: a, b: b, from: levels[i], to: levels[i + 1] });
        }
    })();
    const DS = 1, N = Math.ceil((END_S - START_S) / DS) + 2;
    const TX = new Float64Array(N), TZ = new Float64Array(N), TH = new Float32Array(N), TE = new Float32Array(N);
    function headingAt(s) {
        let th = 0;
        for (const b of BENDS) { th += b.d * smoother((s - b.c) / b.l + .5); }
        return th;
    }
    function levelAt(s) {
        let e = 0;
        for (const r of RISES) { if (s >= r.a) { e = mix(r.from, r.to, smoother((s - r.a) / (r.b - r.a))); } }
        return e;
    }
    (function build() {
        let x = 0, z = 0;
        // Start the table so that s = 0 is at the world's origin
        const startTh = headingAt(START_S);
        x = -Math.sin(startTh) * START_S; z = Math.cos(startTh) * START_S;
        for (let i = 0; i < N; i++) {
            const s = START_S + i * DS, th = headingAt(s);
            TH[i] = th; TE[i] = levelAt(s); TX[i] = x; TZ[i] = z;
            x += Math.sin(th) * DS; z -= Math.cos(th) * DS;
        }
    })();
    function index(s) { return clamp((s - START_S) / DS, 0, N - 1.001); }
    function heading(s) { const f = index(s), i = f | 0; return TH[i] + (TH[i + 1] - TH[i]) * (f - i); }
    function elev(s) { const f = index(s), i = f | 0; return TE[i] + (TE[i + 1] - TE[i]) * (f - i); }
    // A place on the road as world coordinates. World: x right, y up, -z ahead at the start.
    function at(s, t, y, out) {
        const f = index(s), i = f | 0, a = f - i;
        const th = TH[i] + (TH[i + 1] - TH[i]) * a;
        const px = TX[i] + (TX[i + 1] - TX[i]) * a, pz = TZ[i] + (TZ[i + 1] - TZ[i]) * a;
        const o = out || {};
        o.x = px + Math.cos(th) * t;
        o.y = (TE[i] + (TE[i + 1] - TE[i]) * a) + (y || 0);
        o.z = pz + Math.sin(th) * t;
        o.th = th;
        return o;
    }

    /* ---------- Junctions ---------- */
    const JUNCTIONS = BOARD_S.map(function (z, i) {
        const s = z + JUNCTION_AFTER, urban = dev(s) > .75, big = i === BOARD_S.length - 1;
        return {
            i: i, s: s, left: ARMS[i].left, right: ARMS[i].right, urban: urban, big: big,
            hw: big ? 7 : urban ? 5.5 : 3,          // half width of the side road
            r: urban ? 8 : 10,                      // radius of the corner kerbs
            length: 560,                            // how far the side road runs
            median: big
        };
    });
    // Is this spot on (or close to) a side road?
    function nearBranch(s, t, margin) {
        for (const j of JUNCTIONS) {
            const ds = Math.abs(s - j.s);
            if (ds > j.hw + margin) { continue; }
            if ((t > 0 && j.right) || (t < 0 && j.left)) { return j; }
        }
        return null;
    }

    /* ---------- The ground ---------- */
    function hash2(x, y) {
        const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return h - Math.floor(h);
    }
    function vnoise(x, y) {
        const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
        const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
        const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
        return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }
    function fbm(x, y) {
        return vnoise(x, y) * .55 + vnoise(x * 2.1 + 7, y * 2.1 + 3) * .3 + vnoise(x * 4.3 + 11, y * 4.3 + 5) * .15;
    }
    const EMBANK = 1.25;   // how far the fields lie below a rural highway
    function groundAt(s, t) {
        const d = dev(s), at_ = Math.abs(t), w = halfWidth(s) + 3.2;
        const out_ = at_ - w;
        const open = 1 - d * .94;
        let h = -.12 - EMBANK * open * smooth(0, 4.2, out_);
        // A shallow drain at the toe of the bank
        h -= .32 * open * smooth(3.2, 5, out_) * (1 - smooth(5.5, 8, out_));
        // Gentle unevenness of open land, growing into low rolling ground far from the road
        const far = smooth(8, 70, out_);
        h += open * far * (fbm(s * .03 + 40, t * .03 + 9) - .48) * 1.1;
        h += open * smooth(70, 420, out_) * (fbm(s * .004 + 3, t * .004 + 17) - .45) * 16;
        // Level the ground beside side roads
        for (const j of JUNCTIONS) {
            if (!((t > 0 && j.right) || (t < 0 && j.left))) { continue; }
            const db = Math.abs(s - j.s) - (j.hw + (j.urban ? 4.5 : 1.8));
            if (db < 6) {
                const fl = 1 - smooth(0, 6, db);
                h = mix(h, -.12, fl);
            }
        }
        return levelAt(s) + h;
    }

    /* ---------- The day passing along the road ---------- */
    // Sun height and direction (degrees from straight ahead; negative is to the left), read by distance along the road
    const SUN_KEYS = [
        [-300, 63, -78], [120, 60, -74], [306, 50, -64], [436, 30, -48], [530, 15, -36], [640, 8, -28],
        [772, 2.5, -22], [902, -3.5, -16], [1032, -8.5, -12], [1162, -15, -8], [1292, -22, -6], [2000, -26, -4]
    ];
    function sunAt(s) {
        const K = SUN_KEYS;
        if (s <= K[0][0]) { return { elev: K[0][1], az: K[0][2] }; }
        for (let i = 1; i < K.length; i++) {
            if (s <= K[i][0]) {
                const t = (s - K[i - 1][0]) / (K[i][0] - K[i - 1][0]);
                return { elev: mix(K[i - 1][1], K[i][1], t), az: mix(K[i - 1][2], K[i][2], t) };
            }
        }
        return { elev: K[K.length - 1][1], az: K[K.length - 1][2] };
    }

    /* ---------- The size of the view and the boards in it ---------- */
    const BOARD_W = 16, CLEARANCE = 5.5, CAM_H = 2.5;
    // The view is a camera with its lens shifted: verticals stay upright, and the horizon moves up and down the screen
    function viewFor(W, H) {
        const F = Math.min(H * .98, W * 1.08);
        const stopY = H * (W < 720 ? .75 : .74);
        const driveY = H * (W < 720 ? .66 : .6);
        return { W: W, H: H, F: F, CX: W / 2, stopY: stopY, driveY: driveY, top: 70 };
    }
    // How far back the camera stops so that a board of this shape fills the space above the horizon
    function fitBoard(view, ratio) {
        const fit = (view.stopY - view.top) / (1 / ratio + (CLEARANCE - CAM_H) / BOARD_W);
        const shown = Math.min(fit, view.W - (view.W < 720 ? 20 : 90), 1040, view.W < 1100 ? 9999 : view.W * .74);
        return { rest: view.F * BOARD_W / shown, boardH: BOARD_W / ratio, shown: shown };
    }

    D.Route = {
        BOARD_S, JUNCTION_AFTER, JUNCTIONS, START_S, END_S, BOARD_W, CLEARANCE, CAM_H,
        clamp, smooth, smoother, mix, dev, halfWidth, kerbed, heading, elev, at, nearBranch, groundAt, sunAt, vnoise, fbm, hash2,
        viewFor, fitBoard
    };
})();
