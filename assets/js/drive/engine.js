/*
 * The 3D engine of the Home page drive. It owns the renderer, the camera and the time of day, and it draws one frame
 * whenever the camera has moved. When the road is stopped nothing is redrawn, so the graphics chip rests.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const R = D.Route;

    /* ---------- What this device can manage ---------- */
    const PRESETS = {
        high: { name: 'high', shadowStep: .14, pr: 1.5, msaa: 4, shadow: 4096, shadowBox: 125, bloom: true, normals: true, aniso: 12, ahead: 700, detail: 260, trees: 1, grass: 1, people: 1 },
        medium: { name: 'medium', shadowStep: .22, pr: 1.1, msaa: 2, shadow: 2048, shadowBox: 82, bloom: true, normals: true, aniso: 6, ahead: 540, detail: 130, trees: .8, grass: .65, people: 1 },
        low: { name: 'low', shadowStep: .24, pr: 1.5, msaa: 0, shadow: 1024, shadowBox: 50, bloom: false, normals: false, aniso: 2, ahead: 380, detail: 70, trees: .5, grass: .3, people: .5 }
    };
    function detectQuality(gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const name = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
        const software = /swiftshader|llvmpipe|software|basic render/i.test(name);
        const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && Math.min(screen.width, screen.height) < 900);
        let tier = 'high';
        if (mobile) { tier = 'low'; } else if (/intel|uhd|iris|radeon\(tm\) graphics|vega|mali|adreno/i.test(name)) { tier = 'medium'; }
        const q = Object.assign({}, PRESETS[tier]);
        q.software = software;
        q.gpu = name;
        return q;
    }

    function create(canvas, options) {
        options = options || {};
        // WebGL 2 is required. Without it the page keeps its plain list of boards.
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance', preserveDrawingBuffer: !!options.keepFrame });
        } catch (e) { return null; }
        const gl = renderer.getContext();
        if (!(gl instanceof WebGL2RenderingContext)) { return null; }
        if (!gl.getExtension('EXT_color_buffer_float') && !gl.getExtension('EXT_color_buffer_half_float')) { return null; }
        const quality = Object.assign(detectQuality(gl), options.quality || {});
        if (quality.software && !options.allowSoftware) { renderer.dispose(); return null; }
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.shadowMap.enabled = quality.shadow > 0;
        renderer.shadowMap.type = quality.name === 'high' ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
        renderer.shadowMap.autoUpdate = true;
        renderer.info.autoReset = false;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, .5, 3300);
        camera.rotation.order = 'YXZ';
        const L = D.Materials.createLibrary(quality);
        D.Roadworks.buildLand();
        const atmosphere = new D.Atmosphere(scene, quality);
        const post = new D.Post(renderer, quality);
        const world = new D.World(renderer, scene, L, quality, camera);
        let view = null, pixelRatio = 1;
        const forward = new THREE.Vector3();
        const ST = { hy: 0 };

        function setView(W, H) {
            view = R.viewFor(W, H);
            pixelRatio = Math.min(window.devicePixelRatio || 1, quality.pr) * (quality.scale || 1);
            // Limit the total number of pixels, however sharp the screen is
            const maxPixels = quality.name === 'high' ? 3600000 : quality.name === 'medium' ? 2300000 : 1100000;
            if (W * H * pixelRatio * pixelRatio > maxPixels) { pixelRatio = Math.sqrt(maxPixels / (W * H)); }
            renderer.setPixelRatio(pixelRatio);
            renderer.setSize(W, H, false);
            const size = renderer.getDrawingBufferSize(new THREE.Vector2());
            post.setSize(size.x, size.y);
            camera.aspect = W / H;
            camera.fov = 2 * Math.atan(H / (2 * view.F)) * 180 / Math.PI;
            camera.updateProjectionMatrix();
            return view;
        }
        function applyHorizon(hy) {
            ST.hy = hy;
            camera.updateProjectionMatrix();
            camera.projectionMatrix.elements[9] = 2 * hy / view.H - 1;
            camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
        }
        /*
         * Place the camera. `pose` gives x, y, z, yaw (radians, positive to the right), pitch, roll and the horizon's height on screen.
         * `s` is the place along the road that sets the time of day.
         */
        function setPose(pose) {
            camera.position.set(pose.x, pose.y, pose.z);
            camera.rotation.set(pose.pitch || 0, -pose.yaw, pose.roll || 0);
            camera.updateMatrixWorld(true);
            applyHorizon(pose.hy);
            forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
        }
        function draw(pose, s, poseInfo) {
            renderer.info.reset();
            setPose(pose);
            const look = atmosphere.update(s);
            atmosphere.follow(camera, forward, renderer, false);
            world.update(s, poseInfo || {}, camera);
            world.updateLamps(camera, look);
            post.render(scene, camera, look);
            return look;
        }
        /*
         * Prepares every material's program while the page is loading. Without this, the first shop or the first lit window
         * to come into view would make the drive stutter for a moment while its program is compiled.
         */
        function prepareShaders() {
            const v = view || setView(window.innerWidth, window.innerHeight);
            const g = new THREE.BufferGeometry();
            const n = 3;
            g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]), 3));
            g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]), 3));
            g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
            g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3).fill(1), 3));
            g.setAttribute('aWin', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
            g.setAttribute('aST', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
            g.setAttribute('aSoil', new THREE.BufferAttribute(new Float32Array(n), 1));
            const holder = new THREE.Group();
            const I = new THREE.Matrix4();
            Object.keys(L).forEach((name) => {
                const m = L[name];
                if (!m || !m.isMaterial) { return; }
                const a = new THREE.Mesh(g, m);
                a.frustumCulled = false; a.castShadow = true; a.receiveShadow = true;
                holder.add(a);
                const b = new THREE.InstancedMesh(g, m, 1);
                b.setMatrixAt(0, I);
                b.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(3).fill(1), 3);
                b.frustumCulled = false; b.castShadow = true; b.receiveShadow = true;
                holder.add(b);
            });
            scene.add(holder);
            camera.aspect = v.W / v.H;
            const done = () => { scene.remove(holder); holder.traverse((o) => { if (o.isInstancedMesh) { o.dispose(); } }); g.dispose(); };
            const job = renderer.compileAsync ? renderer.compileAsync(scene, camera) : Promise.resolve(renderer.compile(scene, camera));
            return job.then(done, done);
        }
        return {
            prepareShaders,
            renderer, scene, camera, quality, world, atmosphere, post, L,
            setView, setPose, draw, getView: function () { return view; },
            getPixelRatio: function () { return pixelRatio; },
            info: function () { return renderer.info; }
        };
    }

    D.createEngine = create;
    D.__presets = PRESETS;
})();

/* ---------- Starting the world on the Home page ---------- */
(function () {
    'use strict';
    const D = window.TRCDrive;
    // Builds the engine, loads the photo textures, and tells the stage the world is ready
    D.startWorld = async function (stage, canvas, note) {
        const params = new URLSearchParams(location.search);
        let forced = null;
        try { forced = params.get('quality') ? D.__presets[params.get('quality')] : null; } catch (e) { forced = null; }
        const engine = D.createEngine(canvas, { quality: forced || undefined, allowSoftware: params.has('software') });
        if (!engine) { return false; }
        // Reaching the graphics chip's limits: try to come back, otherwise leave the boards on their still picture
        canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); stage.worldLost(); });
        const base = 'assets/textures/';
        await Promise.all(['core', 'built', 'foliage'].map(function (b) { return D.Materials.loadScript(base + b + '.js'); }));
        const sets = ['asphalt', 'grass', 'soil', 'farm', 'plaster', 'rough', 'concrete', 'brick', 'rooftile', 'iron', 'shutter', 'pavers', 'tile', 'bark', 'palmbark', 'leaves', 'grasscards', 'palm'];
        await Promise.all(sets.map(function (n) { return D.Materials.applySet(engine.L, n, engine.renderer, engine.quality); }));
        await engine.prepareShaders();
        engine.stepDown = function (level) {
            const q = engine.quality, v = engine.getView();
            // Each step gives up something less noticeable than the one after it
            if (level === 1) { q.shadowStep = .34; return; }
            if (level === 2) { q.detail = Math.round(q.detail * .75); q.ahead = Math.round(q.ahead * .85); return; }
            if (level === 3) { q.scale = .9; } else if (level === 4) { engine.post.bloomOn = false; return; } else if (level === 5) { q.scale = .8; } else { return; }
            if (v) { engine.setView(v.W, v.H); }
        };
        stage.attachEngine(engine);
        return true;
    };
})();
