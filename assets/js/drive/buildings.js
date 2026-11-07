/*
 * Buildings of an Indian road, made in code from real architectural parts: reinforced-concrete frames, plastered walls,
 * recessed windows with sills, sunshades and grilles, balconies with railings, parapets, stair rooms and roof water tanks,
 * shop fronts with shutters and signs, tiled roofs with verandahs, and glass-fronted commercial blocks.
 *
 * A building is made in its own frame: x along the frontage, y up, z going back from the road, with the front wall at z = 0.
 * `detail` 1 builds every part; 0 builds a much lighter version with the same shape, for buildings seen from far away.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const rgb = D.rgb, shade = D.shade, mixc = D.mixc;

    // Wall paint colours seen on Indian buildings, faded by the sun
    const WALLS = ['#d9c8a6', '#e3d7c0', '#cdbf9f', '#e4c9a0', '#d4a97c', '#c9d0c4', '#dbd2c2', '#e8e0cf', '#c79a78', '#b9c4c9', '#e2cfae', '#d8b98f', '#cfc7b8', '#bfae94'];
    const ACCENTS = ['#7d4f3a', '#8f6a4a', '#55636b', '#9b4d3a', '#6d6a62', '#a07a4c', '#4f6f6a', '#8c8074'];
    const FRAMES = ['#e8e4da', '#2f3336', '#5a5f62', '#8a7a64'];
    const COL_SHUTTER = ['#7d8a93', '#5f7f8c', '#8a8f8c', '#6c8a6f', '#a0a6a3', '#7a6f96', '#b0a890'];
    const WOODS = ['#5c3d27', '#6b4a30', '#4a3323', '#7a5a3a'];

    /* ---------- Parts of a wall. A wall is drawn in a frame: x along it, y up, z pointing out of the wall. ---------- */
    function wallPanel(k, mat, x0, y0, x1, y1, col, opt) {
        if (x1 - x0 < .001 || y1 - y0 < .001) { return; }
        const tex = (opt && opt.tex) || 2.4, z = (opt && opt.z) || 0, u0 = k.uoff, v0 = k.voff;
        const lowK = opt && opt.low;
        const c = lowK ? [shade(col, lowK), shade(col, lowK), col, col] : col;
        k.quad(mat, [x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], c, [u0 + x0 / tex, v0 + y0 / tex, u0 + x1 / tex, v0 + y0 / tex, u0 + x1 / tex, v0 + y1 / tex, u0 + x0 / tex, v0 + y1 / tex], [0, 0, 1]);
    }
    // A pane with a room behind it. Which room, and when its lights come on, is chosen per window.
    function roomUV(r) {
        const i = Math.floor(r() * 16), C = .25;
        const u = (i % 4) * C, v = 1 - (Math.floor(i / 4) + 1) * C;
        return [u + .005, v + .005, u + C - .005, v + .005, u + C - .005, v + C - .005, u + .005, v + C - .005];
    }
    function pane(k, r, x0, y0, x1, y1, z, mat) {
        const lightAt = r() < .22 ? 2 : r.range(.28, .92);
        // A tiny tilt per pane breaks up the reflection of the sky, as real glass does
        k.pane(mat || 'glass', x0, y0, x1, y1, z, [1, 1, 1], roomUV(r), lightAt, r() < .3 ? 1 : 0, r.range(-.035, .035), r.range(-.02, .02));
    }
    /*
     * A window set into a wall: the opening's sides, the frame and glazing bars, a concrete sill, a sunshade (chajja) above it, and sometimes a steel grille.
     * The hole itself is left by the wall code, which draws panels around it.
     */
    function windowUnit(k, r, x0, y0, x1, y1, s) {
        const depth = s.depth, w = x1 - x0, h = y1 - y0;
        const rev = s.reveal;
        // Inside faces of the opening
        k.quad('plaster', [x0, y0, -depth], [x0, y0, 0], [x0, y1, 0], [x0, y1, -depth], shade(rev, .78), null, [1, 0, 0]);
        k.quad('plaster', [x1, y0, 0], [x1, y0, -depth], [x1, y1, -depth], [x1, y1, 0], shade(rev, .72), null, [-1, 0, 0]);
        k.quad('plaster', [x0, y1, 0], [x1, y1, 0], [x1, y1, -depth], [x0, y1, -depth], shade(rev, .5), null, [0, -1, 0]);
        k.quad('plaster', [x0, y0, -depth], [x1, y0, -depth], [x1, y0, 0], [x0, y0, 0], shade(rev, .92), null, [0, 1, 0]);
        // Frame and panes
        const fw = .05, fz = -depth + .03, fc = s.frame;
        const zp = -depth + .005;
        const parts = w > 1.5 ? 3 : 2;
        for (let i = 0; i < parts; i++) {
            const a = x0 + (w * i) / parts, b = x0 + (w * (i + 1)) / parts;
            pane(k, r, a, y0, b, y1, zp);
        }
        k.box('plain', x0, y0, zp, x1, y0 + fw, fz, fc, { skip: 'bkrl' });
        k.box('plain', x0, y1 - fw, zp, x1, y1, fz, fc, { skip: 'tkrl' });
        for (let i = 0; i <= parts; i++) {
            const m = x0 + (w * i) / parts;
            k.box('plain', m - fw / 2, y0, zp, m + fw / 2, y1, fz, fc, { skip: 'tbk' });
        }
        if (h > 1.1) {
            const my = y0 + h * .68;
            k.box('plain', x0, my - .02, zp, x1, my + .02, fz, fc, { skip: 'krl' });
        }
        // Safety grille of steel bars, on many Indian windows
        if (s.grille) {
            const bars = Math.max(3, Math.round(w / .16));
            const gz = -.02, gc = s.grilleCol;
            for (let i = 1; i < bars; i++) {
                const x = x0 + (w * i) / bars;
                k.box('plain', x - .009, y0, gz - .02, x + .009, y1, gz, gc, { skip: 'tbk' });
            }
            for (const q of [.34, .68]) { const y = y0 + h * q; k.box('plain', x0, y - .012, gz - .02, x1, y + .012, gz + .004, gc, { skip: 'k' }); }
        }
        // Sill and sunshade
        k.box('concrete', x0 - .06, y0 - .07, 0, x1 + .06, y0, .07, s.sill, { skip: 'k', tex: 2 });
        if (s.chajja) {
            const cw = s.chajja;
            k.box('concrete', x0 - .16, y1 + .1, 0, x1 + .16, y1 + .17, cw, s.band, { skip: 'k', tex: 2, under: shade(s.band, .42) });
        }
    }
    // A blank window for far-away buildings: flat pane with a dark line above it
    function windowFlat(k, r, x0, y0, x1, y1, s) {
        pane(k, r, x0, y0, x1, y1, .02);
        // A far-away sunshade needs only its front edge and its shaded underside
        if (s.chajja) {
            const c = s.chajja, a = x0 - .14, b = x1 + .14, y = y1 + .08;
            k.quad('concrete', [a, y, c], [b, y, c], [b, y + .07, c], [a, y + .07, c], s.band, null, [0, 0, 1]);
            k.quad('concrete', [a, y, 0], [b, y, 0], [b, y, c], [a, y, c], shade(s.band, .42), null, [0, -1, 0]);
        }
    }

    /*
     * One whole face of a floor: bands of wall above and below the windows, and piers between them.
     * openings is a sorted list of [x0, x1] with the same sill and head heights.
     */
    function floorWall(k, mat, W, y0, y1, sill, head, openings, col, lowK) {
        wallPanel(k, mat, 0, y0, W, y0 + sill, col, lowK ? { low: lowK } : null);
        wallPanel(k, mat, 0, y0 + head, W, y1, col);
        let x = 0;
        for (const o of openings) {
            wallPanel(k, mat, x, y0 + sill, o[0], y0 + head, col);
            x = o[1];
        }
        wallPanel(k, mat, x, y0 + sill, W, y0 + head, col);
    }

    /* A balcony: a slab on brackets, a parapet or railing, and a door behind it */
    function balcony(k, r, x0, x1, y, depth, s) {
        const w = x1 - x0;
        k.box('concrete', x0 - .05, y - .15, 0, x1 + .05, y, depth, s.band, { skip: 'k', tex: 2, under: shade(s.band, .4) });
        const h = 1.02;
        if (s.solidRail) {
            k.box(s.wallMat, x0, y, depth - .1, x1, y + h, depth, s.wall, { skip: 'b', tex: 2.4 });
            k.box(s.wallMat, x0, y, 0, x0 + .1, y + h, depth - .1, s.wall, { skip: 'bk', tex: 2.4 });
            k.box(s.wallMat, x1 - .1, y, 0, x1, y + h, depth - .1, s.wall, { skip: 'bk', tex: 2.4 });
        } else {
            const c = s.grilleCol;
            k.box('plain', x0, y + h - .05, depth - .05, x1, y + h, depth, c, { skip: 'k' });
            k.box('plain', x0, y + .05, depth - .03, x1, y + .1, depth, c, { skip: 'k' });
            const bars = Math.round(w / .14);
            for (let i = 0; i <= bars; i++) {
                const x = x0 + (w * i) / bars;
                k.box('plain', x - .012, y + .05, depth - .03, x + .012, y + h, depth - .01, c, { skip: 'tbk' });
            }
            k.box('plain', x0, y + h - .05, 0, x0 + .05, y + h, depth, c, { skip: 'k' });
            k.box('plain', x1 - .05, y + h - .05, 0, x1, y + h, depth, c, { skip: 'k' });
        }
        // Life on the balcony: a water pot or plants on some, clothes on a line on others
        if (r() < .3) {
            const c = r.pick([rgb('#a8552e'), rgb('#7c6a4c')]);
            k.tube('plain', x0 + w * r.range(.15, .85), y, depth - .22, x0 + w * r.range(.15, .85), y + .28, depth - .22, .11, .14, 6, c);
        }
        if (r() < .32) {
            const cy = y + 1.72, cl = rgb('#3a3a3a');
            k.box('plain', x0 + .1, cy, depth * .5, x1 - .1, cy + .012, depth * .5 + .012, cl);
            const n = r.int(2, 4);
            for (let i = 0; i < n; i++) {
                const cx = x0 + .2 + (w - .5) * r();
                k.box('plain', cx, cy - r.range(.45, .85), depth * .5, cx + r.range(.3, .55), cy, depth * .5 + .012, rgb(r.pick(['#d9534a', '#3b6ea8', '#f0e6d2', '#e0a53a', '#7a4f9a', '#3f8f6a'])), { skip: 'tb' });
            }
        }
    }

    /* An outdoor air-conditioning unit hung on a wall */
    function acUnit(k, x, y) {
        k.box('plain', x, y, 0, x + .8, y + .55, .3, rgb('#d8d8d0'), { skip: 'k' });
        k.box('plain', x + .06, y + .06, .3, x + .5, y + .49, .31, rgb('#55595c'), { skip: 'k' });
    }
    /* Drain pipes run down the outside walls of nearly every building here */
    function pipe(k, x, y0, y1) {
        k.tube('plain', x, y0, .07, x, y1, .07, .045, .045, 5, rgb('#6e6e68'));
    }

    /* A black plastic water tank on legs, on almost every Indian roof */
    function waterTank(k, x, y, z, r, h, col, detail) {
        k.box('concrete', x - r * .9, y, z - r * .9, x + r * .9, y + .3, z + r * .9, rgb('#8a857a'), { tex: 2, skip: 'b' });
        k.tube('plain', x, y + .3, z, x, y + .3 + h, z, r, r * .96, detail ? 12 : 6, col, { capB: shade(col, 1.25) });
        if (!detail) { return; }
        // Ribs on the moulded tank
        const n = 3;
        for (let i = 1; i <= n; i++) { const q = y + .3 + h * i / (n + 1); k.tube('plain', x, q, z, x, q + .05, z, r + .018, r + .018, 12, shade(col, .8)); }
        k.tube('plain', x, y + .3 + h, z, x, y + .36 + h, z, r * .28, r * .28, 8, shade(col, 1.1), { capB: shade(col, 1.2) });
    }

    /* The roof: parapet, stair room, tanks, dish and other things seen on Indian roofs */
    function roofDeck(k, r, W, Dp, y, s, detail) {
        const pH = s.parapet, t = .14, wc = s.wall, m = s.wallMat;
        k.quad('concrete', [0, y, Dp], [W, y, Dp], [W, y, 0], [0, y, 0], rgb('#8e8a80'), [0, 0, W / 3, 0, W / 3, Dp / 3, 0, Dp / 3], [0, 1, 0]);
        k.box(m, 0, y, 0, W, y + pH, t, wc, { skip: 'b', tex: 2.4, top: shade(wc, .92) });
        k.box(m, 0, y, Dp - t, W, y + pH, Dp, wc, { skip: 'b', tex: 2.4, top: shade(wc, .92) });
        k.box(m, 0, y, t, t, y + pH, Dp - t, wc, { skip: 'bfk', tex: 2.4, top: shade(wc, .92) });
        k.box(m, W - t, y, t, W, y + pH, Dp - t, wc, { skip: 'bfk', tex: 2.4, top: shade(wc, .92) });
        if (s.coping) { k.box('concrete', -.06, y + pH, -.06, W + .06, y + pH + .07, .22, s.band, { skip: 'b', tex: 2 }); }
        // Stair room
        const sw = 3 + r() * 1.2, sd = 3.2;
        const sx = W * r.range(.12, .62), sz = Dp * r.range(.3, .55);
        const sh = 2.6;
        k.box(m, sx, y, sz, sx + sw, y + sh, sz + sd, wc, { skip: 'b', tex: 2.4, top: rgb('#7e7a70') });
        k.box('concrete', sx - .25, y + sh, sz - .25, sx + sw + .25, y + sh + .1, sz + sd + .25, s.band, { skip: '', tex: 2 });
        if (detail) { k.box('wood', sx + sw * .3, y, sz - .03, sx + sw * .3 + .95, y + 2.1, sz, rgb(r.pick(WOODS)), { skip: 'fb' }); }
        // Water tanks on top of the stair room and on the roof
        const tankC = rgb(r.chance(.85) ? '#17191b' : '#3a6a8c');
        waterTank(k, sx + sw * .5, y + sh + .1, sz + sd * .5, .62, 1.12, tankC, detail);
        if (r() < .5) { waterTank(k, W * r.range(.7, .9), y, Dp * r.range(.25, .75), .55, .95, rgb('#17191b'), detail); }
        if (detail) {
            if (r() < .55) {
                const dx = W * r.range(.1, .9), dz = Dp * r.range(.1, .4), dy = y + pH;
                k.tube('steel', dx, dy - pH, dz, dx, dy + .5, dz, .025, .025, 4, rgb('#9a9a92'));
                k.tube('plain', dx, dy + .5, dz, dx + .1, dy + .75, dz - .22, .02, .36, 10, rgb('#d8d8d2'));
            }
            if (r() < .28) {
                // A solar water heater
                const hx = W * r.range(.55, .8), hz = Dp * r.range(.55, .8);
                k.quad('gloss', [hx, y + .5, hz], [hx + 1.9, y + .5, hz], [hx + 1.9, y + 1.5, hz + 1], [hx, y + 1.5, hz + 1], rgb('#1d2a3a'));
                k.tube('plain', hx + .95, y + 1.65, hz + 1.1, hx + .95, y + 1.65, hz + 1.1, .2, .2, 4, rgb('#e0e0d8'));
                k.tube('steel', hx, y + 1.75, hz + 1.2, hx + 1.9, y + 1.75, hz + 1.2, .22, .22, 8, rgb('#c5c5bd'), { capB: rgb('#c5c5bd') });
            }
        }
    }

    /* Style of a building's face, chosen once per building */
    function styleFor(r, opts) {
        const wall = rgb(r.pick(WALLS)), band = mixc(wall, rgb(r.pick(ACCENTS)), r.range(.12, .75));
        const grilleCol = rgb(r.pick(['#2c2e30', '#3a3f42', '#47403a', '#e0dfd8']));
        return Object.assign({
            wall: wall, band: band, wallMat: r.chance(.8) ? 'plaster' : 'rough', frame: rgb(r.pick(FRAMES)), reveal: mixc(wall, rgb('#ffffff'), .25),
            sill: mixc(band, rgb('#b5b0a5'), .5), grille: r.chance(.55), grilleCol: grilleCol, depth: .16, chajja: r.chance(.8) ? r.range(.32, .55) : 0, parapet: r.range(.75, 1.15), coping: r.chance(.7),
            solidRail: r.chance(.42)
        }, opts || {});
    }

    /* Works out window positions for a floor: bays across the width of the wall */
    function bayLayout(W, bay, winW) {
        const n = Math.max(1, Math.round(W / bay));
        const out = [];
        for (let i = 0; i < n; i++) {
            const c = (i + .5) * W / n;
            out.push([c - winW / 2, c + winW / 2]);
        }
        return out;
    }

    /*
     * A residential or office floor plate, on one wall. Returns nothing; adds wall panels, windows and balconies.
     * Some bays get a balcony stack, others windows.
     */
    function residentialFace(k, r, W, y0, floors, fh, s, detail, balconyEvery) {
        const bay = r.range(3.1, 3.9), openings = bayLayout(W, bay, 1.5);
        const n = openings.length;
        const balc = [];
        for (let i = 0; i < n; i++) { balc.push(balconyEvery > 0 && i % balconyEvery === (balconyEvery > 1 ? 1 : 0)); }
        // Vertical service pipe at one side of the building
        for (let f = 0; f < floors; f++) {
            const y = y0 + f * fh;
            const ops = openings.map((o, i) => (balc[i] ? [o[0] - .15, o[1] + .15] : o));
            if (detail) {
                const sillOf = (i) => (balc[i] ? .04 : .85);
                // Simple floors have one sill height, so draw each bay of the wall on its own when balconies are in the row
                let x = 0;
                wallPanel(k, s.wallMat, 0, y + 2.42, W, y + fh, s.wall);
                ops.forEach((o, i) => {
                    wallPanel(k, s.wallMat, x, y, o[0], y + 2.42, s.wall);
                    const sl = sillOf(i);
                    wallPanel(k, s.wallMat, o[0], y, o[1], y + sl, s.wall);
                    x = o[1];
                    if (balc[i]) {
                        windowUnit(k, r, o[0], y + .04, o[1], y + 2.42, Object.assign({}, s, { chajja: 0, grille: false, frame: s.frame }));
                        balcony(k, r, o[0] - .28, o[1] + .28, y + .02, r.range(.85, 1.1), s);
                    } else {
                        windowUnit(k, r, o[0], y + .85, o[1], y + 2.42, s);
                    }
                });
                wallPanel(k, s.wallMat, x, y, W, y + 2.42, s.wall);
                // A band at each floor line
                k.box('concrete', 0, y + fh - .07, 0, W, y + fh, .05, s.band, { skip: 'k', tex: 2 });
                if (r() < .18) { const o = r.pick(ops); acUnit(k, o[1] + .25, y + r.range(1.2, 1.9)); }
            } else {
                wallPanel(k, s.wallMat, 0, y, W, y + fh, s.wall);
                ops.forEach((o, i) => {
                    windowFlat(k, r, o[0], y + (balc[i] ? .15 : .85), o[1], y + 2.42, s);
                    if (balc[i]) { k.box('concrete', o[0] - .25, y - .1, 0, o[1] + .25, y + 1, .85, mixc(s.band, s.wall, .4), { skip: 'k', tex: 2 }); }
                });
            }
        }
        if (detail) { pipe(k, W * r.range(.03, .12), y0, y0 + floors * fh); if (r() < .5) { pipe(k, W * r.range(.9, .98), y0, y0 + floors * fh); } }
    }

    /* A row of shops at street level, each with a shutter or an open front, a sign and maybe an awning */
    let signIndex = 0;
    function signUV() {
        const i = (signIndex++) % 48, u = (i % 4) * .25, v = 1 - (Math.floor(i / 4) + 1) * .0625;
        return [u + .002, v + .002, u + .248, v + .002, u + .248, v + .0605, u + .002, v + .0605];
    }
    function shopRow(k, r, W, h, s, detail, glassy) {
        const n = Math.max(1, Math.round(W / r.range(3.2, 4.4)));
        const unit = W / n, plinth = .28;
        k.box('concrete', 0, 0, 0, W, plinth, .5, rgb('#7f7b72'), { skip: 'k', tex: 2, lo: .7 });
        wallPanel(k, s.wallMat, 0, h - .1, W, h + .15, s.band);
        for (let i = 0; i < n; i++) {
            const x0 = i * unit, x1 = x0 + unit, pier = .24;
            const a = x0 + pier, b = x1 - pier, top = h - 1.0, sillY = plinth;
            // Piers either side of the shop
            wallPanel(k, s.wallMat, x0, sillY, a, h, s.band, { low: .7 });
            wallPanel(k, s.wallMat, b, sillY, x1, h, s.band, { low: .7 });
            wallPanel(k, s.wallMat, a, top, b, h, shade(s.band, .9));
            const kind = r();
            if (detail) {
                const dpt = .22;
                k.quad('plaster', [a, sillY, -dpt], [a, sillY, 0], [a, top, 0], [a, top, -dpt], shade(s.band, .7), null, [1, 0, 0]);
                k.quad('plaster', [b, sillY, 0], [b, sillY, -dpt], [b, top, -dpt], [b, top, 0], shade(s.band, .66), null, [-1, 0, 0]);
                k.quad('plaster', [a, top, 0], [b, top, 0], [b, top, -dpt], [a, top, -dpt], shade(s.band, .38), null, [0, -1, 0]);
                if (kind < .38 && !glassy) {
                    // Roller shutter pulled down
                    const c = rgb(r.pick(COL_SHUTTER));
                    k.quad('shutter', [a, sillY, -dpt + .02], [b, sillY, -dpt + .02], [b, top, -dpt + .02], [a, top, -dpt + .02], [shade(c, .75), shade(c, .75), c, c], [0, 0, (b - a) / 1.6, 0, (b - a) / 1.6, (top - sillY) / 1.6, 0, (top - sillY) / 1.6], [0, 0, 1]);
                    k.box('plain', a, top - .22, -dpt + .02, b, top, -dpt + .1, shade(c, .8), { skip: 'k' });
                } else {
                    // Open shop or glass show window, with goods inside
                    const i2 = r.int(0, 7), u = (i2 % 4) * .25, v = 1 - (Math.floor(i2 / 4) + 1) * .5;
                    k.pane('showcase', a, sillY, b, top, -dpt + .01, [1, 1, 1], [u + .004, v + .006, u + .246, v + .006, u + .246, v + .494, u + .004, v + .494], r.range(.12, .4), r() < .4 ? 1 : 0, 0, 0);
                    if (glassy || kind < .7) {
                        k.box('steel', (a + b) / 2 - .03, sillY, -dpt + .02, (a + b) / 2 + .03, top, -dpt + .06, rgb('#85878a'), { skip: 'k' });
                        k.box('steel', a, sillY, -dpt + .02, b, sillY + .1, -dpt + .06, rgb('#85878a'), { skip: 'kb' });
                    }
                    if (!glassy && r() < .5) {
                        // Goods out on the pavement
                        const gx = a + r.range(.1, .6), gw = r.range(.7, 1.2);
                        k.box('plain', gx, sillY, -.35, gx + gw, sillY + r.range(.5, .9), 0, rgb(r.pick(['#a8703a', '#c9b58a', '#4f7fa8', '#a8473c', '#5f8f55'])), { skip: 'k' });
                    }
                }
                // Sign board with its name, lit after dark
                k.box('plain', a - .02, top + .08, 0, b + .02, top + .86, .1, rgb('#2e3032'), { skip: 'kf' });
                k.quad('signs', [a, top + .1, .11], [b, top + .1, .11], [b, top + .84, .11], [a, top + .84, .11], [1, 1, 1], signUV(), [0, 0, 1]);
                // Sloping awning of tin or cloth on many shops
                if (r() < .52) {
                    const ac = rgb(r.pick(['#3f6f8f', '#8a3f35', '#d8a23a', '#4f7a55', '#8a8f92', '#b7b2a6']));
                    const ap = r.range(1.0, 1.5), ay = top + .04;
                    k.quad('iron', [a - .05, ay - .62, ap], [b + .05, ay - .62, ap], [b + .05, ay, 0], [a - .05, ay, 0], ac, [0, 0, (b - a) / 1.3, 0, (b - a) / 1.3, ap / 1.3, 0, ap / 1.3]);
                    k.quad('iron', [b + .05, ay - .62, ap], [a - .05, ay - .62, ap], [a - .05, ay, 0], [b + .05, ay, 0], shade(ac, .5), [0, 0, (b - a) / 1.3, 0, (b - a) / 1.3, ap / 1.3, 0, ap / 1.3]);
                    k.box('steel', a + .02, plinth, ap - .05, a + .07, ay - .62, ap, rgb('#6a6c6e'), { skip: 'tb' });
                    k.box('steel', b - .07, plinth, ap - .05, b - .02, ay - .62, ap, rgb('#6a6c6e'), { skip: 'tb' });
                }
            } else {
                k.pane('showcase', a, sillY, b, top, .02, [1, 1, 1], [.004, .506, .246, .506, .246, .994, .004, .994], r.range(.12, .4), 0, 0, 0);
                k.quad('signs', [a, top + .1, .03], [b, top + .1, .03], [b, top + .84, .03], [a, top + .84, .03], [1, 1, 1], signUV(), [0, 0, 1]);
            }
        }
    }

    function sideWalls(k, r, W, Dp, y0, floors, fh, s, detail, sideLeftVisible, sideRightVisible) {
        const faces = [];
        if (sideRightVisible) { faces.push({ o: [W, 0, Dp], x: [0, 0, -1], len: Dp }); }
        if (sideLeftVisible) { faces.push({ o: [0, 0, 0], x: [0, 0, 1], len: Dp }); }
        for (const f of faces) {
            k.push();
            const up = [0, 1, 0], z = [f.x[1] * up[2] - f.x[2] * up[1], f.x[2] * up[0] - f.x[0] * up[2], f.x[0] * up[1] - f.x[1] * up[0]];
            k.into(f.o[0], f.o[1], f.o[2], f.x[0], f.x[1], f.x[2], 0, 1, 0, z[0], z[1], z[2]);
            if (detail) {
                residentialFace(k, r, f.len, y0, floors, fh, Object.assign({}, s, { grille: false }), detail, 0);
            } else {
                wallPanel(k, s.wallMat, 0, y0, f.len, y0 + floors * fh, s.wall);
                for (let i = 0; i < floors; i++) { for (const o of bayLayout(f.len, 4.4, 1.2)) { windowFlat(k, r, o[0], y0 + i * fh + .85, o[1], y0 + i * fh + 2.4, Object.assign({}, s, { chajja: 0 })); } }
            }
            k.pop();
        }
    }

    /*
     * ---------- Whole buildings ----------
     * The back and any side hidden by a neighbour are plain walls.
     */
    function frontFrame(k, W) {
        k.push();
        k.into(W, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1);
    }

    function apartments(k, r, W, Dp, floors, shops, detail, opt) {
        const s = styleFor(r, { solidRail: r.chance(.5) });
        k.uoff = r() * 4; k.voff = r() * 4;
        const fh = 3.05, g = shops ? 3.6 : 0;
        // Ground level
        if (shops) { frontFrame(k, W); shopRow(k, r, W, g, s, detail); k.pop(); } else {
            // Stilt parking under the flats: columns with cars in shade behind
            frontFrame(k, W);
            k.box('concrete', 0, 0, 0, W, .22, .4, rgb('#77736a'), { skip: 'k', tex: 2, lo: .7 });
            k.pop();
        }
        frontFrame(k, W);
        residentialFace(k, r, W, g, floors, fh, s, detail, r.pick([2, 3, 1]));
        k.pop();
        sideWalls(k, r, W, Dp, g, floors, fh, s, detail, opt.sideL, opt.sideR);
        // The block's mass behind and to the sides, and any ground level walls
        const H = g + floors * fh;
        if (!opt.sideL) { k.box(s.wallMat, -.001, 0, 0, 0, H, Dp, shade(s.wall, .88), { skip: 'tbfkr', tex: 2.4 }); }
        if (!opt.sideR) { k.box(s.wallMat, W, 0, 0, W + .001, H, Dp, shade(s.wall, .88), { skip: 'tbfkl', tex: 2.4 }); }
        if (shops || !opt.noGround) {
            if (opt.sideL) { k.box(s.wallMat, 0, 0, 0, .001, g, Dp, s.band, { skip: 'tbfkr', tex: 2.4 }); }
            if (opt.sideR) { k.box(s.wallMat, W - .001, 0, 0, W, g, Dp, s.band, { skip: 'tbfkl', tex: 2.4 }); }
        }
        k.box(s.wallMat, 0, 0, Dp - .01, W, H, Dp, shade(s.wall, .82), { skip: 'tbkrl', tex: 2.4 });
        roofDeck(k, r, W, Dp, H, s, detail);
        return H;
    }

    /* A commercial block with bands of reflective glass, cladding panels and a lit name band */
    function commercial(k, r, W, Dp, floors, detail, opt) {
        const clad = rgb(r.pick(['#d9d7cf', '#b8bcc0', '#c9b8a0', '#a7adb2', '#e2ded4', '#9a9fa4']));
        const accent = rgb(r.pick(['#a33a2e', '#2d5f9a', '#3c8a78', '#d9962b', '#505a64']));
        const s = styleFor(r, { wall: clad, band: shade(clad, .78), wallMat: 'plaster', coping: true, parapet: 1.0 });
        k.uoff = r() * 4; k.voff = r() * 4;
        const fh = 3.5, g = 4.3;
        frontFrame(k, W);
        shopRow(k, r, W, g, s, detail, true);
        const glassX0 = W * r.range(.06, .14), glassX1 = W * r.range(.86, .94);
        // Solid side panels and a large glass face between them
        for (let f = 0; f < floors; f++) {
            const y = g + f * fh;
            wallPanel(k, 'plaster', 0, y, glassX0, y + fh, clad);
            wallPanel(k, 'plaster', glassX1, y, W, y + fh, clad);
            k.pane('curtain', glassX0, y + .48, glassX1, y + fh, .0, [1, 1, 1], [0, 0, 1, 0, 1, 1, 0, 1], r.range(.2, 1.15), r() < .55 ? 1 : 0, r.range(-.01, .01), 0);
            k.box('plain', glassX0, y, 0, glassX1, y + .5, .1, shade(clad, .94), { skip: 'k' });
            if (detail) {
                const mull = Math.round((glassX1 - glassX0) / 1.5);
                for (let i = 0; i <= mull; i++) {
                    const x = glassX0 + (glassX1 - glassX0) * i / mull;
                    k.box('steel', x - .022, y + .5, 0, x + .022, y + fh, .07, rgb('#3e4348'), { skip: 'kb' });
                }
            }
        }
        // A tall panel carrying the building's accent colour
        k.box('plain', W * .02, g, 0, glassX0 - .06, g + floors * fh + 1.2, .08, accent, { skip: 'kb' });
        k.pop();
        sideWalls(k, r, W, Dp, g, floors, fh, s, detail, opt.sideL, opt.sideR);
        const H = g + floors * fh;
        if (!opt.sideL) { k.box('plaster', -.001, 0, 0, 0, H, Dp, shade(clad, .88), { skip: 'tbfkr', tex: 2.4 }); }
        if (!opt.sideR) { k.box('plaster', W, 0, 0, W + .001, H, Dp, shade(clad, .88), { skip: 'tbfkl', tex: 2.4 }); }
        if (opt.sideL) { k.box('plaster', 0, 0, 0, .001, g, Dp, s.band, { skip: 'tbfkr', tex: 2.4 }); }
        if (opt.sideR) { k.box('plaster', W - .001, 0, 0, W, g, Dp, s.band, { skip: 'tbfkl', tex: 2.4 }); }
        k.box('plaster', 0, 0, Dp - .01, W, H, Dp, shade(clad, .8), { skip: 'tbkrl', tex: 2.4 });
        roofDeck(k, r, W, Dp, H, s, detail);
        // A rooftop hoarding frame
        if (r() < .6 && detail) { hoarding(k, r, W * .15, H + 1, 1.2, W * .7, 3.2); }
        return H;
    }

    /* A big roadside advertising frame with road-safety messages, not any real company */
    let sloganIndex = 0;
    function hoarding(k, r, x, y, z, w, h) {
        const c = rgb('#3a3d40');
        k.box('steel', x + w * .2, y - 1, z, x + w * .2 + .1, y, z + .1, c, { skip: 'tb' });
        k.box('steel', x + w * .8, y - 1, z, x + w * .8 + .1, y, z + .1, c, { skip: 'tb' });
        const skins = ['#b01e28', '#0b4280', '#0a5a43', '#c98a10', '#17202a'];
        const col = rgb(skins[sloganIndex % skins.length]);
        k.box('plain', x, y, z - .08, x + w, y + h, z, col, {});
        const i = sloganIndex++ % 4, u = (i % 2) * .5, v = (1 - (Math.floor(i / 2) + 1) * .125);
        k.quad('signs', [x + w - .1, y + .1, z - .09], [x + .1, y + .1, z - .09], [x + .1, y + h - .1, z - .09], [x + w - .1, y + h - .1, z - .09], [1, 1, 1], [u + .002, v + .002, u + .498, v + .002, u + .498, v + .123, u + .002, v + .123], [0, 0, -1]);
    }

    /* A rural house with a clay-tiled pitched roof, a verandah on posts and a low compound wall */
    function tiledHouse(k, r, W, Dp, detail, opt) {
        const wall = rgb(r.pick(['#e5dcc6', '#d9cfae', '#c6d0c8', '#e3c79c', '#d7b08a', '#c9c2b0', '#e7e1d2']));
        const low = rgb(r.pick(['#7c5a44', '#6d6a5a', '#5b6f70', '#8f5a3c', '#a07a50']));
        const eave = 2.75, ridge = 4.75, ver = r.range(1.8, 2.4);
        const s = { wall, band: low, wallMat: r.chance(.5) ? 'rough' : 'plaster', frame: rgb(r.pick(WOODS)), reveal: wall, sill: wall, grille: r.chance(.5), grilleCol: rgb('#2c2e30'), depth: .22, chajja: 0 };
        k.uoff = r() * 4; k.voff = r() * 4;
        // Plinth, and a coloured band low on the walls, as on many village houses
        k.box('concrete', -ver * .2, 0, -ver, W + ver * .2, .42, Dp + .1, rgb('#94907f'), { tex: 2.2, lo: .7, top: rgb('#a29d8c') });
        // Front wall with door and windows, set back behind the verandah
        k.push();
        k.into(W, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1);
        const doorW = 1.1, dx = W * r.range(.4, .55) - doorW / 2;
        const winW = 1.1, wy0 = 1.3, wy1 = 2.25;
        const wL = dx * .5 - winW / 2, wR = dx + doorW + (W - dx - doorW) * .5 - winW / 2;
        wallPanel(k, s.wallMat, 0, .42, W, eave, wall);
        wallPanel(k, s.wallMat, 0, .42, W, 1.02, low, { z: .012 });
        if (detail) {
            k.box('wood', dx, .42, 0, dx + doorW, 2.3, .05, rgb(r.pick(WOODS)), { skip: 'k' });
            k.box('plain', dx - .08, .42, 0, dx + doorW + .08, 2.38, .03, shade(wall, .7), { skip: 'k' });
            for (const a of [wL, wR]) {
                pane(k, r, a, wy0, a + winW, wy1, .02);
                const wf = rgb(r.pick(WOODS));
                k.box('wood', a - .06, wy0 - .06, .02, a + winW + .06, wy0, .06, wf, { skip: 'k' });
                k.box('wood', a - .06, wy1, .02, a + winW + .06, wy1 + .06, .06, wf, { skip: 'k' });
                k.box('wood', a - .06, wy0, .02, a, wy1, .06, wf, { skip: 'k' });
                k.box('wood', a + winW, wy0, .02, a + winW + .06, wy1, .06, wf, { skip: 'k' });
                k.box('wood', a + winW / 2 - .025, wy0, .02, a + winW / 2 + .025, wy1, .05, wf, { skip: 'k' });
                const bars = 5;
                for (let i = 1; i < bars; i++) { const x = a + winW * i / bars; k.box('plain', x - .008, wy0, .03, x + .008, wy1, .05, rgb('#2c2e30'), { skip: 'tbk' }); }
            }
        }
        k.pop();
        // Side and back walls
        const wc = shade(wall, .95);
        k.box(s.wallMat, 0, .42, 0, .001, eave, Dp, wc, { skip: 'tbfkr', tex: 2.4 });
        k.box(s.wallMat, W - .001, .42, 0, W, eave, Dp, wc, { skip: 'tbfkl', tex: 2.4 });
        k.box(s.wallMat, 0, .42, Dp - .001, W, eave, Dp, shade(wall, .86), { skip: 'tbrlk', tex: 2.4 });
        // Gable ends
        const zr = Dp / 2;
        k.quad(s.wallMat, [W, eave, Dp], [W, eave, 0], [W, ridge, zr], [W, ridge, zr], wc, [0, 0, Dp / 2.4, 0, zr / 2.4, (ridge - eave) / 2.4, zr / 2.4, (ridge - eave) / 2.4], [1, 0, 0]);
        k.quad(s.wallMat, [0, eave, 0], [0, eave, Dp], [0, ridge, zr], [0, ridge, zr], wc, [0, 0, Dp / 2.4, 0, zr / 2.4, (ridge - eave) / 2.4, zr / 2.4, (ridge - eave) / 2.4], [-1, 0, 0]);
        // The tiled roof, with an overhang, sloping down over the verandah in front
        const ov = .55, tile = 1.6;
        const roofC = rgb(r.pick(['#e8d7c8', '#d7bfae', '#f0e0d0', '#c9b7a8']), 1.5);
        const tileUV = (a, b) => [0, 0, a / tile, 0, a / tile, b / tile, 0, b / tile];
        const fx0 = -ov, fx1 = W + ov;
        const ey = eave - (ov * (ridge - eave)) / zr;
        // Back slope
        const backLen = Math.hypot(zr + ov, ridge - ey);
        k.quad('rooftile', [fx1, ey, Dp + ov], [fx0, ey, Dp + ov], [fx0, ridge, zr], [fx1, ridge, zr], [shade(roofC, .85), shade(roofC, .85), roofC, roofC], tileUV(W + ov * 2, backLen));
        // Front slope, down to the verandah beam
        const vy = 2.2;
        const frontLen = Math.hypot(zr + ver + .3, ridge - vy);
        k.quad('rooftile', [fx0, vy, -ver - .3], [fx1, vy, -ver - .3], [fx1, ridge, zr], [fx0, ridge, zr], [shade(roofC, .85), shade(roofC, .85), roofC, roofC], tileUV(W + ov * 2, frontLen));
        // The underside of the verandah roof
        k.quad('wood', [fx1, vy - .02, -ver - .3], [fx0, vy - .02, -ver - .3], [fx0, eave + .02, 0], [fx1, eave + .02, 0], rgb('#4d3d2c'));
        // Ridge tiles
        k.box('rooftile', fx0, ridge - .02, zr - .14, fx1, ridge + .1, zr + .14, shade(roofC, .8), { tex: 1.6, skip: 'b' });
        if (detail) {
            // Verandah posts and beam
            const posts = Math.max(3, Math.round(W / 2.2));
            for (let i = 0; i <= posts; i++) {
                const x = (W * i) / posts;
                k.box('wood', x - .07, .42, -ver - .07, x + .07, vy, -ver + .07, rgb(r.pick(WOODS)), { skip: 'tb' });
            }
            k.box('wood', -.1, vy - .14, -ver - .08, W + .1, vy, -ver + .08, rgb(r.pick(WOODS)), { skip: '' });
            // A cot, a water pot and firewood: small signs of daily life
            if (r() < .5) { k.box('wood', W * .1, .62, -ver * .7, W * .1 + 1.9, .72, -ver * .7 + .85, rgb('#8a6a48')); k.box('wood', W * .1, .42, -ver * .7, W * .1 + .07, .62, -ver * .7 + .07, rgb('#6a4f35')); k.box('wood', W * .1 + 1.83, .42, -ver * .7 + .78, W * .1 + 1.9, .62, -ver * .7 + .85, rgb('#6a4f35')); }
            k.tube('plain', W * .85, .42, -.5, W * .85, .78, -.5, .15, .2, 8, rgb('#a65a35'));
        } else {
            k.box('wood', -.1, vy - .14, -ver - .08, W + .1, vy, -ver + .08, rgb('#5c4a38'));
        }
        return ridge;
    }

    /* A flat-roofed house, plastered or left as bare brick with steel rods waiting for the next floor, as often seen */
    function flatHouse(k, r, W, Dp, floors, detail, opt) {
        const bare = r() < .34;
        const s = styleFor(r, { chajja: r.range(.3, .45), solidRail: true, parapet: bare ? .25 : .9 });
        if (bare) { s.wall = rgb('#ffffff', .8); s.wallMat = 'brick'; s.band = rgb('#a39e92'); s.reveal = rgb('#a5917e'); s.sill = rgb('#a39e92'); s.grille = true; }
        k.uoff = r() * 4; k.voff = r() * 4;
        const fh = 3.05, tex = bare ? 1.6 : 2.4, plinth = .45;
        k.box('concrete', -.1, 0, -.1, W + .1, plinth, Dp + .1, rgb('#8d897e'), { tex: 2.2, lo: .7 });
        const H = plinth + floors * fh;
        k.push();
        k.into(W, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1);
        for (let f = 0; f < floors; f++) {
            const y = plinth + f * fh;
            const ops = bayLayout(W, r.range(3, 3.8), 1.3);
            if (f === 0 && ops.length > 1) { ops[Math.floor(ops.length / 2)] = [ops[Math.floor(ops.length / 2)][0] + .05, ops[Math.floor(ops.length / 2)][0] + 1.15]; }
            if (detail) {
                floorWallTex(k, s.wallMat, W, y, y + fh, .95, 2.35, ops, s.wall, tex);
                ops.forEach((o) => { windowUnit(k, r, o[0], y + .95, o[1], y + 2.35, s); });
                k.box('concrete', 0, y + fh - .1, 0, W, y + fh, .04, s.band, { skip: 'k', tex: 2 });
            } else {
                wallPanel(k, s.wallMat, 0, y, W, y + fh, s.wall, { tex: tex });
                ops.forEach((o) => { windowFlat(k, r, o[0], y + .95, o[1], y + 2.35, s); });
            }
        }
        k.pop();
        k.box(s.wallMat, 0, plinth, 0, .001, H, Dp, shade(s.wall, .92), { skip: 'tbfkr', tex: tex });
        k.box(s.wallMat, W - .001, plinth, 0, W, H, Dp, shade(s.wall, .92), { skip: 'tbfkl', tex: tex });
        k.box(s.wallMat, 0, plinth, Dp - .001, W, H, Dp, shade(s.wall, .84), { skip: 'tbrlk', tex: tex });
        roofDeck(k, r, W, Dp, H, s, detail);
        if (bare && detail) {
            // Rods sticking up from the columns
            for (const x of [.15, W / 2, W - .15]) {
                for (const z of [.15, Dp - .15]) {
                    for (const o of [[-.05, -.05], [.05, -.05], [-.05, .05], [.05, .05]]) { k.tube('plain', x + o[0], H, z + o[1], x + o[0] + .02, H + .95, z + o[1], .009, .009, 3, rgb('#4d3a2e')); }
                }
            }
        }
        return H;
    }
    function floorWallTex(k, mat, W, y0, y1, sill, head, openings, col, tex) {
        const o2 = { tex: tex };
        wallPanel(k, mat, 0, y0, W, y0 + sill, col, o2);
        wallPanel(k, mat, 0, y0 + head, W, y1, col, o2);
        let x = 0;
        for (const o of openings) { wallPanel(k, mat, x, y0 + sill, o[0], y0 + head, col, o2); x = o[1]; }
        wallPanel(k, mat, x, y0 + sill, W, y0 + head, col, o2);
    }

    /* A small roadside tea stall or workshop with a tin roof on poles */
    function stall(k, r, W, Dp, detail) {
        const wall = rgb(r.pick(['#d7c9a6', '#7ba0a8', '#c98f5a', '#b7c49a']));
        k.uoff = r() * 4; k.voff = r() * 4;
        k.box('concrete', 0, 0, 0, W, .2, Dp, rgb('#85817a'), { tex: 2, lo: .7 });
        k.box('rough', 0, .2, Dp * .55, W, 2.7, Dp, wall, { tex: 2.4, skip: 'b' });
        const top = 3, front = 2.45, ov = 1.6;
        const roof = rgb(r.pick(['#a89f8e', '#7f8a8c', '#8c6d55', '#9db0b5']));
        k.quad('iron', [-.3, front, -ov], [W + .3, front, -ov], [W + .3, top, Dp + .2], [-.3, top, Dp + .2], roof, [0, 0, (W + .6) / 1.2, 0, (W + .6) / 1.2, (Dp + ov) / 1.2, 0, (Dp + ov) / 1.2]);
        k.quad('iron', [W + .3, front, -ov], [-.3, front, -ov], [-.3, top, Dp + .2], [W + .3, top, Dp + .2], shade(roof, .46), [0, 0, (W + .6) / 1.2, 0, (W + .6) / 1.2, (Dp + ov) / 1.2, 0, (Dp + ov) / 1.2]);
        if (detail) {
            for (const x of [0, W / 2, W]) { k.tube('steel', x, .2, -ov + .1, x, front + .03, -ov + .1, .035, .035, 6, rgb('#6e7072')); }
            // Counter, shelves and a bench
            k.box('wood', W * .08, .2, Dp * .2, W * .7, 1.05, Dp * .46, rgb('#7c5b3a'));
            k.box('wood', W * .08, 1.05, Dp * .18, W * .7, 1.1, Dp * .48, rgb('#9a7a55'));
            k.box('wood', W * .75, .55, -.6, W * .95, .62, .9, rgb('#7a5a3a'));
            for (let i = 0; i < 3; i++) { k.box('plain', W * .1 + i * .55, 1.1, Dp * .28, W * .1 + i * .55 + .3, 1.5, Dp * .4, rgb(r.pick(['#d9534a', '#3b6ea8', '#e0a53a', '#3f8f6a']))); }
            k.quad('signs', [W * .06, 2.02, -ov + .02], [W * .94, 2.02, -ov + .02], [W * .94, 2.42, -ov + .02], [W * .06, 2.42, -ov + .02], [1, 1, 1], signUV(), [0, 0, -1]);
        }
        return top;
    }

    /* A fuel station: a broad canopy on columns, pumps under it, a small office and a tall price sign. No brand: the sign says only FUEL. */
    function fuelStation(k, r, W, Dp, detail) {
        const white = rgb('#e8e8e2'), band = rgb('#b5362a'), dk = rgb('#2c2f33');
        k.box('concrete', 0, 0, 0, W, .14, Dp, rgb('#8e8b82'), { tex: 2.6, skip: 'b' });
        const cx0 = 3, cx1 = W - 3, cz0 = 1.5, cz1 = 11, top = 5.4;
        // The canopy, its coloured edge and the lights under it
        k.box('plain', cx0, top, cz0, cx1, top + .28, cz1, white, {});
        k.box('plain', cx0 - .04, top + .28, cz0 - .04, cx1 + .04, top + .62, cz1 + .04, band, { skip: 'b' });
        for (const x of [cx0 + 3, cx1 - 3]) {
            for (const z of [cz0 + 2.2, cz1 - 2.2]) { k.box('concrete', x - .18, .14, z - .18, x + .18, top, z + .18, white, { tex: 2 }); }
        }
        if (detail) {
            for (let i = 0; i < 6; i++) {
                const x = cx0 + 1.6 + i * (cx1 - cx0 - 3.2) / 5;
                k.quad('nightlamp', [x - .5, top - .005, cz0 + 2], [x + .5, top - .005, cz0 + 2], [x + .5, top - .005, cz0 + 2.3], [x - .5, top - .005, cz0 + 2.3], [7, 7, 6.5], null, [0, -1, 0]);
                k.quad('nightlamp', [x - .5, top - .005, cz1 - 2.3], [x + .5, top - .005, cz1 - 2.3], [x + .5, top - .005, cz1 - 2], [x - .5, top - .005, cz1 - 2], [7, 7, 6.5], null, [0, -1, 0]);
            }
            // Pump islands
            for (const x of [cx0 + 5.6, (cx0 + cx1) / 2, cx1 - 5.6]) {
                k.box('concrete', x - .6, .14, cz0 + 2.8, x + .6, .32, cz1 - 2.8, rgb('#c9c6bb'), { tex: 2 });
                for (const z of [cz0 + 3.6, cz1 - 3.6]) {
                    k.box('plain', x - .34, .32, z - .22, x + .34, 2.05, z + .22, white, {});
                    k.box('plain', x - .35, 1.2, z - .23, x + .35, 1.75, z + .23, dk, {});
                    k.box('plain', x - .36, 1.85, z - .24, x + .36, 2.05, z + .24, band, {});
                }
            }
        }
        // The office behind
        const ow = 9, ox = W / 2 - ow / 2, oz = Dp - 6;
        k.box('plaster', ox, .14, oz, ox + ow, 3.3, Dp, white, { tex: 2.4, skip: 'b' });
        k.box('plain', ox - .2, 3.3, oz - .3, ox + ow + .2, 3.52, Dp, band, {});
        k.push();
        k.into(ox + ow, 0, oz, -1, 0, 0, 0, 1, 0, 0, 0, -1);
        k.pane('showcase', 1, .4, ow - 1, 2.8, .02, [1, 1, 1], [.504, .506, .746, .506, .746, .994, .504, .994], .2, 0, 0, 0);
        k.pop();
        // The tall sign at the roadside
        const sx = W - 1.4, sz = .6, sh = 9.4;
        k.box('steel', sx - .12, 0, sz - .12, sx + .12, sh - 3, sz + .12, dk, {});
        k.box('plain', sx - 1.05, sh - 3, sz - .18, sx + 1.05, sh, sz + .18, band, {});
        const i = 48, u = 0, v = .25 - .25;
        void i; void u; void v;
        if (D.Furniture && D.Furniture.fuelPlate) { D.Furniture.fuelPlate(k, sx, sh, sz); }
        return top;
    }

    /* A compound wall with a gate, along the front of a rural plot */
    function compoundWall(k, r, W, gateAt) {
        const c = rgb(r.pick(['#c9c2ae', '#b8ad96', '#d4cab6']));
        const h = 1.25, t = .12;
        k.box('rough', 0, 0, 0, gateAt - .9, h, t, c, { tex: 2.4, lo: .6 });
        k.box('rough', gateAt + .9, 0, 0, W, h, t, c, { tex: 2.4, lo: .6 });
        k.box('concrete', 0, h, -.03, gateAt - .9, h + .06, t + .03, shade(c, .85), { tex: 2.4 });
        k.box('concrete', gateAt + .9, h, -.03, W, h + .06, t + .03, shade(c, .85), { tex: 2.4 });
        for (const x of [gateAt - 1.1, gateAt + .9]) { k.box('concrete', x, 0, -.05, x + .22, 1.7, t + .05, shade(c, .92), { tex: 2.2 }); }
        const g = rgb('#2f4a55');
        for (let i = 0; i <= 8; i++) { const x = gateAt - .88 + i * .22; k.box('plain', x - .012, .05, .03, x + .012, 1.45, .06, g, { skip: 'tb' }); }
        k.box('plain', gateAt - .88, 1.38, .03, gateAt + .88, 1.45, .06, g);
        k.box('plain', gateAt - .88, .3, .03, gateAt + .88, .36, .06, g);
    }

    /* A tall distant tower for the skyline, as a simple block with rows of windows */
    function skylineTower(k, r, W, Dp, floors) {
        const wall = rgb(r.pick(['#a9a59b', '#c0b8a6', '#9aa2a8', '#b9ad9b', '#8e959b', '#cfc6b3']));
        const fh = 3.1, H = floors * fh;
        k.box('plain', 0, 0, 0, W, H, Dp, wall, { skip: 'b' });
        const n = Math.max(2, Math.round(W / 3.6));
        k.push();
        k.into(W, 0, -.02, -1, 0, 0, 0, 1, 0, 0, 0, -1);
        for (let f = 1; f < floors; f++) {
            if (f % 1 === 0) {
                const y = f * fh;
                for (let i = 0; i < n; i++) {
                    const c = (i + .5) * W / n;
                    k.pane('glass', c - .85, y + .7, c + .85, y + 2.3, 0, [1, 1, 1], [.3, .3, .49, .3, .49, .49, .3, .49], r() < .42 ? 2 : r.range(.25, .95), r() < .3 ? 1 : 0, 0, 0);
                }
            }
        }
        k.pop();
        k.box('concrete', W * .3, H, Dp * .3, W * .6, H + 3, Dp * .6, shade(wall, .85), { tex: 2.4 });
        return H;
    }

    D.Buildings = { apartments, commercial, tiledHouse, flatHouse, stall, fuelStation, compoundWall, skylineTower, hoarding };
})();
