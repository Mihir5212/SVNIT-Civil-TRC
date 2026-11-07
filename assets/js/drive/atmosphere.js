/*
 * The sky, the sun, the haze and the time of day. Everything is read from one number, the height of the sun,
 * so the sky, the light on every object, the shadows, the street lamps and the lit windows all change together.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;
    const rgb = D.rgb, R = D.Route, U = D.Materials.U;

    // Each row: the look of the world when the sun is at this height (degrees above the horizon)
    const K = [
        { e: 63, sun: '#fff0d6', sunI: 7.4, sky: '#a9cbf5', gnd: '#8f8a66', hemi: 1.85, fog: '#bcd3ea', fogSun: '#f3ead6', dens: .00052, top: '#1f62cc', hor: '#b8d6f0', low: '#7c7a66', exp: .78, night: 0, lamp: 0, cl: '#ffffff', cd: '#9fb0c6', glow: '#fff2d8', cloud: .36, bloom: .02, sat: 1.0 },
        { e: 30, sun: '#ffe2b8', sunI: 6.9, sky: '#a2bfe8', gnd: '#897c5e', hemi: 1.7, fog: '#c6d2dc', fogSun: '#f6dcb4', dens: .00058, top: '#2a68bc', hor: '#cfdde4', low: '#7a705c', exp: .78, night: 0, lamp: 0, cl: '#fff6e6', cd: '#98a6ba', glow: '#ffe2b4', cloud: .38, bloom: .02, sat: 1.02 },
        { e: 14, sun: '#ffc27c', sunI: 5.8, sky: '#a4b8da', gnd: '#94795a', hemi: 2.0, fog: '#dcc6a8', fogSun: '#ffc882', dens: .00074, top: '#35659f', hor: '#f4cf9c', low: '#6e5a48', exp: .82, night: 0, lamp: 0, cl: '#ffe0b4', cd: '#8c8a9e', glow: '#ffc27e', cloud: .4, bloom: .04, sat: 1.16 },
        { e: 7, sun: '#ffa054', sunI: 4.8, sky: '#9aa6cc', gnd: '#8a6d56', hemi: 1.75, fog: '#e6b786', fogSun: '#ffa556', dens: .00092, top: '#3a5a96', hor: '#fbb074', low: '#5c4a3e', exp: .88, night: .04, lamp: 0, cl: '#ffc48c', cd: '#7c7088', glow: '#ffa050', cloud: .42, bloom: .06, sat: 1.16 },
        { e: 2.5, sun: '#ff7c3c', sunI: 3, sky: '#8a92bc', gnd: '#6e564c', hemi: 1.32, fog: '#d48e6c', fogSun: '#ff8040', dens: .00106, top: '#2c4279', hor: '#ef8a56', low: '#463a38', exp: .98, night: .14, lamp: .12, cl: '#ffa070', cd: '#5a5270', glow: '#ff7a3c', cloud: .44, bloom: .1, sat: 1.12 },
        { e: -3.5, sun: '#ff6636', sunI: .2, sky: '#6474aa', gnd: '#38343e', hemi: .8, fog: '#5b5a78', fogSun: '#9c6650', dens: .00112, top: '#142255', hor: '#7c5a60', low: '#27252e', exp: 1.18, night: .5, lamp: .75, cl: '#6f4c60', cd: '#262845', glow: '#94503c', cloud: .3, bloom: .22, sat: 1.06 },
        { e: -8.5, sun: '#7a8ec8', sunI: .08, sky: '#3b4a84', gnd: '#1f2130', hemi: .4, fog: '#2c3250', fogSun: '#4c4460', dens: .00115, top: '#0c1536', hor: '#36385a', low: '#16171f', exp: 1.3, night: .84, lamp: 1, cl: '#333759', cd: '#14182e', glow: '#3a3650', cloud: .4, bloom: .3, sat: 1.04 },
        { e: -15, sun: '#8ea6dc', sunI: .2, sky: '#252f5c', gnd: '#14151f', hemi: .3, fog: '#141a30', fogSun: '#1e2236', dens: .00105, top: '#050a1b', hor: '#1d2138', low: '#0d0e14', exp: 1.35, night: 1, lamp: 1, cl: '#1b2038', cd: '#0a0d1a', glow: '#1a1c2e', cloud: .36, bloom: .34, sat: 1.04 },
        { e: -30, sun: '#8ea6dc', sunI: .24, sky: '#212a54', gnd: '#111219', hem: 0, hemi: .28, fog: '#101527', fogSun: '#181c2e', dens: .00105, top: '#040817', hor: '#191c30', low: '#0b0c12', exp: 1.35, night: 1, lamp: 1, cl: '#161a30', cd: '#080b16', glow: '#14162a', cloud: .34, bloom: .36, sat: 1.04 }
    ];
    const COLOUR_KEYS = ['sun', 'sky', 'gnd', 'fog', 'fogSun', 'top', 'hor', 'low', 'cl', 'cd', 'glow'];
    const NUM_KEYS = ['sunI', 'hemi', 'dens', 'exp', 'night', 'lamp', 'cloud', 'bloom', 'sat'];
    K.forEach((row) => { COLOUR_KEYS.forEach((c) => { row[c + 'L'] = rgb(row[c]); }); });

    function sample(elev, out) {
        let a = K[0], b = K[0], t = 0;
        if (elev >= K[0].e) { a = b = K[0]; } else if (elev <= K[K.length - 1].e) { a = b = K[K.length - 1]; } else {
            for (let i = 1; i < K.length; i++) {
                if (elev >= K[i].e) { a = K[i - 1]; b = K[i]; t = (a.e - elev) / (a.e - b.e); break; }
            }
        }
        NUM_KEYS.forEach((k) => { out[k] = a[k] + (b[k] - a[k]) * t; });
        COLOUR_KEYS.forEach((c) => {
            const p = a[c + 'L'], q = b[c + 'L'];
            out[c] = [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
        });
        return out;
    }

    const SKY_VS = `
varying vec3 vDir;
void main() {
    vDir = position;
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vec4(p.xy, p.w * .99999, p.w);
}`;
    const SKY_FS = `
varying vec3 vDir;
uniform vec3 uSunDir; uniform vec3 uTop; uniform vec3 uHor; uniform vec3 uLow; uniform vec3 uGlow; uniform vec3 uSunC;
uniform vec3 uCl; uniform vec3 uCd; uniform float uCloud; uniform float uStars; uniform vec3 uMoonDir; uniform sampler2D tNoise;
float fbm(vec2 p) {
    float s = 0.0, a = .5;
    for (int i = 0; i < 4; i++) { s += a * texture2D(tNoise, p).r; p = p * 2.07 + vec2(.17, .31); a *= .5; }
    return s / .9375;
}
float star(vec3 d) {
    vec3 q = floor(d * 190.0);
    float h = fract(sin(dot(q, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    if (h < .9965) { return 0.0; }
    vec3 c = (q + .5) / 190.0;
    float m = 1.0 - smoothstep(.0, .0026, length(d - normalize(c)));
    return m * fract(h * 91.7);
}
void main() {
    vec3 d = normalize(vDir);
    float up = max(d.y, 0.0);
    vec3 col = d.y >= 0.0 ? mix(uHor, uTop, pow(up, .48)) : mix(uHor, uLow, smoothstep(0.0, -.08, d.y));
    float sd = max(dot(d, uSunDir), 0.0);
    col += uGlow * (pow(sd, 5.0) * .24 + pow(sd, 42.0) * .55);
    col += uSunC * smoothstep(.99955, .99985, sd) * 42.0;
    if (uStars > .01 && d.y > 0.0) {
        col += vec3(star(d)) * uStars * 1.4 * smoothstep(.0, .3, d.y);
        float md = dot(d, uMoonDir);
        col += vec3(.9, .94, 1.0) * smoothstep(.99965, .99982, md) * uStars * 3.2;
        col += vec3(.2, .24, .36) * pow(max(md, 0.0), 300.0) * uStars * .5;
    }
    if (d.y > .004) {
        vec2 uv = d.xz / (d.y + .2) * .16;
        float base = texture2D(tNoise, uv * .2 + vec2(.13, .41)).r;
        float detail = fbm(uv + vec2(.31, .07));
        float n = base * .62 + detail * .38;
        float th = .76 - uCloud * .6;
        float cov = smoothstep(th, th + .075, n);
        float high = smoothstep(.56, .8, fbm(uv * vec2(.22, 1.1) + vec2(.7, .2))) * .28;
        float nl = texture2D(tNoise, uv * .2 + vec2(.13, .41) + uSunDir.xz * .014).r * .62 + fbm(uv + vec2(.31, .07) + uSunDir.xz * .06) * .38;
        float lit = clamp(.66 + (n - nl) * 8.0 - smoothstep(th + .07, th + .2, n) * .5, 0.0, 1.0);
        vec3 cc = mix(uCd, uCl, lit);
        cc += uGlow * pow(sd, 8.0) * .6;
        float fade = smoothstep(.004, .085, d.y);
        col = mix(col, mix(uCl, col, .25), high * fade);
        col = mix(col, cc, cov * .96 * fade);
    }
    gl_FragColor = vec4(col, 1.0);
}`;

    class Atmosphere {
        constructor(scene, quality) {
            this.scene = scene;
            this.q = quality;
            this.state = {};
            this.sunDir = new THREE.Vector3(0, 1, 0);
            this.lightDir = new THREE.Vector3(0, 1, 0);
            this.moonDir = new THREE.Vector3(.42, .78, -.46).normalize();
            scene.fog = new THREE.FogExp2(0xffffff, .001);
            this.hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
            scene.add(this.hemi);
            this.sun = new THREE.DirectionalLight(0xffffff, 3);
            scene.add(this.sun); scene.add(this.sun.target);
            this.shadowOn = quality.shadow > 0;
            if (this.shadowOn) {
                const s = this.sun.shadow;
                this.sun.castShadow = true;
                s.mapSize.set(quality.shadow, quality.shadow);
                s.bias = -.00042; s.normalBias = .045;
                s.radius = quality.shadow >= 2048 ? 1.6 : 1.2;
                const c = s.camera, B = quality.shadowBox;
                c.left = -B; c.right = B; c.top = B; c.bottom = -B; c.near = 20; c.far = 1400;
                c.updateProjectionMatrix();
                s.autoUpdate = false;
            }
            this.lastShadow = new THREE.Vector3(1e9, 0, 0);
            this.lastShadowDir = new THREE.Vector3();
            this.mkSky();
            this.basisU = new THREE.Vector3(); this.basisV = new THREE.Vector3();
        }
        mkSky() {
            const g = new THREE.SphereGeometry(3400, 28, 18);
            this.skyU = {
                uSunDir: { value: new THREE.Vector3() }, uMoonDir: { value: this.moonDir }, uTop: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uLow: { value: new THREE.Color() },
                uGlow: { value: new THREE.Color() }, uSunC: { value: new THREE.Color() }, uCl: { value: new THREE.Color() }, uCd: { value: new THREE.Color() },
                uCloud: { value: .5 }, uStars: { value: 0 }, tNoise: U.tNoise
            };
            const m = new THREE.ShaderMaterial({ vertexShader: SKY_VS, fragmentShader: SKY_FS, uniforms: this.skyU, side: THREE.BackSide, depthWrite: false, depthTest: true, fog: false, toneMapped: false });
            this.dome = new THREE.Mesh(g, m);
            this.dome.frustumCulled = false;
            // Drawn after solid objects, so only the part of the sky actually in view is worked out
            this.dome.renderOrder = 10;
            this.scene.add(this.dome);
        }
        // The time of day for this spot on the road
        update(s) {
            const sn = R.sunAt(s), x = this.state;
            sample(sn.elev, x);
            this.elev = sn.elev;
            const el = sn.elev * Math.PI / 180, az = sn.az * Math.PI / 180;
            this.sunDir.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el)).normalize();
            // Below the horizon the moon takes over as the source of direct light
            const useMoon = sn.elev < -5;
            this.lightDir.copy(useMoon ? this.moonDir : this.sunDir);
            if (!useMoon && sn.elev < 4) { this.lightDir.y = Math.max(this.lightDir.y, .07); this.lightDir.normalize(); }
            const sun = this.sun, hemi = this.hemi;
            sun.color.setRGB(x.sun[0], x.sun[1], x.sun[2]);
            sun.intensity = x.sunI;
            hemi.color.setRGB(x.sky[0], x.sky[1], x.sky[2]);
            hemi.groundColor.setRGB(x.gnd[0], x.gnd[1], x.gnd[2]);
            hemi.intensity = x.hemi;
            this.scene.fog.color.setRGB(x.fog[0], x.fog[1], x.fog[2]);
            this.scene.fog.density = x.dens;
            U.uFogSun.value.setRGB(x.fogSun[0], x.fogSun[1], x.fogSun[2]);
            U.uSunCol.value.setRGB(x.sun[0] * x.sunI, x.sun[1] * x.sunI, x.sun[2] * x.sunI);
            U.uSkyTop.value.setRGB(x.top[0], x.top[1], x.top[2]);
            U.uSkyHor.value.setRGB(x.hor[0], x.hor[1], x.hor[2]);
            U.uSkyLow.value.setRGB(x.low[0], x.low[1], x.low[2]);
            U.uNight.value = x.night;
            U.uLampOn.value = x.lamp;
            U.uSunDirW.value.copy(this.sunDir);
            const k = this.skyU;
            k.uSunDir.value.copy(this.sunDir);
            k.uTop.value.setRGB(x.top[0], x.top[1], x.top[2]);
            k.uHor.value.setRGB(x.hor[0], x.hor[1], x.hor[2]);
            k.uLow.value.setRGB(x.low[0], x.low[1], x.low[2]);
            k.uGlow.value.setRGB(x.glow[0], x.glow[1], x.glow[2]);
            k.uSunC.value.setRGB(x.sun[0] * Math.max(0, Math.min(1, (sn.elev + 1.5) / 2)), x.sun[1] * Math.max(0, Math.min(1, (sn.elev + 1.5) / 2)), x.sun[2] * Math.max(0, Math.min(1, (sn.elev + 1.5) / 2)));
            k.uCl.value.setRGB(x.cl[0], x.cl[1], x.cl[2]);
            k.uCd.value.setRGB(x.cd[0], x.cd[1], x.cd[2]);
            k.uCloud.value = x.cloud;
            k.uStars.value = Math.max(0, Math.min(1, (-sn.elev - 5) / 8));
            if (this.shadowOn) { sun.shadow.intensity = Math.max(0, Math.min(1, (sn.elev + 1) / 5)); }
            return x;
        }
        // Move the sun's shadow map with the camera, in fixed steps so that shadows stay still on the ground
        follow(camera, forward, renderer, force) {
            const dir = this.lightDir, sun = this.sun;
            this.dome.position.copy(camera.position);
            U.uSunDirV.value.copy(this.sunDir).transformDirection(camera.matrixWorldInverse);
            if (!this.shadowOn) {
                sun.position.copy(dir).multiplyScalar(500);
                sun.target.position.set(0, 0, 0);
                return;
            }
            if (sun.shadow.intensity <= 0) { sun.position.copy(dir).multiplyScalar(500).add(camera.position); sun.target.position.copy(camera.position); sun.target.updateMatrixWorld(); return; }
            const B = this.q.shadowBox;
            const cx = camera.position.x + forward.x * B * .62, cz = camera.position.z + forward.z * B * .62, cy = camera.position.y;
            const moved = Math.hypot(cx - this.lastShadow.x, cz - this.lastShadow.z);
            const turned = 1 - dir.dot(this.lastShadowDir);
            if (!force && moved < B * this.q.shadowStep && turned < 5e-5) { return; }
            // Snap the centre of the map to its own grid of texels
            const texel = B * 2 / this.q.shadow;
            const u = this.basisU, v = this.basisV;
            u.set(0, 1, 0).cross(dir).normalize();
            v.copy(dir).cross(u).normalize();
            const pu = Math.round((cx * u.x + cy * u.y + cz * u.z) / texel) * texel;
            const pv = Math.round((cx * v.x + cy * v.y + cz * v.z) / texel) * texel;
            const pw = cx * dir.x + cy * dir.y + cz * dir.z;
            const tx = u.x * pu + v.x * pv + dir.x * pw, ty = u.y * pu + v.y * pv + dir.y * pw, tz = u.z * pu + v.z * pv + dir.z * pw;
            sun.target.position.set(tx, ty, tz);
            sun.position.set(tx + dir.x * 700, ty + dir.y * 700, tz + dir.z * 700);
            sun.target.updateMatrixWorld();
            sun.updateMatrixWorld();
            sun.shadow.needsUpdate = true;
            this.lastShadow.set(cx, 0, cz);
            this.lastShadowDir.copy(dir);
        }
    }

    D.Atmosphere = Atmosphere;

    // A soft edge where the sun's shadow map ends, so its limit never shows as a line on the ground
    const chunk = THREE.ShaderChunk.shadowmap_pars_fragment;
    const needle = 'return mix( 1.0, shadow, shadowIntensity );';
    const at = chunk.indexOf(needle);
    if (at >= 0) {
        THREE.ShaderChunk.shadowmap_pars_fragment = chunk.slice(0, at) +
            'vec2 shEdge = min(shadowCoord.xy, 1.0 - shadowCoord.xy); return mix( 1.0, shadow, shadowIntensity * smoothstep(0.0, .09, min(shEdge.x, shEdge.y)) );' +
            chunk.slice(at + needle.length);
    }
})();
