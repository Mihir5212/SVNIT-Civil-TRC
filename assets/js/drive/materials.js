/*
 * The materials of the road world: photo-based surfaces, with small additions to the standard shaders for
 * street-lamp light, sky reflections, haze that glows towards the sun, weathering on walls and rooms that light up at dusk.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;

    // Values shared by every material; the time-of-day code keeps them up to date
    const U = {
        uLamps: { value: [] }, uLampColor: { value: new THREE.Color(1, .86, .68) }, uLampOn: { value: 0 },
        uSunDirV: { value: new THREE.Vector3(0, 1, 0) }, uSunDirW: { value: new THREE.Vector3(0, 1, 0) }, uSunCol: { value: new THREE.Color(1, 1, 1) },
        uFogSun: { value: new THREE.Color(1, 1, 1) },
        uSkyTop: { value: new THREE.Color(.2, .4, .8) }, uSkyHor: { value: new THREE.Color(.7, .8, .9) }, uSkyLow: { value: new THREE.Color(.2, .2, .2) },
        uNight: { value: 0 }, tNoise: { value: null }, tLand: { value: null }, uLandBox: { value: new THREE.Vector4(-300, -900, 1 / 2600, 1 / 1800) },
        uRoadPool: { value: new THREE.Vector4(0, 30, 0, 0) }
    };
    let LAMP_N = 4;
    function setLampCount(n) {
        LAMP_N = n;
        U.uLamps.value.length = 0;
        for (let i = 0; i < n; i++) { U.uLamps.value.push(new THREE.Vector4(0, 0, 0, 0)); }
    }
    setLampCount(LAMP_N);

    const PARS = () => `
uniform vec4 uLamps[${LAMP_N}];
uniform vec3 uLampColor;
uniform float uLampOn;
uniform vec3 uSunDirV;
uniform vec3 uSunCol;
uniform vec3 uFogSun;
uniform vec3 uSkyTop;
uniform vec3 uSkyHor;
uniform vec3 uSkyLow;
uniform float uNight;
uniform sampler2D tNoise;
`;
    const LAMPS = () => `
if (uLampOn > .001) {
    for (int li = 0; li < ${LAMP_N}; li++) {
        vec4 lp = uLamps[li];
        if (lp.w <= 0.0) { continue; }
        vec3 Lv = lp.xyz - geometryPosition;
        float d2 = dot(Lv, Lv);
        float la = lp.w / (d2 + 9.0);
        Lv /= sqrt(d2);
        float ndl = max(dot(geometryNormal, Lv), 0.0);
        reflectedLight.directDiffuse += la * ndl * uLampColor * BRDF_Lambert(material.diffuseColor);
#ifdef STANDARD
        vec3 Hv = normalize(Lv + geometryViewDir);
        float sp = pow(max(dot(geometryNormal, Hv), 0.0), mix(200.0, 12.0, material.roughness));
        reflectedLight.directSpecular += la * ndl * sp * uLampColor * .22;
#endif
    }
}
`;
    const SKY = `
#ifdef STANDARD
{
    vec3 Rw = inverseTransformDirection(reflect(-geometryViewDir, geometryNormal), viewMatrix);
    float upR = Rw.y;
    vec3 sk = upR > 0.0 ? mix(uSkyHor, uSkyTop, pow(upR, .55)) : mix(uSkyHor, uSkyLow, smoothstep(0.0, -.2, upR));
    float ndv = clamp(dot(geometryNormal, geometryViewDir), 0.0, 1.0);
    vec3 Fr = material.specularColor + (vec3(material.specularF90) - material.specularColor) * pow(1.0 - ndv, 5.0);
    float gloss = 1.0 - material.roughness;
    reflectedLight.indirectSpecular += sk * Fr * (gloss * gloss * .92 + .06);
}
#endif
`;
    const FOG = `
#ifdef USE_FOG
{
    float fogAmt = 1.0 - exp(-fogDensity * vFogDepth);
    vec3 fogView = normalize(-vViewPosition);
    float toSun = max(dot(fogView, uSunDirV), 0.0);
    vec3 fogC = mix(fogColor, uFogSun, toSun * toSun * toSun * toSun);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, fogC, fogAmt);
}
#endif
`;

    function patch(mat, opt) {
        opt = opt || {};
        const key = 'trc:' + (opt.key || '');
        mat.onBeforeCompile = function (shader) {
            for (const k in U) { shader.uniforms[k] = U[k]; }
            if (opt.uniforms) { Object.assign(shader.uniforms, opt.uniforms); }
            let fs = shader.fragmentShader, vs = shader.vertexShader;
            fs = fs.replace('#include <common>', '#include <common>\n' + PARS() + (opt.fsPars || ''));
            fs = fs.replace('#include <fog_fragment>', FOG);
            fs = fs.replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\n' + LAMPS() + (opt.noSky ? '' : SKY) + (opt.afterLights || ''));
            if (opt.afterMap) { fs = fs.replace('#include <color_fragment>', '#include <color_fragment>\n' + opt.afterMap); }
            if (opt.afterRough) { fs = fs.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n' + opt.afterRough); }
            if (opt.normalBegin) { fs = fs.replace('#include <normal_fragment_begin>', opt.normalBegin); }
            if (opt.beforeOutput) { fs = fs.replace('#include <opaque_fragment>', opt.beforeOutput + '\n#include <opaque_fragment>'); }
            if (opt.vsPars) { vs = vs.replace('#include <common>', '#include <common>\n' + opt.vsPars); }
            if (opt.vsMain) { vs = vs.replace('#include <begin_vertex>', '#include <begin_vertex>\n' + opt.vsMain); }
            shader.fragmentShader = fs;
            shader.vertexShader = vs;
        };
        mat.customProgramCacheKey = function () { return key; };
        return mat;
    }

    /* ---------- A tiling noise texture, made once when the page starts ---------- */
    function makeNoise() {
        const S = 256, data = new Uint8Array(S * S * 4);
        function layer(period, seed) {
            const g = new Float32Array(period * period);
            let x = seed * 9973 + 11;
            for (let i = 0; i < g.length; i++) { x = (x * 16807) % 2147483647; g[i] = x / 2147483647; }
            return function (u, v) {
                const fx = u * period, fy = v * period, xi = Math.floor(fx), yi = Math.floor(fy);
                const a = fx - xi, b = fy - yi, sx = a * a * (3 - 2 * a), sy = b * b * (3 - 2 * b);
                const x0 = xi % period, x1 = (xi + 1) % period, y0 = yi % period, y1 = (yi + 1) % period;
                const p = g[y0 * period + x0], q = g[y0 * period + x1], r = g[y1 * period + x0], s = g[y1 * period + x1];
                return p + (q - p) * sx + (r - p) * sy + (p - q - r + s) * sx * sy;
            };
        }
        const A = [layer(4, 1), layer(8, 2), layer(16, 3), layer(32, 4), layer(64, 5)];
        const B = [layer(5, 6), layer(10, 7), layer(20, 8), layer(40, 9), layer(80, 10)];
        const C = layer(128, 11);
        const W = [.42, .26, .16, .1, .06];
        for (let y = 0; y < S; y++) {
            for (let x = 0; x < S; x++) {
                const u = x / S, v = y / S;
                let a = 0, b = 0;
                for (let i = 0; i < 5; i++) { a += A[i](u, v) * W[i]; b += B[i](u, v) * W[i]; }
                const o = (y * S + x) * 4;
                data[o] = Math.min(255, Math.max(0, (a - .5) * 2.1 * 255 + 127));
                data[o + 1] = Math.min(255, Math.max(0, (b - .5) * 2.1 * 255 + 127));
                data[o + 2] = C(u, v) * 255;
                data[o + 3] = 255;
            }
        }
        const t = new THREE.DataTexture(data, S, S, THREE.RGBAFormat);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter;
        t.generateMipmaps = true; t.needsUpdate = true;
        return t;
    }

    /* ---------- Pictures drawn in code: what shows through windows and shop fronts, and shop signs ---------- */
    function canvasTex(cv, srgb) {
        const t = new THREE.CanvasTexture(cv);
        t.colorSpace = srgb === false ? THREE.NoColorSpace : THREE.SRGBColorSpace;
        t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
        t.anisotropy = 4;
        return t;
    }
    // Sixteen different rooms and curtains seen from outside
    function makeWindowAtlas() {
        const S = 512, C = S / 4, cv = document.createElement('canvas');
        cv.width = cv.height = S;
        const g = cv.getContext('2d'), R = D.Rng(77);
        const curtains = ['#b98a5e', '#8c4a3a', '#d9c7a0', '#6d7a8c', '#a65f42', '#e5d9c4', '#587066', '#c9a24d'];
        for (let i = 0; i < 16; i++) {
            const x = (i % 4) * C, y = Math.floor(i / 4) * C, kind = i % 4;
            // The room behind
            const wall = R.pick(['#efe2c8', '#f2ead8', '#dfe6e6', '#f0d9b5', '#e8dcc4']);
            const gr = g.createLinearGradient(x, y, x, y + C);
            gr.addColorStop(0, wall); gr.addColorStop(.75, '#a08f78'); gr.addColorStop(1, '#5a4e42');
            g.fillStyle = gr; g.fillRect(x, y, C, C);
            // A ceiling light and a bit of furniture
            g.fillStyle = 'rgba(255,255,240,.9)'; g.fillRect(x + C * .3, y + C * .06, C * .4, C * .05);
            g.fillStyle = R.pick(['#5d4632', '#40382f', '#6b5642']); g.fillRect(x + C * R.range(.05, .5), y + C * R.range(.6, .75), C * R.range(.3, .45), C);
            if (R.chance(.5)) { g.fillStyle = '#d7ccb4'; g.fillRect(x + C * R.range(.1, .6), y + C * .24, C * .22, C * .28); g.fillStyle = '#7d7362'; g.fillRect(x + C * R.range(.1, .6), y + C * .3, C * .14, C * .15); }
            const cc = R.pick(curtains);
            if (kind === 0) {           // curtains drawn to each side
                g.fillStyle = cc; g.fillRect(x, y, C * .28, C); g.fillRect(x + C * .72, y, C * .28, C);
            } else if (kind === 1) {    // curtain across most of it
                g.fillStyle = cc; g.fillRect(x, y, C, C);
                g.fillStyle = 'rgba(0,0,0,.22)'; for (let f = 0; f < 7; f++) { g.fillRect(x + f * C / 7 + 3, y, 5, C); }
            } else if (kind === 2) {    // blinds
                g.fillStyle = '#d8d3c6'; g.fillRect(x, y, C, C * R.range(.45, .8));
                g.fillStyle = 'rgba(70,60,50,.28)'; for (let f = 0; f < 14; f++) { g.fillRect(x, y + f * C / 14, C, 2.4); }
            }                           // otherwise: a clear view of the room
            g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(x, y, 3, C); g.fillRect(x, y, C, 3);
        }
        return canvasTex(cv);
    }
    // Eight shop interiors: racks of goods in bright light
    function makeShopAtlas() {
        const W = 512, H = 256, CW = W / 4, CH = H / 2, cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        const g = cv.getContext('2d'), R = D.Rng(5);
        const goods = ['#a8574c', '#b89a5c', '#5b7f6d', '#5a7392', '#cfc8b6', '#7c6a84', '#b57c55', '#6c8f8c', '#9a9484', '#8a6d54'];
        for (let i = 0; i < 8; i++) {
            const x = (i % 4) * CW, y = Math.floor(i / 4) * CH;
            // The back of the room, brighter towards the ceiling lights
            const back = g.createLinearGradient(x, y, x, y + CH);
            back.addColorStop(0, '#e9e0c8'); back.addColorStop(.5, '#b8ab90'); back.addColorStop(1, '#6d6250');
            g.fillStyle = back; g.fillRect(x, y, CW, CH);
            g.save(); g.beginPath(); g.rect(x, y, CW, CH); g.clip();
            // Shelves on the back wall and side walls
            const rows = R.int(3, 4), top = y + 14, shelfH = (CH - 40) / rows;
            for (let r = 0; r < rows; r++) {
                const ry = top + r * shelfH;
                g.fillStyle = '#5c4d3c'; g.fillRect(x + 14, ry + shelfH - 2.5, CW - 28, 2.5);
                let bx = x + 16;
                while (bx < x + CW - 18) {
                    const bw = R.range(3.5, 11), bh = R.range(.4, .86) * (shelfH - 4);
                    g.fillStyle = R.pick(goods); g.fillRect(bx, ry + shelfH - 2.5 - bh, bw, bh);
                    g.fillStyle = 'rgba(0,0,0,.14)'; g.fillRect(bx + bw - 1, ry + shelfH - 2.5 - bh, 1, bh);
                    bx += bw + R.range(.3, 1.8);
                }
            }
            // Side walls leaning in, for depth
            g.fillStyle = 'rgba(40,32,24,.34)';
            g.beginPath(); g.moveTo(x, y); g.lineTo(x + 14, y + 8); g.lineTo(x + 14, y + CH - 16); g.lineTo(x, y + CH); g.fill();
            g.beginPath(); g.moveTo(x + CW, y); g.lineTo(x + CW - 14, y + 8); g.lineTo(x + CW - 14, y + CH - 16); g.lineTo(x + CW, y + CH); g.fill();
            // Ceiling tube lights
            g.fillStyle = 'rgba(255,252,235,.95)'; g.fillRect(x + 22, y + 3, CW * .3, 2.5); g.fillRect(x + CW - 22 - CW * .3, y + 3, CW * .3, 2.5);
            // Counter in front, sometimes with a figure behind it
            if (R.chance(.55)) {
                const fx = x + R.range(.25, .7) * CW;
                g.fillStyle = '#4a3b30'; g.fillRect(fx, y + CH - 52, 13, 34);
                g.fillStyle = '#8c6647'; g.beginPath(); g.arc(fx + 6.5, y + CH - 58, 6, 0, 7); g.fill();
            }
            g.fillStyle = '#4c3b2c'; g.fillRect(x, y + CH - 24, CW, 24);
            g.fillStyle = '#6a5440'; g.fillRect(x, y + CH - 24, CW, 3);
            g.restore();
        }
        return canvasTex(cv);
    }
    // Shop signs with generic trade names, no real businesses
    const SHOP_NAMES = ['MEDICAL STORE', 'GENERAL STORE', 'BAKERY', 'HARDWARE', 'MOBILE SHOP', 'TAILOR', 'SWEETS', 'OPTICALS', 'STATIONERY', 'FOOTWEAR', 'TEXTILES', 'SAREE CENTRE', 'RESTAURANT', 'TEA POINT', 'XEROX', 'ELECTRICALS', 'CYCLE REPAIR', 'PHOTO STUDIO', 'CLINIC', 'FRUIT MART', 'PAINTS', 'AUTO PARTS', 'BOOK DEPOT', 'SNACKS'];
    const SIGN_SKINS = [['#c8202f', '#ffffff'], ['#0b4280', '#ffffff'], ['#f2be1a', '#17202a'], ['#0a5a43', '#ffffff'], ['#f4f1e8', '#b01e28'], ['#17202a', '#f2be1a'], ['#e8743b', '#ffffff'], ['#5b3a8c', '#ffffff']];
    function makeSignAtlas() {
        const W = 1024, H = 1024, CW = 256, CH = 64, cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        const g = cv.getContext('2d');
        g.textAlign = 'center'; g.textBaseline = 'middle';
        for (let i = 0; i < 48; i++) {
            const x = (i % 4) * CW, y = Math.floor(i / 4) * CH;
            const skin = SIGN_SKINS[i % SIGN_SKINS.length], name = SHOP_NAMES[i % SHOP_NAMES.length];
            g.fillStyle = skin[0]; g.fillRect(x, y, CW, CH);
            g.fillStyle = 'rgba(255,255,255,.16)'; g.fillRect(x, y, CW, CH * .4);
            g.strokeStyle = skin[1]; g.lineWidth = 2; g.strokeRect(x + 4, y + 4, CW - 8, CH - 8);
            g.fillStyle = skin[1];
            let fs = 34;
            g.font = 'bold ' + fs + 'px Arial, Helvetica, sans-serif';
            while (g.measureText(name).width > CW - 26 && fs > 12) { fs -= 2; g.font = 'bold ' + fs + 'px Arial, Helvetica, sans-serif'; }
            g.fillText(name, x + CW / 2, y + CH / 2 + 1);
        }
        // Road-safety messages for the big roadside frames
        const SLOGANS = [['WEAR A HELMET', '#b01e28'], ['DRIVE SLOW, LIVE LONG', '#0b4280'], ['WEAR YOUR SEAT BELT', '#0a5a43'], ['DO NOT DRINK AND DRIVE', '#17202a']];
        SLOGANS.forEach((sl, i) => {
            const x = (i % 2) * 512, y = 768 + Math.floor(i / 2) * 128;
            g.fillStyle = sl[1]; g.fillRect(x, y, 512, 128);
            g.strokeStyle = '#ffffff'; g.lineWidth = 5; g.strokeRect(x + 10, y + 10, 492, 108);
            g.fillStyle = '#ffffff'; g.font = 'bold 46px Arial, Helvetica, sans-serif';
            let fs = 46;
            while (g.measureText(sl[0]).width > 460 && fs > 20) { fs -= 2; g.font = 'bold ' + fs + 'px Arial, Helvetica, sans-serif'; }
            g.fillText(sl[0], x + 256, y + 66);
        });
        return canvasTex(cv);
    }

    /* ---------- The material library ---------- */
    const TEX = {};
    function createLibrary(quality) {
        setLampCount(quality.name === 'high' ? 6 : quality.name === 'medium' ? 4 : 3);
        U.tNoise.value = makeNoise();
        const std = (o, p) => { const key = o.__key || ''; const props = Object.assign({ vertexColors: true, roughness: .9, metalness: 0 }, o); delete props.__key; return patch(new THREE.MeshStandardMaterial(props), Object.assign({ key: key }, p || {})); };
        const WEATHER = `
#ifdef USE_MAP
    {
        float gr = texture2D(tNoise, vMapUv * vec2(.11, .021)).g;
        float gr2 = texture2D(tNoise, vMapUv * vec2(.47, .09) + .4).r;
        diffuseColor.rgb *= mix(.66, 1.1, smoothstep(.22, .72, gr * .7 + gr2 * .3));
    }
#endif
`;
        const L = {};
        const st = { vsPars: 'attribute vec2 aST; varying vec2 vST;', vsMain: 'vST = aST;', fsPars: 'varying vec2 vST;' };

        L.road = std({ __key: 'road', roughness: .86, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }, Object.assign({}, st, {
            key: 'road',
            afterMap: `
    {
        float big = texture2D(tNoise, vST * .011).r;
        float streak = texture2D(tNoise, vST * vec2(.0045, .11) + .3).g;
        float lane = mod(abs(vST.y), 3.5);
        float track = smoothstep(.45, .85, lane) * (1.0 - smoothstep(.95, 1.35, lane)) + smoothstep(2.15, 2.55, lane) * (1.0 - smoothstep(2.65, 3.05, lane));
        float tone = mix(.78, 1.16, big) * mix(.92, 1.06, streak);
        diffuseColor.rgb *= tone * (1.0 + track * .1);
    }
`,
            afterRough: `
    {
        float lane = mod(abs(vST.y), 3.5);
        float track = smoothstep(.45, .85, lane) * (1.0 - smoothstep(.95, 1.35, lane)) + smoothstep(2.15, 2.55, lane) * (1.0 - smoothstep(2.65, 3.05, lane));
        roughnessFactor = clamp(roughnessFactor - track * .16, .3, 1.0);
    }
`
        }));
        L.paint = std({ __key: 'paint', roughness: .62, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }, {
            key: 'paint',
            vsPars: 'varying vec2 vPaintUv;', vsMain: 'vPaintUv = uv;', fsPars: 'varying vec2 vPaintUv;',
            afterMap: `
    {
        float w1 = texture2D(tNoise, vPaintUv * .19).r;
        float w2 = texture2D(tNoise, vPaintUv * 1.3).g;
        float worn = smoothstep(.28, .56, w1 * .55 + w2 * .45);
        diffuseColor.rgb *= mix(.42, 1.0, worn);
    }
`,
            // Road paint has glass beads in it, which throw light back towards the driver at night
            beforeOutput: 'outgoingLight += diffuseColor.rgb * uNight * .1;'
        });
        const white = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1, THREE.RGBAFormat);
        white.needsUpdate = true;
        L.terrainU = { tGrass: { value: white }, tSoil: { value: white }, tFarm: { value: white } };
        L.terrain = std({ __key: 'terrain', roughness: 1 }, Object.assign({}, st, {
            key: 'terrain',
            uniforms: L.terrainU,
            fsPars: st.fsPars + `
uniform sampler2D tGrass; uniform sampler2D tSoil; uniform sampler2D tFarm; uniform sampler2D tLand; uniform vec4 uLandBox;
varying float vSoil;
`,
            vsPars: st.vsPars + ' attribute float aSoil; varying float vSoil;',
            vsMain: st.vsMain + ' vSoil = aSoil;',
            afterMap: `
    {
        vec2 wuv = vST;
        vec4 land = texture2D(tLand, (wuv - uLandBox.xy) * uLandBox.zw);
        float cam = length(vViewPosition);
        float n1 = texture2D(tNoise, wuv * .0065).r;
        float n2 = texture2D(tNoise, wuv * .037).g;
        float n3 = texture2D(tNoise, wuv * .19).r;
        vec3 g1 = texture2D(tGrass, wuv * .31).rgb;
        vec3 g2 = texture2D(tGrass, wuv * .057).rgb;
        vec3 grass = mix(g1, g2, smoothstep(14.0, 70.0, cam));
        grass *= land.rgb * 1.78 * mix(.68, 1.18, n1) * mix(.84, 1.14, n2);
        grass = mix(grass, grass * vec3(1.2, .96, .6), smoothstep(.56, .82, n2 * .6 + n1 * .4));
        vec3 farm = texture2D(tFarm, wuv * .21).rgb * vec3(1.32, 1.18, 1.0) * mix(.8, 1.2, n2);
        vec3 soil = mix(texture2D(tSoil, wuv * .29).rgb, texture2D(tSoil, wuv * .05).rgb, smoothstep(14.0, 70.0, cam));
        soil = mix(soil, vec3(dot(soil, vec3(.33))), .5) * mix(.72, 1.02, n2) * vec3(.86, .8, .72);
        vec3 col = mix(grass, farm, land.a);
        float sm = clamp(vSoil + (n3 - .5) * .5 * step(.02, vSoil) * step(vSoil, .98), 0.0, 1.0);
        sm = smoothstep(.32, .68, sm);
        col = mix(col, soil, sm);
        diffuseColor.rgb = col * vColor.rgb;
    }
`
        }));
        const wall = (key, tint) => std({ __key: key, roughness: .94, color: tint || 0xffffff }, { key: key, afterMap: WEATHER, noSky: false });
        L.plaster = wall('plaster');
        L.rough = wall('rough');
        L.concrete = wall('concrete');
        L.brick = std({ __key: 'brick', roughness: .92 }, { key: 'brick', afterMap: WEATHER });
        L.rooftile = std({ __key: 'rooftile', roughness: .82 }, { key: 'rooftile' });
        L.iron = std({ __key: 'iron', roughness: .55, metalness: .35 }, { key: 'iron' });
        L.shutter = std({ __key: 'shutter', roughness: .55, metalness: .25 }, { key: 'shutter', afterMap: WEATHER });
        L.pavers = std({ __key: 'pavers', roughness: .9 }, { key: 'pavers' });
        L.tile = std({ __key: 'tile', roughness: .35 }, { key: 'tile' });
        L.plain = std({ __key: 'plain', roughness: .85 }, { key: 'plain' });
        L.steel = std({ __key: 'steel', roughness: .5, metalness: .32 }, { key: 'steel' });
        L.gloss = std({ __key: 'gloss', roughness: .28, metalness: .0 }, { key: 'gloss' });
        L.rubber = std({ __key: 'rubber', roughness: .9 }, { key: 'rubber' });
        L.wood = std({ __key: 'wood', roughness: .78 }, { key: 'wood', afterMap: '' });
        L.bark = std({ __key: 'bark', roughness: .95 }, { key: 'bark' });
        L.palmbark = std({ __key: 'palmbark', roughness: .95 }, { key: 'palmbark' });
        // Clear panes with a room behind them. Each pane knows when its lights come on as night falls.
        const WIN = {
            vsPars: 'attribute vec2 aWin; varying vec2 vWin;', vsMain: 'vWin = aWin;', fsPars: 'varying vec2 vWin;',
            beforeOutput: `
    {
        float on = smoothstep(vWin.x, vWin.x + .05, uNight);
        vec3 room = (diffuseColor.rgb / max(ROOM_DIM, .001));
        vec3 warm = mix(vec3(1.0, .74, .44), vec3(.84, .94, 1.0), vWin.y);
        outgoingLight += room * warm * on * ROOM_LIGHT;
    }
`
        };
        L.glass = std({ __key: 'glass', roughness: .09, color: 0xffffff }, Object.assign({}, WIN, { key: 'glass', beforeOutput: WIN.beforeOutput.replace(/ROOM_DIM/g, '.1').replace('ROOM_LIGHT', '1.55') }));
        L.glass.color.setScalar(.1);
        L.showcase = std({ __key: 'showcase', roughness: .16 }, Object.assign({}, WIN, { key: 'showcase', beforeOutput: WIN.beforeOutput.replace(/ROOM_DIM/g, '.3').replace('ROOM_LIGHT', '.62') }));
        L.showcase.color.setScalar(.3);
        // Reflective glass of commercial buildings. A little light comes through it at night, in bands.
        L.curtain = std({ __key: 'curtain', roughness: .06, metalness: .55, color: 0x8fb3c7 }, Object.assign({}, WIN, {
            key: 'curtain',
            beforeOutput: `
    {
        float on = smoothstep(vWin.x, vWin.x + .05, uNight);
        vec3 warm = mix(vec3(1.0, .78, .5), vec3(.82, .92, 1.0), vWin.y);
        outgoingLight += warm * on * .62;
    }
`
        }));
        // Shop signs: lit from within after dark
        L.signs = std({ __key: 'signs', roughness: .45 }, {
            key: 'signs',
            beforeOutput: 'outgoingLight += diffuseColor.rgb * smoothstep(.15, .6, uNight) * .72;'
        });
        // Small lights that glow by themselves. Their strength is set per vertex in the colour.
        L.lamp = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, fog: true });
        patch(L.lamp, { key: 'lamp', noSky: true });
        L.lamp.onBeforeCompile = (function (orig) {
            return function (shader) {
                orig(shader);
                // A basic material has no view position for the haze, so give it one
                shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vViewPosition;').replace('#include <project_vertex>', '#include <project_vertex>\nvViewPosition = -mvPosition.xyz;');
                shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vViewPosition;');
            };
        })(L.lamp.onBeforeCompile);
        // Reflectors and lamps that only light up as night falls
        L.nightlamp = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, fog: false });
        patch(L.nightlamp, { key: 'nightlamp', noSky: true });
        L.nightlamp.onBeforeCompile = (function (orig) {
            return function (shader) {
                orig(shader);
                shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', 'outgoingLight *= uLampOn;\n#include <opaque_fragment>');
            };
        })(L.nightlamp.onBeforeCompile);

        /* Foliage: flat cards of leaves shaded as if they were round clumps, with light passing through when the sun is behind them */
        const foliage = (key, opts) => {
            const m = new THREE.MeshLambertMaterial(Object.assign({
                vertexColors: true, side: THREE.DoubleSide, alphaTest: .42, alphaToCoverage: quality.msaa > 0
            }, opts || {}));
            return patch(m, {
                key: key, noSky: true,
                afterMap: `
    diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(.3, .6, .1))), diffuseColor.rgb, .84) * .8;
`,
                normalBegin: 'float faceDirection = 1.0; vec3 normal = normalize(vNormal); vec3 nonPerturbedNormal = normal;',
                afterLights: `
    {
        vec3 fv = normalize(-vViewPosition);
        float back = pow(max(dot(fv, uSunDirV), 0.0), 2.5);
        reflectedLight.directDiffuse += uSunCol * material.diffuseColor * back * .5;
    }
`
            });
        };
        L.leaves = foliage('leaves');
        L.grasscards = foliage('grasscards', { alphaTest: .38 });
        L.palm = foliage('palm', { alphaTest: .4 });

        // Soft pools of light painted onto the ground: shop light on a footpath, shadow under a car
        L.shadowblob = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, depthWrite: false, opacity: 1, vertexColors: true, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
        L.shadowblob.onBeforeCompile = function (shader) {
            shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', 'float bd = length(vBlobUv * 2.0 - 1.0); diffuseColor.a = (1.0 - smoothstep(.45, 1.0, bd)) * vColor.r; diffuseColor.rgb = vec3(0.0);\n#include <opaque_fragment>').replace('#include <common>', '#include <common>\nvarying vec2 vBlobUv;');
            shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vBlobUv;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvBlobUv = uv;');
        };
        L.shadowblob.customProgramCacheKey = () => 'blob';
        L.pool = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, toneMapped: false });
        L.pool.onBeforeCompile = function (shader) {
            shader.uniforms.uNight = U.uNight;
            shader.fragmentShader = shader.fragmentShader
                .replace('#include <common>', '#include <common>\nvarying vec2 vBlobUv; uniform float uNight;')
                .replace('#include <opaque_fragment>', 'float bd = length(vBlobUv * 2.0 - 1.0); float pf = 1.0 - smoothstep(.1, 1.0, bd); outgoingLight = vColor.rgb * pf * pf * smoothstep(.25, .75, uNight);\n#include <opaque_fragment>');
            shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vBlobUv;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvBlobUv = uv;');
        };
        L.pool.customProgramCacheKey = () => 'pool';

        L.windowAtlas = makeWindowAtlas();
        L.glass.map = L.windowAtlas;
        L.shopAtlas = makeShopAtlas();
        L.showcase.map = L.shopAtlas;
        L.signAtlas = makeSignAtlas();
        L.signs.map = L.signAtlas;
        return L;
    }

    /* ---------- Loading the photo textures ---------- */
    function dataTexture(url, srgb, aniso, renderer, repeat) {
        return new Promise(function (resolve) {
            const img = new Image();
            img.onload = function () {
                const t = new THREE.Texture(img);
                t.needsUpdate = true;
                t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
                if (repeat !== false) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
                t.anisotropy = aniso;
                t.minFilter = THREE.LinearMipmapLinearFilter;
                t.magFilter = THREE.LinearFilter;
                if (renderer) { renderer.initTexture(t); }
                resolve(t);
            };
            img.onerror = function () { resolve(null); };
            img.src = url;
        });
    }
    function loadScript(src) {
        return new Promise(function (resolve) {
            const s = document.createElement('script');
            s.src = src; s.async = true;
            s.onload = function () { resolve(true); };
            s.onerror = function () { resolve(false); };
            document.head.appendChild(s);
        });
    }
    // Attach a downloaded material set to the materials that use it
    async function applySet(L, name, renderer, quality) {
        const T = window.TRCTextures && window.TRCTextures[name];
        if (!T) { return; }
        const aniso = name === 'asphalt' ? quality.aniso : Math.min(quality.aniso, 4);
        const maps = {};
        if (T.map) { maps.map = await dataTexture(T.map, true, aniso, renderer); }
        if (T.normal && quality.normals) { maps.normal = await dataTexture(T.normal, false, aniso, renderer); }
        if (T.alpha) { maps.alpha = await dataTexture(T.alpha, false, 2, renderer, false); }
        TEX[name] = maps;
        const assign = (m, nScale) => {
            if (maps.map) { m.map = maps.map; }
            if (maps.normal) { m.normalMap = maps.normal; m.normalScale = new THREE.Vector2(nScale, nScale); }
            if (maps.alpha) { m.alphaMap = maps.alpha; }
            m.needsUpdate = true;
        };
        switch (name) {
        case 'asphalt': assign(L.road, .9); break;
        case 'grass':
            L.terrainU.tGrass.value = maps.map;
            if (maps.normal) { L.terrain.normalMap = maps.normal; L.terrain.normalScale = new THREE.Vector2(.8, .8); L.terrain.needsUpdate = true; }
            break;
        case 'soil': L.terrainU.tSoil.value = maps.map; break;
        case 'farm': L.terrainU.tFarm.value = maps.map; break;
        case 'plaster': assign(L.plaster, .55); break;
        case 'rough': assign(L.rough, .8); break;
        case 'concrete': assign(L.concrete, .7); break;
        case 'brick': assign(L.brick, 1); break;
        case 'rooftile': assign(L.rooftile, 1); break;
        case 'iron': assign(L.iron, 1); break;
        case 'shutter': assign(L.shutter, 1); break;
        case 'pavers': assign(L.pavers, .9); break;
        case 'tile': assign(L.tile, .7); break;
        case 'bark': assign(L.bark, 1); break;
        case 'palmbark': assign(L.palmbark, 1); break;
        case 'leaves': assign(L.leaves, 0); break;
        case 'grasscards': assign(L.grasscards, 0); break;
        case 'palm': assign(L.palm, 0); break;
        default: break;
        }
    }

    D.Materials = { U, createLibrary, applySet, loadScript, TEX, canvasTex, patch };
})();
