/*
 * Road furniture, modelled part by part: overhead gantries, electric poles and wires, street lights, crash barriers,
 * delineators, road studs, kilometre stones, road signs, traffic signals, guard rails, bus stops and small street details.
 * Road coordinates: a frame placed on the road has x to the right, y up and -z straight ahead.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const R = D.Route, rgb = D.rgb, shade = D.shade;

    function roadFrame(k, s, t, y, yaw) {
        const o = R.at(s, t, y), th = o.th + (yaw || 0);
        const cx = Math.cos(th), sx = Math.sin(th);
        k.frame(o.x, o.y, o.z, cx, 0, sx, 0, 1, 0, -sx, 0, cx);
        return k;
    }

    /* ---------- Road signs, drawn once into one picture ---------- */
    let signTex = null;
    function roadSignAtlas(L) {
        if (signTex) { return signTex; }
        const S = 1024, C = 128, cv = document.createElement('canvas');
        cv.width = S; cv.height = S / 2;
        const g = cv.getContext('2d');
        g.textAlign = 'center'; g.textBaseline = 'middle';
        const cell = (i) => [(i % 8) * C + C / 2, Math.floor(i / 8) * C + C / 2];
        const round = (i, text) => {
            const [x, y] = cell(i);
            g.fillStyle = '#ffffff'; g.beginPath(); g.arc(x, y, 60, 0, 7); g.fill();
            g.strokeStyle = '#c8202f'; g.lineWidth = 15; g.beginPath(); g.arc(x, y, 52, 0, 7); g.stroke();
            g.fillStyle = '#111111'; g.font = 'bold 54px Arial'; g.fillText(text, x, y + 3);
        };
        const tri = (i, draw) => {
            const [x, y] = cell(i);
            g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(x, y - 58); g.lineTo(x + 60, y + 50); g.lineTo(x - 60, y + 50); g.closePath(); g.fill();
            g.strokeStyle = '#c8202f'; g.lineWidth = 13; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x, y - 48); g.lineTo(x + 50, y + 44); g.lineTo(x - 50, y + 44); g.closePath(); g.stroke();
            g.fillStyle = '#111111'; draw(x, y + 8);
        };
        round(0, '80');
        round(1, '50');
        tri(2, (x, y) => { g.fillRect(x - 5, y - 24, 10, 44); g.fillRect(x - 21, y - 7, 42, 10); });           // crossroads
        tri(3, (x, y) => { g.fillRect(x - 5, y - 24, 10, 44); g.fillRect(x, y - 7, 21, 10); });                // side road on the right
        tri(4, (x, y) => { g.fillRect(x - 5, y - 24, 10, 44); g.fillRect(x - 21, y - 7, 21, 10); });           // side road on the left
        tri(5, (x, y) => { g.beginPath(); g.arc(x, y - 18, 6, 0, 7); g.fill(); g.lineWidth = 6; g.strokeStyle = '#111'; g.beginPath(); g.moveTo(x, y - 10); g.lineTo(x, y + 6); g.lineTo(x - 12, y + 22); g.moveTo(x, y + 6); g.lineTo(x + 11, y + 22); g.moveTo(x - 12, y - 4); g.lineTo(x + 13, y - 2); g.stroke(); });  // people crossing
        (function () { const [x, y] = cell(6); g.fillStyle = '#0b4280'; g.fillRect(x - 56, y - 56, 112, 112); g.fillStyle = '#fff'; g.font = 'bold 34px Arial'; g.fillText('BUS', x, y - 18); g.fillText('STOP', x, y + 20); })();
        (function () { const [x, y] = cell(7); g.fillStyle = '#0b4280'; g.fillRect(x - 56, y - 56, 112, 112); g.fillStyle = '#fff'; g.fillRect(x - 40, y - 40, 80, 80); g.fillStyle = '#c8202f'; g.fillRect(x - 8, y - 28, 16, 56); g.fillRect(x - 28, y - 8, 56, 16); })();
        // Kilometre stones
        ['TRC\n1', 'TRC\n2', 'SURAT\n3', 'SURAT\n2'].forEach((text, n) => {
            const [x, y] = cell(8 + n), p = text.split('\n');
            g.fillStyle = '#f2f0e8'; g.fillRect(x - 60, y - 60, 120, 120);
            g.fillStyle = '#e8b417'; g.fillRect(x - 60, y - 60, 120, 44);
            g.fillStyle = '#111111'; g.font = 'bold 30px Arial'; g.fillText(p[0], x, y - 36);
            g.font = 'bold 50px Arial'; g.fillText(p[1], x, y + 22);
        });
        // A green place-name board
        g.fillStyle = '#0a5a43'; g.fillRect(0, 256, 512, 128); g.strokeStyle = '#fff'; g.lineWidth = 6; g.strokeRect(8, 264, 496, 112);
        g.fillStyle = '#fff'; g.font = 'bold 84px Arial'; g.fillText('SURAT', 256, 326);
        // The fuel station's sign
        g.fillStyle = '#b5362a'; g.fillRect(768, 0, 128, 128);
        g.fillStyle = '#fff'; g.font = 'bold 42px Arial'; g.fillText('FUEL', 832, 66);
        // The diagonal bands of a warning barrier
        g.save();
        g.beginPath(); g.rect(512, 256, 512, 128); g.clip();
        g.fillStyle = '#f2be1a'; g.fillRect(512, 256, 512, 128);
        g.fillStyle = '#111111';
        for (let i = -2; i < 12; i++) { g.beginPath(); g.moveTo(512 + i * 64, 384); g.lineTo(512 + i * 64 + 32, 384); g.lineTo(512 + i * 64 + 64 + 32, 256); g.lineTo(512 + i * 64 + 64, 256); g.closePath(); g.fill(); }
        g.restore();
        signTex = D.Materials.canvasTex(cv);
        L.roadsign = D.Materials.patch(new THREE.MeshStandardMaterial({ map: signTex, roughness: .4, vertexColors: true }), {
            key: 'roadsign', beforeOutput: 'outgoingLight += diffuseColor.rgb * uNight * .28;'
        });
        return signTex;
    }
    function fuelPlate(k, x, top, z) {
        // A square plate on each face of the tall sign
        const a = .95, cy = top - 1.5;
        k.quad('roadsign', [x + a, cy - a, z - .19], [x - a, cy - a, z - .19], [x - a, cy + a, z - .19], [x + a, cy + a, z - .19], [1, 1, 1], [.75, .75, .875, .75, .875, 1, .75, 1], [0, 0, -1]);
    }
    function signUV(i) {
        const u = (i % 8) / 8, v = 1 - (Math.floor(i / 8) + 1) / 4;
        return [u, v, u + 1 / 8, v, u + 1 / 8, v + 1 / 4, u, v + 1 / 4];
    }
    /* A sign on a steel post. Its face looks back towards oncoming drivers. */
    function postSign(k, s, t, cell, size, h) {
        roadFrame(k, s, t, 0);
        const grey = rgb('#7b7f82');
        k.tube('steel', 0, 0, 0, 0, h + size * .45, 0, .035, .035, 6, grey);
        k.box('concrete', -.16, -.15, -.16, .16, .05, .16, rgb('#8d897e'), { tex: 2, lo: .7 });
        const a = size / 2;
        k.quad('roadsign', [-a, h - a, .05], [a, h - a, .05], [a, h + a, .05], [-a, h + a, .05], [1, 1, 1], signUV(cell), [0, 0, 1]);
        k.quad('plain', [a, h - a, .04], [-a, h - a, .04], [-a, h + a, .04], [a, h + a, .04], rgb('#72767a'), null, [0, 0, -1]);
    }
    function placeBoardSign(k, s, t) {
        roadFrame(k, s, t, 0);
        const grey = rgb('#7b7f82');
        for (const x of [-1.5, 1.5]) { k.tube('steel', x, 0, 0, x, 3.7, 0, .05, .05, 6, grey); }
        k.quad('roadsign', [-2, 2.2, .06], [2, 2.2, .06], [2, 3.5, .06], [-2, 3.5, .06], [1, 1, 1], [0, .25, .5, .25, .5, .5, 0, .5], [0, 0, 1]);
        k.quad('plain', [2, 2.2, .05], [-2, 2.2, .05], [-2, 3.5, .05], [2, 3.5, .05], rgb('#72767a'), null, [0, 0, -1]);
    }
    /* A kilometre stone: white with a yellow top, set on the verge */
    function kmStone(k, s, t, cell) {
        roadFrame(k, s, t, -.15);
        const body = rgb('#e8e6dc');
        k.box('concrete', -.3, 0, -.09, .3, .68, .09, body, { skip: 'f', tex: 2, lo: .72 });
        k.quad('roadsign', [-.3, .05, .092], [.3, .05, .092], [.3, .68, .092], [-.3, .68, .092], [1, 1, 1], signUV(cell), [0, 0, 1]);
        k.tube('plain', -.3, .68, 0, .3, .68, 0, .09, .09, 8, rgb('#e8b417'));
    }

    /* ---------- Electric poles and wires ---------- */
    function electricPole(k, s, t, side) {
        roadFrame(k, s, t, -.1);
        const c = rgb('#9c988c'), H = 8.6;
        k.box('concrete', -.13, 0, -.1, .13, 1.4, .1, c, { tex: 2.2, lo: .7, skip: 'b' });
        k.quad('concrete', [-.13, 1.4, .1], [.13, 1.4, .1], [.07, H, .05], [-.07, H, .05], c, [0, 0, .13, 0, .1, 3.5, .03, 3.5]);
        k.quad('concrete', [.13, 1.4, -.1], [-.13, 1.4, -.1], [-.07, H, -.05], [.07, H, -.05], shade(c, .85), [0, 0, .13, 0, .1, 3.5, .03, 3.5]);
        k.quad('concrete', [.13, 1.4, .1], [.13, 1.4, -.1], [.07, H, -.05], [.07, H, .05], shade(c, .92), [0, 0, .1, 0, .08, 3.5, .02, 3.5]);
        k.quad('concrete', [-.13, 1.4, -.1], [-.13, 1.4, .1], [-.07, H, .05], [-.07, H, -.05], shade(c, .92), [0, 0, .1, 0, .08, 3.5, .02, 3.5]);
        const arm = rgb('#55595c');
        k.box('steel', -.85, H - .25, -.05, .85, H - .17, .05, arm, {});
        for (const x of [-.75, 0, .75]) {
            k.tube('plain', x, H - .17, 0, x, H + .02, 0, .035, .022, 6, rgb('#c9c2a6'));
        }
        void side;
    }
    // Sagging wires between two poles
    function wires(k, s0, t0, s1, t1) {
        const dark = rgb('#26282a'), H = 8.5;
        const a = R.at(s0, t0, 0), b = R.at(s1, t1, 0);
        const th0 = a.th, cx = Math.cos(th0), sx = Math.sin(th0);
        for (const off of [-.75, 0, .75]) {
            const ax = a.x + cx * off, az = a.z + sx * off, bx = b.x + cx * off, bz = b.z + sx * off;
            const N = 8;
            for (let i = 0; i < N; i++) {
                const p = i / N, q = (i + 1) / N;
                const sag = (x) => -1.15 * 4 * x * (1 - x);
                k.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
                k.bar('plain', ax + (bx - ax) * p, a.y + H + (b.y - a.y) * p + sag(p), az + (bz - az) * p, ax + (bx - ax) * q, a.y + H + (b.y - a.y) * q + sag(q), az + (bz - az) * q, .022, dark);
            }
        }
    }

    /* ---------- Street lights ---------- */
    function streetLight(k, s, t, side, list, glow, yaw) {
        // The arm reaches over the carriageway from the side of the road
        const dir = -side;
        roadFrame(k, s, t, .1, yaw || 0);
        const c = rgb('#70757a'), H = 9.2, reach = 2.3;
        k.tube('steel', 0, 0, 0, 0, H - .6, 0, .095, .05, 8, c);
        k.box('concrete', -.22, -.05, -.22, .22, .32, .22, rgb('#8d897e'), { tex: 2, lo: .72 });
        k.tube('steel', 0, H - .6, 0, dir * reach * .75, H, 0, .05, .04, 6, c);
        k.tube('steel', dir * reach * .75, H, 0, dir * reach, H + .05, 0, .04, .04, 6, c);
        // Lamp head with its lit underside
        k.box('plain', dir * reach - .38 * (dir > 0 ? 0 : 1), H - .03, -.12, dir * reach + .38 * (dir > 0 ? 1 : 0), H + .09, .12, rgb('#3e4246'), {});
        const lx0 = dir * reach + (dir > 0 ? .04 : -.36), lx1 = dir * reach + (dir > 0 ? .36 : -.04);
        k.quad('nightlamp', [lx0, H - .035, -.09], [lx1, H - .035, -.09], [lx1, H - .035, .09], [lx0, H - .035, .09], [8, 7.4, 6.2], null, [0, -1, 0]);
        const w = k.tp(dir * (reach + .2), H, 0);
        if (list) { list.push({ x: w[0], y: w[1] - .1, z: w[2], power: 240 }); }
        if (glow) { glow.add(w[0], w[1] - .15, w[2], .5, .46, .38, 1.5, 1); }
    }

    /* Bundles of telephone and power cables slung along the street from pole to pole, as on most Indian city roads */
    function cableRun(k, s0, s1, t) {
        const dark = rgb('#1a1b1d');
        k.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
        for (const off of [[0, 7.6, .55], [.14, 7.25, .8], [-.12, 6.9, 1.05]]) {
            const a = R.at(s0, t + off[0], off[1]), b = R.at(s1, t + off[0], off[1]);
            const N = 6;
            for (let i = 0; i < N; i++) {
                const u = i / N, v = (i + 1) / N, sag = (x) => -off[2] * 4 * x * (1 - x);
                k.bar('plain', a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u + sag(u), a.z + (b.z - a.z) * u, a.x + (b.x - a.x) * v, a.y + (b.y - a.y) * v + sag(v), a.z + (b.z - a.z) * v, .02, dark);
            }
        }
    }

    /* ---------- Barriers, posts and studs ---------- */
    // A W-beam crash barrier: the corrugated steel rail seen on Indian highways, on posts every 2 metres
    function wBeam(k, s0, s1, t, faceRight) {
        const galv = rgb('#a8adb0'), dark = shade(galv, .6);
        const step = 2;
        const y0 = (s, q) => D.Roadworks.groundRel(s, q);
        const dir = faceRight ? 1 : -1;
        const prof = [[0, .5], [.05, .57], [.05, .63], [0, .7], [.05, .77], [.05, .83], [0, .9]];
        for (let s = s0; s < s1 - .1; s += step) {
            const a = s, b = Math.min(s1, s + step);
            const ya = Math.max(y0(a, t), -.1), yb = Math.max(y0(b, t), -.1);
            roadFrame(k, a, t, ya);
            k.box('plain', -.06, -.5, -.05, .06, .78, .05, rgb('#6f7477'), { skip: 'b' });
            k.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
            for (let i = 0; i < prof.length - 1; i++) {
                const p = prof[i], q = prof[i + 1];
                const off0 = t + dir * p[0], off1 = t + dir * q[0];
                const A0 = R.at(a, off0, ya + p[1]), A1 = R.at(a, off1, ya + q[1]), B0 = R.at(b, off0, yb + p[1]), B1 = R.at(b, off1, yb + q[1]);
                const col = i % 3 === 1 ? galv : shade(galv, .88);
                const pa = [A0.x, A0.y, A0.z], pb = [A1.x, A1.y, A1.z], pc = [B1.x, B1.y, B1.z], pd = [B0.x, B0.y, B0.z];
                if (dir > 0) { k.quad('steel', pb, pa, pd, pc, col); k.quad('plain', pa, pb, pc, pd, dark); } else { k.quad('steel', pa, pb, pc, pd, col); k.quad('plain', pb, pa, pd, pc, dark); }
            }
        }
    }
    // A delineator post: white with a black band and a reflector that catches the headlights at dusk
    function delineator(k, s, t, leftSide) {
        const y = D.Roadworks.groundRel(s, t);
        roadFrame(k, s, t, y - .05);
        const white = rgb('#e8e6dc'), black = rgb('#1d1f22');
        k.box('plain', -.05, 0, -.03, .05, .78, .03, white, { skip: 'b', lo: .55 });
        k.box('plain', -.052, .78, -.032, .052, 1.02, .032, black, { skip: 'b' });
        k.box('plain', -.05, 1.02, -.03, .05, 1.1, .03, white, { skip: 'b' });
        k.box('nightlamp', -.035, .83, .03, .035, .97, .034, leftSide ? [3.4, 1.9, .3] : [3.2, 3.2, 3], { skip: 'bk' });
        k.quad('plain', [-.035, .83, .036], [.035, .83, .036], [.035, .97, .036], [-.035, .97, .036], leftSide ? rgb('#e0a020') : rgb('#d8d8d0'), null, [0, 0, 1]);
    }
    // Raised road studs ("cat's eyes") that shine when lit by headlights
    function roadStud(k, s, t, col, lit) {
        roadFrame(k, s, t, .005);
        k.box('plain', -.05, 0, -.05, .05, .03, .05, col, { skip: 'b' });
        k.quad('nightlamp', [-.04, .002, .051], [.04, .002, .051], [.04, .03, .051], [-.04, .03, .051], lit, null, [0, 0, 1]);
    }

    /* ---------- City street details ---------- */
    // Pedestrian guard rail on the kerb, with a gap at each crossing
    function guardRail(k, s0, s1, t) {
        const c = rgb('#d8d6cc'), c2 = rgb('#1f6f58');
        for (let s = s0; s < s1 - .1; s += 2.4) {
            const a = s, b = Math.min(s1, s + 2.4);
            const pa = R.at(a, t, .16), pb = R.at(b, t, .16);
            k.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
            k.bar('plain', pa.x, pa.y + 1.02, pa.z, pb.x, pb.y + 1.02, pb.z, .05, c);
            k.bar('plain', pa.x, pa.y + .3, pa.z, pb.x, pb.y + .3, pb.z, .04, c2);
            k.bar('plain', pa.x, pa.y, pa.z, pa.x, pa.y + 1.05, pa.z, .06, c2);
            const n = 7;
            for (let i = 1; i < n; i++) {
                const f = i / n, x = pa.x + (pb.x - pa.x) * f, y = pa.y + (pb.y - pa.y) * f, z = pa.z + (pb.z - pa.z) * f;
                k.bar('plain', x, y + .3, z, x, y + 1.02, z, .018, c);
            }
        }
    }
    function bollard(k, s, t) {
        roadFrame(k, s, t, .16);
        k.tube('steel', 0, 0, 0, 0, .78, 0, .06, .06, 8, rgb('#2c2f33'), { capB: rgb('#2c2f33') });
        k.tube('plain', 0, .56, 0, 0, .64, 0, .065, .065, 8, rgb('#d9d4c4'));
    }
    // A round steel guard around a young street tree
    function treeGuard(k, s, t) {
        roadFrame(k, s, t, .16);
        const c = rgb('#2f5f50');
        k.tube('plain', 0, .05, 0, 0, .12, 0, .42, .42, 10, c);
        k.tube('plain', 0, 1.42, 0, 0, 1.5, 0, .42, .42, 10, c);
        for (let i = 0; i < 10; i++) {
            const a = i / 10 * Math.PI * 2;
            k.tube('plain', Math.cos(a) * .42, .05, Math.sin(a) * .42, Math.cos(a) * .42, 1.5, Math.sin(a) * .42, .012, .012, 3, c);
        }
    }
    function bench(k, s, t, yaw) {
        roadFrame(k, s, t, .16, yaw);
        const w = rgb('#6c5238');
        k.box('wood', -.9, .42, -.2, .9, .47, .2, w);
        k.box('wood', -.9, .55, -.22, .9, .85, -.18, w);
        for (const x of [-.75, .75]) { k.box('plain', x - .03, 0, -.18, x + .03, .85, -.14, rgb('#2c2f33')); k.box('plain', x - .03, 0, .12, x + .03, .42, .17, rgb('#2c2f33')); }
    }
    function busStop(k, s, t, side) {
        roadFrame(k, s, t, .16, side > 0 ? 0 : 0);
        const f = rgb('#5a6066'), rf = rgb('#2d6a8a');
        const L = 7, Dp = 1.8, H = 2.75;
        const back = side > 0 ? Dp : -Dp;
        for (const x of [-L / 2, 0, L / 2]) {
            k.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
            const a = R.at(s + x, t + back, .16), b = R.at(s + x, t + back, .16 + H);
            k.tube('steel', a.x, a.y, a.z, b.x, b.y, b.z, .04, .04, 6, f);
            const c = R.at(s + x, t, .16), d = R.at(s + x, t, .16 + H - .1);
            k.tube('steel', c.x, c.y, c.z, d.x, d.y, d.z, .035, .035, 6, f);
        }
        k.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
        const P = (a, b, y) => { const o = R.at(s + a, t + b, y); return [o.x, o.y, o.z]; };
        const over = side > 0 ? -.6 : .6;
        const q0 = P(-L / 2 - .2, over, .16 + H - .15), q1 = P(L / 2 + .2, over, .16 + H - .15), q2 = P(L / 2 + .2, back + (side > 0 ? .2 : -.2), .16 + H + .1), q3 = P(-L / 2 - .2, back + (side > 0 ? .2 : -.2), .16 + H + .1);
        k.quad('iron', q0, q1, q2, q3, rf); k.quad('iron', q3, q2, q1, q0, shade(rf, .55));
        // Back panel, bench and a route sign
        const b0 = P(-L / 2, back, .16 + .5), b1 = P(L / 2, back, .16 + .5), b2 = P(L / 2, back, .16 + H - .2), b3 = P(-L / 2, back, .16 + H - .2);
        k.quad('curtain', side > 0 ? b0 : b1, side > 0 ? b1 : b0, side > 0 ? b2 : b3, side > 0 ? b3 : b2, [1, 1, 1], [0, 0, 1, 0, 1, 1, 0, 1]);
        const B = k.bucket('curtain'); if (!B.w) { B.w = []; } B.w.push(2, 0, 2, 0, 2, 0, 2, 0);
        roadFrame(k, s, t + back * .72, .16);
        k.box('steel', -L / 2 + .4, .45, -.2, L / 2 - .4, .5, .2, rgb('#6c7278'));
        for (const x of [-L / 2 + .6, L / 2 - .6]) { k.box('plain', x - .03, 0, -.12, x + .03, .45, .12, rgb('#3a3e42')); }
    }
    /* A roadside electrical box */
    function cabinet(k, s, t) {
        roadFrame(k, s, t, .16);
        const c = rgb('#7a8a7e');
        k.box('plain', -.45, 0, -.2, .45, 1.15, .2, c, { lo: .7, skip: 'b' });
        k.box('plain', -.42, .08, .2, -.01, 1.08, .21, shade(c, .92), { skip: 'bk' });
        k.box('plain', .01, .08, .2, .42, 1.08, .21, shade(c, .92), { skip: 'bk' });
    }

    /* ---------- Traffic signals: housings here, the lit lamps are kept apart so they can change ---------- */
    function signalHead(k, lamps, x, y, z, faceDir, sc) {
        // A black housing with three lamps under visors. faceDir +1 looks towards +z of the frame.
        const c = rgb('#111315');
        const w = .34 * sc, H = 1.05 * sc, d = .22 * sc;
        k.box('plain', x - w / 2, y, z - d / 2, x + w / 2, y + H, z + d / 2, c, {});
        k.box('plain', x - w / 2 - .06 * sc, y - .05 * sc, faceDir > 0 ? z + d / 2 - .01 : z - d / 2, x + w / 2 + .06 * sc, y + H + .05 * sc, faceDir > 0 ? z + d / 2 : z - d / 2 + .01, rgb('#e4e2d8'));
        const colours = ['red', 'amber', 'green'];
        for (let i = 0; i < 3; i++) {
            const ly = y + H * (.83 - i * .33);
            const r = .115 * sc;
            const lz = z + faceDir * (d / 2 + .012);
            lamps[colours[i]].push(k.tp(x, ly, lz));
            // Visor
            const vz = z + faceDir * (d / 2 + .16 * sc);
            k.quad('plain', [x - r * 1.05, ly + r * 1.08, faceDir > 0 ? lz : vz], [x + r * 1.05, ly + r * 1.08, faceDir > 0 ? lz : vz], [x + r * 1.05, ly + r * 1.08, faceDir > 0 ? vz : lz], [x - r * 1.05, ly + r * 1.08, faceDir > 0 ? vz : lz], c);
            k.quad('plain', [x - r * 1.05, ly + r * 1.08, faceDir > 0 ? vz : lz], [x + r * 1.05, ly + r * 1.08, faceDir > 0 ? vz : lz], [x + r * 1.05, ly + r * 1.08, faceDir > 0 ? lz : vz], [x - r * 1.05, ly + r * 1.08, faceDir > 0 ? lz : vz], c);
        }
    }

    /*
     * A signalised junction: a tall pole with a mast arm over the lanes on the approach side, a smaller signal on the far side, and pedestrian signals.
     * Returns lamp positions by colour so that traffic.js can light the right one.
     */
    function junctionSignals(k, j) {
        const lamps = { red: [], amber: [], green: [] };
        const e = D.Roadworks.edgeOf(j.s), w = R.halfWidth(j.s), base = rgb('#70757a');
        const zs = j.hw + j.r + 5.8;
        // On the left, where traffic keeps, a signal before the stop line side with an arm over the lanes
        const sA = j.s - zs + 8.6;
        roadFrame(k, sA, -(e + .6), .16);
        k.tube('steel', 0, 0, 0, 0, 6.9, 0, .11, .075, 8, base);
        k.box('concrete', -.3, -.05, -.3, .3, .45, .3, rgb('#8d897e'), { tex: 2, lo: .7 });
        const reach = w + .1;
        k.tube('steel', 0, 6.7, 0, reach, 6.7, 0, .075, .05, 6, base);
        k.tube('steel', 0, 5.4, 0, reach * .55, 6.65, 0, .035, .03, 5, base);
        signalHead(k, lamps, reach * .92, 5.5, .05, 1, 1.1);
        signalHead(k, lamps, reach * .42, 5.5, .05, 1, 1.1);
        // The countdown panel beside the signal over the lanes
        const c0 = k.tp(reach * .92 - .68, 5.72, .17), c1 = k.tp(reach * .92 - .24, 5.72, .17), c2 = k.tp(reach * .92 - .24, 6.04, .17), c3 = k.tp(reach * .92 - .68, 6.04, .17);
        k.box('plain', reach * .92 - .72, 5.68, .05, reach * .92 - .2, 6.08, .16, rgb('#111315'), {});
        lamps.count = [c0, c1, c2, c3];
        // Second signal at the side of the road, at eye height
        signalHead(k, lamps, .0, 3.0, .1, 1, .85);
        // A signal for traffic from the opposite direction, facing away
        roadFrame(k, j.s + zs - 8.6, (e + .6), .16);
        k.tube('steel', 0, 0, 0, 0, 4.4, 0, .08, .065, 8, base);
        k.box('concrete', -.25, -.05, -.25, .25, .4, .25, rgb('#8d897e'), { tex: 2, lo: .7 });
        // The driver sees its back, so it is drawn with the plate facing away
        signalHead(k, { red: [], amber: [], green: [] }, 0, 3, -.1, -1, .85);
        // Far-side signal for this direction
        roadFrame(k, j.s + zs - 8.6, -(e + .6), .16);
        k.tube('steel', 0, 0, 0, 0, 4.4, 0, .08, .065, 8, base);
        k.box('concrete', -.25, -.05, -.25, .25, .4, .25, rgb('#8d897e'), { tex: 2, lo: .7 });
        signalHead(k, lamps, 0, 3, .1, 1, .85);
        return lamps;
    }

    /* ---------- The overhead gantry that holds each board ---------- */
    function gantry(k, b, L) {
        const j = R.dev(b.s) > .75;
        const side = (j ? 7 : 3.5) + (j ? 5.2 : 6);
        const hgt = R.CLEARANCE + b.boardH;
        const beamY = R.CLEARANCE + b.boardH * .58;
        const steel = rgb('#9ca2a6'), dark = rgb('#62676b');
        roadFrame(k, b.s, 0, 0);
        const backZ = -.32;
        // Columns: a pair of steel legs braced together, on concrete footings with their own small crash protection
        for (const dir of [-1, 1]) {
            const x = dir * side;
            k.box('concrete', x - .75, -.4, backZ - 1.05, x + .75, .75, backZ + 1.05, rgb('#d9d4c6', 1.25), { tex: 2.2, lo: .78 });
            const top = beamY + .8;
            for (const dz of [-.6, .6]) {
                k.tube('steel', x, .7, backZ + dz, x, top, backZ + dz, .13, .11, 8, steel);
            }
            // Bracing between the legs
            const n = Math.max(3, Math.floor((top - 1) / 1.5));
            for (let i = 0; i < n; i++) {
                const a = 1 + (top - 1) * i / n, c = 1 + (top - 1) * (i + 1) / n;
                k.tube('steel', x, a, backZ - .6, x, c, backZ + .6, .035, .035, 4, dark);
                k.tube('steel', x, c, backZ - .6, x, c, backZ + .6, .03, .03, 4, dark);
            }
        }
        // The truss spanning the road
        const hh = .55, dd = .42;
        const X0 = -side, X1 = side;
        for (const yo of [-hh, hh]) { for (const zo of [-dd, dd]) { k.tube('steel', X0, beamY + yo, backZ + zo, X1, beamY + yo, backZ + zo, .065, .065, 6, steel); } }
        const bays = Math.round((X1 - X0) / 1.5);
        for (let i = 0; i < bays; i++) {
            const a = X0 + (X1 - X0) * i / bays, c = X0 + (X1 - X0) * (i + 1) / bays;
            k.tube('steel', a, beamY - hh, backZ + dd, c, beamY + hh, backZ + dd, .025, .025, 3, dark);
            k.tube('steel', a, beamY + hh, backZ - dd, c, beamY - hh, backZ - dd, .025, .025, 3, dark);
            k.tube('steel', c, beamY - hh, backZ - dd, c, beamY - hh, backZ + dd, .022, .022, 3, dark);
            k.tube('steel', c, beamY + hh, backZ - dd, c, beamY + hh, backZ + dd, .022, .022, 3, dark);
        }
        // Back of the board and its colour: seen from far away, or as it passes overhead
        const col = rgb(b.green ? '#0a5a43' : '#0b4280');
        const W = R.BOARD_W / 2;
        k.quad('gloss', [-W, R.CLEARANCE, .01], [W, R.CLEARANCE, .01], [W, hgt, .01], [-W, hgt, .01], col, null, [0, 0, 1]);
        k.quad('steel', [W, R.CLEARANCE, -.04], [-W, R.CLEARANCE, -.04], [-W, hgt, -.04], [W, hgt, -.04], rgb('#8c9195'), null, [0, 0, -1]);
        k.box('plain', -W, R.CLEARANCE - .03, -.06, W, R.CLEARANCE, .03, rgb('#70757a'));
        // Upright stiffeners and lights that shine up onto the board after dark
        for (let i = 0; i <= 5; i++) {
            const x = -W + 2 * W * i / 5;
            k.box('steel', x - .05, R.CLEARANCE, -.2, x + .05, hgt, -.05, rgb('#7c8185'), { skip: 'f' });
        }
        for (const x of [-W * .6, 0, W * .6]) {
            k.box('plain', x - .35, R.CLEARANCE - .28, .25, x + .35, R.CLEARANCE - .16, .55, rgb('#34383c'));
            k.box('nightlamp', x - .3, R.CLEARANCE - .165, .28, x + .3, R.CLEARANCE - .155, .52, [5, 4.8, 4.2], {});
        }
        void L;
    }
    // The gantry a visitor passes under on a side road, just before arriving at a page
    function arrivalGantry(k, s, t, side, width) {
        // A plain frame: two posts and one beam, with the board's colour on it
        const steel = rgb('#9ca2a6');
        const o = R.at(s, t, 0), th = o.th + (side > 0 ? Math.PI / 2 : side < 0 ? -Math.PI / 2 : 0);
        const cx = Math.cos(th), sx = Math.sin(th);
        k.frame(o.x, o.y, o.z, cx, 0, sx, 0, 1, 0, -sx, 0, cx);
        for (const dir of [-1, 1]) {
            k.tube('steel', dir * width, 0, -.2, dir * width, 8.6, -.2, .13, .11, 8, steel);
            k.box('concrete', dir * width - .4, -.2, -.6, dir * width + .4, .55, .2, rgb('#9a968a'), { tex: 2.2, lo: .72 });
        }
        k.tube('steel', -width, 7.5, -.2, width, 7.5, -.2, .09, .09, 6, steel);
        k.tube('steel', -width, 8.3, -.2, width, 8.3, -.2, .09, .09, 6, steel);
    }

    /* A low painted wall each side of the road where it crosses a small drain, seen every few kilometres on Indian highways */
    function culvert(k, s) {
        const wc = rgb('#e6e4da'), bc = rgb('#1b1c1e');
        for (const side of [-1, 1]) {
            const t = side * (D.Roadworks.edgeOf(s) + .35);
            roadFrame(k, s, t, -.05);
            k.box('concrete', -.2, -.6, -3, .2, .62, 3, wc, { tex: 2, skip: 'b' });
            for (let i = -3; i < 3; i += 1) { if ((i + 3) % 2 === 0) { k.box('plain', -.205, .08, i, .205, .625, i + 1, bc, { skip: 'b' }); } }
        }
    }
    /* A round stack of hay, as kept in Gujarat's farmyards */
    function hayStack(k, s, t, r, h) {
        const y = R.groundAt(s, t) - R.elev(s) - .05;
        roadFrame(k, s, t, y);
        const c = rgb('#c4a763', 1.25);
        k.tube('rough', 0, 0, 0, 0, h * .52, 0, r, r * .92, 12, shade(c, .85), { tex: 1.3, colB: c });
        k.tube('rough', 0, h * .52, 0, 0, h * .9, 0, r * .92, r * .4, 12, c, { tex: 1.3, colB: rgb('#d8bd7a', 1.2) });
        k.tube('rough', 0, h * .9, 0, 0, h, 0, r * .4, .02, 8, rgb('#d8bd7a', 1.2), { tex: 1.3 });
    }
    /* A village's water tank, standing tall on concrete legs */
    function waterTower(k, s, t) {
        const y = R.groundAt(s, t) - R.elev(s) - .1;
        roadFrame(k, s, t, y);
        const c = rgb('#cfcabb', 1.1), H = 15;
        for (const a of [0, 1, 2, 3, 4, 5]) {
            const x = Math.cos(a * 1.047) * 3.4, z = Math.sin(a * 1.047) * 3.4;
            k.tube('concrete', x, 0, z, x * .9, H, z * .9, .24, .2, 6, c, { tex: 2 });
        }
        for (const ly of [5, 10]) {
            for (const a of [0, 1, 2, 3, 4, 5]) {
                const f = 1 - ly / H * .1;
                k.tube('concrete', Math.cos(a * 1.047) * 3.4 * f, ly, Math.sin(a * 1.047) * 3.4 * f, Math.cos((a + 1) * 1.047) * 3.4 * f, ly, Math.sin((a + 1) * 1.047) * 3.4 * f, .13, .13, 4, c, { tex: 2 });
            }
        }
        k.tube('concrete', 0, H, 0, 0, H + 1, 0, 3, 4.6, 12, c, { tex: 2.4 });
        k.tube('concrete', 0, H + 1, 0, 0, H + 4.2, 0, 4.6, 4.6, 12, rgb('#dcd8ca', 1.15), { tex: 2.4 });
        k.tube('concrete', 0, H + 4.2, 0, 0, H + 5.1, 0, 4.7, .6, 12, c, { tex: 2.4 });
    }
    /* A steel lattice tower of a high-voltage line, crossing the fields */
    function pylon(k, s, t, yaw) {
        const y = R.groundAt(s, t) - R.elev(s) - .2;
        roadFrame(k, s, t, y, yaw || 0);
        const c = rgb('#7f858a'), H = 34, w0 = 4.2, w1 = .9;
        const at = (h) => w0 + (w1 - w0) * Math.pow(Math.min(1, h / (H * .72)), .75);
        const N = 7;
        for (const a of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
            let last = 0;
            for (let i = 1; i <= N; i++) {
                const h = H * i / N;
                k.bar('steel', a[0] * at(last), last, a[1] * at(last), a[0] * at(h), h, a[1] * at(h), .13, c);
                last = h;
            }
        }
        for (let i = 0; i < N; i++) {
            const h0 = H * i / N, h1 = H * (i + 1) / N, a = at(h0), b = at(h1);
            k.bar('steel', -a, h0, -a, b, h1, -b, .06, c); k.bar('steel', a, h0, -a, -b, h1, -b, .06, c);
            k.bar('steel', -a, h0, a, -b, h1, -b, .06, c); k.bar('steel', a, h0, a, b, h1, -b, .06, c);
        }
        for (const q of [.7, .84, .98]) {
            const h = H * q, L = 6.5;
            k.bar('steel', -L, h, 0, L, h, 0, .12, c);
            k.bar('steel', -L, h, 0, 0, h + 1.6, 0, .07, c); k.bar('steel', L, h, 0, 0, h + 1.6, 0, .07, c);
        }
    }

    /* ---------- Glows: soft halos around lights, facing the viewer ---------- */
    const GLOW_VS = `
attribute vec2 aCorner; attribute vec4 aData;
varying vec2 vC; varying vec3 vCol; varying float vGate; varying float vFade;
uniform float uHy;
void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float d = -mv.z;
    float size = aData.w;
    mv.xy += aCorner * size;
    vC = aCorner;
    vCol = aData.rgb;
    vGate = aCorner.x * 0.0 + color.r;
    vFade = smoothstep(2.0, 8.0, d) * mix(1.0, .32, smoothstep(50.0, 240.0, d));
    gl_Position = projectionMatrix * mv;
}`;
    const GLOW_FS = `
varying vec2 vC; varying vec3 vCol; varying float vGate; varying float vFade;
uniform float uLampOn; uniform vec3 fogColor; uniform float fogDensity;
void main() {
    float r = length(vC);
    float g = pow(max(0.0, 1.0 - r), 2.6);
    float on = mix(1.0, uLampOn, vGate);
    gl_FragColor = vec4(vCol * g * on * vFade, 1.0);
}`;
    function glowMaterial() {
        return new THREE.ShaderMaterial({
            vertexShader: GLOW_VS, fragmentShader: GLOW_FS, transparent: true, depthWrite: false, depthTest: true,
            blending: THREE.AdditiveBlending, vertexColors: true, toneMapped: false,
            uniforms: { uLampOn: D.Materials.U.uLampOn, uHy: { value: 0 }, fogColor: { value: new THREE.Color() }, fogDensity: { value: 0 } }
        });
    }
    class GlowBatch {
        constructor() { this.p = []; this.c = []; this.d = []; this.g = []; this.i = []; this.n = 0; }
        // gate 1: only after dark; 0: always
        add(x, y, z, r, g, b, size, gate) {
            const b0 = this.n * 4;
            const C = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
            for (let i = 0; i < 4; i++) {
                this.p.push(x, y, z); this.c.push(C[i][0], C[i][1]); this.d.push(r, g, b, size); this.g.push(gate, gate, gate);
            }
            this.i.push(b0, b0 + 1, b0 + 2, b0, b0 + 2, b0 + 3);
            this.n++;
        }
        build(mat) {
            if (!this.n) { return null; }
            const g = new THREE.BufferGeometry();
            g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.p), 3));
            g.setAttribute('aCorner', new THREE.BufferAttribute(new Float32Array(this.c), 2));
            g.setAttribute('aData', new THREE.BufferAttribute(new Float32Array(this.d), 4));
            g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(this.g), 3));
            g.setIndex(this.i);
            g.computeBoundingSphere();
            g.boundingSphere.radius += 6;
            const m = new THREE.Mesh(g, mat);
            m.renderOrder = 5;
            m.matrixAutoUpdate = false;
            return m;
        }
    }

    D.Furniture = {
        fuelPlate, cableRun, culvert, hayStack, waterTower, pylon, roadFrame, roadSignAtlas, postSign, placeBoardSign, kmStone, electricPole, wires, streetLight, wBeam, delineator, roadStud, guardRail, bollard, treeGuard, bench, busStop, cabinet, junctionSignals, gantry, arrivalGantry, GlowBatch, glowMaterial
    };
})();
