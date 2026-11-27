import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Phase definitions ────────────────────────────────────────────────────────
const PHASES = [
  { id: '01 / 04', label: 'Survey',   sub: 'A grid of 7.2 m bays is laid on the ground and pegged where its lines cross.' },
  { id: '02 / 04', label: 'Plan',     sub: 'The footprint is drawn between the axes: a podium, the tower that stands on it and a central core, each bay measured.' },
  { id: '03 / 04', label: 'Raise',    sub: 'Columns climb and slabs are cast floor by floor while the crane keeps pace; the glazed facade is hung behind them.' },
  { id: '04 / 04', label: 'Handover', sub: 'Crane dismantled, curtain wall complete, roof plant commissioned — handed over at +36.00 m.' },
];

const PHASE_THRESHOLDS = [0, 0.28, 0.50, 0.90];
const ELEVATION_LEVELS = ['+0.00','+3.60','+7.20','+10.80','+14.40','+18.00','+21.60','+25.20','+28.80','+32.40','+36.00'];

// ─── CAD Palette (Unified Green + Architectural White) ────────────────────────
const C_GREEN      = 0x22c55e; // bright CAD green (crane, base outline, pegs, logo, accents)
const C_GREEN_DARK = 0x0b5d45; // brand deep green fill accent
const C_WHITE      = 0xd4d4d2; // structural wireframe
const C_DARK       = 0x222220; // solid mesh fill
const C_FAINT      = 0x363633; // full-viewport background grid
const C_DASHED     = 0x767672; // dashed site & axis lines

const ConstructionScrollCAD = () => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const [phaseIdx, setPhaseIdx]             = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    // ── Scene & Camera ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a18);

    const W = canvas.clientWidth  || window.innerWidth;
    const H = canvas.clientHeight || window.innerHeight;
    const d = 26;
    const camera = new THREE.OrthographicCamera(-d * (W / H), d * (W / H), d, -d, 1, 2000);
    camera.position.set(0, 50, 0.001);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Shared Materials ───────────────────────────────────────────────────────
    const fillMat      = new THREE.MeshBasicMaterial({ color: C_DARK, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
    const whiteMat     = new THREE.LineBasicMaterial({ color: C_WHITE });
    const greenMat     = new THREE.LineBasicMaterial({ color: C_GREEN });
    const greenFillMat = new THREE.MeshBasicMaterial({ color: C_GREEN, side: THREE.DoubleSide });
    const greenDarkMat = new THREE.MeshBasicMaterial({ color: C_GREEN_DARK, side: THREE.DoubleSide });
    const faintMat     = new THREE.LineBasicMaterial({ color: C_FAINT });
    const dashedMat    = new THREE.LineDashedMaterial({ color: C_DASHED, dashSize: 0.5, gapSize: 0.3 });

    const cadBox = (w, h, dep, x, y, z, edgeMat = whiteMat, solid = true) => {
      const g   = new THREE.Group();
      const geo = new THREE.BoxGeometry(w, h, dep);
      if (solid) g.add(new THREE.Mesh(geo, fillMat));
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));
      g.position.set(x, y, z);
      g.scale.setScalar(0.0001);
      g.visible = false;
      scene.add(g);
      return g;
    };

    const addLineSegs = (floatArr, mat, parent) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(floatArr, 3));
      parent.add(new THREE.LineSegments(geo, mat));
    };

    // ==========================================================================
    // A. FULL-VIEWPORT ANIMATED BACKGROUND GRID
    //    Spans ±100 in X and Z so zero blank margins appear anywhere on wide
    //    or rotated 3D isometric views. Expands from center outward in 4 dirs.
    // ==========================================================================
    const bgPos = [];
    const H_EXT = 100;
    const V_EXT = 100;
    const STEP  = 4;

    const hLines = [];
    const vLines = [];

    for (let z = 0; z <= V_EXT; z += STEP) {
      if (z === 0) hLines.push([0, [[-H_EXT, 0, 0, H_EXT, 0, 0]]]);
      else         hLines.push([z, [[-H_EXT, 0, z, H_EXT, 0, z], [-H_EXT, 0, -z, H_EXT, 0, -z]]]);
    }
    for (let x = 0; x <= H_EXT; x += STEP) {
      if (x === 0) vLines.push([0, [[0, 0, -V_EXT, 0, 0, V_EXT]]]);
      else         vLines.push([x, [[x, 0, -V_EXT, x, 0, V_EXT], [-x, 0, -V_EXT, -x, 0, V_EXT]]]);
    }
    hLines.sort((a, b) => a[0] - b[0]);
    vLines.sort((a, b) => a[0] - b[0]);

    const maxI = Math.max(hLines.length, vLines.length);
    for (let i = 0; i < maxI; i++) {
      if (i < hLines.length) hLines[i][1].forEach((s) => bgPos.push(...s));
      if (i < vLines.length) vLines[i][1].forEach((s) => bgPos.push(...s));
    }

    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(bgPos), 3));
    bgGeo.setDrawRange(0, 0);
    const bgGrid = new THREE.LineSegments(bgGeo, faintMat);
    bgGrid.position.y = 0.01;
    scene.add(bgGrid);
    const bgTotal = bgPos.length / 3;

    // ==========================================================================
    // B. SURVEY MARKERS (Green Pegs, Axis Lines, Benchmark, North Arrow)
    // ==========================================================================
    const BX = 12;
    const BZ = 7.5;
    const surveyGroup = new THREE.Group();
    surveyGroup.visible = false;
    scene.add(surveyGroup);

    // Site boundary (dashed)
    (() => {
      const pts = [
        new THREE.Vector3(-BX - 2, 0.03, -BZ - 2),
        new THREE.Vector3( BX + 2, 0.03, -BZ - 2),
        new THREE.Vector3( BX + 2, 0.03,  BZ + 2),
        new THREE.Vector3(-BX - 2, 0.03,  BZ + 2),
        new THREE.Vector3(-BX - 2, 0.03, -BZ - 2),
      ];
      const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), dashedMat);
      l.computeLineDistances();
      surveyGroup.add(l);
    })();

    // Green corner peg squares (replaces orange)
    [[-BX - 2, -BZ - 2], [BX + 2, -BZ - 2], [BX + 2, BZ + 2], [-BX - 2, BZ + 2]].forEach(([mx, mz]) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), greenFillMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(mx, 0.035, mz);
      surveyGroup.add(mesh);
    });

    // Column axes A–F and 1–4
    const colsX = [-10, -6, -2, 2, 6, 10];
    const rowsZ = [-6.5, -2.2, 2.2, 6.5];

    colsX.forEach((gx) => {
      const pts = [new THREE.Vector3(gx, 0.04, -BZ - 3.5), new THREE.Vector3(gx, 0.04, BZ + 3.5)];
      const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), dashedMat);
      l.computeLineDistances();
      surveyGroup.add(l);
    });
    rowsZ.forEach((gz) => {
      const pts = [new THREE.Vector3(-BX - 3.5, 0.04, gz), new THREE.Vector3(BX + 3.5, 0.04, gz)];
      const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), dashedMat);
      l.computeLineDistances();
      surveyGroup.add(l);
    });

    // Column pads + crosshairs
    colsX.forEach((gx) => rowsZ.forEach((gz) => {
      const pad = new THREE.Mesh(
        new THREE.PlaneGeometry(0.42, 0.42),
        new THREE.MeshBasicMaterial({ color: 0x484845, side: THREE.DoubleSide })
      );
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(gx, 0.04, gz);
      surveyGroup.add(pad);

      addLineSegs(new Float32Array([
        gx - 0.3, 0.05, gz,       gx + 0.3, 0.05, gz,
        gx,       0.05, gz - 0.3, gx,       0.05, gz + 0.3,
      ]), whiteMat, surveyGroup);
    }));

    // Axis bubble circles
    colsX.forEach((gx) => {
      const pts = [];
      for (let a = 0; a <= Math.PI * 2; a += Math.PI / 16)
        pts.push(new THREE.Vector3(gx + Math.cos(a) * 0.5, 0.05, -BZ - 3.9 + Math.sin(a) * 0.5));
      surveyGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), whiteMat));
    });
    rowsZ.forEach((gz) => {
      const pts = [];
      for (let a = 0; a <= Math.PI * 2; a += Math.PI / 16)
        pts.push(new THREE.Vector3(-BX - 3.9 + Math.cos(a) * 0.5, 0.05, gz + Math.sin(a) * 0.5));
      surveyGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), whiteMat));
    });

    // Benchmark △ BM +0.00 (Green)
    surveyGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-10,  0.05, BZ + 3.8),
        new THREE.Vector3(-9.4, 0.05, BZ + 2.9),
        new THREE.Vector3(-8.8, 0.05, BZ + 3.8),
        new THREE.Vector3(-10,  0.05, BZ + 3.8),
      ]),
      greenMat
    ));

    // North arrow
    (() => {
      const nx = BX + 1.5;
      const nz = -BZ - 2;
      const pts = [];
      for (let a = 0; a <= Math.PI * 2; a += Math.PI / 16)
        pts.push(new THREE.Vector3(nx + Math.cos(a) * 0.65, 0.05, nz + Math.sin(a) * 0.65));
      surveyGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), whiteMat));
      surveyGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(nx, 0.06, nz + 0.6), new THREE.Vector3(nx, 0.06, nz - 0.6),
        ]),
        greenMat
      ));
      addLineSegs(new Float32Array([
        nx - 0.14, 0.06, nz - 0.3, nx,        0.06, nz - 0.6,
        nx,        0.06, nz - 0.6, nx + 0.14, 0.06, nz - 0.3,
      ]), greenMat, surveyGroup);
    })();

    // ==========================================================================
    // C. PLAN — Self-tracing footprint rectangles (Base is GREEN)
    // ==========================================================================
    const makeTracedRect = (x1, z1, x2, z2, y, mat, nSegs = 80) => {
      const pts = [];
      const rw = x2 - x1;
      const rd = z2 - z1;
      const perimeter = 2 * (Math.abs(rw) + Math.abs(rd));
      const nW = Math.round(nSegs * Math.abs(rw) / perimeter);
      const nD = Math.round(nSegs * Math.abs(rd) / perimeter);
      for (let i = 0; i <= nW; i++) pts.push(new THREE.Vector3(x1 + rw * i / nW, y, z1));
      for (let i = 1; i <= nD; i++) pts.push(new THREE.Vector3(x2, y, z1 + rd * i / nD));
      for (let i = 1; i <= nW; i++) pts.push(new THREE.Vector3(x2 - rw * i / nW, y, z2));
      for (let i = 1; i <= nD; i++) pts.push(new THREE.Vector3(x1, y, z2 - rd * i / nD));
      pts.push(pts[0].clone());
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      return { line, total: pts.length };
    };

    // Base footprint perimeter in GREEN
    const podRect = makeTracedRect(-11.5, -6.8, 11.5, 6.8, 0.045, greenMat);
    const twrRect = makeTracedRect( -6.5, -4.2,  6.5, 4.2, 0.055, whiteMat, 60);

    const planGroup = new THREE.Group();
    planGroup.visible = false;
    scene.add(planGroup);

    // Core outline & hatching
    planGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2, 0.07, -1.5), new THREE.Vector3( 2, 0.07, -1.5),
        new THREE.Vector3( 2, 0.07,  1.5), new THREE.Vector3(-2, 0.07,  1.5),
        new THREE.Vector3(-2, 0.07, -1.5),
      ]),
      whiteMat
    ));
    for (let h = -1.8; h <= 1.8; h += 0.35) {
      planGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(h - 0.7, 0.07, -1.4), new THREE.Vector3(h + 0.7, 0.07, 1.4),
        ]),
        faintMat
      ));
    }
    // Green dimension lines
    [[-11.5, BZ + 1.8, 11.5, BZ + 1.8], [BX + 1.8, -6.8, BX + 1.8, 6.8]].forEach(([x1, z1, x2, z2]) => {
      planGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x1, 0.06, z1), new THREE.Vector3(x2, 0.06, z2)]),
        greenMat
      ));
    });

    // ==========================================================================
    // D. WORKING GREEN TOWER CRANE (Hierarchical: Mast → Slew → Trolley → Hook)
    // ==========================================================================
    const CX = 12.5;
    const CZ = -11;
    const MAST_H = 22.5;

    const craneGroup = new THREE.Group();
    craneGroup.position.set(CX, 0, CZ);
    craneGroup.scale.setScalar(0.0001);
    craneGroup.visible = false;
    scene.add(craneGroup);

    // 1. Static Lattice Mast
    (() => {
      const hw    = 0.45;
      const nSect = 8;
      const sH    = MAST_H / nSect;

      // Base anchor pad
      const baseGeo = new THREE.BoxGeometry(1.8, 0.4, 1.8);
      craneGroup.add(new THREE.Mesh(baseGeo, fillMat));
      craneGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), greenMat));

      for (let s = 0; s < nSect; s++) {
        const y0 = s * sH;
        const y1 = y0 + sH;

        addLineSegs(new Float32Array([
          -hw, y0, -hw,  -hw, y1, -hw,
           hw, y0, -hw,   hw, y1, -hw,
           hw, y0,  hw,   hw, y1,  hw,
          -hw, y0,  hw,  -hw, y1,  hw,
          -hw, y1, -hw,   hw, y1, -hw,
           hw, y1, -hw,   hw, y1,  hw,
           hw, y1,  hw,  -hw, y1,  hw,
          -hw, y1,  hw,  -hw, y1, -hw,
          -hw, y0, -hw,   hw, y1, -hw,   hw, y0, -hw,  -hw, y1, -hw,
          -hw, y0,  hw,   hw, y1,  hw,   hw, y0,  hw,  -hw, y1,  hw,
          -hw, y0, -hw,  -hw, y1,  hw,  -hw, y0,  hw,  -hw, y1, -hw,
           hw, y0, -hw,   hw, y1,  hw,   hw, y0,  hw,   hw, y1, -hw,
        ]), greenMat, craneGroup);
      }
    })();

    // 2. Rotating Slewing Superstructure (Cab, Jib, Counter-Jib, A-Frame)
    const craneSlewGroup = new THREE.Group();
    craneSlewGroup.position.set(0, MAST_H, 0);
    craneGroup.add(craneSlewGroup);

    const JIB_L  = 17.5;
    const CJIB_L = 6.0;
    const JIB_Y  = 1.6;
    const JIB_H  = 0.75;
    const JIB_W  = 0.75;

    (() => {
      // Slew ring + operator cab
      const cabGeo = new THREE.BoxGeometry(1.5, 1.6, 1.5);
      const cabMesh  = new THREE.Mesh(cabGeo, fillMat);
      const cabEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cabGeo), greenMat);
      cabMesh.position.set(0, 0.8, 0);
      cabEdges.position.set(0, 0.8, 0);
      craneSlewGroup.add(cabMesh, cabEdges);

      // Main Jib (along -X)
      const jibGeo   = new THREE.BoxGeometry(JIB_L, JIB_H, JIB_W);
      const jibMesh  = new THREE.Mesh(jibGeo, fillMat);
      const jibEdges = new THREE.LineSegments(new THREE.EdgesGeometry(jibGeo), greenMat);
      jibMesh.position.set(-JIB_L / 2, JIB_Y + JIB_H / 2, 0);
      jibEdges.position.set(-JIB_L / 2, JIB_Y + JIB_H / 2, 0);
      craneSlewGroup.add(jibMesh, jibEdges);

      const nBays = 9;
      const bayW  = JIB_L / nBays;
      for (let j = 0; j < nBays; j++) {
        const x0 = -j * bayW;
        const x1 = -(j + 1) * bayW;
        addLineSegs(new Float32Array([
          x0, JIB_Y, -JIB_W / 2,         x1, JIB_Y + JIB_H, JIB_W / 2,
          x0, JIB_Y + JIB_H, -JIB_W / 2, x1, JIB_Y,         JIB_W / 2,
        ]), greenMat, craneSlewGroup);
      }

      // Counter-Jib (along +X)
      const cjGeo   = new THREE.BoxGeometry(CJIB_L, JIB_H, JIB_W);
      const cjMesh  = new THREE.Mesh(cjGeo, fillMat);
      const cjEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cjGeo), greenMat);
      cjMesh.position.set(CJIB_L / 2, JIB_Y + JIB_H / 2, 0);
      cjEdges.position.set(CJIB_L / 2, JIB_Y + JIB_H / 2, 0);
      craneSlewGroup.add(cjMesh, cjEdges);

      // Counterweight blocks
      const cwGeo   = new THREE.BoxGeometry(2.1, 1.4, 1.4);
      const cwMesh  = new THREE.Mesh(cwGeo, fillMat);
      const cwEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cwGeo), greenMat);
      cwMesh.position.set(CJIB_L - 0.6, JIB_Y, 0);
      cwEdges.position.set(CJIB_L - 0.6, JIB_Y, 0);
      craneSlewGroup.add(cwMesh, cwEdges);

      // A-Frame Peak & Tie Rods
      const peakY = 4.6;
      addLineSegs(new Float32Array([
        0, 1.6, 0,         0, peakY, 0,
        0, peakY, 0,      -JIB_L + 0.5, JIB_Y + JIB_H, 0,
        0, peakY, 0,      -JIB_L * 0.55, JIB_Y + JIB_H, 0,
        0, peakY, 0,       CJIB_L - 0.6, JIB_Y + JIB_H, 0,
      ]), greenMat, craneSlewGroup);
    })();

    // 3. Sliding Trolley + Dynamic Hoist Cable + Suspended Load Hook
    const craneTrolleyGroup = new THREE.Group();
    craneTrolleyGroup.position.set(-9.5, JIB_Y, 0);
    craneSlewGroup.add(craneTrolleyGroup);

    const trGeo = new THREE.BoxGeometry(0.9, 0.35, 0.9);
    craneTrolleyGroup.add(new THREE.Mesh(trGeo, fillMat));
    craneTrolleyGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(trGeo), greenMat));

    // Unit-length cable anchored at y=0 extending down to y=-1 (scale.y controls cable length)
    const cableGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -1, 0),
    ]);
    const craneCableLine = new THREE.Line(cableGeo, greenMat);
    craneCableLine.scale.y = 10;
    craneTrolleyGroup.add(craneCableLine);

    // Hook + lifted structural beam module
    const craneHookGroup = new THREE.Group();
    craneHookGroup.position.set(0, -10, 0);
    craneTrolleyGroup.add(craneHookGroup);

    (() => {
      const hkGeo = new THREE.BoxGeometry(0.7, 0.5, 0.7);
      craneHookGroup.add(new THREE.Mesh(hkGeo, fillMat));
      craneHookGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(hkGeo), greenMat));

      // Suspended steel girder below hook
      const loadGeo = new THREE.BoxGeometry(3.2, 0.35, 0.55);
      const loadMesh  = new THREE.Mesh(loadGeo, fillMat);
      const loadEdges = new THREE.LineSegments(new THREE.EdgesGeometry(loadGeo), greenMat);
      loadMesh.position.set(0, -0.75, 0);
      loadEdges.position.set(0, -0.75, 0);
      craneHookGroup.add(loadMesh, loadEdges);

      // Rigging sling wires
      addLineSegs(new Float32Array([
        0, -0.25, 0,  -1.4, -0.58, 0,
        0, -0.25, 0,   1.4, -0.58, 0,
      ]), greenMat, craneHookGroup);
    })();

    // ==========================================================================
    // E. 3D BUILDING MODEL (Green Base, Green TRC Octagonal Logo, Realistic Tower)
    // ==========================================================================
    const podBase  = cadBox(23, 1.6, 15, 0, 0.8, 0, greenMat, true);
    const podSlab1 = cadBox(23.5, 0.42, 15.5, 0, 1.75, 0, whiteMat, true);

    const podCols = [];
    [-10, -5, 0, 5, 10].forEach((px) => {
      [-6.3, 0, 6.3].forEach((pz) => {
        if (Math.abs(px) < 2 && Math.abs(pz) < 2) return;
        podCols.push(cadBox(0.42, 2.4, 0.42, px, 3.0, pz));
      });
    });
    const podSlab2 = cadBox(23.5, 0.42, 15.5, 0, 4.4, 0);

    // Podium curtain wall mullions
    const podiumMullions = new THREE.Group();
    podiumMullions.scale.setScalar(0.0001);
    podiumMullions.visible = false;
    scene.add(podiumMullions);
    (() => {
      const nF = 2, nB = 10, fH = 2.3;
      for (let f = 0; f <= nF; f++) {
        const fy = 1.75 + f * fH;
        [7.5, -7.5].forEach((zf) => {
          podiumMullions.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-11.5, fy, zf), new THREE.Vector3(11.5, fy, zf)]),
            whiteMat
          ));
        });
      }
      for (let b = 0; b <= nB; b++) {
        const cx = -11.5 + (b * 23) / nB;
        [7.5, -7.5].forEach((zf) => {
          podiumMullions.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(cx, 1.75, zf), new THREE.Vector3(cx, 1.75 + nF * fH, zf)]),
            whiteMat
          ));
        });
      }
    })();

    // Entrance canopy + Green Geometric Octagonal G Emblem (matches Header/Footer logo)
    const entranceCanopy = cadBox(5.5, 0.22, 2.8, 0, 3.8, 7.6, greenMat);

    const logoGroup = new THREE.Group();
    (() => {
      const s = 0.04; // converts 64x64 SVG coords centered at (32, 32)
      const pt = (x, y) => new THREE.Vector3((x - 32) * s, (32 - y) * s, 0);
      const outer = [
        pt(16, 4), pt(48, 4), pt(60, 16), pt(60, 24),
        pt(44, 24), pt(44, 18), pt(20, 18), pt(20, 46),
        pt(44, 46), pt(44, 36), pt(32, 36), pt(32, 26),
        pt(60, 26), pt(60, 48), pt(48, 60), pt(16, 60),
        pt(4, 48), pt(4, 16), pt(16, 4),
      ];
      logoGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outer), greenMat));
      // Glowing green inner plate
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), greenDarkMat);
      plate.position.z = -0.05;
      logoGroup.add(plate);
    })();
    logoGroup.position.set(0, 5.2, 7.65);
    logoGroup.scale.setScalar(0.0001);
    logoGroup.visible = false;
    scene.add(logoGroup);

    // Central shear core
    const core1 = cadBox(3.6, 4.2, 2.8, 0, 3.9, 0);
    const core2 = cadBox(3.6, 7.0, 2.8, 0, 9.3, 0);
    const core3 = cadBox(3.6, 7.0, 2.8, 0, 16.3, 0);

    // 7-storey tower slabs
    const floorYs = [6.0, 7.9, 9.8, 11.7, 13.6, 15.5, 17.4];
    const towerSlabs = floorYs.map((fy) => cadBox(14, 0.36, 10, -0.5, fy, 0));

    // Tower columns
    const towerCols = [];
    [-6.0, -3.0, 2.5, 5.5].forEach((cx) => {
      [-4.3, 0, 4.3].forEach((cz) => {
        if (Math.abs(cx) < 1.5 && Math.abs(cz) < 1.5) return;
        floorYs.forEach((fy) => towerCols.push(cadBox(0.36, 1.6, 0.36, cx, fy - 0.9, cz)));
      });
    });

    // Tower curtain wall mullions
    const towerMullions = new THREE.Group();
    towerMullions.scale.setScalar(0.0001);
    towerMullions.visible = false;
    scene.add(towerMullions);
    (() => {
      const nF = 7, nBays = 8, fH = 1.9, baseY = 5.9, totalH = nF * fH;
      [5.0, -5.0].forEach((zf) => {
        for (let f = 0; f <= nF; f++) {
          const fy = baseY + f * fH;
          towerMullions.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-7, fy, zf), new THREE.Vector3(6, fy, zf)]),
            whiteMat
          ));
        }
        for (let b = 0; b <= nBays; b++) {
          const cx = -7 + (b * 13) / nBays;
          towerMullions.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(cx, baseY, zf), new THREE.Vector3(cx, baseY + totalH, zf)]),
            whiteMat
          ));
        }
      });

      const nSide = 6;
      [-7, 6].forEach((xf) => {
        for (let f = 0; f <= nF; f++) {
          const fy = baseY + f * fH;
          towerMullions.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xf, fy, -5), new THREE.Vector3(xf, fy, 5)]),
            whiteMat
          ));
        }
        for (let b = 0; b <= nSide; b++) {
          const cz = -5 + (b * 10) / nSide;
          towerMullions.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xf, baseY, cz), new THREE.Vector3(xf, baseY + totalH, cz)]),
            whiteMat
          ));
        }
      });
    })();

    // Roof & Plant
    const roofSlab  = cadBox(14.2, 0.42, 10.4, -0.5, 17.8, 0, greenMat, true);
    const parapet   = cadBox(14.2, 0.95, 10.4, -0.5, 18.5, 0, whiteMat, false);
    const plantRoom = cadBox(5.2, 2.4, 3.6, -0.5, 19.7, 0);
    const hvac1     = cadBox(2.5, 1.3, 2.1, -3.0, 19.0, 1.5);
    const hvac2     = cadBox(2.5, 1.3, 2.1,  2.0, 19.0, 1.5);
    const riser     = cadBox(1.1, 1.5, 1.1,  3.6, 19.3, -1.5);

    const antennaGroup = new THREE.Group();
    antennaGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.5, 21.0, 0), new THREE.Vector3(-0.5, 25.0, 0),
      ]),
      greenMat
    ));
    [21.8, 23.0, 24.2].forEach((ay) => {
      addLineSegs(new Float32Array([-0.9, ay, 0, -0.1, ay, 0]), greenMat, antennaGroup);
    });
    const antTip = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), greenFillMat);
    antTip.position.set(-0.5, 25.0, 0);
    antennaGroup.add(antTip);
    antennaGroup.scale.setScalar(0.0001);
    antennaGroup.visible = false;
    scene.add(antennaGroup);

    // ==========================================================================
    // F. GSAP TIMELINE
    // ==========================================================================
    const revealAll = (targets, tl, pos, stagger = 0.025) => {
      const list = Array.isArray(targets) ? targets : [targets];
      tl.to(list.map((t) => t.scale), {
        x: 1, y: 1, z: 1,
        duration: 0.4,
        stagger,
        ease: 'power2.out',
        onStart:           () => list.forEach((t) => { t.visible = true; }),
        onReverseComplete: () => list.forEach((t) => { t.visible = false; }),
      }, pos);
    };

    const tl = gsap.timeline({ paused: true });

    revealAll([craneGroup],        tl, 0.50);
    revealAll([podBase, podSlab1], tl, 0.54, 0.05);
    revealAll([...podCols, podSlab2], tl, 0.59, 0.015);
    revealAll([podiumMullions, entranceCanopy, logoGroup], tl, 0.62, 0.04);

    const tColN = towerCols.length;
    revealAll([core1, towerSlabs[0], towerSlabs[1], ...towerCols.slice(0, Math.floor(tColN * 0.33))], tl, 0.65, 0.012);
    revealAll([core2, towerSlabs[2], towerSlabs[3], ...towerCols.slice(Math.floor(tColN * 0.33), Math.floor(tColN * 0.66))], tl, 0.71, 0.01);
    revealAll([core3, towerSlabs[4], towerSlabs[5], towerSlabs[6], ...towerCols.slice(Math.floor(tColN * 0.66)), towerMullions], tl, 0.77, 0.008);
    revealAll([roofSlab, parapet], tl, 0.83, 0.04);
    revealAll([plantRoom, hvac1, hvac2, riser, antennaGroup], tl, 0.86, 0.03);

    // Crane dismantled cleanly at Handover
    tl.to(craneGroup.scale, {
      x: 0.0001, y: 0.0001, z: 0.0001,
      duration: 0.2,
      ease: 'power3.inOut',
      onComplete:        () => { craneGroup.visible = false; },
      onReverseComplete: () => { craneGroup.visible = true; craneGroup.scale.setScalar(1); },
    }, 0.90);

    // ==========================================================================
    // G. SCROLL TRIGGER & CURSOR TRACKING (Slight Side-Angle Inspection)
    // ==========================================================================
    let targetProgress  = 0;
    let currentProgress = 0;

    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => { targetProgress = self.progress; },
    });

    const targetMouse = { x: 0, y: 0 };
    const curMouse    = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onPointerLeave = () => {
      targetMouse.x = 0;
      targetMouse.y = 0;
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('mouseleave', onPointerLeave);

    // ==========================================================================
    // H. CAMERA WAYPOINTS & RENDER LOOP
    // ==========================================================================
    const camPlan  = new THREE.Vector3(0, 50, 0.001);
    const tgtPlan  = new THREE.Vector3(0, 0, 0);
    const camIso   = new THREE.Vector3(28, 26, 28);
    const tgtIso   = new THREE.Vector3(0, 10, 0);
    const camFinal = new THREE.Vector3(22, 20, 22);
    const tgtFinal = new THREE.Vector3(-0.5, 11, 0);

    const curPos    = camPlan.clone();
    const curTgt    = tgtPlan.clone();
    const camOffset = new THREE.Vector3();

    let raf;
    const baseSlewAngle = Math.atan2(11, 12.5); // aims jib straight across the building footprint

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const tNow = performance.now() * 0.001;

      // Smooth scroll & pointer lerping
      currentProgress += (targetProgress - currentProgress) * 0.07;
      curMouse.x      += (targetMouse.x - curMouse.x) * 0.06;
      curMouse.y      += (targetMouse.y - curMouse.y) * 0.06;

      setSmoothProgress(currentProgress);
      tl.progress(currentProgress);

      // Active phase update
      let pi = 0;
      for (let i = PHASE_THRESHOLDS.length - 1; i >= 0; i--) {
        if (currentProgress >= PHASE_THRESHOLDS[i]) { pi = i; break; }
      }
      setPhaseIdx(pi);

      const p = currentProgress;

      // 1. Expanding full-viewport background grid
      bgGeo.setDrawRange(0, Math.floor(Math.min(1, p / 0.18) * bgTotal));

      // 2. Survey pegs & Plan traced footprint
      surveyGroup.visible = p > 0.18;
      podRect.line.geometry.setDrawRange(0, Math.floor(Math.min(1, Math.max(0, (p - 0.28) / 0.10)) * podRect.total));
      twrRect.line.geometry.setDrawRange(0, Math.floor(Math.min(1, Math.max(0, (p - 0.33) / 0.09)) * twrRect.total));
      planGroup.visible = p > 0.37;

      // 3. Working Crane Kinematics (slew, trolley along jib, dynamic hoist cable)
      if (craneGroup.visible) {
        const floorFrac = Math.max(0, Math.min(1, (p - 0.52) / 0.36));
        craneSlewGroup.rotation.y = baseSlewAngle + Math.sin(tNow * 0.55 + p * Math.PI * 5) * 0.35;
        craneTrolleyGroup.position.x = -9.5 + Math.cos(tNow * 0.70 + p * Math.PI * 4) * 3.4;

        const hoistLen = Math.max(2.2, (13.5 - floorFrac * 9.5) + Math.sin(tNow * 1.15) * 1.5);
        craneCableLine.scale.y = hoistLen;
        craneHookGroup.position.y = -hoistLen;
      }

      // 4. Camera Waypoint Interpolation
      if (p < 0.54) {
        const t = Math.min(1, Math.max(0, (p - 0.44) / 0.10));
        const e = 0.5 - 0.5 * Math.cos(Math.PI * t);
        curPos.lerpVectors(camPlan, camIso, e);
        curTgt.lerpVectors(tgtPlan, tgtIso, e);
      } else if (p >= 0.90) {
        const t = Math.min(1, (p - 0.90) / 0.10);
        const e = 0.5 - 0.5 * Math.cos(Math.PI * t);
        curPos.lerpVectors(camIso, camFinal, e);
        curTgt.lerpVectors(tgtIso, tgtFinal, e);
      } else {
        curPos.copy(camIso);
        curTgt.copy(tgtIso);
      }

      // 5. Cursor-Driven Slight Side-Angle Orbit (bounded ~±24 deg, not full 360)
      const tiltWeight = Math.min(1, Math.max(0, (p - 0.44) / 0.10));
      camOffset.copy(curPos).sub(curTgt);

      if (tiltWeight > 0.01) {
        const az = curMouse.x * 0.42 * tiltWeight;
        const cosA = Math.cos(az);
        const sinA = Math.sin(az);
        const rx = camOffset.x * cosA - camOffset.z * sinA;
        const rz = camOffset.x * sinA + camOffset.z * cosA;
        camOffset.x = rx;
        camOffset.z = rz;
        camOffset.y = Math.max(8, camOffset.y - curMouse.y * 5.0 * tiltWeight);
      } else {
        // Gentle subtle pan in top-down plan view
        camOffset.x += curMouse.x * 1.2;
        camOffset.z += curMouse.y * 1.2;
      }

      camera.position.copy(curTgt).add(camOffset);
      camera.lookAt(curTgt);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const a = w / h;
      camera.left   = -d * a;
      camera.right  =  d * a;
      camera.top    =  d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(raf);
      renderer.dispose();
      ScrollTrigger.getAll().forEach((st) => { if (st.trigger === container) st.kill(); });
    };
  }, []);

  const phase       = PHASES[phaseIdx];
  const isHandover  = smoothProgress >= 0.90;
  const isSurvey    = smoothProgress < 0.28;
  const showRuler   = smoothProgress >= 0.84;
  const rulerActive = Math.min(10, Math.floor(((smoothProgress - 0.84) / 0.16) * 11));

  return (
    <div ref={containerRef} className="relative w-full h-[450vh] bg-[#1a1a18]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#1a1a18]">

        {/* Corner info */}
        <div className="absolute top-5 left-6 z-20 font-label text-[11px] tracking-widest text-[#555552] uppercase select-none">
          SHEET 02 / 09
        </div>
        <div className="absolute top-5 right-6 z-20 font-label text-[11px] tracking-widest text-[#555552] uppercase select-none">
          {smoothProgress >= 0.48 ? 'MOVE CURSOR TO ORBIT ANGLE · SCALE 1:200' : 'SCALE 1:200'}
        </div>

        {/* Phase nav — bottom right */}
        <div className="absolute bottom-14 right-6 z-20 flex flex-col items-end gap-1.5 select-none">
          {PHASES.map((ph, i) => (
            <div
              key={ph.id}
              className={`font-label text-[11px] uppercase tracking-wider transition-colors duration-300 ${
                i === phaseIdx ? 'text-[#22c55e] font-bold' : 'text-[#484844]'
              }`}
            >
              {String(i + 1).padStart(2, '0')} {ph.label.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Phase label — bottom left with Chakra Petch display font */}
        <div className="absolute bottom-14 left-6 z-20 select-none">
          <div className="font-label text-[11px] uppercase tracking-widest text-[#767672] mb-1">
            {phase.id}
          </div>
          <div className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold uppercase tracking-wide leading-none text-white">
            {phase.label}
          </div>
          <div className="mt-2.5 max-w-[230px] font-body text-[11px] leading-relaxed uppercase tracking-wide text-[#8c8c88]">
            {phase.sub}
          </div>
        </div>

        {/* Step counter — bottom centre */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-label text-[11px] text-[#767672] uppercase tracking-widest select-none">
          SVNIT TRC &nbsp;·&nbsp; {isSurvey ? '01 / 11 — SET OUT' : isHandover ? '11 / 11 — HANDOVER' : `${Math.min(11, Math.ceil(smoothProgress * 11))} / 11 — CONSTRUCT`}
        </div>

        {/* Elevation ruler — right side, only at Handover */}
        <div
          className={`hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 flex-col-reverse gap-2 pointer-events-none select-none transition-all duration-700 ease-out ${
            showRuler ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          {ELEVATION_LEVELS.map((lvl, idx) => {
            const active = idx <= rulerActive || smoothProgress >= 0.97;
            const isTop  = idx === 10;
            return (
              <div
                key={lvl}
                className={`flex items-center gap-2 font-label text-[10px] transition-colors duration-200 ${
                  isTop ? 'text-[#22c55e] font-bold' : active ? 'text-[#22c55e]/80' : 'text-[#333331]'
                }`}
              >
                <span className={`w-3 h-px ${active ? 'bg-[#22c55e]' : 'bg-[#333331]'}`} />
                <span className="tabular-nums">{lvl}</span>
              </div>
            );
          })}
        </div>

        {/* Green status dot — top centre */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 select-none">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="font-label text-[10px] uppercase tracking-widest text-[#767672]">
            {isSurvey ? 'SURVEYING' : isHandover ? 'TOPPED OUT' : 'CONSTRUCTING'}
          </span>
        </div>

        {/* Green progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2a2a28] z-30">
          <div className="h-full bg-[#22c55e] transition-all duration-75 ease-out" style={{ width: `${smoothProgress * 100}%` }} />
        </div>

        {/* WebGL canvas */}
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};

export default ConstructionScrollCAD;
