/*
 * The plan of the whole world: which building, tree, pole and sign stands where. The plan is made once, without building anything,
 * and is the same on every visit. Stretches of road then build their share of it when the camera comes near.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const R = D.Route, RW = D.Roadworks, Rng = D.Rng, rgb = D.rgb, F = D.Furniture;

    const edge = RW.edgeOf;
    const FOOT = RW.FOOT_W + RW.KERB_W;
    const CHUNK = 60;
    const idx = (s) => Math.floor((s - R.START_S) / CHUNK);

    function push(map, key, v) { let a = map.get(key); if (!a) { a = []; map.set(key, a); } a.push(v); }

    // A place for a building: where its corner stands and which way it faces, set up so its local z runs away from its road
    function frameOnMain(s0, W, tf, side, y) {
        const sc = s0 + W / 2, th = R.heading(sc), o = R.at(side > 0 ? s0 : s0 + W, side * tf, y);
        const Fx = Math.sin(th), Fz = -Math.cos(th), Rx = Math.cos(th), Rz = Math.sin(th);
        return side > 0
            ? { o: [o.x, o.y, o.z], x: [Fx, 0, Fz], z: [Rx, 0, Rz] }
            : { o: [o.x, o.y, o.z], x: [-Fx, 0, -Fz], z: [-Rx, 0, -Rz] };
    }
    function frameOnBranch(j, b, side, t0, W, off, y) {
        // b: which bank of the side road, -1 before it, +1 after it. side: which side of the main road
        const th = R.heading(j.s), Fx = Math.sin(th), Fz = -Math.cos(th), Rx = Math.cos(th), Rz = Math.sin(th);
        const s = j.s + b * off;
        const zx = b * Fx, zz = b * Fz;              // away from the side road
        const xx = zz, xz = -zx;                     // up x z
        // Which end the frame starts from depends on the way x runs along the side road
        const dirT = xx * Rx + xz * Rz;              // +1 when x runs towards larger t
        const tStart = dirT > 0 ? side * Math.abs(t0) - (side < 0 ? W : 0) : side * Math.abs(t0) + (side > 0 ? W : 0);
        const o = R.at(s, tStart, y);
        return { o: [o.x, o.y, o.z], x: [xx, 0, xz], z: [zx, 0, zz] };
    }
    function applyFrame(k, fr) {
        k.frame(fr.o[0], fr.o[1], fr.o[2], fr.x[0], 0, fr.x[2], 0, 1, 0, fr.z[0], 0, fr.z[2]);
    }

    /* ---------- Making the plan ---------- */
    function make(q, L) {
        const rand = Rng(4177);
        const P = {
            buildings: new Map(), trees: new Map(), far: [], farTrees: {}, lamps: [], lampsByChunk: new Map(), poles: new Map(), foot: new Map(), q: q,
            protos: new D.Flora.Prototypes(L), signalKits: new Map()
        };
        F.roadSignAtlas(L);
        P.protos.build();
        P.glowMat = F.glowMaterial();
        const rects = [];
        const hitRect = (s0, s1, t0, t1) => rects.some((r) => s0 < r.s1 && s1 > r.s0 && t0 < r.t1 && t1 > r.t0);
        const addRect = (s0, s1, t0, t1) => rects.push({ s0, s1, t0, t1 });
        const addB = (key, rec) => { rec.fr = rec.fr; push(P.buildings, key, rec); };
        const addTree = (s, t, name, scale, tint, ch) => {
            const y = R.groundAt(s, t) - .05;
            const o = R.at(s, t, 0);
            push(P.trees, ch === undefined ? idx(s) : ch, { name: name, x: o.x, y: y, z: o.z, yaw: rand() * 6.28, scale: scale, tint: tint || [1, 1, 1] });
        };
        const leafTint = () => { const v = rand.range(.82, 1.14), w = rand.range(-.05, .1); return [v * (1 + w), v, v * (1 - w * .6)]; };
        const mouth = (s, side, pad) => {
            for (const j of R.JUNCTIONS) { if ((side > 0 ? j.right : j.left) && Math.abs(s - j.s) < j.hw + j.r + pad) { return j; } }
            return null;
        };
        // Keep buildings out of the way of a board's gantry and the board's view of the road beyond
        const SEED = () => Math.floor(rand() * 1e6) + 1;

        /* Buildings along the main road */
        for (const side of [-1, 1]) {
            let s = R.START_S + 6;
            let prevEnd = -1e9, prevRec = null;
            while (s < R.END_S - 10) {
                const d = R.dev(s);
                const m = mouth(s, side, d > .7 ? .4 : 6);
                if (m) { s = m.s + m.hw + m.r + (d > .7 ? .5 : 6); continue; }
                let W, Dp, tf, gap, rec;
                const seed = SEED();
                if (d < .1) {
                    // Open country: an occasional farmhouse, well back from the road
                    if (rand() < .5 || s < 60 && rand() < .85) {
                        W = rand.range(8, 11.5); Dp = rand.range(6, 8);
                        tf = edge(s) + rand.range(20, 58);
                        rec = { fn: rand() < .64 ? 'tiled' : 'flat', W, Dp, floors: 1, seed, wall: rand() < .4 };
                    }
                    gap = rand.range(52, 130);
                } else if (d < .42) {
                    // A village along the road
                    const kind = rand();
                    W = kind < .22 ? rand.range(5, 7.5) : rand.range(8, 12);
                    Dp = kind < .22 ? rand.range(4, 5.5) : rand.range(6.5, 9);
                    tf = edge(s) + (kind < .22 ? rand.range(7.5, 10) : rand.range(9, 20));
                    rec = kind < .22 ? { fn: 'stall', W, Dp, seed } : kind < .58 ? { fn: 'tiled', W, Dp, seed, wall: rand() < .4 } : { fn: 'flat', W, Dp, floors: rand.int(1, 2), seed, wall: rand() < .25 };
                    gap = rand.range(5, 26);
                } else if (d < .74) {
                    // The town's edge: shops below homes, a little space between buildings
                    W = rand.range(9, 16); Dp = rand.range(9, 13);
                    tf = edge(s) + rand.range(6.5, 9.5);
                    const kind = rand();
                    rec = kind < .5 ? { fn: 'apartments', W, Dp, floors: rand.int(1, 3), shops: true, seed } : kind < .85 ? { fn: 'flat', W, Dp, floors: rand.int(2, 3), seed } : { fn: 'stall', W: 6, Dp: 5, seed };
                    if (rec.fn === 'stall') { W = 6; }
                    gap = rand.range(1.5, 7);
                } else {
                    // The city: a continuous street front
                    W = rand.range(11, 24); Dp = rand.range(13, 20);
                    tf = edge(s) + FOOT + .35;
                    const kind = rand();
                    rec = kind < .24 ? { fn: 'commercial', W: Math.max(W, 16), Dp, floors: rand.int(3, 7), seed } : { fn: 'apartments', W, Dp, floors: rand.int(2, 7), shops: true, seed };
                    W = rec.W;
                    gap = rand() < .2 ? rand.range(1.5, 3.5) : rand.range(.05, .3);
                }
                // Stop before the next side road
                const nextM = mouth(s + W, side, d > .7 ? .4 : 6);
                if (rec && nextM) {
                    const room = nextM.s - nextM.hw - nextM.r - .4 - s;
                    if (room < 7.5) { s = nextM.s + nextM.hw + nextM.r + .5; rec = null; continue; }
                    if (W > room) { W = room; rec.W = W; }
                }
                if (rec) {
                    const y = d > .72 ? -.04 : R.groundAt(s + W / 2, side * tf) - R.elev(s + W / 2) - .02;
                    rec.fr = frameOnMain(s, W, tf, side, y);
                    rec.s = s + W / 2; rec.t = side * tf; rec.side = side;
                    rec.sideNear = s - prevEnd > 2.2 || !prevRec; rec.sideFar = true;
                    rec.Dp = rec.Dp || Dp;
                    if (prevRec && s - prevEnd < 2.2) { prevRec.sideFar = false; }
                    prevRec = rec; prevEnd = s + W;
                    addB(idx(rec.s), rec);
                    addRect(s - .5, s + W + .5, Math.min(side * tf, side * (tf + rec.Dp)) - .5, Math.max(side * tf, side * (tf + rec.Dp)) + .5);
                    // A bare yard around country houses
                    if (d < .5 && RW.landRect) {
                        RW.landRect(s - 4, Math.min(side * (tf - 5), side * (tf + rec.Dp + 4)), s + W + 4, Math.max(side * (tf - 5), side * (tf + rec.Dp + 4)), [150, 130, 95], 110);
                    }
                    // Second row: taller buildings looking over the first, in the town and the city
                    if (d > .5) {
                        const tf2 = tf + rec.Dp + rand.range(1.5, 6);
                        const W2 = rand.range(14, 26), Dp2 = rand.range(12, 20);
                        const fl = Math.floor(rand.range(d > .8 ? 5 : 3, d > .8 ? 13 : 7));
                        const rec2 = { fn: rand() < .22 && d > .75 ? 'commercial' : 'apartments', W: W2, Dp: Dp2, floors: fl, shops: false, seed: SEED(), fr: frameOnMain(s - 2, W2, tf2, side, -.05), s: s + W2 / 2, t: side * tf2, side, sideNear: true, sideFar: true, farOnly: true };
                        if (!mouth(s - 2, side, 3) && !mouth(s - 2 + W2, side, 3) && !mouth(s + W2 * .5, side, 3)) { addB(idx(rec2.s), rec2); addRect(s - 2, s - 2 + W2, Math.min(side * tf2, side * (tf2 + Dp2)), Math.max(side * tf2, side * (tf2 + Dp2))); }
                    }
                    // Fruit trees and palms round a country house
                    if (d < .55) {
                        const n = rand.int(1, 3);
                        for (let i = 0; i < n; i++) {
                            const ts = s + rand.range(-5, W + 5), tt = side * (tf + rand.range(-3, rec.Dp + 8));
                            const c = rand();
                            if (c < .45) { addTree(ts, tt, 'palm' + rand.int(0, 2), rand.range(.85, 1.1), [1, 1, 1]); } else if (c < .7) { addTree(ts, tt, 'banana' + rand.int(0, 1), rand.range(.9, 1.2), [1, 1, 1]); } else { addTree(ts, tt, 'mango' + rand.int(0, 2), rand.range(.75, 1), leafTint()); }
                        }
                    }
                    s += W + gap;
                } else {
                    s += gap;
                }
            }
        }

        /* A fuel station on the town's edge */
        (function () {
            const s = 528, side = 1, W = 26, Dp = 20, tf = edge(s) + 5.5;
            const y = R.groundAt(s + W / 2, side * tf) - R.elev(s + W / 2) - .02;
            const rec = { fn: 'fuel', W, Dp, seed: SEED(), s: s + W / 2, t: side * tf, side, sideNear: true, sideFar: true, fr: frameOnMain(s, W, tf, side, y) };
            // Clear whatever the road plan put here
            P.buildings.forEach((list, key) => {
                P.buildings.set(key, list.filter((b) => !(b.side === side && !b.branch && b.s > s - 8 && b.s < s + W + 8 && Math.abs(b.t) < tf + 34)));
            });
            addB(idx(rec.s), rec);
            addRect(s - 1, s + W + 1, tf - 1, tf + Dp + 1);
            if (RW.landRect) { RW.landRect(s - 3, tf - 5, s + W + 3, tf + Dp + 3, [120, 112, 98], 200); }
        })();

        /* Buildings along the side roads, so that a turn leads into a real place */
        for (const j of R.JUNCTIONS) {
            const d = R.dev(j.s);
            for (const side of [-1, 1]) {
                if (!(side > 0 ? j.right : j.left)) { continue; }
                for (const b of [-1, 1]) {
                    let t = edge(j.s) + j.r + (d > .72 ? 1 : 4);
                    let prev = null;
                    while (t < 250) {
                        const seed = SEED();
                        let W, Dp, off, gap, rec;
                        if (d > .72) {
                            W = rand.range(10, 20); Dp = rand.range(12, 18); off = j.hw + FOOT + .35; gap = rand.range(.05, 1.2);
                            rec = rand() < .18 ? { fn: 'commercial', W: Math.max(W, 15), Dp, floors: rand.int(2, 5), seed } : { fn: 'apartments', W, Dp, floors: rand.int(2, 6), shops: rand() < .75, seed };
                            W = rec.W;
                        } else {
                            W = rand.range(8, 12); Dp = rand.range(6.5, 9); off = j.hw + rand.range(6, 16); gap = rand.range(6, 34);
                            rec = rand() < .6 ? { fn: 'tiled', W, Dp, seed, wall: rand() < .4 } : { fn: 'flat', W, Dp, floors: rand.int(1, 2), seed, wall: rand() < .25 };
                        }
                        const y = d > .72 ? -.04 : R.groundAt(j.s + b * off, side * t) - R.elev(j.s + b * off) - .02;
                        rec.fr = frameOnBranch(j, b, side, t, W, off, y);
                        rec.s = j.s; rec.t = side * t; rec.side = side; rec.Dp = rec.Dp || Dp;
                        rec.sideNear = true; rec.sideFar = true; rec.branch = j.i;
                        // Buildings on side roads must not sit on top of the main road's buildings
                        const s0 = Math.min(j.s + b * off, j.s + b * (off + rec.Dp)), s1 = Math.max(j.s + b * off, j.s + b * (off + rec.Dp));
                        const t0 = Math.min(side * t, side * (t + W)), t1 = Math.max(side * t, side * (t + W));
                        if (!hitRect(s0, s1, t0, t1)) {
                            addB(idx(j.s), rec);
                            addRect(s0, s1, t0, t1);
                            prev = rec;
                        }
                        t += W + gap;
                    }
                    void prev;
                }
            }
        }

        /* The city's skyline, seen from far off and all the way through it */
        (function skyline() {
            let n = 0;
            for (let i = 0; i < 520 && n < 150 * Math.max(.5, q.trees); i++) {
                const s = rand.range(610, 2500), side = rand() < .5 ? -1 : 1;
                const t = side * rand.range(58, 420);
                if (R.nearBranch(s, t, 12)) { continue; }
                const W = rand.range(16, 30), Dp = rand.range(14, 24), floors = Math.floor(rand.range(6, 24));
                P.far.push({ s, t, W, Dp, floors, seed: SEED(), yaw: rand.range(-.25, .25) });
                n++;
            }
        })();

        /* Trees */
        const qT = q.trees;
        for (const side of [-1, 1]) {
            // An avenue of old trees along the rural highway
            for (let s = R.START_S; s < 590; s += rand.range(11, 26)) {
                if (rand() < .22) { continue; }
                const t = side * (edge(s) + rand.range(8.5, 15));
                if (R.nearBranch(s, t, 6) || hitRect(s - 2, s + 2, t - 2, t + 2)) { continue; }
                const c = rand();
                const name = c < .5 ? 'neem' : c < .8 ? 'rain' : 'mango';
                addTree(s, t, name + rand.int(0, 2), rand.range(.8, 1.15), leafTint());
            }
            // Street trees in the city, on the footpaths
            for (let s = 612; s < R.END_S - 20; s += rand.range(13, 22)) {
                if (mouth(s, side, 7) || rand() < .16) { continue; }
                const t = side * (edge(s) + RW.KERB_W + .85);
                addTree(s, t, 'street' + rand.int(0, 2), rand.range(.85, 1.15), leafTint());
                push(P.foot, idx(s), { kind: 'guard', s, t });
            }
        }
        // Trees along the side roads
        for (const j of R.JUNCTIONS) {
            for (const side of [-1, 1]) {
                if (!(side > 0 ? j.right : j.left)) { continue; }
                const d = R.dev(j.s);
                for (const b of [-1, 1]) {
                    for (let t = edge(j.s) + j.r + 7; t < 300; t += rand.range(9, 22)) {
                        if (rand() < .22) { continue; }
                        const off = d > .72 ? j.hw + RW.KERB_W + .85 : j.hw + rand.range(3.6, 8);
                        const ts = j.s + b * off, tt = side * t;
                        if (hitRect(ts - 1.5, ts + 1.5, tt - 1.5, tt + 1.5) && d <= .72) { continue; }
                        const name = d > .72 ? 'street' : (rand() < .6 ? 'neem' : 'mango');
                        addTree(ts, tt, name + rand.int(0, 2), rand.range(.8, 1.1), leafTint(), idx(j.s));
                    }
                }
            }
        }
        // Single trees on field boundaries, and groves beyond, thinning towards the distance
        for (const pl of RW.plots) {
            const near = Math.min(Math.abs(pl.t0), Math.abs(pl.t1));
            if (near > 340 || pl.s0 > 640) { continue; }
            if (rand() < .34 * qT) {
                const s = rand() < .5 ? pl.s0 : pl.s1, t = rand.range(pl.t0, pl.t1);
                if (!R.nearBranch(s, t, 5) && !hitRect(s - 2, s + 2, t - 2, t + 2)) {
                    const c = rand();
                    addTree(s, t, (c < .4 ? 'neem' : c < .7 ? 'mango' : 'rain') + rand.int(0, 2), rand.range(.75, 1.2), leafTint());
                }
            }
        }
        // Lines of trees in the distance. They are cheap, and they close the horizon as they do on the plains
        const farList = {};
        const addFar = (name, s, t, sc) => {
            const o = R.at(s, t, 0), y = R.groundAt(s, t) - .1;
            (farList[name] = farList[name] || []).push({ x: o.x, y: y, z: o.z, yaw: rand() * 6.28, scale: sc, tint: leafTint() });
        };
        const nFar = Math.round(1500 * qT);
        for (let i = 0; i < nFar; i++) {
            const side = rand() < .5 ? -1 : 1;
            const s = rand.range(-260, 1100), t = side * Math.pow(rand(), .8) * 1000 + side * 170;
            if (s > 640 && Math.abs(t) < 500) { continue; }
            const c = rand();
            addFar((c < .55 ? 'neem' : c < .8 ? 'rain' : 'mango') + rand.int(0, 2), s, t, rand.range(1, 1.7));
        }
        P.farTrees = farList;

        /* Street lights: in the town and city, along the main road and first part of each side road */
        const addLamp = (s, t, sideOfRoad, yaw, ch) => { push(P.lampsByChunk, ch, { s, t, side: sideOfRoad, yaw }); };
        for (const side of [-1, 1]) {
            for (let s = 566 + (side > 0 ? 16 : 0); s < R.END_S - 10; s += 32) {
                if (mouth(s, side, 3)) { continue; }
                addLamp(s, side * (edge(s) + .5), side, 0, idx(s));
            }
        }
        for (const j of R.JUNCTIONS) {
            if (!j.urban) { continue; }
            for (const side of [-1, 1]) {
                if (!(side > 0 ? j.right : j.left)) { continue; }
                for (const b of [-1, 1]) {
                    for (let t = edge(j.s) + j.r + 6 + (b > 0 ? 16 : 0); t < 240; t += 32) {
                        addLamp(j.s + b * (j.hw + .5), side * t, b, b > 0 ? -Math.PI / 2 : Math.PI / 2, idx(j.s));
                    }
                }
            }
        }
        // World positions of every lamp, for the light they cast
        P.lampsByChunk.forEach((list) => {
            for (const l of list) {
                const dirWorld = (l.yaw === 0) ? { s: 0, t: -l.side * 2.3 } : { s: -l.side * 2.3, t: 0 };
                const w = R.at(l.s + dirWorld.s, l.t + dirWorld.t, 9.1);
                P.lamps.push({ x: w.x, y: w.y, z: w.z, power: 92 });
            }
        });

        /* Poles along the rural road */
        for (const side of [-1, 1]) {
            if (side > 0) { continue; }
            let prev = null;
            for (let s = R.START_S; s < 620; s += 44) {
                const t = side * (edge(s) + 6.5 + (s > 400 ? -1 : 0));
                if (mouth(s, side, 3)) { prev = null; continue; }
                push(P.poles, idx(s), { s, t, side, prev });
                prev = { s, t };
            }
        }
        P.rand = rand;
        P.hitRect = hitRect;
        return P;
    }

    /* ---------- Building a building into a kit ---------- */
    function buildOne(k, rec, detail) {
        const r = Rng(rec.seed), B = D.Buildings;
        applyFrame(k, rec.fr);
        const opt = { sideL: rec.side > 0 ? rec.sideNear : rec.sideFar, sideR: rec.side > 0 ? rec.sideFar : rec.sideNear };
        const dd = rec.farOnly ? 0 : detail;
        if (rec.fn === 'tiled' || rec.fn === 'flat' || rec.fn === 'stall' || rec.fn === 'fuel') {
            const m = 2.4, W = rec.W, Z = rec.Dp;
            k.quad('shadowblob', [-m, .05, Z + m], [W + m, .05, Z + m], [W + m, .05, -m - (rec.fn === 'tiled' ? 2 : 0)], [-m, .05, -m - (rec.fn === 'tiled' ? 2 : 0)], [.4, .4, .4], [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 0]);
        }
        switch (rec.fn) {
        case 'apartments': B.apartments(k, r, rec.W, rec.Dp, rec.floors, rec.shops, dd, opt); break;
        case 'commercial': B.commercial(k, r, rec.W, rec.Dp, rec.floors, dd, opt); break;
        case 'tiled': {
            B.tiledHouse(k, r, rec.W, rec.Dp, dd, opt);
            if (rec.wall && dd) { k.push(); k.translate(-3, 0, -5.5); B.compoundWall(k, r, rec.W + 6, (rec.W + 6) * .5); k.pop(); }
            break;
        }
        case 'flat': {
            B.flatHouse(k, r, rec.W, rec.Dp, rec.floors || 1, dd, opt);
            if (rec.wall && dd) { k.push(); k.translate(-2, 0, -4.5); B.compoundWall(k, r, rec.W + 4, (rec.W + 4) * .5); k.pop(); }
            break;
        }
        case 'stall': B.stall(k, r, rec.W, rec.Dp, dd); break;
        case 'fuel': B.fuelStation(k, r, rec.W, rec.Dp, dd); break;
        default: break;
        }
    }

    /* ---------- Things seen from any distance: built with the stretch of road ---------- */
    function* buildBase(P, ch, world, g) {
        const i = ch.i;
        const k = new D.Kit();
        const far = new THREE.Group();
        // Simple versions of the buildings
        const bl = P.buildings.get(i);
        if (bl) { for (const rec of bl) { buildOne(k, rec, 0); yield; } }
        world.meshesFromKit(k, far, { cast: false });
        yield;
        // Simple versions of the trees
        const tl = P.trees.get(i);
        if (tl) {
            const by = {};
            for (const t of tl) { (by[t.name] = by[t.name] || []).push(t); }
            for (const n in by) { P.protos.instance(n, by[n], far, { detail: false, cast: false }); }
        }
        ch.baseFar = far;
        g.add(far);
        yield;
        // Poles, wires and lights, which show from far off
        const f = new D.Kit();
        const glow = new F.GlowBatch();
        const pl = P.poles.get(i);
        if (pl) {
            for (const p of pl) {
                F.electricPole(f, p.s, p.t, p.side);
                if (p.prev) { F.wires(f, p.prev.s, p.prev.t, p.s, p.t); }
            }
        }
        const lamps = P.lampsByChunk.get(i);
        if (lamps) { for (const l of lamps) { F.streetLight(f, l.s, l.t, l.side, null, glow, l.yaw); } }
        // Traffic signal housings: kept with the stretch so that the lamps can find them
        for (const j of R.JUNCTIONS) {
            if (j.s >= ch.s0 && j.s < ch.s1 && j.urban) {
                j.lampPos = F.junctionSignals(f, j);
                if (world.dynamic) { world.dynamic.addJunctionLamps(j, g); }
            }
        }
        // Signs along the way
        for (const s of SIGNS) {
            if (s.s >= ch.s0 && s.s < ch.s1) { s.make(f); }
        }
        world.meshesFromKit(f, g, { cast: true });
        const gm = glow.build(P.glowMat);
        if (gm) { g.add(gm); }
    }
    // Road signs and markers
    const SIGNS = [];
    (function () {
        const add = (s, make) => SIGNS.push({ s, make });
        add(128, (k) => F.culvert(k, 128));
        add(262, (k) => F.culvert(k, 262));
        add(388, (k) => F.culvert(k, 388));
        for (const h of [[-14, 34, 2.6, 4.2], [-9, 28, 2.1, 3.4], [116, 40, 2.8, 4.4], [122, 47, 2.2, 3.6], [205, -38, 2.7, 4.3], [214, -44, 2.3, 3.8], [356, 31, 2.5, 4], [362, 37, 2, 3.3]]) {
            add(h[0], (k) => F.hayStack(k, h[0], h[1], h[2], h[3]));
        }
        const J = R.JUNCTIONS;
        add(14, (k) => F.postSign(k, 14, 7.6, 0, .9, 2.4));
        add(96, (k) => F.kmStone(k, 96, -edge(96) - 2.2, 8));
        add(392, (k) => F.kmStone(k, 392, edge(392) + 2.2, 9));
        add(512, (k) => F.kmStone(k, 512, -edge(512) - 2.3, 10));
        add(508, (k) => F.placeBoardSign(k, 508, edge(508) + 4.2));
        add(590, (k) => F.postSign(k, 590, edge(590) + 2.2, 1, .9, 2.4));
        for (const j of J) {
            const cell = j.left && j.right ? 2 : j.right ? 3 : 4;
            const q = j.s - j.hw - j.r - (j.urban ? 42 : 56);
            const sideT = (s) => -(edge(s) + (j.urban ? RW.KERB_W + .5 : 2.2));
            add(q, (k) => F.postSign(k, q, sideT(q), cell, .95, 2.5));
            if (j.urban) {
                const q2 = j.s - j.hw - j.r - 7;
                add(q2, (k) => F.postSign(k, q2, edge(q2) + RW.KERB_W + .4, 5, .85, 2.4));
            }
        }
        add(846, (k) => { F.postSign(k, 854, -(edge(854) + RW.KERB_W + .5), 6, .7, 2.6); });
    })();

    /* ---------- Full detail: built only while the camera is close ---------- */
    function* buildDetail(P, ch, world, g) {
        const i = ch.i, q = P.q;
        const shell = new D.Kit();
        const bl = P.buildings.get(i);
        if (bl) { for (const rec of bl) { buildOne(shell, rec, rec.farOnly ? 0 : 1); yield; } }
        world.meshesFromKit(shell, g, { cast: true });
        yield;
        const tl = P.trees.get(i);
        if (tl) {
            const by = {};
            for (const t of tl) { (by[t.name] = by[t.name] || []).push(t); }
            for (const n in by) { P.protos.instance(n, by[n], g, { detail: true, cast: true }); }
        }
        yield;
        // Ground cover and crops close to the road
        const r = Rng(i * 131 + 7);
        const tufts = { tuft0: [], tuft1: [], tuft2: [], tuft3: [], shrub0: [], shrub1: [] };
        const banana = { banana0: [], banana1: [] };
        const stuff = new D.Kit();
        const dv = R.dev((ch.s0 + ch.s1) / 2);
        const nGrass = Math.round((dv < .75 ? 1200 : 60) * q.grass);
        for (let n = 0; n < nGrass; n++) {
            const s = r.range(ch.s0, ch.s1), side = r() < .5 ? -1 : 1;
            const e = edge(s), off = Math.pow(r(), 1.7) * 24 + (dv > .7 ? FOOT + .4 : 1.7);
            const t = side * (e + off);
            if (R.nearBranch(s, t, 1.5)) { continue; }
            const y = R.groundAt(s, t) - .02, o = R.at(s, t, 0);
            const dry = off < 5 || dv > .5;
            const name = dry && r() < .6 ? 'tuft2' : r() < .55 ? 'tuft0' : 'tuft1';
            const v = r.range(.72, 1.1);
            tufts[name].push({ x: o.x, y: y, z: o.z, yaw: r() * 6.28, scale: r.range(.42, .92), tint: dry ? [v * 1.12, v * 1.02, v * .7] : [v * .94, v * 1.04, v * .8] });
        }
        const nShrub = Math.round((dv < .7 ? 26 : 2) * q.grass);
        for (let n = 0; n < nShrub; n++) {
            const s = r.range(ch.s0, ch.s1), side = r() < .5 ? -1 : 1, t = side * (edge(s) + r.range(3.5, 26));
            if (R.nearBranch(s, t, 2)) { continue; }
            const o = R.at(s, t, 0);
            tufts[r() < .5 ? 'shrub0' : 'shrub1'].push({ x: o.x, y: R.groundAt(s, t) - .05, z: o.z, yaw: r() * 6.28, scale: r.range(.7, 1.5), tint: [r.range(.8, 1.1), r.range(.85, 1.1), r.range(.75, 1)] });
        }
        // Crops on the fields beside the road
        if (ch.s0 < 620) {
            for (const pl of RW.plots) {
                if (pl.s1 < ch.s0 || pl.s0 >= ch.s1) { continue; }
                // Each field belongs to the stretch where it starts
                if (pl.s0 < ch.s0 && pl.s0 >= R.START_S) { continue; }
                const near = Math.min(Math.abs(pl.t0), Math.abs(pl.t1));
                if (near > 90) { continue; }
                const rr = Rng(Math.floor(pl.s0 * 13 + pl.t0 * 7) + 5);
                const avoid = (a, b) => R.nearBranch(a, b, 3) || P.hitRect(a - 1, a + 1, b - 1, b + 1);
                const keep = q.grass;
                if (pl.kind === 'cane') { D.Flora.cropStand(stuff, pl, rr, 2.9, .3 * keep, '#a9b884', '#eef4bc', 3, avoid, 1.5); } else if (pl.kind === 'wheat') {
                    D.Flora.cropStand(stuff, pl, rr, .82, .85 * keep, '#9fb078', '#e4eea8', 0, avoid, .8);
                } else if (pl.kind === 'mustard') {
                    D.Flora.cropStand(stuff, pl, rr, .95, .85 * keep, '#a9a95a', '#fff27a', 0, avoid, .8);
                } else if (pl.kind === 'banana') {
                    const stepA = 4.5;
                    for (let s = pl.s0 + 2; s < pl.s1 - 1; s += stepA) {
                        for (let t = pl.t0 + 2; t < pl.t1 - 1; t += stepA) {
                            if (avoid(s, t)) { continue; }
                            const o = R.at(s, t, 0);
                            banana[rr() < .5 ? 'banana0' : 'banana1'].push({ x: o.x + rr.range(-.5, .5), y: R.groundAt(s, t) - .05, z: o.z + rr.range(-.5, .5), yaw: rr() * 6.28, scale: rr.range(.85, 1.3), tint: [1, 1, 1] });
                        }
                    }
                } else if (pl.kind === 'cotton') {
                    const N = Math.round(Math.abs((pl.s1 - pl.s0) * (pl.t1 - pl.t0)) * .1 * q.grass);
                    for (let n = 0; n < N; n++) {
                        const s = rr.range(pl.s0, pl.s1), t = rr.range(pl.t0, pl.t1);
                        if (avoid(s, t)) { continue; }
                        const o = R.at(s, t, 0);
                        tufts.shrub1.push({ x: o.x, y: R.groundAt(s, t) - .05, z: o.z, yaw: rr() * 6.28, scale: rr.range(.55, .8), tint: [.8, .95, .72] });
                    }
                }
            }
        }
        yield;
        for (const n in tufts) { P.protos.instance(n, tufts[n], g, { detail: false, cast: false }); }
        for (const n in banana) { P.protos.instance(n, banana[n], g, { detail: true, cast: true }); }
        yield;

        // Rural road edges: posts, barriers and studs; city streets: rails, bollards and shelters
        const f = new D.Kit();
        const midS = (ch.s0 + ch.s1) / 2;
        const rural = midS < 610;
        const glow = new F.GlowBatch();
        for (const side of [-1, 1]) {
            if (rural) {
                for (let s = Math.ceil(ch.s0 / 16) * 16; s < ch.s1; s += 16) {
                    if (RW.mouthAt(s, side) || inBarrier(s, side)) { continue; }
                    F.delineator(f, s, side * (edge(s) + 1.1), side < 0);
                }
                yield;
                for (const b of BARRIERS) {
                    if (b.side !== side) { continue; }
                    const a = Math.max(b.s0, ch.s0), c = Math.min(b.s1, ch.s1);
                    if (c > a) { F.wBeam(f, Math.ceil(a / 2) * 2, Math.floor(c / 2) * 2, side * (edge(a) + 1.2), side < 0); }
                }
            } else {
                // Guard rails on the kerb, stopping before each crossing
                let run = null;
                for (let s = ch.s0; s <= ch.s1; s += 2.4) {
                    const inMouth = !!mouthWide(s, side);
                    const ok = R.kerbed(s) > .9 && !inMouth && !nearStopBus(s, side);
                    if (ok && run === null) { run = s; }
                    if ((!ok || s + 2.4 > ch.s1) && run !== null) {
                        if (s > run + 1) { F.guardRail(f, run, s, side * (edge(run) + RW.KERB_W + .22)); }
                        run = null;
                    }
                }
                // A few small things on the footpath
                const rr = Rng(i * 17 + side * 5 + 400);
                for (let n = 0; n < 3; n++) {
                    const s = rr.range(ch.s0, ch.s1), t = side * (edge(s) + RW.KERB_W + rr.range(1.4, 2.8));
                    if (mouthWide(s, side)) { continue; }
                    const c = rr();
                    if (c < .3) { F.cabinet(f, s, t); } else if (c < .55) { F.bench(f, s, t, side > 0 ? Math.PI / 2 : -Math.PI / 2); }
                }
            }
        }
        // Reflective studs on the centre line and road edges
        const studC = rgb('#c9c6b8');
        for (let s = Math.ceil(ch.s0 / 12) * 12; s < ch.s1; s += 12) {
            if (RW.junctionBox(s, 6)) { continue; }
            F.roadStud(f, s, 0, studC, [4.8, 3.2, .5]);
            if (!RW.mouthAt(s, -1)) { F.roadStud(f, s, -R.halfWidth(s) - .22, studC, [4.2, 4.2, 3.8]); }
            if (!RW.mouthAt(s, 1)) { F.roadStud(f, s, R.halfWidth(s) + .22, studC, [4.4, .55, .35]); }
        }
        // Tree guards and bollards at crossings
        const foot = P.foot && P.foot.get(i);
        if (foot) { for (const it of foot) { if (it.kind === 'guard') { F.treeGuard(f, it.s, it.t); } } }
        for (const j of R.JUNCTIONS) {
            if (j.s < ch.s0 || j.s >= ch.s1) { continue; }
            if (j.urban) {
                for (const dir of [-1, 1]) {
                    for (const side of [-1, 1]) {
                        const st = j.s + dir * (j.hw + j.r + 1);
                        for (let n = 0; n < 3; n++) { F.bollard(f, st + dir * n * .9, side * (edge(st) + RW.KERB_W + .2)); }
                    }
                }
            }
            // The frame over each side road, just before the turn reaches its page
            for (const side of [-1, 1]) {
                if (!(side > 0 ? j.right : j.left)) { continue; }
                const w = j.hw + (j.urban ? 3 : 1.6);
                F.arrivalGantry(f, j.s, side * 92, side, w);
            }
            if (j.big) { F.arrivalGantry(f, j.s + 92, 0, 0, R.halfWidth(j.s) + 3); }
        }
        if (midS > 800 && midS < 880) { F.busStop(f, 830, -(edge(830) + RW.KERB_W + 1), -1); }
        // Cables along the street, from one lamp post to the next
        const lampsHere = P.lampsByChunk.get(i);
        if (lampsHere) {
            for (const l of lampsHere) {
                if (l.yaw !== 0) { continue; }
                const q2 = l.s + 32;
                if (!RW.mouthAt(l.s + 16, l.side) && !RW.mouthAt(q2, l.side) && R.kerbed(l.s) > .5) { F.cableRun(f, l.s, q2, l.t); }
            }
        }
        yield;
        world.meshesFromKit(stuff, g, { cast: false });
        world.meshesFromKit(f, g, { cast: true });
        const gm = glow.build(P.glowMat);
        if (gm) { g.add(gm); }
    }
    const BARRIERS = [
        { side: -1, s0: 110, s1: 150 }, { side: 1, s0: 220, s1: 270 }, { side: -1, s0: 360, s1: 396 }, { side: 1, s0: 506, s1: 540 }, { side: -1, s0: -120, s1: -30 }, { side: 1, s0: -80, s1: -8 }
    ];
    function inBarrier(s, side) { return BARRIERS.some((b) => b.side === side && s >= b.s0 - 2 && s <= b.s1 + 2); }
    function mouthWide(s, side) {
        for (const j of R.JUNCTIONS) {
            if ((side > 0 ? j.right : j.left) && Math.abs(s - j.s) < j.hw + j.r + 1) { return j; }
            if (j.urban && Math.abs(Math.abs(s - j.s) - (j.hw + j.r + 2.3)) < 2.4) { return j; }
        }
        return null;
    }
    function nearStopBus(s, side) { return side < 0 && s > 824 && s < 840; }

    /* ---------- The skyline and far trees, kept for the whole journey ---------- */
    function buildFar(P, world, L, q) {
        const g = new THREE.Group();
        const k = new D.Kit();
        for (const b of P.far) {
            const r = Rng(b.seed);
            const o = R.at(b.s, b.t, -.2), th = R.heading(b.s) + b.yaw;
            const side = b.t > 0 ? 1 : -1;
            const cx = Math.cos(th) * side, sx = Math.sin(th) * side;
            const zx = cx, zz = sx, xx = zz, xz = -zx;
            k.frame(o.x, o.y, o.z, xx, 0, xz, 0, 1, 0, zx, 0, zz);
            D.Buildings.skylineTower(k, r, b.W, b.Dp, b.floors);
        }
        world.meshesFromKit(k, g, { cast: false, receive: false });
        // A high-voltage line runs across the plain, and a village's water tank stands above the trees
        const land = new D.Kit();
        const line = [[-40, -300], [120, -296], [282, -300], [444, -304], [606, -298]];
        line.forEach((p) => { F.pylon(land, p[0], p[1], .05); });
        const line2 = [[60, 420], [260, 410], [460, 400]];
        line2.forEach((p) => { F.pylon(land, p[0], p[1], -.04); });
        const span = (a, b) => {
            const pa = R.at(a[0], a[1], R.groundAt(a[0], a[1]) - R.elev(a[0])), pb = R.at(b[0], b[1], R.groundAt(b[0], b[1]) - R.elev(b[0]));
            for (const h of [.7, .84, .98]) {
                for (const off of [-6.2, 6.2]) {
                    const H = 34 * h - 1.2, N = 7;
                    land.frame(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1);
                    for (let i = 0; i < N; i++) {
                        const u = i / N, v = (i + 1) / N, sag = (x) => -5 * 4 * x * (1 - x);
                        land.bar('plain', pa.x + (pb.x - pa.x) * u + off, pa.y + H + (pb.y - pa.y) * u + sag(u), pa.z + (pb.z - pa.z) * u, pa.x + (pb.x - pa.x) * v + off, pa.y + H + (pb.y - pa.y) * v + sag(v), pa.z + (pb.z - pa.z) * v, .05, rgb('#2d3134'));
                    }
                }
            }
        };
        for (let i = 0; i < line.length - 1; i++) { span(line[i], line[i + 1]); }
        for (let i = 0; i < line2.length - 1; i++) { span(line2[i], line2[i + 1]); }
        F.waterTower(land, 322, 96);
        F.waterTower(land, 90, -210);
        world.meshesFromKit(land, g, { cast: false, receive: false });
        for (const name in P.farTrees) { P.protos.instance(name, P.farTrees[name], g, { detail: false, cast: false, receive: false }); }
        world.scene.add(g);
        return g;
    }

    D.Plan = { make, buildBase, buildDetail, buildFar };
})();
