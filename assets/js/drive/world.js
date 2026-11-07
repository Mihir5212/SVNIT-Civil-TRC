/*
 * Builds the world in stretches of road and keeps only those near the camera in memory.
 * Far stretches use simple versions of everything; close ones get full detail. Building is done in small steps between
 * frames, so scrolling never stalls while new road is being prepared.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const R = D.Route;

    const CHUNK = 60;
    const NO_CAST = { road: 1, paint: 1, terrain: 1, pool: 1, shadowblob: 1, lamp: 1, nightlamp: 1, pavers: 1, glass: 1, showcase: 1, curtain: 1, signs: 1, plain: 1, grasscards: 1, roadsign: 1 };

    class World {
        constructor(renderer, scene, L, q, camera) {
            this.r = renderer; this.scene = scene; this.L = L; this.q = q; this.camera = camera;
            this.group = new THREE.Group();
            scene.add(this.group);
            this.chunks = new Map();
            this.job = null;
            this.pending = true;
            this.lamps = [];
            this.lampArr = [];
            this.shadowDirty = false;
            this.plan = D.Plan.make(q, L);
            this.dynamic = new D.Traffic(this, L, q);
            this.far = D.Plan.buildFar(this.plan, this, L, q);
            this.lamps = this.plan.lamps;
            // A huge plain disc under everything, in the colour of the haze, so that the land never seems to end
            const disc = new THREE.Mesh(new THREE.CircleGeometry(6000, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false, toneMapped: false }));
            disc.rotation.x = -Math.PI / 2;
            disc.frustumCulled = false;
            disc.renderOrder = 9;
            scene.add(disc);
            this.disc = disc;
            this.boardGroups = [];
            this.vec = new THREE.Vector3();
        }
        chunkIndex(s) { return Math.floor((s - R.START_S) / CHUNK); }
        meshesFromKit(kit, group, opt) {
            opt = opt || {};
            kit.toGeometries(THREE).forEach((g, name) => {
                const m = new THREE.Mesh(g, this.L[name]);
                m.receiveShadow = opt.receive !== false;
                m.castShadow = opt.cast === true && !NO_CAST[name];
                m.matrixAutoUpdate = false;
                group.add(m);
            });
        }
        // Everything in a stretch that is seen from any distance
        * buildBase(ch) {
            const g = new THREE.Group();
            const tm = new THREE.Mesh(D.Roadworks.buildTerrain(ch.s0, ch.s1), this.L.terrain);
            tm.receiveShadow = true; tm.matrixAutoUpdate = false;
            tm.renderOrder = 2;     // After the road and buildings, which hide much of it
            g.add(tm);
            yield;
            const kit = new D.Kit();
            D.Roadworks.mainRoad(kit, ch.s0, ch.s1);
            for (const j of R.JUNCTIONS) { if (j.s >= ch.s0 && j.s < ch.s1) { D.Roadworks.junction(kit, j); } }
            this.meshesFromKit(kit, g, { cast: false });
            yield;
            yield* D.Plan.buildBase(this.plan, ch, this, g);
            ch.base = g;
            this.group.add(g);
            this.shadowDirty = true;
        }
        // Full detail for the stretch: only while the camera is close
        * buildDetail(ch) {
            const g = new THREE.Group();
            yield* D.Plan.buildDetail(this.plan, ch, this, g);
            ch.detail = g;
            this.group.add(g);
            this.shadowDirty = true;
        }
        disposeGroup(g) {
            if (!g) { return; }
            g.traverse((o) => { if (o.geometry && !o.geometry.userData.shared) { o.geometry.dispose(); } if (o.isInstancedMesh) { o.dispose(); } });
            this.group.remove(g);
        }
        // What this stretch should have, for a camera at s
        wants(ch, s, info) {
            const d = Math.max(0, Math.max(ch.s0 - s, s - ch.s1));
            const near = d < this.q.detail || (info.detailAround !== undefined && Math.abs((ch.s0 + ch.s1) / 2 - info.detailAround) < 110);
            return { d, near };
        }
        // Keep the right stretches ready for this place on the road, doing a limited amount of work per frame
        update(s, info, camera) {
            const q = this.q;
            const i0 = this.chunkIndex(s - 130), i1 = this.chunkIndex(s + q.ahead);
            const lastI = this.chunkIndex(R.END_S - .1);
            this.chunks.forEach((ch, i) => {
                if (i < i0 - 1 || i > i1 + 2) {
                    this.disposeGroup(ch.base); this.disposeGroup(ch.detail);
                    if (this.job && this.job.ch === ch) { this.job = null; }
                    this.chunks.delete(i);
                }
            });
            const budget = info.forceAll ? 1e9 : info.moving ? 4 : 11;
            const t0 = performance.now();
            let pending = false;
            for (;;) {
                if (!this.job) {
                    // The nearest stretch with something missing comes first
                    let best = null, bestD = 1e9, kind = '';
                    for (let i = Math.max(0, i0); i <= Math.min(lastI, i1); i++) {
                        let ch = this.chunks.get(i);
                        if (!ch) { ch = { i: i, s0: R.START_S + i * CHUNK, s1: R.START_S + (i + 1) * CHUNK, base: null, detail: null, baseFar: null }; this.chunks.set(i, ch); }
                        const w = this.wants(ch, s, info);
                        // Work ahead of the camera before work behind it
                        const rank = w.d + (ch.s1 < s ? 60 : 0);
                        if (!ch.base && rank < bestD) { best = ch; bestD = rank; kind = 'base'; } else if (ch.base && w.near && !ch.detail && rank < bestD) { best = ch; bestD = rank; kind = 'detail'; }
                    }
                    if (!best) { break; }
                    pending = true;
                    this.job = { ch: best, kind: kind, it: kind === 'base' ? this.buildBase(best) : this.buildDetail(best) };
                }
                const dNow = this.wants(this.job.ch, s, info).d;
                if (performance.now() - t0 > budget && !(dNow < 34)) { pending = true; break; }
                const r = this.job.it.next();
                if (r.done) { this.job = null; }
            }
            // Detail goes away again once the camera has left it, and simple versions stand in until detail is ready
            this.chunks.forEach((ch) => {
                const w = this.wants(ch, s, info);
                if (ch.detail && !w.near && w.d > q.detail + 50 && !info.turning) { this.disposeGroup(ch.detail); ch.detail = null; }
                if (ch.baseFar) { ch.baseFar.visible = !ch.detail; }
            });
            this.pending = pending;
            if (this.shadowDirty) { this.shadowDirty = false; const sun = this.scene.children.find((o) => o.isDirectionalLight); if (sun && sun.shadow) { sun.shadow.needsUpdate = true; } }
            this.dynamic.update(s, info);
            this.disc.position.set(camera.position.x, camera.position.y - 9, camera.position.z);
            this.disc.material.color.copy(this.scene.fog.color);
        }
        // The gantries that carry the boards. Rebuilt whenever a board's shape changes.
        setBoards(boards) {
            for (const g of this.boardGroups) { this.disposeGroup(g); }
            this.boardGroups = [];
            for (const b of boards) {
                const k = new D.Kit();
                D.Furniture.gantry(k, b, this.L);
                const g = new THREE.Group();
                this.meshesFromKit(k, g, { cast: true });
                this.group.add(g);
                this.boardGroups.push(g);
            }
            this.shadowDirty = true;
        }
        // Light from the nearest street lamps
        updateLamps(camera, look) {
            const U = D.Materials.U, N = U.uLamps.value.length, list = this.lampArr;
            for (let i = 0; i < N; i++) { U.uLamps.value[i].w = 0; }
            if (look.lamp <= .001 || !this.lamps.length) { return; }
            list.length = 0;
            const cx = camera.position.x, cz = camera.position.z;
            const fx = -camera.matrixWorld.elements[8], fz = -camera.matrixWorld.elements[10];
            for (const l of this.lamps) {
                const dx = l.x - cx, dz = l.z - cz;
                const ahead = dx * fx + dz * fz;
                if (ahead < -24 || ahead > 120) { continue; }
                const d = Math.hypot(dx, dz);
                if (d < 120) { list.push({ l: l, d: d }); }
            }
            list.sort((a, b) => a.d - b.d);
            const v = this.vec, m = camera.matrixWorldInverse;
            for (let i = 0; i < Math.min(N, list.length); i++) {
                const e = list[i];
                v.set(e.l.x, e.l.y, e.l.z).applyMatrix4(m);
                // Only the nearest few lamps cast real light, so each one fades as a nearer one takes over its place on the list
                const rank = 1 - R.smooth(N - 1.6, N, i);
                U.uLamps.value[i].set(v.x, v.y, v.z, e.l.power * look.lamp * Math.max(rank, .02) * (1 - R.smooth(60, 118, e.d)));
            }
        }
    }

    D.World = World;
    D.CHUNK = CHUNK;
})();
