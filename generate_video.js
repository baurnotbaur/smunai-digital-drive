/**
 * generate_video.js
 *
 * Фотореалистичный рендер public/models/station.glb в headless-Chrome
 * (Puppeteer + three.js): HDR-окружение с солнцем, направленный свет
 * с картами теней, тонемаппинг ACES. Камера облетает станцию на 360°,
 * кадры собираются в public/videos/station.webm (VP9) через ffmpeg.
 *
 * Запуск:  node generate_video.js
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ffmpegPath from 'ffmpeg-static';
import puppeteer from 'puppeteer';

// ─── Настройки ──────────────────────────────────────────────────────────────
const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const DURATION_SEC = 4; // 120 кадров: для скролл-скраббинга этого хватает
const TOTAL_FRAMES = Math.round(FPS * DURATION_SEC);

// '#327f99' — сплошной фон; 'transparent' — webm с альфа-каналом (VP9 умеет)
const BACKGROUND = '#327f99';

const CAMERA_POLAR_DEG = 75; // угол камеры от вертикали (как в model-viewer)
const CAMERA_FOV = 40; // «объектив»: меньше — длиннофокуснее, честнее перспектива
const CAMERA_MARGIN = 1.04; // запас кадрирования вокруг модели

// Солнце (общее для HDR-карты и направленного света с тенями)
const SUN_AZIMUTH = 0.9; // куда светит солнце (радианы по горизонтали)
const SUN_ELEVATION = 0.6; // высота солнца (~34° — дневной свет, честные цвета)
const SUN_INTENSITY = 3.5; // сила направленного света
const ENV_INTENSITY = 0.9; // сила рассеянного света окружения
const EXPOSURE = 1.0; // общая яркость (тонемаппинг ACES)

// Меши, которые вырезаются из модели перед съёмкой:
// Site_Asphalt — тёмная асфальтовая площадка, Line_* — дорожная разметка на ней
const STRIP_MESH_PATTERNS = [/^Site_Asphalt$/, /^Line_/];

// Правки материалов, сверенные с фотографией реальной АЗС С-Мунай
// (цвета заданы в linear, пересчитаны из сэмплов снимка)
// Цвета — «дневные» фирменные (фото снято на закате, тёплый свет искажал их);
// металлик на крашеных поверхностях оставлен намеренно
const MATERIAL_OVERRIDES = {
  // ярко-бирюзовая кромка козырька — фирменная бирюза, без ухода в зелень
  M_P7466_Turquoise: { baseColorFactor: [0.002, 0.44, 0.44, 1], metallicFactor: 0.3, roughnessFactor: 0.28 },
  // фасция и кровельные плоскости — тёмный петроль (морская волна), не зелёный
  M_RAL7015_Slate: { baseColorFactor: [0.03, 0.09, 0.11, 1], metallicFactor: 0.25, roughnessFactor: 0.42 },
  // колонны, балки и стены — светлый тёплый серый металл
  M_RAL840_2_Grey: { baseColorFactor: [0.6, 0.58, 0.52, 1], metallicFactor: 0.15, roughnessFactor: 0.5 },
  // янтарная деревянная обшивка магазина «С Дукен»
  M_RAL1011_Beige: { baseColorFactor: [0.58, 0.27, 0.06, 1], roughnessFactor: 0.55 },
  // корпуса топливных колонок — почти белые
  M_P5405_DarkBlue: { baseColorFactor: [0.62, 0.65, 0.63, 1], roughnessFactor: 0.4 },
  // площадка
  M_Paver: { baseColorFactor: [0.24, 0.23, 0.215, 1] },
  M_Screen: { roughnessFactor: 0.12 }, // экраны колонок
  M_White: { roughnessFactor: 0.45 },
  M_Ornament_BG: { roughnessFactor: 0.45 },
};

// true → каждый кадр ключевой (-g 1): браузер мгновенно перематывает видео при
// скролле (scroll-scrubbing). Файл крупнее; для автовоспроизведения — false.
const ALL_INTRA = true;

// Выходные версии. Рендерим один раз в 1920x1080, затем ужимаем в два файла:
// уменьшение кадра работает как суперсэмплинг, поэтому битрейт можно опустить
// заметно сильнее без видимой потери качества.
const VARIANTS = [
  // десктоп: все 120 кадров
  { file: 'station.webm', width: 1280, height: 720, crf: 36 },
  // телефон: половина кадров (60) — на маленьком экране разницы не видно,
  // зато файл вдвое легче и декодер меньше нагружен при перемотке
  { file: 'station-mobile.webm', width: 854, height: 480, crf: 40, fps: FPS / 2 },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODEL_PATH = path.join(__dirname, 'public', 'models', 'station.glb');
const VIDEO_DIR = path.join(__dirname, 'public', 'videos');
const FRAMES_DIR = path.join(__dirname, '.render-frames');
const THREE_MODULE = path.join(__dirname, 'node_modules', 'three', 'build', 'three.module.js');
const THREE_JSM_DIR = path.join(__dirname, 'node_modules', 'three', 'examples', 'jsm');

const TRANSPARENT = BACKGROUND === 'transparent';

// ─── Временная HTML-страница (three.js-сцена) ───────────────────────────────
const pageHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body {
    margin: 0;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    background: ${TRANSPARENT ? 'transparent' : BACKGROUND};
  }
  canvas { display: block; }
</style>
<script type="importmap">
  { "imports": { "three": "/three.module.js", "three/addons/": "/jsm/" } }
</script>
</head>
<body>
<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

  const W = ${WIDTH};
  const H = ${HEIGHT};

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = ${EXPOSURE};
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(${CAMERA_FOV}, W / H, 0.1, 2000);

  (async () => {
    const [envTex, gltf] = await Promise.all([
      new RGBELoader().loadAsync('/env.hdr'),
      new GLTFLoader().loadAsync('/station.glb'),
    ]);

    envTex.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromEquirectangular(envTex).texture;
    scene.environmentIntensity = ${ENV_INTENSITY};

    // ── процедурные текстуры (модель без UV — проецируем из мировых координат)

    // тайлящийся многооктавный value-noise; base — средний уровень (0–255),
    // amp — размах в долях 255. Карты-множители (albedo/roughness) должны
    // центроваться около белого, иначе они затемняют материал.
    function makeNoiseCanvas(size, octaves, amp, base) {
      const grids = [];
      for (let o = 0; o < octaves; o++) {
        const cells = 8 << o;
        const g = new Float32Array(cells * cells);
        for (let i = 0; i < g.length; i++) g[i] = Math.random() * 2 - 1;
        grids.push({ cells, g });
      }
      const cv = document.createElement('canvas');
      cv.width = size;
      cv.height = size;
      const ctx = cv.getContext('2d');
      const img = ctx.createImageData(size, size);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          let v = base;
          for (let o = 0; o < octaves; o++) {
            const { cells, g } = grids[o];
            const fx = (x / size) * cells;
            const fy = (y / size) * cells;
            const x0 = Math.floor(fx);
            const y0 = Math.floor(fy);
            const tx = fx - x0;
            const ty = fy - y0;
            const s = (xx, yy) => g[((yy % cells) * cells + (xx % cells))];
            const a = s(x0, y0) * (1 - tx) + s(x0 + 1, y0) * tx;
            const b2 = s(x0, y0 + 1) * (1 - tx) + s(x0 + 1, y0 + 1) * tx;
            v += (a * (1 - ty) + b2 * ty) * ((amp * 255) / Math.pow(2, o + 1));
          }
          v = Math.max(0, Math.min(255, v));
          const i = (y * size + x) * 4;
          img.data[i] = v;
          img.data[i + 1] = v;
          img.data[i + 2] = v;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return cv;
    }

    // карта нормалей из карты высот (Собель)
    function normalFromHeight(heightCanvas, strength) {
      const size = heightCanvas.width;
      const src = heightCanvas.getContext('2d').getImageData(0, 0, size, size).data;
      const cv = document.createElement('canvas');
      cv.width = size;
      cv.height = size;
      const ctx = cv.getContext('2d');
      const out = ctx.createImageData(size, size);
      const h = (x, y) => src[(((y + size) % size) * size + ((x + size) % size)) * 4] / 255;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = (h(x + 1, y) - h(x - 1, y)) * strength;
          const dy = (h(x, y + 1) - h(x, y - 1)) * strength;
          const inv = 1 / Math.hypot(dx, dy, 1);
          const o = (y * size + x) * 4;
          out.data[o] = (-dx * inv * 0.5 + 0.5) * 255;
          out.data[o + 1] = (dy * inv * 0.5 + 0.5) * 255;
          out.data[o + 2] = inv * 255;
          out.data[o + 3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);
      return cv;
    }

    // доски: горизонтальные планки со швами, разнотоном и волокном
    function makeWoodCanvas(size, planks) {
      const cv = document.createElement('canvas');
      cv.width = size;
      cv.height = size;
      const ctx = cv.getContext('2d');
      const ph = size / planks;
      for (let p = 0; p < planks; p++) {
        const tone = 225 + (Math.random() - 0.5) * 36;
        ctx.fillStyle = 'rgb(' + tone + ',' + tone * 0.985 + ',' + tone * 0.96 + ')';
        ctx.fillRect(0, p * ph, size, ph);
        // волокно
        for (let i = 0; i < 60; i++) {
          const y = p * ph + Math.random() * ph;
          ctx.globalAlpha = 0.05 + Math.random() * 0.08;
          ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
          ctx.fillRect(0, y, size, 1);
        }
        ctx.globalAlpha = 1;
        // шов между досками
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(0, p * ph, size, 2);
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(0, p * ph + 2, size, 1);
      }
      return cv;
    }

    function toTexture(canvas, srgb) {
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 8;
      if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // UV из мировых координат по доминирующей оси нормали (box-проекция)
    function assignWorldUVs(mesh, scale) {
      mesh.updateWorldMatrix(true, false);
      const pos = mesh.geometry.attributes.position;
      const nrmAttr = mesh.geometry.attributes.normal;
      const uv = new Float32Array(pos.count * 2);
      const v = new THREE.Vector3();
      const n = new THREE.Vector3();
      const nm = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
        n.fromBufferAttribute(nrmAttr, i).applyMatrix3(nm);
        const ax = Math.abs(n.x);
        const ay = Math.abs(n.y);
        const az = Math.abs(n.z);
        let u;
        let w;
        if (ay >= ax && ay >= az) {
          u = v.x;
          w = v.z;
        } else if (ax >= az) {
          u = v.z;
          w = v.y;
        } else {
          u = v.x;
          w = v.y;
        }
        uv[i * 2] = u * scale;
        uv[i * 2 + 1] = w * scale;
      }
      mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    }

    const groundNoise = makeNoiseCanvas(512, 4, 0.45, 200);
    const groundMaps = {
      map: toTexture(makeNoiseCanvas(512, 4, 0.14, 232), true),
      roughnessMap: toTexture(groundNoise, false),
      normalMap: toTexture(normalFromHeight(groundNoise, 1.6), false),
    };
    const woodCanvas = makeWoodCanvas(512, 8);
    const woodMaps = {
      map: toTexture(woodCanvas, true),
      roughnessMap: toTexture(makeNoiseCanvas(512, 3, 0.22, 235), false),
    };
    const paintMaps = {
      roughnessMap: toTexture(makeNoiseCanvas(512, 2, 0.28, 235), false),
    };

    // какому материалу — какая фактура и плотность проекции
    const TEXTURE_PLAN = {
      M_Paver: { maps: groundMaps, uvScale: 0.35 },
      M_Paver_Dark: { maps: groundMaps, uvScale: 0.35 },
      M_Concrete: { maps: groundMaps, uvScale: 0.5 },
      M_RAL1011_Beige: { maps: woodMaps, uvScale: 0.55 },
      M_RAL840_2_Grey: { maps: paintMaps, uvScale: 0.07 },
      M_RAL7015_Slate: { maps: paintMaps, uvScale: 0.05 },
      M_P7466_Turquoise: { maps: paintMaps, uvScale: 0.06 },
    };

    const model = gltf.scene;
    const texturedMaterials = new Set();
    model.traverse((obj) => {
      if (!obj.isMesh) return;
      const mat = obj.material;
      // стекло и «просвечивающие» логотипы не должны отбрасывать глухую тень
      const seeThrough = mat && (mat.transparent || (mat.transmission ?? 0) > 0);
      obj.castShadow = !seeThrough;
      obj.receiveShadow = true;

      const plan = mat && TEXTURE_PLAN[mat.name];
      if (plan) {
        assignWorldUVs(obj, plan.uvScale);
        if (!texturedMaterials.has(mat)) {
          texturedMaterials.add(mat);
          Object.assign(mat, plan.maps);
          if (plan.maps.normalMap) mat.normalScale = new THREE.Vector2(0.5, 0.5);
          mat.needsUpdate = true;
        }
      }
    });
    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    // солнце: направленный свет с мягкими картами теней
    const sunDir = new THREE.Vector3(
      Math.cos(${SUN_ELEVATION}) * Math.cos(${SUN_AZIMUTH}),
      Math.sin(${SUN_ELEVATION}),
      Math.cos(${SUN_ELEVATION}) * Math.sin(${SUN_AZIMUTH}),
    );
    const sun = new THREE.DirectionalLight(0xfff4e6, ${SUN_INTENSITY});
    sun.position.copy(center).addScaledVector(sunDir, sphere.radius * 3);
    sun.target.position.copy(center);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    const sr = sphere.radius * 1.15;
    sun.shadow.camera.left = -sr;
    sun.shadow.camera.right = sr;
    sun.shadow.camera.top = sr;
    sun.shadow.camera.bottom = -sr;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = sphere.radius * 8;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 5;
    scene.add(sun, sun.target);

    // невидимый «ловец тени» под моделью — мягко заземляет станцию на фоне
    const catcher = new THREE.Mesh(
      new THREE.CircleGeometry(sphere.radius * 1.8, 64),
      new THREE.ShadowMaterial({ opacity: 0.3 }),
    );
    catcher.rotation.x = -Math.PI / 2;
    catcher.position.set(center.x, box.min.y - 0.02, center.z);
    catcher.receiveShadow = true;
    scene.add(catcher);

    // дистанция камеры: модель плоская и широкая, поэтому вписываем её сферу
    // по горизонтали кадра — вертикаль поместится с большим запасом
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const dist = (sphere.radius * ${CAMERA_MARGIN}) / Math.sin(hFov / 2);
    const polar = THREE.MathUtils.degToRad(${CAMERA_POLAR_DEG});

    window.__setAngle = (deg) =>
      new Promise((resolve) => {
        const t = THREE.MathUtils.degToRad(deg);
        camera.position.set(
          center.x + dist * Math.sin(polar) * Math.sin(t),
          center.y + dist * Math.cos(polar),
          center.z + dist * Math.sin(polar) * Math.cos(t),
        );
        camera.lookAt(center);
        renderer.render(scene, camera);
        // двойной rAF — кадр гарантированно попал в композитор к скриншоту
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });

    await window.__setAngle(0);
    window.__ready = true;
  })().catch((err) => {
    window.__error = String((err && err.stack) || err);
  });
</script>
</body>
</html>`;

// ─── Вырезание мешей и правка материалов в GLB ──────────────────────────────
// Отцепляет от сцены узлы, чьи имена (или имена их мешей) подходят под
// patterns. Геометрия остаётся в бинарном чанке мёртвым грузом, но загрузчик
// строит сцену только из ссылок scene.nodes/children, поэтому в кадр эти
// объекты не попадают, а камера кадрирует модель без них — крупнее.
function stripMeshesFromGlb(buffer, patterns) {
  const jsonLen = buffer.readUInt32LE(12);
  const json = JSON.parse(buffer.subarray(20, 20 + jsonLen).toString('utf8'));

  const matches = (name) => patterns.some((p) => p.test(name ?? ''));
  const badMeshes = new Set();
  (json.meshes ?? []).forEach((m, i) => {
    if (matches(m.name)) badMeshes.add(i);
  });
  const badNodes = new Set();
  (json.nodes ?? []).forEach((n, i) => {
    if (matches(n.name) || (n.mesh !== undefined && badMeshes.has(n.mesh))) badNodes.add(i);
  });

  const keep = (refs) => refs?.filter((i) => !badNodes.has(i));
  (json.scenes ?? []).forEach((s) => {
    s.nodes = keep(s.nodes);
  });
  (json.nodes ?? []).forEach((n) => {
    if (n.children) n.children = keep(n.children);
  });

  let touchedMaterials = 0;
  (json.materials ?? []).forEach((m) => {
    const override = MATERIAL_OVERRIDES[m.name];
    if (!override) return;
    m.pbrMetallicRoughness = { ...m.pbrMetallicRoughness, ...override };
    touchedMaterials++;
  });

  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  const pad = (4 - (jsonBuf.length % 4)) % 4;
  if (pad) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(pad, 0x20)]);

  const restChunks = buffer.subarray(20 + jsonLen);
  const header = Buffer.alloc(12);
  header.write('glTF', 0, 'ascii');
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBuf.length + restChunks.length, 8);
  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(jsonBuf.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'

  console.log(
    `Вырезано из модели: ${badNodes.size} узлов (${badMeshes.size} мешей), материалов подкручено: ${touchedMaterials}`,
  );
  return Buffer.concat([header, jsonChunkHeader, jsonBuf, restChunks]);
}

// ─── Процедурное HDR-окружение (Radiance .hdr, несжатые RGBE-пиксели) ──────
// Даёт рассеянный свет и отражения: небо, тёплый горизонт, грунт и умеренное
// солнечное пятно для бликов (основную светотень делает DirectionalLight).
function buildEnvironmentHdr() {
  const W = 1024;
  const H = 512;
  const pixels = Buffer.alloc(W * H * 4);

  const sun = [
    Math.cos(SUN_ELEVATION) * Math.cos(SUN_AZIMUTH),
    Math.sin(SUN_ELEVATION),
    Math.cos(SUN_ELEVATION) * Math.sin(SUN_AZIMUTH),
  ];

  for (let y = 0; y < H; y++) {
    const theta = Math.PI * (0.5 - y / H); // +90° (верх) … −90° (низ)
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    for (let x = 0; x < W; x++) {
      const phi = (2 * Math.PI * x) / W;
      const dir = [cosT * Math.cos(phi), sinT, cosT * Math.sin(phi)];

      let r;
      let g;
      let b;
      if (theta > 0) {
        // небо: тёплый горизонт → насыщенный голубой зенит (как на фото)
        const t = theta / (Math.PI / 2);
        r = 0.6 * (1 - t) + 0.15 * t;
        g = 0.55 * (1 - t) + 0.26 * t;
        b = 0.48 * (1 - t) + 0.52 * t;
      } else {
        // земля: нейтральный тёплый грунт
        const t = -theta / (Math.PI / 2);
        const k = 0.2 * (1 - t) + 0.1 * t;
        r = k * 1.05;
        g = k;
        b = k * 0.88;
      }

      const cosA = dir[0] * sun[0] + dir[1] * sun[1] + dir[2] * sun[2];
      if (cosA > 0) {
        const core = Math.exp((cosA - 1) * 900); // солнечное пятно для бликов
        const halo = Math.exp((cosA - 1) * 40); // мягкое тёплое гало
        r += 300 * core + 2.1 * halo;
        g += 290 * core + 2.0 * halo;
        b += 265 * core + 1.8 * halo;
      }

      // кодирование RGBE
      const m = Math.max(r, g, b);
      let e = 0;
      let scale = 0;
      if (m > 1e-9) {
        e = Math.ceil(Math.log2(m));
        scale = Math.pow(2, -e) * 256;
        if (m * scale >= 256) {
          e += 1;
          scale /= 2;
        }
      }
      const o = (y * W + x) * 4;
      pixels[o] = Math.min(255, Math.round(r * scale));
      pixels[o + 1] = Math.min(255, Math.round(g * scale));
      pixels[o + 2] = Math.min(255, Math.round(b * scale));
      pixels[o + 3] = e + 128;
    }
  }

  const header = Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${H} +X ${W}\n`, 'ascii');
  return Buffer.concat([header, pixels]);
}

// ─── Локальный сервер (file:// не подходит — fetch модели упрётся в CORS) ───
function startServer() {
  const strippedModel = stripMeshesFromGlb(fs.readFileSync(MODEL_PATH), STRIP_MESH_PATTERNS);
  const routes = {
    '/': { body: pageHtml, type: 'text/html; charset=utf-8' },
    '/three.module.js': { file: THREE_MODULE, type: 'text/javascript' },
    '/three.core.js': {
      file: path.join(path.dirname(THREE_MODULE), 'three.core.js'),
      type: 'text/javascript',
    },
    '/station.glb': { body: strippedModel, type: 'model/gltf-binary' },
    '/env.hdr': { body: buildEnvironmentHdr(), type: 'image/vnd.radiance' },
  };
  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    let route = routes[url];
    // модули three/examples/jsm (GLTFLoader и его зависимости)
    if (!route && url.startsWith('/jsm/')) {
      const resolved = path.normalize(path.join(THREE_JSM_DIR, url.slice('/jsm/'.length)));
      if (resolved.startsWith(THREE_JSM_DIR) && fs.existsSync(resolved)) {
        route = { file: resolved, type: 'text/javascript' };
      }
    }
    if (!route) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': route.type });
    if (route.file) fs.createReadStream(route.file).pipe(res);
    else res.end(route.body);
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(server)),
  );
}

// ─── Съёмка кадров ──────────────────────────────────────────────────────────
async function captureFrames(pageUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    // используем установленный в системе Google Chrome: загрузку собственного
    // браузера Puppeteer на этой машине блокирует антивирус (chrome.exe
    // исчезает из кэша при распаковке)
    channel: 'chrome',
    args: [
      // с Chrome 129 программный WebGL в headless требует этого флага
      '--enable-unsafe-swiftshader',
      '--force-color-profile=srgb',
      '--hide-scrollbars',
    ],
  });
  try {
    const page = await browser.newPage();
    page.on('pageerror', (err) => console.log(`  [страница] ошибка: ${err.message}`));
    page.on('requestfailed', (req) =>
      console.log(`  [страница] не загрузилось: ${req.url()} — ${req.failure()?.errorText}`),
    );
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
    await page.goto(pageUrl, { waitUntil: 'networkidle0' });

    await page.waitForFunction('window.__ready === true || window.__error !== undefined', {
      timeout: 90_000,
    });
    const sceneError = await page.evaluate(() => window.__error);
    if (sceneError) throw new Error(`Сцена не собралась: ${sceneError}`);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      // последний кадр чуть меньше 360°, чтобы зацикленное видео не «спотыкалось»
      const theta = (360 * i) / TOTAL_FRAMES;
      await page.evaluate((deg) => window.__setAngle(deg), theta);

      await page.screenshot({
        path: path.join(FRAMES_DIR, `frame_${String(i).padStart(4, '0')}.png`),
        omitBackground: TRANSPARENT,
      });

      if ((i + 1) % 30 === 0 || i === TOTAL_FRAMES - 1) {
        console.log(`  кадр ${i + 1}/${TOTAL_FRAMES}`);
      }
    }
  } finally {
    await browser.close();
  }
}

// ─── Сборка webm через ffmpeg ───────────────────────────────────────────────
function encodeVideo(variant) {
  const outputPath = path.join(VIDEO_DIR, variant.file);
  const args = [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(FRAMES_DIR, 'frame_%04d.png'),
    // масштабирование + лёгкая «камерная» цветокоррекция и микрорезкость
    '-vf',
    `scale=${variant.width}:${variant.height}:flags=lanczos,` +
      'eq=contrast=1.05:saturation=1.12,unsharp=5:5:0.25' +
      (variant.fps ? `,fps=${variant.fps}` : ''),
    '-c:v', 'libvpx-vp9',
    '-b:v', '0',
    '-crf', String(variant.crf),
    '-pix_fmt', TRANSPARENT ? 'yuva420p' : 'yuv420p',
    // альфа-канал VP9 несовместим с alt-ref кадрами
    ...(TRANSPARENT ? ['-auto-alt-ref', '0'] : []),
    ...(ALL_INTRA ? ['-g', '1'] : []),
    '-deadline', 'good',
    '-cpu-used', '2',
    '-row-mt', '1',
    '-an',
    outputPath,
  ];
  return new Promise((resolve, reject) => {
    const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    ff.on('error', reject);
    ff.on('close', (code) =>
      code === 0 ? resolve(outputPath) : reject(new Error(`ffmpeg завершился с кодом ${code}`)),
    );
  });
}

// ─── Точка входа ────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(MODEL_PATH)) {
    throw new Error(`Не найдена модель: ${MODEL_PATH}`);
  }
  if (!fs.existsSync(THREE_MODULE)) {
    throw new Error('Не найден three — выполните npm install -D three');
  }

  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const server = await startServer();
  const { port } = server.address();

  try {
    console.log(
      `Съёмка ${TOTAL_FRAMES} кадров (${WIDTH}x${HEIGHT}, ${FPS} fps, фон: ${BACKGROUND})…`,
    );
    await captureFrames(`http://127.0.0.1:${port}/`);

    for (const variant of VARIANTS) {
      console.log(`Кодирование ${variant.file} (${variant.width}x${variant.height}, CRF ${variant.crf})…`);
      const outputPath = await encodeVideo(variant);
      const sizeMb = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
      console.log(`  готово: ${variant.file} — ${sizeMb} МБ`);
    }
  } finally {
    server.close();
    fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
