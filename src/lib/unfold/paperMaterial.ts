// Adapted from unfold by Dakshi (https://github.com/Dksie09/unfold), MIT License — see ./LICENSE.
import * as THREE from "three";

export const INK = new THREE.Color(0.169, 0.122, 0.839); // #2b1fd6
const PAPER = new THREE.Color(0.985, 0.979, 0.958);

const vertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uReveal;   // 0 = line art only, 1 = coloured in
  uniform float uInkAmt;   // how strongly the drawing reads
  uniform float uSeed;
  uniform float uBlankBack; // pop-ups: plain paper on the back
  uniform float uFlat;      // covers: no shading or hatching
  uniform float uOpacity;   // pop-ups fade in
  uniform vec3 uInk;
  uniform vec3 uPaper;
  uniform vec3 uLight;
  varying vec2 vUv;
  varying vec3 vNormal;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  void main() {
    vec4 t = texture2D(uTex, vUv);
    if (t.a < 0.25) discard;
    float ink = clamp((t.a - 0.5) * 2.0, 0.0, 1.0);
    vec3 wash = t.rgb;
    if (!gl_FrontFacing && uBlankBack > 0.5) { ink = 0.0; wash = vec3(1.0); }

    // paper grain + fibres
    float grain = noise(vUv * 420.0 + uSeed) * 0.6 + noise(vUv * 90.0 - uSeed) * 0.4;
    vec3 col = uPaper * (0.955 + 0.05 * grain);

    // watercolour wash, multiplied in as the room comes to the front
    col *= mix(vec3(1.0), wash, uReveal);

    // soft paper lighting
    float l = abs(dot(normalize(vNormal), uLight));
    // the room in front is lit more evenly, like the reference sketches
    col *= mix(mix(0.8 + 0.2 * l, 0.92 + 0.08 * l, uReveal), 1.0, uFlat);

    // pen hatching on faces turned away from the light
    float dark = clamp((0.78 - l) / 0.45, 0.0, 1.0) * (1.0 - 0.85 * uReveal) * (1.0 - uFlat);
    float s = (vUv.x + vUv.y * 0.55) * 46.0 + sin(vUv.y * 21.0 + uSeed) * 0.18 + noise(vUv * 30.0) * 0.25;
    float d = abs(fract(s) - 0.5);
    float h = smoothstep(0.075, 0.025, d) * dark * 0.34;
    col = mix(col, uInk, h);

    // the drawing itself
    col = mix(col, uInk, ink * uInkAmt);
    gl_FragColor = vec4(col, uOpacity);
  }
`;

const light = new THREE.Vector3(-0.55, 0.7, 0.45).normalize();

export function makePaperMaterial(tex: THREE.Texture, opts: { side?: THREE.Side; blankBack?: boolean; seed?: number; flat?: boolean | number; transparent?: boolean } = {}) {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    side: opts.side ?? THREE.FrontSide,
    uniforms: {
      uTex: { value: tex },
      uReveal: { value: 0 },
      uInkAmt: { value: 1 },
      uSeed: { value: opts.seed ?? Math.random() * 10 },
      uBlankBack: { value: opts.blankBack ? 1 : 0 },
      uOpacity: { value: 1 },
      uFlat: { value: typeof opts.flat === "number" ? opts.flat : opts.flat ? 1 : 0 },
      uInk: { value: INK },
      uPaper: { value: PAPER },
      uLight: { value: light },
    },
    transparent: opts.transparent ?? false,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}
