// Hero WebGL scene, kept in a dedicated module so it can be lazily loaded.
// Static *named* imports from "three" here get tree-shaken by Rollup
// (only ~130 kB gzip of the library instead of the full 400 kB+), and the
// module itself is only fetched via dynamic import when the hero is on
// screen with motion allowed.

import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  MeshBasicMaterial,
  Mesh,
  IcosahedronGeometry,
  Timer,
} from "three";

export function buildHeroScene(host, { dark, prefersReducedMotion }) {
  const lowEnd =
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  let renderer;
  try {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: false, // points + wireframe read fine without MSAA
      powerPreference: "low-power",
    });
  } catch {
    return null; // no WebGL — the CSS gradient layer is already in place
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowEnd ? 1.25 : 1.5));
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  renderer.domElement.setAttribute("aria-hidden", "true");
  Object.assign(renderer.domElement.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
  });
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.1, 60);
  camera.position.set(0, 0, 9);

  const disposables = [];

  // ---- Gold particle field (draw call 1) ----------------------------------
  const COUNT = lowEnd ? 240 : 520;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute("position", new BufferAttribute(positions, 3));
  const pMat = new PointsMaterial({
    color: 0xd4af37,
    size: 0.055,
    sizeAttenuation: true,
    transparent: true,
    opacity: dark ? 0.75 : 0.55,
    depthWrite: false,
  });
  disposables.push(pGeo, pMat);
  const pointsMesh = new Points(pGeo, pMat);
  scene.add(pointsMesh);

  // ---- Wireframe icosahedron (draw call 2) --------------------------------
  const icoGeo = new IcosahedronGeometry(2.6, 1);
  const icoMat = new MeshBasicMaterial({
    color: dark ? 0x33487a : 0x24365c,
    wireframe: true,
    transparent: true,
    opacity: dark ? 0.35 : 0.22,
  });
  const goldMat = new PointsMaterial({
    color: 0xd4af37,
    size: 0.07,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });
  disposables.push(icoGeo, icoMat, goldMat);
  const ico = new Mesh(icoGeo, icoMat);
  ico.position.set(4.4, 0.3, -2.5);
  scene.add(ico);
  // Gold vertex shimmer sharing the same geometry — no extra GPU buffers,
  // but it counts as a third tiny draw call. Cheap enough at 202 points.
  const icoPoints = new Points(icoGeo, goldMat);
  icoPoints.position.copy(ico.position);
  scene.add(icoPoints);

  // ---- Pointer parallax (lerped, gentle, hover-capable devices only) ------
  const pointer = { x: 0, y: 0 };
  const canHover = window.matchMedia("(hover: hover)").matches;
  const onPointerMove = (e) => {
    const r = host.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  if (canHover) window.addEventListener("pointermove", onPointerMove, { passive: true });

  const onResize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(host);

  const timer = new Timer();
  timer.connect(document); // freezes the delta while the tab is hidden

  // ---- Render loop --------------------------------------------------------
  // ---- Pause when the hero scrolls out of view ----------------------------
  // The loop is registered once; `visible` skips all render work (and its
  // GPU/CPU cost) while the hero is scrolled past. Hidden tabs already pause
  // because setAnimationLoop is requestAnimationFrame-based.
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(host);
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    timer.update();
    const delta = timer.getDelta();
    pointsMesh.rotation.y += delta * 0.03;
    ico.rotation.y += delta * 0.1;
    ico.rotation.x += delta * 0.05;
    icoPoints.rotation.copy(ico.rotation);
    camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  });
  io.observe(host);

  // ---- Cleanup -------------------------------------------------------------
  return function dispose() {
    io.disconnect();
    ro.disconnect();
    timer.disconnect();
    renderer.setAnimationLoop(null);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    if (canHover) window.removeEventListener("pointermove", onPointerMove);
  };
}
