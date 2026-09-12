import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
export function createWorlds(scene) {
  const worlds = {};
  const m = (c, metal = 0.1) =>
    new THREE.MeshStandardMaterial({
      color: c,
      metalness: metal,
      roughness: 0.32,
    });
  const white = m("#f5f7fa"),
    silver = m("#a8b4c3", 0.7),
    dark = m("#263247", 0.4),
    blue = m("#3776d6", 0.3),
    red = m("#bf4c41", 0.3),
    teal = m("#3a969e", 0.4);
  const group = (id) => {
    const g = new THREE.Group();
    g.visible = false;
    g.scale.setScalar(0.001);
    scene.add(g);
    worlds[id] = g;
    return g;
  };
  const box = (g, pos, size, material, r = 0.08) => {
    const o = new THREE.Mesh(new RoundedBoxGeometry(...size, 3, r), material);
    o.position.set(...pos);
    g.add(o);
    return o;
  };
  const ball = (g, pos, r, material) => {
    const o = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), material);
    o.position.set(...pos);
    g.add(o);
    return o;
  };
  const tube = (g, points, r, material) => {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );
    const o = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 48, r, 8, false),
      material,
    );
    g.add(o);
    return o;
  };
  const ring = (g, r, t, material, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(new THREE.TorusGeometry(r, t, 12, 80), material);
    o.position.set(x, y, z);
    g.add(o);
    return o;
  };
  const isb = group("isb");
  box(isb, [0, 0, 0], [4.8, 0.2, 3.2], white);
  box(isb, [-0.1, 0.15, 0], [4.5, 0.12, 2.95], blue);
  box(isb, [0, 0.25, 0], [4.35, 0.14, 2.8], white);
  for (let i = 0; i < 3; i++) {
    const card = box(
      isb,
      [-1.4 + i * 1.4, 1.15 + i * 0.3, -0.1],
      [1.15, 1.65, 0.13],
      i === 1 ? blue : white,
    );
    card.rotation.y = -0.16 + i * 0.12;
    for (let j = 0; j < 3; j++)
      box(
        card,
        [0, -0.25 + j * 0.25, 0.08],
        [0.65, 0.07, 0.02],
        i === 1 ? white : silver,
        0.015,
      );
    ball(
      isb,
      [-1.4 + i * 1.4, 2.1 + i * 0.3, -0.1],
      0.16,
      i === 1 ? blue : silver,
    );
  }
  tube(
    isb,
    [
      [-1.4, 0.6, 0.6],
      [0, 1, 0.7],
      [1.4, 1.1, 0.6],
    ],
    0.028,
    silver,
  );
  isb.userData.cards = isb.children
    .slice(3)
    .filter((o) => o.geometry?.type === "RoundedBoxGeometry");
  const oracle = group("oracle");
  for (let i = 0; i < 3; i++) {
    const r = ring(
      oracle,
      1.18 + i * 0.38,
      0.04,
      i === 1 ? red : silver,
      0,
      1,
      0,
    );
    r.rotation.y = Math.PI / 2;
    r.rotation.x = i * 0.2;
  }
  box(oracle, [0, 1, 0], [1.7, 2.1, 0.22], white);
  const lock = ring(oracle, 0.35, 0.075, red, 0, 1.35, 0.21);
  lock.scale.y = 1.2;
  box(oracle, [0, 0.9, 0.28], [0.95, 0.72, 0.18], red);
  ball(oracle, [0, 0.97, 0.4], 0.075, white);
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    const x = Math.cos(a) * 2.7,
      z = Math.sin(a) * 2;
    box(oracle, [x, 0.8, z], [0.9, 1.3, 0.13], white);
    box(oracle, [x, 0.95, z + 0.09], [0.5, 0.08, 0.02], red, 0.02);
    tube(
      oracle,
      [
        [x, 0.5, z],
        [x * 0.6, 0.25, z * 0.6],
        [0, 0.5, 0],
      ],
      0.025,
      silver,
    );
  }
  const mettl = group("mettl");
  for (let c = 0; c < 3; c++) {
    const x = (c - 1) * 1.8;
    for (let r = 0; r < 4; r++) {
      box(
        mettl,
        [x, 0.1 + r * 0.55, 0],
        [1.4, 0.42, 1.6],
        r === 3 ? teal : white,
      );
      for (let j = 0; j < 3; j++)
        ball(
          mettl,
          [x - 0.4 + j * 0.14, 0.1 + r * 0.55, 0.82],
          0.035,
          j === 0 ? teal : silver,
        );
    }
    tube(
      mettl,
      [
        [x, -0.05, 0.5],
        [x, -0.05, 1.8],
        [0, -0.05, 2.4],
      ],
      0.035,
      teal,
    );
  }
  for (let i = 0; i < 5; i++)
    box(
      mettl,
      [-2 + i, 2.9 + (i % 2) * 0.2, -0.2],
      [0.55, 0.45, 0.1],
      i % 2 ? white : teal,
    );
  mettl.userData.flow = ball(mettl, [-2, 0.4, 1.8], 0.11, teal);
  const akamai = group("akamai");
  ball(akamai, [0, 1, 0], 1.9, m("#dcecf4", 0.35));
  for (let i = 0; i < 7; i++) {
    const r = ring(akamai, 1.925, 0.012, silver, 0, 1, 0);
    r.rotation.y = (i * Math.PI) / 7;
  }
  for (let j = -2; j <= 2; j++) {
    const y = j * 0.58;
    const r = ring(
      akamai,
      Math.sqrt(1.94 ** 2 - y ** 2),
      0.012,
      silver,
      0,
      1 + y,
      0,
    );
    r.rotation.x = Math.PI / 2;
  }
  for (let i = 0; i < 8; i++) {
    const a = i * 0.87;
    const p = [
      Math.cos(a) * 1.98,
      1 + Math.sin(a * 2) * 0.9,
      Math.sin(a) * 1.8,
    ];
    ball(akamai, p, 0.07, blue);
    tube(
      akamai,
      [p, [p[0] * 1.2, p[1] + 1.2, p[2] * 1.2], [-1, 1.9, 1.4]],
      0.019,
      blue,
    );
  }
  const r = ring(akamai, 2.65, 0.035, blue, 0, 1, 0);
  r.rotation.x = 1.12;
  const drdo = group("drdo");
  for (let x = 0; x < 9; x++)
    for (let z = 0; z < 8; z++) {
      const h = 0.12 + Math.sin(x * 0.8) * Math.cos(z * 0.8) * 0.25 + 0.25;
      box(
        drdo,
        [(x - 4) * 0.55, h / 2, (z - 3.5) * 0.55],
        [0.51, h, 0.51],
        m(x + z > 9 ? "#bdc8b4" : "#dce2d7"),
        0.025,
      );
    }
  for (let i = 0; i < 3; i++) {
    const f = box(
      drdo,
      [0, 1 + i * 0.65, 0],
      [3.5, 0.025, 3],
      new THREE.MeshStandardMaterial({
        color: i === 1 ? "#94bda8" : "#d5e0d8",
        transparent: true,
        opacity: 0.24,
        roughness: 0.2,
      }),
    );
    f.rotation.y = i * 0.07;
  }
  const scan = box(drdo, [0, 2.5, 0], [0.04, 0.04, 4.5], teal, 0.01);
  drdo.userData.scan = scan;
  const vit = group("vit");
  for (let i = 0; i < 4; i++) {
    const book = new THREE.Group();
    vit.add(book);
    book.position.set((i % 2) * 0.18, 0.22 + i * 0.32, 0);
    book.rotation.y = i % 2 ? 0.12 : -0.12;
    box(book, [0, 0, 0], [3.3, 0.27, 2.4], i % 2 ? blue : white);
    box(book, [0.05, 0, 0.03], [3.1, 0.19, 2.4], m("#f1eee7"));
  }
  const cap = box(vit, [0, 2.35, 0], [2.25, 0.12, 2.25], dark);
  cap.rotation.y = 0.6;
  box(vit, [0, 2.03, 0], [1.1, 0.5, 1.1], dark);
  tube(
    vit,
    [
      [0, 2.44, 0],
      [1.3, 2.43, 0.4],
      [1.5, 1.6, 0.5],
    ],
    0.04,
    m("#d6ab56", 0.6),
  );
  const portal = group("isb-1");
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * 2;
    box(portal, [x, 0.8, 0], [1.55, 1.7, 0.2], i === 1 ? blue : white);
    for (let j = 0; j < 3; j++)
      box(
        portal,
        [x, 0.5 + j * 0.28, 0.12],
        [0.8, 0.06, 0.03],
        i === 1 ? white : silver,
        0.01,
      );
    if (i < 2)
      tube(
        portal,
        [
          [x + 0.8, 0.8, 0],
          [x + 1, 0.8, 0.1],
          [x + 1.2, 0.8, 0],
        ],
        0.04,
        blue,
      );
  }
  box(portal, [0, -0.22, 0], [6, 0.15, 2.2], white);
  const phone = group("isb-2");
  box(phone, [0, 1, 0], [1.9, 3.65, 0.22], silver, 0.2);
  box(phone, [0, 1, 0.13], [1.73, 3.4, 0.04], dark, 0.15);
  box(phone, [0, 1, 0.16], [1.55, 3.15, 0.025], blue, 0.12);
  box(phone, [0, 2.45, 0.2], [0.55, 0.07, 0.03], dark, 0.03);
  for (let i = 0; i < 13; i++)
    box(
      phone,
      [-0.65 + i * 0.108, 1, 0.21],
      [0.04, 0.1 + Math.sin(i * 0.65) ** 2 * 0.9, 0.025],
      white,
      0.015,
    );
  ball(phone, [0, -0.2, 0.22], 0.22, white);
  for (let i = 0; i < 3; i++) {
    const r = ring(phone, 1.5 + i * 0.45, 0.018, silver, 0, 1, 0);
    r.rotation.y = 0.8;
  }
  const defaults = group("oracle-1");
  for (let i = 0; i < 3; i++) {
    box(defaults, [-2, 0.1 + i * 0.8, 0], [1.2, 0.55, 1], white);
    box(defaults, [-2, 0.1 + i * 0.8, 0.52], [0.65, 0.08, 0.025], red, 0.02);
    tube(
      defaults,
      [
        [-1.4, 0.1 + i * 0.8, 0],
        [0, 1, 0.5],
        [1.3, 1, 0],
      ],
      0.035,
      silver,
    );
  }
  box(defaults, [1.8, 1, 0], [1.5, 2.2, 0.18], white);
  const tick = tube(
    defaults,
    [
      [1.35, 1, 0.16],
      [1.65, 0.7, 0.16],
      [2.25, 1.4, 0.16],
    ],
    0.08,
    red,
  );
  box(defaults, [0, -0.38, 0], [5.7, 0.2, 2.5], white);
  const retrieval = group("oracle-2");
  for (let i = 0; i < 7; i++) {
    const a = (i * Math.PI * 2) / 7;
    const p = [Math.cos(a) * 2.6, 0.8 + Math.sin(a) * 0.8, Math.sin(a) * 1.5];
    box(retrieval, p, [0.8, 1.1, 0.13], white);
    tube(
      retrieval,
      [p, [p[0] * 0.6, 1.6, p[2] * 0.6], [0, 1, 0]],
      0.025,
      silver,
    );
  }
  ball(retrieval, [0, 1, 0], 0.65, red);
  const rr = ring(retrieval, 1, 0.035, red, 0, 1, 0);
  rr.rotation.x = 0.7;
  const setup = group("mettl-1");
  box(setup, [0, 1, 0], [4, 2.8, 0.2], silver);
  box(setup, [0, 1, 0.13], [3.75, 2.55, 0.06], white);
  for (let i = 0; i < 3; i++) {
    box(
      setup,
      [-0.4, 1.7 - i * 0.65, 0.2],
      [2.2, 0.35, 0.06],
      i === 2 ? teal : m("#e2eced"),
    );
    ball(setup, [1.2, 1.7 - i * 0.65, 0.23], 0.12, teal);
  }
  box(setup, [0, -0.65, 0], [2.1, 0.15, 1.3], silver);
  box(setup, [0, -0.4, -0.02], [0.4, 0.8, 0.25], silver);
  const monitor = (id) => {
    const g = group(id);
    box(g, [0, 1, 0], [4.5, 2.8, 0.18], dark);
    box(g, [0, 1, 0.12], [4.2, 2.5, 0.03], white);
    for (let i = 0; i < 6; i++) {
      const h = 0.3 + (i % 3) * 0.36;
      box(
        g,
        [-1.6 + i * 0.38, 0.3 + h / 2, 0.18],
        [0.24, h, 0.025],
        teal,
        0.01,
      );
    }
    for (let i = 0; i < 5; i++)
      box(
        g,
        [0.9, 1.9 - i * 0.31, 0.18],
        [1.15 - i * 0.12, 0.08, 0.03],
        i === 0 ? teal : silver,
        0.015,
      );
    box(g, [0, -0.6, 0], [2.5, 0.1, 1.4], silver);
    box(g, [0, -0.25, 0], [0.4, 0.7, 0.22], silver);
    return g;
  };
  monitor("mettl-2");
  monitor("akamai-1");
  const mapping = group("drdo-1");
  for (let x = 0; x < 7; x++)
    for (let z = 0; z < 6; z++)
      box(
        mapping,
        [
          (x - 3) * 0.7,
          0.2 + Math.sin(x) * Math.cos(z) * 0.12,
          (z - 2.5) * 0.7,
        ],
        [0.66, 0.2, 0.66],
        (x + z) % 4 === 0 ? teal : white,
        0.02,
      );
  for (let i = 0; i < 3; i++) {
    const r = ring(
      mapping,
      0.25,
      0.035,
      teal,
      -1.2 + i * 1.2,
      0.7,
      Math.sin(i) * 0.8,
    );
    r.rotation.x = Math.PI / 2;
  }
  tube(
    mapping,
    [
      [-1.2, 0.6, 0],
      [0, 0.65, 0.67],
      [1.2, 0.7, 0.73],
    ],
    0.035,
    teal,
  );
  return worlds;
}
