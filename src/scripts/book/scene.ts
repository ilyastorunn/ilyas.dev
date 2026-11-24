// The pop-up book scene in plain three.js.
// Ported from unfold's React Three Fiber <Book> and <Experience> canvas
// (https://github.com/Dksie09/unfold, MIT License — see src/lib/unfold/LICENSE).

import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { H, L, N, dirOf, floorApex, focusAngle, focusOf, logicalOf, normalOf, pageAngles, roomOpenness, smooth } from "../../lib/unfold/fold";
import { INK, makePaperMaterial } from "../../lib/unfold/paperMaterial";
import { ROOMS } from "../../lib/unfold/rooms";
import type { BookTextures } from "../../lib/unfold/textures";

// Drawings are authored as raw sRGB values; keep three from converting them.
THREE.ColorManagement.enabled = false;

const PAGE_GAP = 0.014; // thickness between pages when the book is shut
const EDGE_STEPS = 12;

/** Animation state shared between the DOM controls and the scene (kept out of any UI state). */
export const book = {
  f: N - 1,
  target: N - 1,
  open: 0,
  openTarget: 0,
  dragging: false,
  /** 0..1, how far the camera has moved in on a spot */
  zoom: 0,
  zoomTarget: 0,
  zoomAt: [0, 0.5, 0] as [number, number, number],
};

type Rect = [number, number, number, number];
type Hot = { mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>; room: number; spot: string };

/** Hand-wobbled closed outline in a page's local XY plane. */
function wobbleRect(seed: number): number[] {
  const corners = [
    [0, 0],
    [L, 0],
    [L, H],
    [0, H],
    [0, 0],
  ];
  const out: number[] = [];
  for (let s = 0; s < 4; s++) {
    const [x1, y1] = corners[s];
    const [x2, y2] = corners[s + 1];
    const nx = -(y2 - y1);
    const ny = x2 - x1;
    for (let j = 0; j < 16; j++) {
      const t = j / 16;
      const o = 0.004 * (Math.sin(seed * 3.1 + (s * 16 + j) * 0.7) * 0.6 + Math.sin(seed * 1.7 + (s * 16 + j) * 1.9) * 0.4);
      out.push(x1 + (x2 - x1) * t + nx * o, y1 + (y2 - y1) * t + ny * o, 0);
    }
  }
  out.push(out[0], out[1], out[2]);
  return out;
}

/** Writes a wobbly segment a→b into arr at offset (EDGE_STEPS+1 points). */
function writeEdge(arr: Float32Array, offset: number, a: number[], b: number[], seed: number) {
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  const len = Math.hypot(dx, dz) || 1;
  const px = -dz / len;
  const pz = dx / len;
  for (let j = 0; j <= EDGE_STEPS; j++) {
    const t = j / EDGE_STEPS;
    const o = 0.005 * (Math.sin(seed + j * 0.9) * 0.6 + Math.sin(seed * 2.3 + j * 2.1) * 0.4);
    const i = (offset + j) * 3;
    arr[i] = a[0] + (b[0] - a[0]) * t + px * o;
    arr[i + 1] = a[1] + (b[1] - a[1]) * t + 0.002;
    arr[i + 2] = a[2] + (b[2] - a[2]) * t + pz * o;
  }
}

const marksOf = (t: THREE.Texture): Record<string, Rect> => (t.userData.marks as Record<string, Rect>) ?? {};

/** A soft round shadow under the book (stands in for drei's ContactShadows). */
function makeShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(42, 35, 80, 0.55)");
  grd.addColorStop(0.55, "rgba(42, 35, 80, 0.18)");
  grd.addColorStop(1, "rgba(42, 35, 80, 0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.6 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.04;
  return mesh;
}

export type SceneOptions = {
  canvasHost: HTMLElement;
  tex: BookTextures;
  reducedMotion: () => boolean;
  /** Pixels covered by the header (top) and the caption (bottom), so the book is framed between them. */
  insets: () => { top: number; bottom: number };
  /** A spot was clicked in the room in front (logical room index). */
  onSpot: (room: number, spot: string) => void;
};

export function createScene({ canvasHost, tex, reducedMotion, insets, onSpot }: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.domElement.setAttribute("aria-hidden", "true");
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(0, 2, 10);
  const size = { width: 1, height: 1 };

  const lineMats: LineMaterial[] = [];
  const inkLine = (width: number) => {
    const m = new LineMaterial({ color: INK.getHex(), linewidth: width, transparent: true });
    lineMats.push(m);
    return m;
  };

  // ---- pages --------------------------------------------------------------
  const pageFront = new THREE.PlaneGeometry(L, H).translate(L / 2, H / 2, 0);
  // back face: rotated so the spine sits at u = 1 (no mirrored drawings)
  const pageBack = new THREE.PlaneGeometry(L, H).rotateY(Math.PI).translate(L / 2, H / 2, 0);

  // Page k front = right wall of physical room k (or the front cover for k = N).
  // Page k back  = left wall of physical room k-1 (or the back cover for k = 0).
  const pageMats = Array.from({ length: N + 1 }, (_, k) => ({
    front: makePaperMaterial(k === N ? tex.front : tex.rooms[logicalOf(k)].right, { seed: k * 2, flat: k === N }),
    back: makePaperMaterial(k === 0 ? tex.back : tex.rooms[logicalOf(k - 1)].left, { seed: k * 2 + 1, flat: k === 0 }),
  }));

  const hots: Hot[] = [];
  const hotMaterial = () =>
    new THREE.MeshBasicMaterial({
      color: INK,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
  const addHot = (parent: THREE.Object3D, room: number, spot: string, pos: [number, number, number], w: number, h: number) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), hotMaterial());
    mesh.position.set(...pos);
    parent.add(mesh);
    hots.push({ mesh, room, spot });
  };

  const pageGroups = pageMats.map((m, k) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(pageFront, m.front), new THREE.Mesh(pageBack, m.back));
    const outline = new LineGeometry();
    outline.setPositions(wobbleRect(k + 1));
    g.add(new Line2(outline, inkLine(1.7)));
    scene.add(g);
    return g;
  });

  // Clickable spots on the right wall (page p front) and the left wall (page p+1 back).
  for (let p = 0; p < N; p++) {
    const r = tex.rooms[logicalOf(p)];
    for (const [spot, [x0, y0, x1, y1]] of Object.entries(marksOf(r.right)))
      addHot(pageGroups[p], p, spot, [((x0 + x1) / 2) * L, H * (1 - (y0 + y1) / 2), 0.004], (x1 - x0) * L, (y1 - y0) * H);
    for (const [spot, [x0, y0, x1, y1]] of Object.entries(marksOf(r.left)))
      addHot(pageGroups[p + 1], p, spot, [L * (1 - (x0 + x1) / 2), H * (1 - (y0 + y1) / 2), -0.004], (x1 - x0) * L, (y1 - y0) * H);
  }

  // ---- floors -------------------------------------------------------------
  const floors = Array.from({ length: N }, (_, p) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(18), 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]), 2));
    const mat = makePaperMaterial(tex.rooms[logicalOf(p)].floor, { side: THREE.DoubleSide, seed: 40 + p });
    scene.add(new THREE.Mesh(geo, mat));
    const lineGeo = new LineGeometry();
    lineGeo.setPositions(new Float32Array((EDGE_STEPS + 1) * 3 * 3));
    const line = new Line2(lineGeo, inkLine(1.5));
    line.frustumCulled = false;
    scene.add(line);
    return { geo, mat, line };
  });
  const edgeBuf = new Float32Array((EDGE_STEPS + 1) * 3 * 3);

  // ---- pop-ups ------------------------------------------------------------
  const popups = Array.from({ length: N }, (_, p) => {
    const li = logicalOf(p);
    return ROOMS[li].popups.map((spec, j) => {
      const geo = new THREE.PlaneGeometry(spec.size, spec.size).translate(0, spec.size / 2, 0);
      const mat = makePaperMaterial(tex.rooms[li].popups[j], { side: THREE.DoubleSide, blankBack: true, seed: 60 + p * 4 + j, flat: 0.85, transparent: true });
      const outer = new THREE.Group();
      const hinge = new THREE.Group();
      hinge.add(new THREE.Mesh(geo, mat));
      outer.add(hinge);
      scene.add(outer);
      for (const [spot, [x0, y0, x1, y1]] of Object.entries(marksOf(tex.rooms[li].popups[j])))
        addHot(hinge, p, spot, [((x0 + x1) / 2 - 0.5) * spec.size, (1 - (y0 + y1) / 2) * spec.size, 0.006], (x1 - x0) * spec.size, (y1 - y0) * spec.size);
      return { spec, mat, outer, hinge };
    });
  });

  const shadow = makeShadow();
  scene.add(shadow);

  // ---- hotspots: hover + click -------------------------------------------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hovered: Hot | null = null;
  const live = (h: Hot) => book.open > 0.97 && focusOf(h.room, book.f) > 0.97 && !book.dragging && book.zoomTarget === 0;
  const hitAt = (clientX: number, clientY: number): Hot | null => {
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const candidates = hots.filter(live);
    if (!candidates.length) return null;
    const hit = raycaster.intersectObjects(candidates.map((h) => h.mesh), false)[0];
    return hit ? (candidates.find((h) => h.mesh === hit.object) ?? null) : null;
  };
  /** Updates the hover tint; returns the hovered spot (logical room + key) or null. */
  const hover = (clientX: number, clientY: number) => {
    hovered = hitAt(clientX, clientY);
    canvasHost.style.cursor = hovered ? "pointer" : "";
    return hovered ? { room: logicalOf(hovered.room), spot: hovered.spot } : null;
  };
  const clearHover = () => {
    hovered = null;
    canvasHost.style.cursor = "";
  };
  /** Point the camera at a spot of the room in front (keyboard / button path). */
  const focus = (logical: number, spot: string) => {
    const h = hots.find((x) => logicalOf(x.room) === logical && x.spot === spot);
    if (!h) return false;
    const w = new THREE.Vector3();
    h.mesh.getWorldPosition(w);
    book.zoomAt = [w.x, w.y, w.z];
    return true;
  };
  /** Returns true when the click landed on a spot. */
  const click = (clientX: number, clientY: number) => {
    const h = hitAt(clientX, clientY);
    if (!h) return false;
    const w = new THREE.Vector3();
    h.mesh.getWorldPosition(w);
    book.zoomAt = [w.x, w.y, w.z];
    hovered = null;
    canvasHost.style.cursor = "";
    onSpot(logicalOf(h.room), h.spot);
    return true;
  };

  // ---- frame loop ---------------------------------------------------------
  const target = new THREE.Vector3();
  const zoomCur: [number, number, number] = [...book.zoomAt];
  const right = new THREE.Vector3();
  const up = new THREE.Vector3();
  const t0 = performance.now();
  let last = t0;
  let raf = 0;

  const ease = (rate: number, dt: number) => (reducedMotion() ? 1 : 1 - Math.exp(-dt * rate));

  function frame() {
    raf = requestAnimationFrame(frame);
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    if (!book.dragging) book.f += (book.target - book.f) * ease(7, dt);
    book.open += (book.openTarget - book.open) * ease(7, dt);
    if (Math.abs(book.openTarget - book.open) < 1e-4) book.open = book.openTarget;

    const f = book.f;
    const e = smooth(book.open);
    const phi = pageAngles(f, book.open);

    for (let k = 0; k <= N; k++) {
      const g = pageGroups[k];
      const n = normalOf(phi[k]);
      const off = (k - N / 2) * PAGE_GAP * (1 - e);
      g.rotation.y = -phi[k];
      g.position.set(n[0] * off, 0, n[2] * off);
      const m = pageMats[k];
      const rf = k === N ? 1 : focusOf(k, f) * e;
      const rb = k === 0 ? 1 : focusOf(k - 1, f) * e;
      m.front.uniforms.uReveal.value = rf;
      m.back.uniforms.uReveal.value = rb;
      m.front.uniforms.uInkAmt.value = k === N ? 1 : 0.55 + 0.45 * rf;
      m.back.uniforms.uInkAmt.value = k === 0 ? 1 : 0.55 + 0.45 * rb;
    }

    for (let p = 0; p < N; p++) {
      const a = phi[p];
      const b = phi[p + 1];
      const A = dirOf(a).map((v) => v * L);
      const B = dirOf(b).map((v) => v * L);
      const P = floorApex(a, b);
      const O = [0, 0, 0];
      const pos = floors[p].geo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      [O, A, P, O, P, B].forEach((v, i) => {
        arr[i * 3] = v[0];
        arr[i * 3 + 1] = v[1] + 0.0005;
        arr[i * 3 + 2] = v[2];
      });
      pos.needsUpdate = true;
      floors[p].geo.computeVertexNormals();
      floors[p].geo.computeBoundingSphere();
      const fr = focusOf(p, f) * e;
      floors[p].mat.uniforms.uReveal.value = fr;
      floors[p].mat.uniforms.uInkAmt.value = 0.5 + 0.5 * fr;

      const line = floors[p].line;
      writeEdge(edgeBuf, 0, A, P, p * 3 + 1);
      writeEdge(edgeBuf, EDGE_STEPS + 1, P, B, p * 3 + 2);
      writeEdge(edgeBuf, (EDGE_STEPS + 1) * 2, O, P, p * 3 + 3);
      line.geometry.setPositions(edgeBuf);
      line.material.opacity = smooth((book.open - 0.05) / 0.25);
      line.visible = line.material.opacity > 0.01;

      // Pop-ups are drawn for the fully open room seen head-on, so they only appear once the
      // room has settled at a right angle and fade out as soon as it starts to fold.
      const open = roomOpenness(phi, p);
      const rise = smooth((open - 0.965) / 0.035) * smooth((book.open - 0.96) / 0.04);
      const mid = (a + b) / 2;
      const dA = dirOf(a);
      const dB = dirOf(b);
      popups[p].forEach((pu, j) => {
        const vis = smooth((rise - j * 0.3) / (1 - j * 0.3 + 1e-3));
        pu.outer.visible = vis > 0.01;
        const [s, t] = pu.spec.at;
        pu.outer.position.set((dA[0] * s + dB[0] * t) * L, 0.001, (dA[2] * s + dB[2] * t) * L);
        pu.outer.rotation.y = Math.PI / 2 - mid;
        pu.hinge.scale.y = 0.9 + 0.1 * vis;
        pu.mat.uniforms.uOpacity.value = vis;
        pu.mat.uniforms.uReveal.value = fr;
      });
    }

    // Spots stay invisible: unfold tinted their bounding boxes, which read as grey slabs behind
    // the objects. Discovery comes from the pointer cursor, the hover name label and the
    // project buttons instead. (The meshes stay in the scene so the raycaster can hit them.)
    for (const h of hots) {
      h.mesh.material.opacity = 0;
      h.mesh.visible = live(h);
    }

    // camera: front view of the cover when shut, looking into the focused room when open
    const gF = focusAngle(phi, f);
    const yaw = Math.PI / 2 + (gF - Math.PI / 2) * e;
    const pitch = THREE.MathUtils.degToRad(8 + 24 * e);
    const dF = dirOf(gF);
    target.set(L / 2 + (dF[0] * 0.45 - L / 2) * e, H / 2 + (0.5 - H / 2) * e, dF[2] * 0.45 * e);
    book.zoom += (book.zoomTarget - book.zoom) * ease(6, dt);
    const zm = smooth(book.zoom);
    // glide between spots instead of jumping when the note steps to the next project
    const za = ease(5, dt);
    for (let i = 0; i < 3; i++) zoomCur[i] += (book.zoomAt[i] - zoomCur[i]) * (book.zoom < 0.02 ? 1 : za);
    target.x += (zoomCur[0] - target.x) * zm;
    target.y += (zoomCur[1] - target.y) * zm;
    target.z += (zoomCur[2] - target.z) * zm;
    camera.position.set(target.x + Math.cos(yaw) * Math.cos(pitch) * 10, target.y + Math.sin(pitch) * 10, target.z + Math.sin(yaw) * Math.cos(pitch) * 10);
    camera.lookAt(target);
    // The canvas runs full-bleed under the header and caption; frame the book in the space
    // between them. (Framed tighter than unfold so the open room, not the page stacks, fills it.)
    const { top, bottom } = insets();
    const freeH = Math.max(1, size.height - top - bottom);
    const viewH = 1.7 + 0.45 * e;
    const narrow = size.width < 640;
    const viewW = (narrow ? 1.35 : 1.9) + (narrow ? 0.75 : 0.5) * e;
    camera.zoom = Math.min(freeH / viewH, size.width / viewW) * (1 + (narrow ? 2.1 : 2.6) * zm);
    camera.updateProjectionMatrix();
    // Pan (in screen pixels): centre the book in the free area, and when zoomed in, move the
    // object aside for the note — to the left on wide screens, upwards on phones.
    camera.updateMatrixWorld();
    right.setFromMatrixColumn(camera.matrixWorld, 0);
    up.setFromMatrixColumn(camera.matrixWorld, 1);
    const panX = narrow ? 0 : size.width * 0.19 * zm;
    const panY = (bottom - top) / 2 + (narrow ? size.height * 0.16 * zm : 0);
    camera.position.addScaledVector(right, panX / camera.zoom).addScaledVector(up, -panY / camera.zoom);

    // shadow follows the book's footprint: a slim strip when shut, a wide pool when open
    shadow.position.x = L / 2 - (L / 2) * e;
    shadow.position.z = 0.35 * e;
    shadow.scale.set(1.3 + 1.2 * e, 1, 0.35 + 1.1 * e);
    (shadow.material as THREE.MeshBasicMaterial).opacity = 0.45 * (1 - 0.5 * zm);

    renderer.render(scene, camera);
  }

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvasHost;
    size.width = Math.max(1, w);
    size.height = Math.max(1, h);
    renderer.setSize(size.width, size.height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.left = -size.width / 2;
    camera.right = size.width / 2;
    camera.top = size.height / 2;
    camera.bottom = -size.height / 2;
    camera.updateProjectionMatrix();
    for (const m of lineMats) m.resolution.set(size.width, size.height);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvasHost);
  resize();
  frame();

  return {
    hover,
    clearHover,
    focus,
    click,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
    },
  };
}
