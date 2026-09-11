import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createWorlds } from "./worlds.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export default function Scene({
  chapter = "hero",
  progress = 0,
  beat = 0,
  explore = false,
  paused = false,
  hover = false,
  controlRef,
}) {
  const host = useRef(),
    state = useRef({ chapter, progress, beat, explore, paused, hover });
  state.current = { chapter, progress, beat, explore, paused, hover };
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    const el = host.current;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    camera.position.set(8, 6.5, 10);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.enabled = false;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8893aa, 3));
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(4, 7, 5);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0xb8d7ff, 3);
    rim.position.set(-5, 2, -4);
    scene.add(rim);
    const root = new THREE.Group();
    scene.add(root);
    const materials = [];
    const mat = (color, metalness = 0, roughness = 0.4) => {
      const m = new THREE.MeshStandardMaterial({ color, metalness, roughness });
      materials.push(m);
      return m;
    };
    const silver = mat("#bcc4ce", 0.75, 0.27),
      white = mat("#fafafa", 0.05, 0.32),
      dark = mat("#222631", 0.3, 0.33),
      blue = mat("#2875ed", 0.5, 0.28),
      paper = mat("#f8f6f1", 0, 0.7);
    const box = (parent, x, y, z, w, h, d, m) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const laptop = new THREE.Group();
    root.add(laptop);
    box(laptop, 0, 0, 0, 4, 0.12, 2.6, silver);
    box(laptop, 0, 0.08, -0.17, 3.55, 0.04, 1.4, dark);
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 13; c++)
        box(
          laptop,
          -1.62 + c * 0.27,
          0.115,
          -0.73 + r * 0.25,
          0.22,
          0.045,
          0.18,
          white,
        );
    box(laptop, 0, 0.085, 0.88, 1.2, 0.025, 0.6, mat("#a4acb6", 0.5));
    const lid = new THREE.Group();
    lid.position.set(0, 0, -1.26);
    lid.rotation.x = -0.15;
    laptop.add(lid);
    box(lid, 0, 1.35, 0, 4, 2.7, 0.12, silver);
    box(lid, 0, 1.35, 0.075, 3.8, 2.48, 0.04, dark);
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#eaf1fc";
    ctx.fillRect(0, 0, 1024, 640);
    ctx.fillStyle = "#fff";
    ctx.fillRect(40, 40, 944, 560);
    ctx.fillStyle = "#6c7280";
    ctx.font = "24px sans-serif";
    ctx.fillText("aditya / always building", 85, 105);
    ctx.fillStyle = "#202634";
    ctx.font = "bold 74px sans-serif";
    ctx.fillText("Hello, world.", 85, 230);
    ctx.fillStyle = "#3171d3";
    ctx.font = "30px monospace";
    ctx.fillText("const next = “product”;", 85, 310);
    [
      "Understand the problem.",
      "Build something useful.",
      "Keep learning.",
    ].forEach((v, i) => {
      ctx.fillStyle = i === 2 ? "#2771dd" : "#737b89";
      ctx.font = "26px sans-serif";
      ctx.fillText(v, 85, 410 + i * 48);
    });
    const texture = new THREE.CanvasTexture(canvas);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(3.65, 2.28),
      new THREE.MeshBasicMaterial({ map: texture }),
    );
    screen.position.set(0, 1.35, 0.102);
    lid.add(screen);
    const cup = new THREE.Group();
    cup.position.set(3, 0.08, 0.1);
    root.add(cup);
    const ceramic = mat("#eee8df", 0.08, 0.3);
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.34, 0.8, 48, 1, true),
      ceramic,
    );
    body.position.y = 0.4;
    cup.add(body);
    const coffee = new THREE.Mesh(
      new THREE.CircleGeometry(0.415, 48),
      mat("#503725"),
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.73;
    cup.add(coffee);
    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.27, 0.075, 12, 32),
      ceramic,
    );
    handle.position.set(0.46, 0.46, 0);
    cup.add(handle);
    const lip = new THREE.Mesh(
      new THREE.TorusGeometry(0.446, 0.03, 12, 48),
      ceramic,
    );
    lip.rotation.x = Math.PI / 2;
    lip.position.y = 0.8;
    cup.add(lip);
    const book = new THREE.Group();
    book.position.set(-3, 0.04, 0.15);
    book.rotation.y = -0.2;
    root.add(book);
    box(book, 0, 0.05, 0, 1.4, 0.16, 2, paper);
    box(book, 0, 0.15, 0, 1.46, 0.04, 2.05, blue);
    box(book, 0.35, 0.22, 0.1, 0.07, 0.07, 1.5, dark);
    const shadowTextureCanvas = document.createElement("canvas");
    shadowTextureCanvas.width = 128;
    shadowTextureCanvas.height = 128;
    const sc = shadowTextureCanvas.getContext("2d");
    const gr = sc.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, "rgba(25,36,60,.22)");
    gr.addColorStop(1, "rgba(25,36,60,0)");
    sc.fillStyle = gr;
    sc.fillRect(0, 0, 128, 128);
    const st = new THREE.CanvasTexture(shadowTextureCanvas);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(13, 8),
      new THREE.MeshBasicMaterial({
        map: st,
        transparent: true,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.14;
    scene.add(shadow);
    const worlds = { hero: root, ...createWorlds(scene) };
    const firstKey = worlds[state.current.chapter + "-" + state.current.beat]
      ? state.current.chapter + "-" + state.current.beat
      : state.current.chapter;
    for (const [key, g] of Object.entries(worlds)) {
      g.visible = key === firstKey;
      g.scale.setScalar(key === firstKey ? 1 : 0.001);
    }
    let lastChapter = state.current.chapter,
      lastExplore = false;
    const initial = new THREE.Vector3(8, 6.5, 10);
    const resize = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.zoom = chapter === "hero" ? 1 : width < 600 ? 1.25 : 1.08;
      camera.updateProjectionMatrix();
    });
    resize.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let frame;
    const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");
    function loop(t) {
      frame = requestAnimationFrame(loop);
      if (!visible) return;
      const st = state.current,
        reduce = reducedQuery.matches;
      controls.enabled = st.explore;
      renderer.domElement.style.touchAction = st.explore ? "none" : "pan-y";
      if (st.chapter !== lastChapter || (lastExplore && !st.explore)) {
        camera.position.copy(initial);
        controls.target.set(0, 0.5, 0);
        lastChapter = st.chapter;
      }
      lastExplore = st.explore;
      controls.autoRotate = st.explore && !st.paused && !reduce;
      controls.autoRotateSpeed = 0.35;
      const idle = !reduce && !st.paused ? Math.sin(t * 0.00015) * 0.055 : 0;
      for (const [id, g] of Object.entries(worlds)) {
        const currentKey = worlds[st.chapter + "-" + st.beat]
          ? st.chapter + "-" + st.beat
          : st.chapter;
        const target = id === currentKey ? 1 : 0.001;
        const v = reduce
          ? target
          : THREE.MathUtils.lerp(g.scale.x, target, 0.075);
        g.scale.setScalar(v);
        g.visible = v > 0.01;
        if (!st.explore) {
          g.rotation.y = THREE.MathUtils.lerp(
            g.rotation.y,
            -0.24 +
              idle +
              (st.hover ? 0.18 : 0) +
              (reduce ? 0 : st.progress * 0.35),
            0.07,
          );
          g.position.y = THREE.MathUtils.lerp(
            g.position.y,
            id ===
              (worlds[st.chapter + "-" + st.beat]
                ? st.chapter + "-" + st.beat
                : st.chapter)
              ? 0
              : -1,
            0.06,
          );
        }
        if (g.userData.flow)
          g.userData.flow.position.x =
            -2 + 4 * (reduce || st.paused ? st.progress : (t * 0.0002) % 1);
        if (g.userData.scan)
          g.userData.scan.position.x = (st.progress - 0.5) * 4;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    loop(0);
    if (controlRef)
      controlRef.current = {
        zoom: (v) => {
          camera.position.multiplyScalar(v);
          camera.position.clampLength(6, 22);
        },
        reset: () => {
          camera.position.set(8, 6.5, 10);
          controls.target.set(0, 0.5, 0);
        },
      };
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) {
          for (const m of Array.isArray(o.material)
            ? o.material
            : [o.material]) {
            m.map?.dispose();
            m.dispose();
          }
        }
      });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div
      className="scene-canvas"
      ref={host}
      role="img"
      aria-label={`Interactive three-dimensional ${chapter === "hero" ? "laptop, notebook and cup" : chapter + " scene"}`}
    >
      {failed && (
        <p className="scene-fallback">
          You can still explore every chapter and project below.
        </p>
      )}
    </div>
  );
}
