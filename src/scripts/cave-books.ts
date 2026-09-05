import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
export async function initBooks(stage: HTMLElement) {
  const host = stage.querySelector<HTMLElement>("[data-book-canvas]")!;
  const buttons = [
    ...stage.querySelectorAll<HTMLButtonElement>("[data-book-select]"),
  ];
  const controls = document.querySelector<HTMLElement>("[data-book-controls]")!;
  const name = document.querySelector<HTMLElement>("[data-book-name]")!;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 1.45, 6.7);
  camera.lookAt(0, 1.35, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x68584a, 2.8));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-3, 5, 5);
  scene.add(light);
  const loader = new THREE.TextureLoader();
  const groups: THREE.Group[] = [];
  const bases: THREE.Vector3[] = [];
  const paperCanvas = document.createElement("canvas");
  paperCanvas.width = 64;
  paperCanvas.height = 512;
  const ctx = paperCanvas.getContext("2d")!;
  ctx.fillStyle = "#e5dfcf";
  ctx.fillRect(0, 0, 64, 512);
  for (let y = 0; y < 512; y += 3) {
    ctx.fillStyle = y % 2 ? "#c6bfaf" : "#f1ecdf";
    ctx.fillRect(0, y, 64, 1);
  }
  const paperTexture = new THREE.CanvasTexture(paperCanvas);
  let total = 0;
  const dimensions = buttons.map((b, i) => {
    const h = [2.5, 2.3, 2.3, 2.15, 2.4][i]!;
    const w = h * Number(b.dataset.ratio);
    const d = Math.max(0.18, Math.min(0.58, h * Number(b.dataset.depth)));
    total += d + 0.055;
    return { h, w, d };
  });
  let x = -total / 2;
  for (const [i, b] of buttons.entries()) {
    const { h, w, d } = dimensions[i]!;
    const textures = await Promise.all(
      [b.dataset.front!, b.dataset.back!, b.dataset.spine!].map((url) =>
        loader.loadAsync(url),
      ),
    );
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    const group = new THREE.Group();
    const cover = new THREE.MeshStandardMaterial({
      color: 0xddd5c3,
      roughness: 0.65,
    });
    const pages = new THREE.Mesh(
      new RoundedBoxGeometry(w - 0.045, h - 0.055, d - 0.04, 2, 0.01),
      new THREE.MeshStandardMaterial({ map: paperTexture, roughness: 0.95 }),
    );
    group.add(pages);
    for (const [index, z] of [
      [0, d / 2],
      [1, -d / 2],
    ] as const) {
      const board = new THREE.Mesh(
        new RoundedBoxGeometry(w, h, 0.022, 2, 0.009),
        cover,
      );
      board.position.z = z;
      group.add(board);
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(w - 0.012, h - 0.012),
        new THREE.MeshStandardMaterial({
          map: textures[index],
          roughness: 0.65,
        }),
      );
      face.position.z = z + (index === 0 ? 0.013 : -0.013);
      if (index === 1) face.rotation.y = Math.PI;
      group.add(face);
    }
    const vertices: number[] = [],
      uvs: number[] = [],
      indices: number[] = [];
    for (let j = 0; j <= 1; j++)
      for (let k = 0; k <= 24; k++) {
        const u = k / 24;
        vertices.push(
          -w / 2 - 0.008 - Math.sin(u * Math.PI) * 0.018,
          (j - 0.5) * h,
          (u - 0.5) * d,
        );
        uvs.push(u, j);
      }
    for (let k = 0; k < 24; k++) {
      indices.push(k, k + 1, k + 25, k + 1, k + 26, k + 25);
    }
    const spineGeometry = new THREE.BufferGeometry();
    spineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    spineGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    spineGeometry.setIndex(indices);
    spineGeometry.computeVertexNormals();
    group.add(
      new THREE.Mesh(
        spineGeometry,
        new THREE.MeshStandardMaterial({
          map: textures[2],
          roughness: 0.7,
          side: THREE.DoubleSide,
        }),
      ),
    );
    group.rotation.y = Math.PI / 2;
    group.position.set(x + d / 2, h / 2, 0);
    x += d + 0.055;
    scene.add(group);
    groups.push(group);
    bases.push(group.position.clone());
  }
  let selected = -1,
    hovered = -1,
    angle = 0,
    pitch = 0,
    drag = false,
    px = 0,
    py = 0,
    raf = 0,
    visible = true;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const resize = () => {
    const w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.position.z = Math.max(5.5, 3.4 / camera.aspect);
    camera.updateProjectionMatrix();
    render();
  };
  const render = () => {
    renderer.render(scene, camera);
  };
  const tick = () => {
    let moving = false;
    groups.forEach((g, i) => {
      const base = bases[i]!;
      const target =
        selected === i
          ? new THREE.Vector3(0, 1.55, 0)
          : base
              .clone()
              .add(
                new THREE.Vector3(
                  0,
                  hovered === i ? 0.14 : 0,
                  hovered === i ? 0.12 : 0,
                ),
              );
      const ry = selected === i ? angle : Math.PI / 2;
      const rx = selected === i ? pitch : 0;
      const speed = reduced.matches ? 1 : 0.14;
      const scale = selected === i ? 0.78 : 1;
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, speed));
      g.position.lerp(target, speed);
      g.rotation.y += (ry - g.rotation.y) * speed;
      g.rotation.x += (rx - g.rotation.x) * speed;
      g.visible = selected < 0 || selected === i;
      moving ||=
        Math.abs(g.scale.x - scale) > 0.001 ||
        g.position.distanceTo(target) > 0.001 ||
        Math.abs(g.rotation.y - ry) > 0.001 ||
        Math.abs(g.rotation.x - rx) > 0.001;
    });
    render();
    raf = moving && visible ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    if (!raf && visible) raf = requestAnimationFrame(tick);
  };
  const select = (i: number) => {
    selected = i;
    angle = -0.35;
    pitch = 0;
    stage.classList.toggle("is-selected", i >= 0);
    controls.hidden = i < 0;
    name.textContent = i < 0 ? "" : buttons[i]!.dataset.title!;
    buttons.forEach((b, j) => b.setAttribute("aria-pressed", String(i === j)));
    wake();
  };
  buttons.forEach((b, i) => {
    b.addEventListener("click", () => select(i));
    b.addEventListener("pointerenter", () => {
      hovered = i;
      wake();
    });
    b.addEventListener("pointerleave", () => {
      hovered = -1;
      wake();
    });
    b.addEventListener("focus", () => {
      hovered = i;
      wake();
    });
    b.addEventListener("blur", () => {
      hovered = -1;
      wake();
    });
  });
  const close = () => {
    const i = selected;
    select(-1);
    buttons[i]?.focus();
  };
  document.querySelector("[data-book-close]")!.addEventListener("click", close);
  document.querySelector("[data-book-left]")!.addEventListener("click", () => {
    angle -= Math.PI / 4;
    wake();
  });
  document.querySelector("[data-book-right]")!.addEventListener("click", () => {
    angle += Math.PI / 4;
    wake();
  });
  host.addEventListener("pointerdown", (e) => {
    drag = true;
    px = e.clientX;
    py = e.clientY;
    host.setPointerCapture(e.pointerId);
  });
  host.addEventListener("pointermove", (e) => {
    if (!drag) return;
    angle += (e.clientX - px) * 0.015;
    pitch = THREE.MathUtils.clamp(pitch + (e.clientY - py) * 0.008, -0.7, 0.7);
    px = e.clientX;
    py = e.clientY;
    wake();
  });
  host.addEventListener("pointerup", () => (drag = false));
  host.addEventListener("pointercancel", () => (drag = false));
  document.addEventListener("keydown", (e) => {
    if (selected < 0) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      angle += e.key === "ArrowLeft" ? -0.3 : 0.3;
      wake();
    }
  });
  addEventListener("portfolio-card-change", ((e: CustomEvent) => {
    visible = e.detail.activeIndex === 2;
    if (visible) wake();
  }) as EventListener);
  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    stage.classList.remove("is-ready");
    controls.hidden = true;
  });
  new ResizeObserver(resize).observe(host);
  stage.classList.add("is-ready");
  resize();
  wake();
}
