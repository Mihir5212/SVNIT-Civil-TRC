/*
 * A small geometry kit for building the road world in code: boxes, panels, tubes and ribbons are added to buckets,
 * one bucket per material, and each bucket becomes a single efficient mesh. Parts can carry colour and baked shading.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};

    // Colours are written as ordinary hex values and converted to the linear values the renderer works in
    const cache = new Map();
    function rgb(hex, gain) {
        const key = hex + '|' + (gain || 1);
        let c = cache.get(key);
        if (!c) {
            const n = parseInt(hex.slice(1), 16);
            const f = (v) => { v /= 255; return v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
            const g = gain || 1;
            c = [f(n >> 16 & 255) * g, f(n >> 8 & 255) * g, f(n & 255) * g];
            cache.set(key, c);
        }
        return c;
    }
    function shade(c, k) { return [c[0] * k, c[1] * k, c[2] * k]; }
    function mixc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

    // A small repeatable random number generator, so the world is the same on every visit
    function Rng(seed) {
        let s = (seed * 2654435761 >>> 0) || 1;
        const r = function () {
            s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
            return s / 4294967296;
        };
        r.range = (a, b) => a + (b - a) * r();
        r.int = (a, b) => Math.floor(a + (b - a + 1) * r());
        r.pick = (list) => list[Math.floor(r() * list.length)];
        r.chance = (p) => r() < p;
        return r;
    }

    class Bucket {
        constructor() { this.p = []; this.n = []; this.uv = []; this.c = []; this.i = []; this.w = null; this.count = 0; }
    }

    class Kit {
        constructor() {
            this.buckets = new Map();
            // Current frame: origin, then the x, y and z axes (always upright rotations)
            this.m = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];
            this.stack = [];
            this.uoff = 0; this.voff = 0;
        }
        bucket(name) {
            let b = this.buckets.get(name);
            if (!b) { b = new Bucket(); this.buckets.set(name, b); }
            return b;
        }
        push() { this.stack.push(this.m.slice()); return this; }
        pop() { this.m = this.stack.pop(); return this; }
        // Set a frame in world coordinates
        frame(ox, oy, oz, xx, xy, xz, yx, yy, yz, zx, zy, zz) { this.m = [ox, oy, oz, xx, xy, xz, yx, yy, yz, zx, zy, zz]; return this; }
        // Enter a child frame, written in the current frame's coordinates
        into(ox, oy, oz, ax, ay, az, bx, by, bz, cx, cy, cz) {
            const m = this.m, o = this.tp(ox, oy, oz), x = this.td(ax, ay, az), y = this.td(bx, by, bz), z = this.td(cx, cy, cz);
            this.m = [o[0], o[1], o[2], x[0], x[1], x[2], y[0], y[1], y[2], z[0], z[1], z[2]];
            void m;
            return this;
        }
        translate(x, y, z) { const o = this.tp(x, y, z); this.m[0] = o[0]; this.m[1] = o[1]; this.m[2] = o[2]; return this; }
        // Turn around the frame's vertical axis
        yaw(a) {
            const c = Math.cos(a), s = Math.sin(a), m = this.m;
            const xx = m[3] * c + m[9] * s, xy = m[4] * c + m[10] * s, xz = m[5] * c + m[11] * s;
            const zx = -m[3] * s + m[9] * c, zy = -m[4] * s + m[10] * c, zz = -m[5] * s + m[11] * c;
            m[3] = xx; m[4] = xy; m[5] = xz; m[9] = zx; m[10] = zy; m[11] = zz;
            return this;
        }
        tp(x, y, z) {
            const m = this.m;
            return [m[0] + m[3] * x + m[6] * y + m[9] * z, m[1] + m[4] * x + m[7] * y + m[10] * z, m[2] + m[5] * x + m[8] * y + m[11] * z];
        }
        td(x, y, z) {
            const m = this.m;
            return [m[3] * x + m[6] * y + m[9] * z, m[4] * x + m[7] * y + m[10] * z, m[5] * x + m[8] * y + m[11] * z];
        }
        // One flat panel from four corners in order, with per-corner colours or one colour
        quad(mat, a, b, c, d, col, uv, nrm) {
            const B = this.bucket(mat), base = B.count;
            const pa = this.tp(a[0], a[1], a[2]), pb = this.tp(b[0], b[1], b[2]), pc = this.tp(c[0], c[1], c[2]), pd = this.tp(d[0], d[1], d[2]);
            let nx, ny, nz;
            if (nrm) {
                const n = this.td(nrm[0], nrm[1], nrm[2]); nx = n[0]; ny = n[1]; nz = n[2];
            } else {
                const ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
                const vx = pd[0] - pa[0], vy = pd[1] - pa[1], vz = pd[2] - pa[2];
                nx = uy * vz - uz * vy; ny = uz * vx - ux * vz; nz = ux * vy - uy * vx;
                const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
            }
            B.p.push(pa[0], pa[1], pa[2], pb[0], pb[1], pb[2], pc[0], pc[1], pc[2], pd[0], pd[1], pd[2]);
            B.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz, nx, ny, nz);
            if (uv) { B.uv.push(uv[0], uv[1], uv[2], uv[3], uv[4], uv[5], uv[6], uv[7]); } else { B.uv.push(0, 0, 1, 0, 1, 1, 0, 1); }
            if (Array.isArray(col[0])) {
                for (let i = 0; i < 4; i++) { B.c.push(col[i][0], col[i][1], col[i][2]); }
            } else {
                for (let i = 0; i < 4; i++) { B.c.push(col[0], col[1], col[2]); }
            }
            B.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
            B.count += 4;
            return this;
        }
        /*
         * A box between two corners. Texture repeats every `tex` metres.
         * opt.skip: faces to leave out, as letters: t top, b bottom, l left (-x), r right (+x), f front (+z, looking out of a wall), k back (-z, against it).
         * opt.lo: colour multiplier at the bottom of the side faces, for the soft dark band where things meet the ground.
         */
        box(mat, x0, y0, z0, x1, y1, z1, col, opt) {
            opt = opt || {};
            const tex = opt.tex || 1, skip = opt.skip || '', lo = opt.lo === undefined ? 1 : opt.lo, u0 = opt.u || 0, v0 = opt.v || 0;
            const cL = lo === 1 ? col : shade(col, lo), side = lo === 1 ? col : [cL, cL, col, col];
            const uvx = [u0 + x0 / tex, v0 + y0 / tex, u0 + x1 / tex, v0 + y0 / tex, u0 + x1 / tex, v0 + y1 / tex, u0 + x0 / tex, v0 + y1 / tex];
            const uvz = [u0 + z0 / tex, v0 + y0 / tex, u0 + z1 / tex, v0 + y0 / tex, u0 + z1 / tex, v0 + y1 / tex, u0 + z0 / tex, v0 + y1 / tex];
            if (skip.indexOf('f') < 0) { this.quad(mat, [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], side, uvx, [0, 0, 1]); }
            if (skip.indexOf('k') < 0) { this.quad(mat, [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], side, uvx, [0, 0, -1]); }
            if (skip.indexOf('r') < 0) { this.quad(mat, [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], side, uvz, [1, 0, 0]); }
            if (skip.indexOf('l') < 0) { this.quad(mat, [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], side, uvz, [-1, 0, 0]); }
            const uvy = [u0 + x0 / tex, v0 + z0 / tex, u0 + x1 / tex, v0 + z0 / tex, u0 + x1 / tex, v0 + z1 / tex, u0 + x0 / tex, v0 + z1 / tex];
            if (skip.indexOf('t') < 0) { this.quad(mat, [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], opt.top || col, uvy, [0, 1, 0]); }
            if (skip.indexOf('b') < 0) { this.quad(mat, [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], opt.under || shade(col, .55), uvy, [0, -1, 0]); }
            return this;
        }
        // A round pole or tube from one point to another, with radii at each end
        tube(mat, ax, ay, az, bx, by, bz, ra, rb, seg, col, opt) {
            opt = opt || {};
            const B = this.bucket(mat), base = B.count;
            const pa = this.tp(ax, ay, az), pb = this.tp(bx, by, bz);
            let dx = pb[0] - pa[0], dy = pb[1] - pa[1], dz = pb[2] - pa[2];
            const L = Math.hypot(dx, dy, dz) || 1; dx /= L; dy /= L; dz /= L;
            // A vector across the tube
            let ux = dy, uy = -dx, uz = 0;
            if (Math.abs(dz) < .9) { ux = dy; uy = -dx; uz = 0; } else { ux = 0; uy = dz; uz = -dy; }
            let l = Math.hypot(ux, uy, uz) || 1; ux /= l; uy /= l; uz /= l;
            const vx = dy * uz - dz * uy, vy = dz * ux - dx * uz, vz = dx * uy - dy * ux;
            const tex = opt.tex || 1, colB = opt.colB || col;
            for (let i = 0; i <= seg; i++) {
                const a = i / seg * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
                const nx = ux * c + vx * s, ny = uy * c + vy * s, nz = uz * c + vz * s;
                B.p.push(pa[0] + nx * ra, pa[1] + ny * ra, pa[2] + nz * ra, pb[0] + nx * rb, pb[1] + ny * rb, pb[2] + nz * rb);
                B.n.push(nx, ny, nz, nx, ny, nz);
                const u = i / seg * Math.PI * 2 * ((ra + rb) / 2) / tex;
                B.uv.push(u, 0, u, L / tex);
                B.c.push(col[0], col[1], col[2], colB[0], colB[1], colB[2]);
            }
            for (let i = 0; i < seg; i++) {
                const a = base + i * 2;
                B.i.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
            }
            B.count += (seg + 1) * 2;
            if (opt.capB) {
                const c0 = B.count, top = opt.capB === true ? colB : opt.capB;
                B.p.push(pb[0], pb[1], pb[2]); B.n.push(dx, dy, dz); B.uv.push(.5, .5); B.c.push(top[0], top[1], top[2]);
                for (let i = 0; i <= seg; i++) {
                    const a = i / seg * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
                    B.p.push(pb[0] + (ux * c + vx * s) * rb, pb[1] + (uy * c + vy * s) * rb, pb[2] + (uz * c + vz * s) * rb);
                    B.n.push(dx, dy, dz); B.uv.push(.5 + c * .5, .5 + s * .5); B.c.push(top[0], top[1], top[2]);
                }
                for (let i = 0; i < seg; i++) { B.i.push(c0, c0 + 1 + i, c0 + 2 + i); }
                B.count += seg + 2;
            }
            return this;
        }
        // A ball, for heads, helmets and the like
        ball(mat, x, y, z, r, col, sy) {
            const B = this.bucket(mat), rows = 6, cols = 8, base = B.count, ky = sy || 1;
            for (let i = 0; i <= rows; i++) {
                const v = i / rows * Math.PI, sv = Math.sin(v), cv = Math.cos(v);
                for (let j = 0; j <= cols; j++) {
                    const u = j / cols * Math.PI * 2, nx = Math.cos(u) * sv, ny = cv, nz = Math.sin(u) * sv;
                    const q = this.tp(x + nx * r, y + ny * r * ky, z + nz * r), n = this.td(nx, ny, nz);
                    B.p.push(q[0], q[1], q[2]); B.n.push(n[0], n[1], n[2]); B.uv.push(j / cols, i / rows); B.c.push(col[0], col[1], col[2]);
                }
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const a = base + i * (cols + 1) + j, b = a + cols + 1;
                    B.i.push(a, a + 1, b, a + 1, b + 1, b);
                }
            }
            B.count += (rows + 1) * (cols + 1);
            return this;
        }
        // Bars along a line: thin square section, cheaper than tubes
        bar(mat, ax, ay, az, bx, by, bz, w, col) {
            const B = this.bucket(mat); void B;
            const pa = [ax, ay, az], pb = [bx, by, bz];
            let dx = pb[0] - pa[0], dy = pb[1] - pa[1], dz = pb[2] - pa[2];
            const L = Math.hypot(dx, dy, dz) || 1; dx /= L; dy /= L; dz /= L;
            let ux, uy, uz;
            if (Math.abs(dy) < .9) { ux = -dz; uy = 0; uz = dx; } else { ux = 1; uy = 0; uz = 0; }
            const l = Math.hypot(ux, uy, uz) || 1; ux = ux / l * w / 2; uy = uy / l * w / 2; uz = uz / l * w / 2;
            const vx = (dy * uz - dz * uy), vy = (dz * ux - dx * uz), vz = (dx * uy - dy * ux);
            const c = (s, a, b) => [pa[0] + dx * L * s + ux * a + vx * b, pa[1] + dy * L * s + uy * a + vy * b, pa[2] + dz * L * s + uz * a + vz * b];
            const a0 = c(0, -1, -1), a1 = c(0, 1, -1), a2 = c(0, 1, 1), a3 = c(0, -1, 1), b0 = c(1, -1, -1), b1 = c(1, 1, -1), b2 = c(1, 1, 1), b3 = c(1, -1, 1);
            this.quad(mat, a0, a1, b1, b0, col);
            this.quad(mat, a1, a2, b2, b1, col);
            this.quad(mat, a2, a3, b3, b2, col);
            this.quad(mat, a3, a0, b0, b3, col);
            return this;
        }
        // Add a window pane: its bucket carries an extra value saying when its room lights come on
        pane(mat, x0, y0, x1, y1, z, col, uv, lightAt, warmth, tiltX, tiltY) {
            const B = this.bucket(mat);
            if (!B.w) { B.w = []; }
            const nx = tiltX || 0, ny = tiltY || 0, nl = Math.hypot(nx, ny, 1);
            this.quad(mat, [x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], col, uv, [nx / nl, ny / nl, 1 / nl]);
            B.w.push(lightAt, warmth, lightAt, warmth, lightAt, warmth, lightAt, warmth);
            return this;
        }
        // Build one THREE.BufferGeometry per bucket
        toGeometries(THREE) {
            const out = new Map();
            this.buckets.forEach(function (B, name) {
                if (!B.count) { return; }
                const g = new THREE.BufferGeometry();
                g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(B.p), 3));
                g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(B.n), 3));
                g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(B.uv), 2));
                g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(B.c), 3));
                if (B.w) { g.setAttribute('aWin', new THREE.BufferAttribute(new Float32Array(B.w), 2)); }
                if (B.st) { g.setAttribute('aST', new THREE.BufferAttribute(new Float32Array(B.st), 2)); }
                if (B.extra) { g.setAttribute('aExtra', new THREE.BufferAttribute(new Float32Array(B.extra), 2)); }
                const idx = B.count > 65000 ? new Uint32Array(B.i) : new Uint16Array(B.i);
                g.setIndex(new THREE.BufferAttribute(idx, 1));
                g.computeBoundingSphere();
                out.set(name, g);
            });
            return out;
        }
        triangleCount() { let n = 0; this.buckets.forEach((B) => { n += B.i.length / 3; }); return n; }
    }

    D.Kit = Kit;
    D.rgb = rgb;
    D.shade = shade;
    D.mixc = mixc;
    D.Rng = Rng;
})();
