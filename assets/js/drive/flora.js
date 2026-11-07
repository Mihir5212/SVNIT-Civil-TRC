/*
 * Trees, shrubs, palms, banana plants, grass and crops. A plant is a real trunk and branches carrying many small cards of
 * photographed leaves. Each kind of plant is built once and repeated through instancing, so hundreds cost little.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const rgb = D.rgb, shade = D.shade, Rng = D.Rng;

    // Cells of the leaf picture: 0, 1 broad leaves, 2, 3 small leaves
    function cellUV(i) {
        const u = (i % 2) * .5, v = 1 - (Math.floor(i / 2) + 1) * .5;
        return [u + .004, v + .004, u + .496, v + .004, u + .496, v + .496, u + .004, v + .496];
    }
    const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

    /*
     * Lays one square card of leaves at a point inside a crown. The card's lighting direction points outward from the crown's centre,
     * which makes the whole set of flat cards shade like one rounded mass of leaves.
     */
    function card(kit, c, size, centre, crownR, cell, tint, rand, flat) {
        const dir = c.clone().sub(centre);
        const rel = dir.length() / crownR;
        dir.normalize();
        // Cards face mostly outward with some scatter, so the crown looks full from every side
        const face = dir.clone().add(v3(rand.range(-.7, .7), rand.range(-.25, .55), rand.range(-.7, .7))).normalize();
        if (flat) { face.set(rand.range(-.25, .25), 1, rand.range(-.25, .25)).normalize(); }
        const u = v3(0, 1, 0).cross(face);
        if (u.lengthSq() < .001) { u.set(1, 0, 0); }
        u.normalize();
        const v = face.clone().cross(u).normalize();
        const spin = rand.range(0, Math.PI * 2), cs = Math.cos(spin), sn = Math.sin(spin);
        const ax = u.clone().multiplyScalar(cs).add(v.clone().multiplyScalar(sn)).multiplyScalar(size / 2);
        const ay = u.clone().multiplyScalar(-sn).add(v.clone().multiplyScalar(cs)).multiplyScalar(size / 2);
        const n = dir.clone().multiplyScalar(.82).add(face.clone().multiplyScalar(.18)).normalize();
        // Deep and low inside the crown is darker
        const dark = Math.min(1.12, .5 + rel * .46 + Math.max(0, (c.y - centre.y) / crownR) * .3);
        const col = shade(tint, dark * rand.range(.86, 1.1));
        const a = c.clone().sub(ax).sub(ay), b = c.clone().add(ax).sub(ay), cc = c.clone().add(ax).add(ay), d = c.clone().sub(ax).add(ay);
        kit.quad('leaves', [a.x, a.y, a.z], [b.x, b.y, b.z], [cc.x, cc.y, cc.z], [d.x, d.y, d.z], col, cellUV(cell), [n.x, n.y, n.z]);
    }

    /*
     * A broad spreading tree. opt: height, crown radius, clear trunk height, leaf picture cells, leaf colour.
     * detail 1 has many small cards and full branches; detail 0 has a few large cards for the distance.
     */
    function tree(seed, o, detail) {
        const kit = new D.Kit(), rand = Rng(seed);
        const barkCol = rgb(o.bark || '#d6ccbc', 1.25);
        const trunkH = o.trunk, H = o.height, cr = o.crown;
        const centre = v3(0, trunkH + (H - trunkH) * .52, 0);
        const lean = v3(rand.range(-.06, .06), 0, rand.range(-.06, .06));
        const r0 = o.girth;
        const segs = detail ? 7 : 5;
        const tip = v3(lean.x * trunkH, trunkH, lean.z * trunkH);
        kit.tube('bark', 0, 0, 0, tip.x, tip.y, tip.z, r0 * 1.12, r0 * .78, segs, barkCol, { tex: 1.2, colB: shade(barkCol, .92) });
        // Root flare
        kit.tube('bark', 0, -.2, 0, 0, .55, 0, r0 * 1.5, r0 * 1.02, segs, shade(barkCol, .85), { tex: 1.2 });
        // Branches: each main limb leaves the top of the trunk and divides towards the outside of the crown
        const tips = [];
        const limbs = detail ? o.limbs : Math.max(3, o.limbs - 2);
        for (let i = 0; i < limbs; i++) {
            const a = (i + rand.range(-.3, .3)) / limbs * Math.PI * 2;
            const up = rand.range(.35, .9);
            const L = cr * rand.range(.68, .98);
            const p1 = tip.clone().add(v3(Math.cos(a) * L * .55, L * up * .55, Math.sin(a) * L * .55));
            kit.tube('bark', tip.x, tip.y - .3, tip.z, p1.x, p1.y, p1.z, r0 * .42, r0 * .2, detail ? 5 : 3, shade(barkCol, .9), { tex: 1.2 });
            const forks = detail ? rand.int(2, 3) : 1;
            for (let f = 0; f < forks; f++) {
                const a2 = a + rand.range(-.7, .7);
                const p2 = p1.clone().add(v3(Math.cos(a2) * L * .5, L * rand.range(.15, .6), Math.sin(a2) * L * .5));
                if (detail) { kit.tube('bark', p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, r0 * .2, r0 * .06, 4, shade(barkCol, .85), { tex: 1.2 }); }
                tips.push(p2);
            }
        }
        // Clumps of leaves round the branch tips, then more to fill the outline of the crown
        const tint = rgb(o.leaf, 1.02);
        const cells = o.cells;
        const pick = () => cells[Math.floor(rand() * cells.length)];
        const nFill = detail ? o.cards : Math.round(o.cards * .16);
        const size = detail ? o.cardSize : o.cardSize * 2.5;
        const flatY = o.squash || .72;
        for (const t of tips) {
            const n = detail ? 3 : 1;
            for (let i = 0; i < n; i++) {
                const c = t.clone().add(v3(rand.range(-1, 1), rand.range(-.6, .8), rand.range(-1, 1)).multiplyScalar(cr * .16));
                card(kit, c, size * rand.range(.85, 1.15), centre, cr, pick(), tint, rand);
            }
        }
        for (let i = 0; i < nFill; i++) {
            // Points on and just inside an egg-shaped outline, lumpy so it does not look like a ball
            const th = rand() * Math.PI * 2, ph = Math.acos(rand.range(-.68, 1));
            const lump = .72 + .34 * Math.sin(th * 3 + seed) * Math.sin(ph * 2 + seed * .7) + rand.range(-.1, .12);
            const rr = cr * lump;
            const c = v3(Math.sin(ph) * Math.cos(th) * rr, Math.cos(ph) * rr * flatY, Math.sin(ph) * Math.sin(th) * rr).add(centre);
            card(kit, c, size * rand.range(.8, 1.2), centre, cr, pick(), tint, rand, ph > 2.1 && detail);
        }
        return kit;
    }

    // A coconut palm: a tall curved trunk and a head of long drooping fronds
    function palm(seed, o, detail) {
        const kit = new D.Kit(), rand = Rng(seed);
        const H = o.height, bendA = rand.range(0, 6.28), bend = rand.range(.5, 1.5);
        const col = rgb('#9c8c78');
        const seg = detail ? 6 : 3;
        let prev = v3(0, 0, 0), top = prev;
        for (let i = 1; i <= seg; i++) {
            const t = i / seg, x = Math.cos(bendA) * bend * t * t, z = Math.sin(bendA) * bend * t * t;
            const p = v3(x, H * t, z);
            kit.tube('palmbark', prev.x, prev.y, prev.z, p.x, p.y, p.z, .24 - .08 * (i - 1) / seg, .24 - .08 * i / seg, detail ? 6 : 4, col, { tex: 1.1 });
            prev = p; top = p;
        }
        const fronds = detail ? 16 : 8;
        const tint = rgb('#ffffff', .78);
        for (let f = 0; f < fronds; f++) {
            const a = f / fronds * Math.PI * 2 + rand.range(-.15, .15);
            const up = f % 2 ? rand.range(.15, .55) : rand.range(.55, 1.0);
            const L = rand.range(3.4, 4.6) * (o.frond || 1);
            const dx = Math.cos(a), dz = Math.sin(a);
            const w = L * .34;
            const N = detail ? 5 : 2;
            let last = null;
            for (let i = 0; i <= N; i++) {
                const t = i / N;
                const pos = v3(top.x + dx * L * t, top.y + up * L * t * (1 - t * .5) - L * .62 * t * t * t, top.z + dz * L * t);
                const side = v3(-dz, 0, dx).multiplyScalar(w * .5);
                const l = pos.clone().sub(side), r = pos.clone().add(side);
                if (last) {
                    const v0 = (i - 1) / N, v1 = i / N;
                    const n = [dx * .3, .95, dz * .3];
                    kit.quad('palm', [last.l.x, last.l.y, last.l.z], [last.r.x, last.r.y, last.r.z], [r.x, r.y, r.z], [l.x, l.y, l.z], shade(tint, rand.range(.8, 1.1)), [.002, v0, .498, v0, .498, v1, .002, v1], n);
                }
                last = { l, r };
            }
        }
        return kit;
    }

    // A banana plant: a soft green stem and big arching leaves
    function banana(seed, detail) {
        const kit = new D.Kit(), rand = Rng(seed);
        const H = rand.range(1.9, 2.6);
        kit.tube('plain', 0, 0, 0, 0, H, 0, .15, .1, detail ? 6 : 4, rgb('#6f8a4a'));
        const leaves = detail ? 8 : 5;
        const tint = rgb('#ffffff', .9);
        for (let f = 0; f < leaves; f++) {
            const a = f / leaves * Math.PI * 2 + rand.range(-.3, .3);
            const L = rand.range(1.7, 2.4), w = L * .3, up = rand.range(.5, 1.05);
            const dx = Math.cos(a), dz = Math.sin(a);
            const N = detail ? 3 : 1;
            let last = null;
            for (let i = 0; i <= N; i++) {
                const t = i / N;
                const pos = v3(dx * L * t, H + up * L * t - L * .95 * t * t, dz * L * t);
                const side = v3(-dz, .15, dx).multiplyScalar(w * .5);
                const l = pos.clone().sub(side), r = pos.clone().add(side);
                if (last) {
                    const v0 = (i - 1) / N, v1 = i / N;
                    kit.quad('palm', [last.l.x, last.l.y, last.l.z], [last.r.x, last.r.y, last.r.z], [r.x, r.y, r.z], [l.x, l.y, l.z], shade(tint, rand.range(.85, 1.08)), [.502, v0, .998, v0, .998, v1, .502, v1], [dx * .25, .95, dz * .25]);
                }
                last = { l, r };
            }
        }
        return kit;
    }

    // A low shrub: a rounded clump of leaf cards with no visible trunk
    function shrub(seed, size, leaf, cells) {
        const kit = new D.Kit(), rand = Rng(seed);
        const centre = v3(0, size * .45, 0);
        const tint = rgb(leaf, 1.05);
        for (let i = 0; i < 9; i++) {
            const th = rand() * 6.28, ph = Math.acos(rand.range(-.1, 1)), r = size * rand.range(.3, .62);
            const c = v3(Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r * .85 + size * .4, Math.sin(ph) * Math.sin(th) * r);
            card(kit, c, size * rand.range(.65, .95), centre, size * .8, cells[i % cells.length], tint, rand);
        }
        return kit;
    }

    // A tuft of grass: three crossed cards rising from the ground
    function tuft(cell, w, h) {
        const kit = new D.Kit();
        const u0 = (cell % 2) * .5, v0 = 1 - (Math.floor(cell / 2) + 1) * .5;
        const uv = [u0 + .004, v0 + .002, u0 + .496, v0 + .002, u0 + .496, v0 + .49, u0 + .004, v0 + .49];
        const low = shade([1, 1, 1], .72), high = [1.2, 1.2, 1.18];
        for (let i = 0; i < 3; i++) {
            const a = i / 3 * Math.PI + .3, dx = Math.cos(a) * w / 2, dz = Math.sin(a) * w / 2;
            kit.quad('grasscards', [-dx, 0, -dz], [dx, 0, dz], [dx, h, dz], [-dx, h, -dz], [low, low, high, high], uv, [0, 1, 0]);
        }
        return kit;
    }

    /* ---------- The species used along the road ---------- */
    // Neem and rain trees in the country, ashoka and shade trees along city streets
    const SPECIES = {
        neem: { height: 12.5, trunk: 3.6, crown: 5.6, girth: .34, limbs: 7, cards: 110, cardSize: 2.5, leaf: '#b9d3a2', cells: [2, 3], bark: '#c4b8a6', squash: .78 },
        rain: { height: 14, trunk: 3.8, crown: 8, girth: .46, limbs: 8, cards: 150, cardSize: 2.8, leaf: '#b4d09a', cells: [2, 3, 3], bark: '#bcb09e', squash: .56 },
        mango: { height: 10, trunk: 2.3, crown: 5.4, girth: .33, limbs: 6, cards: 110, cardSize: 2.3, leaf: '#9cbc88', cells: [0, 1], bark: '#b4a896', squash: .86 },
        street: { height: 8.5, trunk: 2.7, crown: 3.5, girth: .17, limbs: 5, cards: 64, cardSize: 1.7, leaf: '#aecb94', cells: [0, 1, 2], bark: '#c0b5a4', squash: .92 },
        sapling: { height: 5, trunk: 1.8, crown: 2, girth: .07, limbs: 4, cards: 28, cardSize: 1.2, leaf: '#bcd6a0', cells: [0, 2], bark: '#c0b5a4', squash: .9 }
    };

    /*
     * A prototype is a pair of geometries (woody parts and leaves) at two levels of detail, shared by all instances.
     */
    class Prototypes {
        constructor(L) {
            this.L = L;
            this.p = {};
        }
        add(name, make) {
            const hi = make(1), lo = make(0);
            this.p[name] = { hi: this.split(hi), lo: this.split(lo) };
        }
        split(kit) {
            const out = [];
            kit.toGeometries(THREE).forEach((g, mat) => { g.userData.shared = true; out.push({ g: g, mat: mat }); });
            return out;
        }
        build() {
            Object.keys(SPECIES).forEach((k) => {
                const o = SPECIES[k];
                [0, 1, 2].forEach((v) => { this.add(k + v, (detail) => tree(101 + v * 17 + k.length * 3, o, detail)); });
            });
            this.add('palm0', (d) => palm(11, { height: 10 }, d));
            this.add('palm1', (d) => palm(29, { height: 13 }, d));
            this.add('palm2', (d) => palm(47, { height: 8 }, d));
            this.add('banana0', (d) => banana(3, d));
            this.add('banana1', (d) => banana(8, d));
            this.add('shrub0', () => shrub(5, 1.5, '#a4bb80', [0, 2]));
            this.add('shrub1', () => shrub(6, 1.1, '#b5c78c', [2, 3]));
            this.add('tuft0', () => tuft(0, .9, .62));
            this.add('tuft1', () => tuft(1, 1.0, .75));
            this.add('tuft2', () => tuft(2, 1.0, .68));
            this.add('tuft3', () => tuft(3, .95, .9));
        }
        // Instances of one prototype as meshes in a group. items: { x, y, z, yaw, scale, tint }
        instance(name, items, group, opt) {
            opt = opt || {};
            const lod = opt.detail ? 'hi' : 'lo';
            const parts = this.p[name] && this.p[name][lod];
            if (!parts || !items.length) { return; }
            const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), pos = new THREE.Vector3(), scl = new THREE.Vector3();
            const col = new THREE.Color();
            for (const part of parts) {
                const mesh = new THREE.InstancedMesh(part.g, this.L[part.mat], items.length);
                for (let i = 0; i < items.length; i++) {
                    const it = items[i];
                    q.setFromAxisAngle(up, it.yaw || 0);
                    pos.set(it.x, it.y, it.z);
                    scl.setScalar(it.scale || 1);
                    if (it.sy) { scl.y = it.sy; }
                    m4.compose(pos, q, scl);
                    mesh.setMatrixAt(i, m4);
                    if (part.mat === 'leaves' || part.mat === 'palm' || part.mat === 'grasscards') {
                        const t = it.tint || [1, 1, 1];
                        col.setRGB(t[0], t[1], t[2]);
                        mesh.setColorAt(i, col);
                    } else {
                        col.setRGB(1, 1, 1);
                        mesh.setColorAt(i, col);
                    }
                }
                mesh.instanceMatrix.needsUpdate = true;
                if (mesh.instanceColor) { mesh.instanceColor.needsUpdate = true; }
                mesh.castShadow = opt.cast !== false && part.mat !== 'grasscards';
                mesh.receiveShadow = opt.receive !== false && part.mat !== 'leaves' && part.mat !== 'palm';
                mesh.computeBoundingSphere();
                mesh.matrixAutoUpdate = false;
                group.add(mesh);
            }
        }
    }

    // A stand of a crop on a field: many leaf cards, in loose rows, kept clear of roads and buildings
    function cropStand(kit, plot, rand, heightM, density, colLow, colHigh, cellNo, avoid, rowGap) {
        const P = D.Roadworks.P;
        const cell = cellNo === undefined ? 3 : cellNo, u0 = (cell % 2) * .5, v0 = 1 - (Math.floor(cell / 2) + 1) * .5;
        const low = rgb(colLow || '#a9b884', .9), high = rgb(colHigh || '#dfe9b4', 1.1);
        const up = [0, 1, 0];
        const uv = [u0 + .004, v0 + .002, u0 + .496, v0 + .002, u0 + .496, v0 + .49, u0 + .004, v0 + .49];
        const area = Math.abs((plot.s1 - plot.s0) * (plot.t1 - plot.t0));
        const N = Math.round(area * density);
        const w = heightM * .9;
        for (let i = 0; i < N; i++) {
            let s = rand.range(plot.s0, plot.s1);
            let t = rand.range(plot.t0, plot.t1);
            // Crops grow in rows, so snap across the rows with some looseness
            t = Math.round(t / rowGap) * rowGap + rand.range(-.2, .2);
            if (avoid(s, t)) { continue; }
            const a = rand.range(-.55, .55) + (rand() < .5 ? 0 : Math.PI / 2);
            const ds = Math.cos(a) * w / 2, dt = Math.sin(a) * w / 2;
            const h = heightM * rand.range(.82, 1.14);
            const g = D.Route.groundAt(s, t) - D.Route.elev(s) - .05;
            const k = rand.range(.8, 1.1);
            kit.quad('grasscards', P(s - ds, t - dt, g), P(s + ds, t + dt, g), P(s + ds, t + dt, g + h), P(s - ds, t - dt, g + h), [shade(low, k), shade(low, k), shade(high, k), shade(high, k)], uv, up);
        }
    }

    D.Flora = { SPECIES, Prototypes, cropStand };
})();
