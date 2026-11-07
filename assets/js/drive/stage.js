/*
 * What the visitor does on the Home page: scrolling along the road, the boards with their real text and links,
 * the upcoming board softly out of focus behind the current one, the route controls, and turning off at a junction.
 * All of this works before the 3D world has loaded; the world is attached when it is ready.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const R = D.Route;

    const HOLD = 45, MOVE = 75;     // scroll, in screen heights x 100: how long the road pauses at a board, and how long it travels between boards

    function esc(s) { return String(s === null || s === undefined ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    // A CSS transform that maps a flat element of size w x h onto four corners on screen
    function quadTransform(w, h, p) {
        const x0 = p[0][0], y0 = p[0][1], x1 = p[1][0], y1 = p[1][1], x2 = p[2][0], y2 = p[2][1], x3 = p[3][0], y3 = p[3][1];
        const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
        const den = dx1 * dy2 - dx2 * dy1 || 1e-9;
        const g = (dx3 * dy2 - dx2 * dy3) / den, hh = (dx1 * dy3 - dx3 * dy1) / den;
        const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3;
        if (Math.abs(g) < 2e-6 && Math.abs(hh) < 2e-6) {
            return 'matrix(' + (a / w).toFixed(5) + ',' + (d / w).toFixed(5) + ',' + (b / h).toFixed(5) + ',' + (e / h).toFixed(5) + ',' + x0.toFixed(2) + ',' + y0.toFixed(2) + ')';
        }
        return 'matrix3d(' + [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, x0, y0, 0, 1].map(function (v) { return +v.toFixed(7); }).join(',') + ')';
    }

    function createStage(o) {
        const boards = o.boards, drive = o.drive, stageEl = o.stage, $ = (id) => document.getElementById(id);
        const hint = $('hint'), trip = $('trip');
        boards.forEach((b, i) => { b.i = i; b.s = R.BOARD_S[i]; b.green = b.el.classList.contains('board-green'); b.last = {}; });
        let view = null, VH = 8, KEYS = [], TOTAL = 0;
        let cam = 0, target = 0, lastDrawn = null, lastTime = performance.now();
        let engine = null, moving = false, lastMoved = 0, current = -1, pendingFocus = null, reading = -1;
        const pose = { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0, hy: 0 };
        let turn = null, stopped = false;
        let gantrySig = '';

        /* ---------- Scroll position to distance along the road: a pause at each board, then a smooth drive to the next ---------- */
        function buildRoute() {
            const last = boards.length - 1;
            KEYS = [];
            let v = 0;
            boards.forEach((b, n) => {
                const stop = b.s - b.rest;
                KEYS.push({ v: v, c: stop - 3, ease: n > 0 });
                b.v = v;
                b.stopV = v + HOLD * .92;
                b.stop = stop;
                v += HOLD;
                KEYS.push({ v: v, c: stop, ease: false });
                if (n < last) { v += MOVE; }
                b.el.setAttribute('data-stop-v', String(b.stopV));
            });
            TOTAL = v;
            drive.style.height = Math.round((TOTAL + 100) * VH + 58) + 'px';
        }
        function layout() {
            const r = stageEl.getBoundingClientRect();
            const W = r.width, H = r.height;
            view = R.viewFor(W, H);
            VH = window.innerHeight / 100;
            boards.forEach((b) => {
                b.domW = b.el.offsetWidth;
                b.domH = b.el.offsetHeight;
                const fit = R.fitBoard(view, b.domW / Math.max(1, b.domH));
                b.rest = fit.rest; b.boardH = fit.boardH;
            });
            buildRoute();
            if (engine) { engine.setView(W, H); syncGantries(); }
            lastDrawn = null;
        }
        function syncGantries() {
            const sig = boards.map((b) => b.boardH.toFixed(1)).join(',');
            if (sig !== gantrySig && engine) { gantrySig = sig; engine.world.setBoards(boards); }
        }
        function scrollV() { return Math.max(0, Math.min(TOTAL, -drive.getBoundingClientRect().top / VH)); }
        function camAt(v) {
            for (let i = 1; i < KEYS.length; i++) {
                if (v <= KEYS[i].v) {
                    const a = KEYS[i - 1], b = KEYS[i];
                    let t = (v - a.v) / (b.v - a.v);
                    if (b.ease) { t = t * t * t * (t * (t * 6 - 15) + 10); }
                    return a.c + (b.c - a.c) * t;
                }
            }
            return KEYS[KEYS.length - 1].c;
        }

        /* ---------- The camera on the main road ---------- */
        function roadPose(c, p) {
            const o = R.at(c, 0, R.CAM_H);
            p.x = o.x; p.y = o.y; p.z = o.z;
            // Looking a little ahead through bends, as a driver does
            p.yaw = R.heading(c) * .55 + R.heading(c + 16) * .45;
            p.pitch = Math.atan((R.elev(c + 18) - R.elev(c)) / 18) * .7;
            p.roll = (R.heading(c + 6) - R.heading(c - 6)) * -.18;
            // The gaze comes up to read a board and settles lower while driving
            let near = 1e9;
            for (const b of boards) { near = Math.min(near, Math.abs(c - b.stop)); }
            p.hy = R.mix(view.stopY, view.driveY, R.smooth(1, 26, near));
        }
        const basis = { rx: 1, ry: 0, rz: 0, ux: 0, uy: 1, uz: 0, fx: 0, fy: 0, fz: -1 };
        function setBasis(p) {
            const cy = Math.cos(p.yaw), sy = Math.sin(p.yaw), cp = Math.cos(p.pitch), sp = Math.sin(p.pitch);
            const fx = sy * cp, fy = sp, fz = -cy * cp;
            const r0x = cy, r0z = sy;
            // up = right x forward
            const u0x = -r0z * fy, u0y = r0z * fx - r0x * fz, u0z = r0x * fy;
            const cr = Math.cos(p.roll || 0), sr = Math.sin(p.roll || 0);
            basis.rx = r0x * cr + u0x * sr; basis.ry = u0y * sr; basis.rz = r0z * cr + u0z * sr;
            basis.ux = -r0x * sr + u0x * cr; basis.uy = u0y * cr; basis.uz = -r0z * sr + u0z * cr;
            basis.fx = fx; basis.fy = fy; basis.fz = fz;
        }
        // Where a point in the world lands on screen. Returns null if it is behind the camera.
        function project(x, y, z, p) {
            const dx = x - p.x, dy = y - p.y, dz = z - p.z;
            const zc = dx * basis.fx + dy * basis.fy + dz * basis.fz;
            if (zc < .7) { return null; }
            const xc = dx * basis.rx + dy * basis.ry + dz * basis.rz, yc = dx * basis.ux + dy * basis.uy + dz * basis.uz;
            return [view.CX + view.F * xc / zc, p.hy - view.F * yc / zc];
        }

        /* ---------- Placing the boards ---------- */
        function hideBoard(b) {
            if (b.last.vis !== 0) { b.el.style.visibility = 'hidden'; b.last.vis = 0; b.el.classList.remove('board-live'); }
        }
        function placeBoards(c, p, settled) {
            setBasis(p);
            const W2 = R.BOARD_W / 2, ax = {};
            let nearest = -1;
            for (let i = 0; i < boards.length; i++) { if (boards[i].s - c > 2.6) { nearest = i; break; } }
            boards.forEach((b, i) => {
                const d = b.s - c;
                // Only the board ahead and the one behind it are shown as real text; further ones are simple shapes in the 3D world
                if (nearest < 0 || i < nearest || i > nearest + 1 || d > 280 || turn) { if (!(turn && i === turn.board)) { hideBoard(b); return; } }
                const o = R.at(b.s, 0, R.CLEARANCE, ax), cx = Math.cos(o.th), sx = Math.sin(o.th);
                const top = o.y + b.boardH, bot = o.y;
                const q0 = project(o.x - cx * W2, top, o.z - sx * W2, p), q1 = project(o.x + cx * W2, top, o.z + sx * W2, p);
                const q2 = project(o.x + cx * W2, bot, o.z + sx * W2, p), q3 = project(o.x - cx * W2, bot, o.z - sx * W2, p);
                if (!q0 || !q1 || !q2 || !q3) { hideBoard(b); return; }
                const k = (q1[0] - q0[0]) / b.domW;
                const near = Math.min(1, Math.max(0, (d - 2.8) / 6.5));
                let opacity = near * near * (3 - 2 * near) * Math.min(1, (280 - d) / 30);
                if (turn && i === turn.board) { opacity *= Math.max(0, 1 - turn.tau * 3); }
                if (b.last.vis !== 1) { b.el.style.visibility = 'visible'; b.last.vis = 1; b.el.classList.add('board-live'); }
                if (Math.abs((b.last.op || 0) - opacity) > .004) { b.el.style.opacity = opacity.toFixed(3); b.last.op = opacity; }
                // The further the board, the softer it is: only the one being read is in focus
                const sharpAt = b.rest + 4;
                const screenBlur = Math.min(2.7, Math.max(0, d - sharpAt) * .036);
                const localBlur = k > .01 ? screenBlur / Math.abs(k) : 0;
                const fv = Math.round(localBlur * 4) / 4;
                if (b.last.blur !== fv) { b.el.style.filter = fv > 0 ? 'blur(' + fv + 'px)' : 'none'; b.last.blur = fv; }
                const active = !turn && i === nearest && opacity >= .6 && k >= .4;
                if (b.last.active !== active) {
                    b.el.style.pointerEvents = active ? 'auto' : 'none';
                    b.el.inert = !active;
                    b.last.active = active;
                }
                const z = String(1000 - Math.round(d));
                if (b.last.z !== z) { b.el.style.zIndex = z; b.last.z = z; }
                // When stopped, sit on whole pixels so the words are perfectly crisp
                let points = [q0, q1, q2, q3];
                if (settled && i === nearest) {
                    const dxr = Math.round(q0[0]) - q0[0], dyr = Math.round(q0[1]) - q0[1];
                    points = points.map((pt) => [pt[0] + dxr, pt[1] + dyr]);
                }
                b.el.style.transform = quadTransform(b.domW, b.domH, points);
                b.el.classList.toggle('board-moving', !settled);
            });
        }

        /* ---------- Route controls ---------- */
        const routeList = $('route-list'), miniLabel = $('mini-label'), miniPrev = $('mini-prev'), miniNext = $('mini-next');
        routeList.innerHTML = boards.map((b, i) => '<li><button type="button" data-go="' + i + '" aria-label="Go to ' + esc(b.label) + '"><span class="lbl">' + esc(b.label) + '</span><span class="dot"></span></button></li>').join('');
        const routeItems = [].slice.call(routeList.children);
        function stopIndex(c) {
            for (let i = 0; i < boards.length; i++) { if (boards[i].s - c > 6) { return i; } }
            return boards.length - 1;
        }
        function goTo(i, behaviour) {
            const b = boards[Math.max(0, Math.min(boards.length - 1, i))];
            const top = drive.getBoundingClientRect().top + window.scrollY + b.stopV * VH;
            window.scrollTo({ top: top, behavior: behaviour || 'smooth' });
        }
        function markStop(c) {
            const i = stopIndex(c);
            if (i === current) { return; }
            current = i;
            routeItems.forEach((li, n) => { li.classList.toggle('on', n === i); });
            miniLabel.textContent = (i + 1) + ' of ' + boards.length + ': ' + boards[i].label;
            miniPrev.disabled = i === 0;
            miniNext.disabled = i === boards.length - 1;
        }
        routeList.addEventListener('click', (e) => {
            const btn = e.target.closest ? e.target.closest('button[data-go]') : null;
            if (btn) {
                goTo(+btn.getAttribute('data-go'));
                if (e.detail === 0) { pendingFocus = +btn.getAttribute('data-go'); }
            }
        });
        miniPrev.addEventListener('click', () => { goTo(current - 1); });
        miniNext.addEventListener('click', () => { goTo(current + 1); });

        /* ---------- Directions on the boards ---------- */
        // The "straight on" arrow takes the main road to the next board
        boards.forEach((b, i) => {
            b.el.addEventListener('click', (e) => {
                const way = e.target.closest ? e.target.closest('[data-ahead]') : null;
                if (way) {
                    e.preventDefault();
                    goTo(i + 1);
                    if (e.detail === 0) { pendingFocus = i + 1; }
                    return;
                }
                const link = e.target.closest ? e.target.closest('a[data-turn]') : null;
                if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) { return; }
                if (!engine) { return; }
                e.preventDefault();
                startTurn(i, link.getAttribute('data-turn'), link.href, link.getAttribute('data-to') || link.textContent.trim());
            });
        });

        /* ---------- Turning off at a junction ---------- */
        const arrival = $('arrival'), veil = $('exit-veil');
        function bezier(a, b, c, d, t) {
            const u = 1 - t;
            return [u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]];
        }
        function buildTurnPath(c0, j, dir) {
            const pts = [];
            const side = dir === 'right' ? 1 : dir === 'left' ? -1 : 0;
            if (!side) {
                // Straight on, through the junction
                for (let s = c0; s < j.s + 150; s += 2) { pts.push([s, 0]); }
                return pts;
            }
            const e = D.Roadworks ? D.Roadworks.edgeOf(j.s) : R.halfWidth(j.s) + 1;
            const a = j.hw + j.r + 7, lat = side * Math.min(j.hw * .5, 3.4), bt = e + j.r + 9;
            const P0 = [j.s - a, 0], P1 = [j.s - a * .22, 0], P2 = [j.s + lat, side * (bt * .28)], P3 = [j.s + lat, side * bt];
            for (let s = c0; s < P0[0]; s += 2) { pts.push([s, 0]); }
            for (let i = 0; i <= 40; i++) { pts.push(bezier(P0, P1, P2, P3, i / 40)); }
            for (let q = bt + 2; q <= 165; q += 3) { pts.push([j.s + lat, side * q]); }
            return pts;
        }
        const blockScroll = (e) => { e.preventDefault(); };
        function holdScroll(on) {
            const act = on ? 'addEventListener' : 'removeEventListener';
            window[act]('wheel', blockScroll, { passive: false });
            window[act]('touchmove', blockScroll, { passive: false });
        }
        function startTurn(i, dir, href, label) {
            if (turn) { return; }
            holdScroll(true);
            const j = R.JUNCTIONS[i];
            if (dir !== 'straight' && !(dir === 'right' ? j.right : j.left)) { window.location.href = href; return; }
            const pts = buildTurnPath(cam, j, dir);
            // World positions and running distance along the path
            const path = [];
            let L = 0, prev = null;
            const tmp = {};
            for (const p of pts) {
                R.at(p[0], p[1], R.CAM_H, tmp);
                const q = { x: tmp.x, y: tmp.y, z: tmp.z, s: p[0], d: 0 };
                if (prev) { L += Math.hypot(q.x - prev.x, q.z - prev.z); }
                q.d = L;
                path.push(q);
                prev = q;
            }
            const T = Math.max(3400, Math.min(5200, L / .034));
            turn = { board: i, dir, j, path, L, T, t0: performance.now(), tau: 0, href, label, startHy: pose.hy, hi: 0 };
            try { sessionStorage.setItem('trc-arrival', JSON.stringify({ dir: dir, from: boards[i].label, i: i, t: Date.now() })); } catch (err) { /* Only a small welcome note depends on this */ }
            const link = document.createElement('link');
            link.rel = 'prefetch'; link.href = href;
            document.head.appendChild(link);
            setupArrivalPlate(j, dir, label);
            stageEl.classList.add('is-turning');
            veil.hidden = false;
            announce(dir === 'straight' ? 'Driving straight on to ' + label : 'Turning ' + dir + ' for ' + label);
        }
        function setupArrivalPlate(j, dir, label) {
            arrival.querySelector('.arrival-name').textContent = label;
            arrival.className = 'arrival arrival-' + dir;
            arrival.hidden = false;
            const side = dir === 'right' ? 1 : dir === 'left' ? -1 : 0;
            const th = R.heading(j.s), a = th + side * Math.PI / 2;
            const lat = side ? side * Math.min(j.hw * .5, 3.4) : 0;
            const c = side ? R.at(j.s + lat * 0, side * 92, 0) : R.at(j.s + 92, 0, 0);
            turn.plate = {
                cx: c.x, y: c.y + 5.9, cz: c.z, ax: Math.cos(a), az: Math.sin(a), w: 2 * Math.max(4.6, j.hw + .6),
                domW: arrival.offsetWidth, domH: arrival.offsetHeight
            };
            turn.plate.h = turn.plate.w * turn.plate.domH / turn.plate.domW;
        }
        function placePlate(p) {
            const pl = turn.plate;
            if (!pl) { return; }
            const hw = pl.w / 2;
            const q0 = project(pl.cx - pl.ax * hw, pl.y + pl.h, pl.cz - pl.az * hw, p), q1 = project(pl.cx + pl.ax * hw, pl.y + pl.h, pl.cz + pl.az * hw, p);
            const q2 = project(pl.cx + pl.ax * hw, pl.y, pl.cz + pl.az * hw, p), q3 = project(pl.cx - pl.ax * hw, pl.y, pl.cz - pl.az * hw, p);
            if (!q0 || !q1 || !q2 || !q3) { arrival.style.visibility = 'hidden'; return; }
            arrival.style.visibility = 'visible';
            arrival.style.transform = quadTransform(pl.domW, pl.domH, [q0, q1, q2, q3]);
        }
        function turnPose(now) {
            const t = turn;
            t.tau = Math.min(1, (now - t.t0) / t.T);
            // Pulling away, then running on at a steady speed
            const x = t.tau, ease = x * x * (2.15 - 1.15 * x);
            const dist = t.L * ease;
            const P = t.path;
            let i = t.hi;
            while (i < P.length - 2 && P[i + 1].d < dist) { i++; }
            t.hi = i;
            const a = P[i], b = P[i + 1] || a;
            const f = b.d > a.d ? (dist - a.d) / (b.d - a.d) : 0;
            pose.x = a.x + (b.x - a.x) * f; pose.y = a.y + (b.y - a.y) * f; pose.z = a.z + (b.z - a.z) * f;
            // Look a few metres along the path
            const lookD = dist + 9;
            let k = i;
            while (k < P.length - 2 && P[k + 1].d < lookD) { k++; }
            const la = P[Math.min(k + 1, P.length - 1)];
            const yaw = Math.atan2(la.x - pose.x, -(la.z - pose.z));
            pose.roll = t.lastYaw === undefined ? 0 : R.clamp((yaw - t.lastYaw) * -.5, -.024, .024);
            pose.yaw = yaw;
            t.lastYaw = yaw;
            pose.pitch = 0;
            pose.hy = R.mix(t.startHy, view.driveY, R.smooth(0, .22, x));
            return a.s + (b.s - a.s) * f;
        }
        function finishTurn() {
            const href = turn.href;
            stopped = true;
            window.location.href = href;
        }
        function cancelTurn() {
            if (!turn) { return; }
            turn = null;
            holdScroll(false);
            if (stopped) { stopped = false; lastTime = performance.now(); requestAnimationFrame(frame); }
            stageEl.classList.remove('is-turning');
            veil.hidden = true;
            veil.style.opacity = 0;
            arrival.hidden = true;
            lastDrawn = null;
            cam = target = camAt(scrollV());
            boards.forEach((b) => { b.last = {}; });
            try { sessionStorage.removeItem('trc-arrival'); } catch (err) { /* nothing to undo */ }
        }
        // Escape cancels a turn. Scrolling does nothing during one, which lasts only a few seconds.
        window.addEventListener('keydown', (e) => {
            if (!turn) { return; }
            if (e.key === 'Escape') { cancelTurn(); } else if ([' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].indexOf(e.key) >= 0) { e.preventDefault(); }
        });
        // Coming back with the browser's Back button: straight back to the board, with no leftovers of the turn
        window.addEventListener('pageshow', (e) => { if (e.persisted || turn) { cancelTurn(); } });

        const live = $('drive-live');
        function announce(text) { if (live) { live.textContent = text; } }

        /* ---------- Keeping the drive smooth on any computer ---------- */
        let level = 0, slowList = [], watchFrom = performance.now() + 2500;
        const KEEP_DETAIL = location.hash === '#hq';
        function watchSpeed(now, dt) {
            if (KEEP_DETAIL || !engine || !moving || now < watchFrom || document.hidden) { return; }
            slowList.push(dt);
            if (slowList.length < 45) { return; }
            slowList.sort((a, b) => a - b);
            const typical = slowList[slowList.length >> 1];
            slowList = [];
            if (typical < 36 || level >= 5) { return; }
            level++;
            watchFrom = now + 1800;
            engine.stepDown(level);
            lastDrawn = null;
        }

        /* ---------- Each frame ---------- */
        function frame() {
            if (stopped) { return; }
            requestAnimationFrame(frame);
            const now = performance.now(), dt = Math.min(120, now - lastTime);
            lastTime = now;
            if (turn) {
                const s = turnPose(now);
                placeBoards(cam, pose, false);
                placePlate(pose);
                veil.style.opacity = R.smooth(.78, .985, turn.tau).toFixed(3);
                if (engine) { engine.draw(pose, Math.min(s, turn.j.s), { moving: true, turning: true, turnJunction: turn.j.i, detailAround: turn.j.s }); }
                if (turn.tau >= 1) { finishTurn(); }
                return;
            }
            const v = scrollV(), was = target;
            target = camAt(v);
            if (Math.abs(target - was) > 150) { cam = target; }
            cam += (target - cam) * (1 - Math.exp(-dt / 230));
            if (Math.abs(target - cam) < .004) { cam = target; }
            const movingNow = Math.abs(target - cam) > .08;
            if (movingNow) { lastMoved = now; }
            const wasMoving = moving;
            moving = movingNow || now - lastMoved < 180;
            const camChanged = cam !== lastDrawn;
            if (camChanged || wasMoving !== moving) {
                roadPose(cam, pose);
                placeBoards(cam, pose, !moving);
                hint.style.opacity = v > 6 ? 0 : 1;
                trip.textContent = 'TRIP ' + (Math.max(0, cam) / 1000).toFixed(2) + ' KM';
                markStop(cam);
            }
            // The graphics chip rests when nothing has changed; a few frames still go out while new stretches of road are being built
            if (engine && (camChanged || engine.world.pending)) {
                roadPose(cam, pose);
                engine.draw(pose, cam, { moving: moving });
            }
            lastDrawn = cam;
            updateReading();
            watchSpeed(now, dt);
            if (pendingFocus !== null && Math.abs(boards[pendingFocus].stop - cam) < 1.5) {
                const firstLink = boards[pendingFocus].el.querySelector('a, button');
                if (firstLink) { firstLink.focus({ preventScroll: true }); }
                pendingFocus = null;
            }
        }
        function updateReading() {
            let at = -1;
            boards.forEach((b, i) => { if (Math.abs(b.stop - cam) < 3.6 && Math.abs(target - cam) < 1.2) { at = i; } });
            if (at === reading) { return; }
            reading = at;
            stageEl.classList.toggle('is-reading', at >= 0);
            stageEl.classList.toggle('is-first', at === 0);
        }

        /* ---------- Starting ---------- */
        layout();
        const fromHash = /^#stop-(\d+)$/.exec(location.hash);
        if (fromHash) { goTo(+fromHash[1], 'instant'); }
        target = camAt(scrollV());
        cam = target;
        roadPose(cam, pose);
        placeBoards(cam, pose, true);
        markStop(cam);
        requestAnimationFrame(frame);

        const stage = {
            layout: layout,
            attachEngine(e) {
                engine = e;
                layout();
                // Glide in over the last few metres as the world appears
                cam = target - (scrollV() < 4 ? 16 : 0);
                roadPose(cam, pose);
                engine.draw(pose, cam, { moving: true, forceAll: true });
                lastDrawn = null;
                watchFrom = performance.now() + 2500;
            },
            // The graphics chip has reset: the boards carry on over the still picture
            worldLost() {
                engine = null;
                stageEl.classList.remove('world-ready');
                stageEl.classList.add('world-failed');
            },
            currentCam() { return cam; },
            startTurn: startTurn,
            turning() { return !!turn; },
            goTo: goTo,
            debug() { return { cam, target, turn, boards, view, pose, level, engine, keys: KEYS }; }
        };
        return stage;
    }

    D.createStage = createStage;
})();
