/*
 * The last step of each frame: a soft glow around bright lights, then the conversion from the renderer's
 * physical light values to screen colours, with a slight vignette and fine grain that hides banding in the sky.
 */
(function () {
    'use strict';
    const D = window.TRCDrive = window.TRCDrive || {};
    const THREE = window.THREE;

    const VS = 'varying vec2 vUv; void main() { vUv = position.xy * .5 + .5; gl_Position = vec4(position.xy, 0.0, 1.0); }';
    const BRIGHT = `
varying vec2 vUv; uniform sampler2D tMap; uniform vec2 uTexel;
void main() {
    vec3 c = texture2D(tMap, vUv + uTexel * vec2(-.5, -.5)).rgb + texture2D(tMap, vUv + uTexel * vec2(.5, -.5)).rgb + texture2D(tMap, vUv + uTexel * vec2(-.5, .5)).rgb + texture2D(tMap, vUv + uTexel * vec2(.5, .5)).rgb;
    c *= .25;
    c = min(c, vec3(30.0));
    float l = max(c.r, max(c.g, c.b));
    float k = smoothstep(.85, 2.4, l);
    gl_FragColor = vec4(c * k, 1.0);
}`;
    const DOWN = `
varying vec2 vUv; uniform sampler2D tMap; uniform vec2 uTexel;
void main() {
    vec3 c = texture2D(tMap, vUv).rgb * 4.0;
    c += texture2D(tMap, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(1.0, -1.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(1.0, 1.0)).rgb;
    gl_FragColor = vec4(c / 8.0, 1.0);
}`;
    const UP = `
varying vec2 vUv; uniform sampler2D tMap; uniform vec2 uTexel;
void main() {
    vec3 c = texture2D(tMap, vUv + uTexel * vec2(-2.0, 0.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(-1.0, 1.0)).rgb * 2.0;
    c += texture2D(tMap, vUv + uTexel * vec2(0.0, 2.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(1.0, 1.0)).rgb * 2.0;
    c += texture2D(tMap, vUv + uTexel * vec2(2.0, 0.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(1.0, -1.0)).rgb * 2.0;
    c += texture2D(tMap, vUv + uTexel * vec2(0.0, -2.0)).rgb;
    c += texture2D(tMap, vUv + uTexel * vec2(-1.0, -1.0)).rgb * 2.0;
    gl_FragColor = vec4(c / 12.0, 1.0);
}`;
    const FINAL = `
varying vec2 vUv;
uniform sampler2D tScene; uniform sampler2D tBloom;
uniform float uExposure; uniform float uBloom; uniform float uSat; uniform float uUseBloom; uniform vec2 uRes;
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0.0, 1.0); }
vec3 toSRGB(vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - .055, step(.0031308, c)); }
void main() {
    vec3 c = texture2D(tScene, vUv).rgb;
    if (uUseBloom > .5) { c += texture2D(tBloom, vUv).rgb * uBloom; }
    c = aces(c * uExposure);
    float l = dot(c, vec3(.2126, .7152, .0722));
    c = clamp(mix(vec3(l), c, uSat), 0.0, 1.0);
    vec2 q = vUv - .5;
    c *= 1.0 - dot(q, q) * .34;
    c = toSRGB(c);
    float g = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
    gl_FragColor = vec4(c + (g - .5) / 255.0, 1.0);
}`;

    class Post {
        constructor(renderer, quality) {
            this.r = renderer;
            this.q = quality;
            this.scene = new THREE.Scene();
            this.cam = new THREE.Camera();
            const g = new THREE.BufferGeometry();
            g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
            this.tri = new THREE.Mesh(g, null);
            this.tri.frustumCulled = false;
            this.scene.add(this.tri);
            const mk = (fs, extra) => new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: fs, uniforms: Object.assign({ tMap: { value: null }, uTexel: { value: new THREE.Vector2() } }, extra || {}), depthTest: false, depthWrite: false, toneMapped: false });
            this.mBright = mk(BRIGHT); this.mDown = mk(DOWN); this.mUp = mk(UP);
            this.mUp.blending = THREE.AdditiveBlending; this.mUp.transparent = true;
            this.mFinal = new THREE.ShaderMaterial({
                vertexShader: VS, fragmentShader: FINAL, depthTest: false, depthWrite: false, toneMapped: false,
                uniforms: { tScene: { value: null }, tBloom: { value: null }, uExposure: { value: 1 }, uBloom: { value: 0 }, uSat: { value: 1 }, uUseBloom: { value: 0 }, uRes: { value: new THREE.Vector2() } }
            });
            this.bloomOn = quality.bloom;
            this.mips = [];
            this.rt = null;
        }
        setSize(w, h) {
            if (this.rt && this.rt.width === w && this.rt.height === h) { return; }
            if (this.rt) { this.rt.dispose(); }
            this.mips.forEach((m) => m.dispose());
            this.mips = [];
            this.rt = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: this.q.msaa, depthBuffer: true, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
            let bw = w >> 1, bh = h >> 1;
            for (let i = 0; i < 4; i++) {
                this.mips.push(new THREE.WebGLRenderTarget(Math.max(2, bw), Math.max(2, bh), { type: THREE.HalfFloatType, depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }));
                bw >>= 1; bh >>= 1;
            }
            this.mFinal.uniforms.uRes.value.set(w, h);
        }
        pass(mat, target, clear) {
            this.tri.material = mat;
            this.r.setRenderTarget(target);
            if (clear) { this.r.clear(true, false, false); }
            this.r.render(this.scene, this.cam);
        }
        render(scene, camera, look) {
            const r = this.r;
            r.setRenderTarget(this.rt);
            r.render(scene, camera);
            const useBloom = this.bloomOn && look.bloom > .02;
            if (useBloom) {
                const auto = r.autoClear;
                this.mBright.uniforms.tMap.value = this.rt.texture;
                this.mBright.uniforms.uTexel.value.set(1 / this.rt.width, 1 / this.rt.height);
                this.pass(this.mBright, this.mips[0]);
                for (let i = 1; i < this.mips.length; i++) {
                    this.mDown.uniforms.tMap.value = this.mips[i - 1].texture;
                    this.mDown.uniforms.uTexel.value.set(1 / this.mips[i - 1].width, 1 / this.mips[i - 1].height);
                    this.pass(this.mDown, this.mips[i]);
                }
                r.autoClear = false;
                for (let i = this.mips.length - 1; i > 0; i--) {
                    this.mUp.uniforms.tMap.value = this.mips[i].texture;
                    this.mUp.uniforms.uTexel.value.set(1 / this.mips[i].width, 1 / this.mips[i].height);
                    this.pass(this.mUp, this.mips[i - 1]);
                }
                r.autoClear = auto;
            }
            const f = this.mFinal.uniforms;
            f.tScene.value = this.rt.texture;
            f.tBloom.value = this.mips[0].texture;
            f.uUseBloom.value = useBloom ? 1 : 0;
            f.uExposure.value = look.exp;
            f.uBloom.value = look.bloom;
            f.uSat.value = look.sat;
            this.pass(this.mFinal, null);
        }
        dispose() {
            if (this.rt) { this.rt.dispose(); }
            this.mips.forEach((m) => m.dispose());
        }
    }
    D.Post = Post;
})();
