"""
Фотореалистичный рендер station.glb в Blender Cycles.
  blender -b --python _render_station.py -- <out.png> <width> <height> <samples> <preset>
preset: wide (весь комплекс, 3/4 с низкой точки) | pumps (крупно колонки под навесом)
"""
import bpy, sys, math, mathutils

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if len(argv) > 0 else r"C:\tmp\station.png"
W = int(argv[1]) if len(argv) > 1 else 960
H = int(argv[2]) if len(argv) > 2 else 540
SAMPLES = int(argv[3]) if len(argv) > 3 else 48
PRESET = argv[4] if len(argv) > 4 else "wide"

MODEL = r"C:\Users\user\Desktop\Новая папка\smunai-digital-drive\public\models\station.glb"

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=MODEL)
scene = bpy.context.scene

# ── Материалы: цвета сверены с фото реальной АЗС (из generate_video.js) ────────
OVERRIDES = {
    "M_P7466_Turquoise": dict(color=(0.002, 0.44, 0.44), metal=0.3, rough=0.28),
    "M_RAL7015_Slate":   dict(color=(0.03, 0.09, 0.11), metal=0.25, rough=0.42),
    "M_RAL840_2_Grey":   dict(color=(0.60, 0.58, 0.52), metal=0.15, rough=0.5),
    "M_RAL1011_Beige":   dict(color=(0.58, 0.27, 0.06), rough=0.55, wood=True),
    "M_P5405_DarkBlue":  dict(color=(0.62, 0.65, 0.63), rough=0.4),
    "M_Paver":           dict(color=(0.24, 0.23, 0.215), rough=0.85, grit=0.6),
    "M_Paver_Dark":      dict(color=(0.16, 0.15, 0.14), rough=0.85, grit=0.6),
    "M_Asphalt":         dict(color=(0.035, 0.035, 0.036), rough=0.92, grit=0.9),
    "M_Concrete":        dict(color=(0.40, 0.39, 0.36), rough=0.9, grit=0.5),
    "M_Screen":          dict(rough=0.12),
    "M_White":           dict(rough=0.45),
    "M_Ornament_BG":     dict(rough=0.45),
    # свет: лампы под навесом и LED-лента светятся — вечерняя станция
    "M_LightLens":       dict(emit=(1.0, 0.88, 0.68), strength=30.0),
    "M_LED_Strip":       dict(emit=(0.05, 0.85, 0.9), strength=10.0),
    "M_Logo_Image":      dict(emit=(1.0, 1.0, 1.0), strength=1.2, keep_color=True),
    "M_Logo_Mart":       dict(emit=(1.0, 1.0, 1.0), strength=1.2, keep_color=True),
}

def principled(mat):
    for n in mat.node_tree.nodes:
        if n.type == "BSDF_PRINCIPLED":
            return n
    return None

def add_grit(mat, bsdf, amount):
    """Шум → bump + вариация roughness: убирает «пластиковую» гладкость."""
    nt = mat.node_tree
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 18.0
    noise.inputs["Detail"].default_value = 8.0
    noise.inputs["Roughness"].default_value = 0.7
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.25 * amount
    bump.inputs["Distance"].default_value = 0.02
    nt.links.new(noise.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    # roughness: базовое значение ± шум
    mr = nt.nodes.new("ShaderNodeMath"); mr.operation = "MULTIPLY_ADD"
    mr.inputs[1].default_value = 0.25 * amount
    mr.inputs[2].default_value = bsdf.inputs["Roughness"].default_value - 0.12 * amount
    nt.links.new(noise.outputs["Fac"], mr.inputs[0])
    nt.links.new(mr.outputs[0], bsdf.inputs["Roughness"])

def add_wood(mat, bsdf, base):
    """Доски: волновая текстура по объёму — обшивка магазина."""
    nt = mat.node_tree
    tc = nt.nodes.new("ShaderNodeTexCoord")
    wave = nt.nodes.new("ShaderNodeTexWave")
    wave.wave_type = "BANDS"; wave.bands_direction = "Z"
    wave.inputs["Scale"].default_value = 3.0
    wave.inputs["Distortion"].default_value = 2.5
    wave.inputs["Detail"].default_value = 6.0
    nt.links.new(tc.outputs["Object"], wave.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    r, g, b = base
    ramp.color_ramp.elements[0].color = (r * 0.65, g * 0.6, b * 0.55, 1)
    ramp.color_ramp.elements[1].color = (r * 1.15, g * 1.12, b * 1.1, 1)
    nt.links.new(wave.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.15
    nt.links.new(wave.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

for mat in bpy.data.materials:
    bsdf = principled(mat)
    if not bsdf:
        continue
    o = OVERRIDES.get(mat.name)
    if mat.name == "M_Glass":
        # настоящее стекло вместо полупрозрачной плёнки
        bsdf.inputs["Transmission Weight"].default_value = 0.92
        bsdf.inputs["Roughness"].default_value = 0.04
        bsdf.inputs["Alpha"].default_value = 1.0
        bsdf.inputs["Base Color"].default_value = (0.85, 0.93, 0.95, 1)
        mat.blend_method = "BLEND" if hasattr(mat, "blend_method") else mat.blend_method
        continue
    if not o:
        continue
    if "color" in o and not o.get("keep_color"):
        bsdf.inputs["Base Color"].default_value = (*o["color"], 1)
    if "metal" in o:
        bsdf.inputs["Metallic"].default_value = o["metal"]
    if "rough" in o:
        bsdf.inputs["Roughness"].default_value = o["rough"]
    if "emit" in o:
        bsdf.inputs["Emission Color"].default_value = (*o["emit"], 1)
        bsdf.inputs["Emission Strength"].default_value = o["strength"]
    if o.get("wood"):
        add_wood(mat, bsdf, o["color"])
    elif o.get("grit"):
        add_grit(mat, bsdf, o["grit"])

# ── Тени/габариты ────────────────────────────────────────────────────────────
meshes = [ob for ob in bpy.data.objects if ob.type == "MESH"]
mn = mathutils.Vector((1e9, 1e9, 1e9)); mx = mathutils.Vector((-1e9, -1e9, -1e9))
for ob in meshes:
    for v in ob.bound_box:
        w = ob.matrix_world @ mathutils.Vector(v)
        mn = mathutils.Vector(map(min, mn, w)); mx = mathutils.Vector(map(max, mx, w))
center = (mn + mx) / 2
ground_z = mn.z

# ── Земля: степь до горизонта ────────────────────────────────────────────────
bpy.ops.mesh.primitive_plane_add(size=1200, location=(center.x, center.y, ground_z - 0.01))
ground = bpy.context.active_object
ground.name = "Ground_Steppe"
gm = bpy.data.materials.new("M_Steppe"); gm.use_nodes = True
gb = principled(gm)
nt = gm.node_tree
tc = nt.nodes.new("ShaderNodeTexCoord")
n1 = nt.nodes.new("ShaderNodeTexNoise"); n1.inputs["Scale"].default_value = 0.6; n1.inputs["Detail"].default_value = 9
n2 = nt.nodes.new("ShaderNodeTexNoise"); n2.inputs["Scale"].default_value = 40; n2.inputs["Detail"].default_value = 6
nt.links.new(tc.outputs["Object"], n1.inputs["Vector"]); nt.links.new(tc.outputs["Object"], n2.inputs["Vector"])
ramp = nt.nodes.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].color = (0.30, 0.24, 0.14, 1)   # сухая земля
ramp.color_ramp.elements[1].color = (0.52, 0.44, 0.24, 1)   # выгоревшая трава
nt.links.new(n1.outputs["Fac"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], gb.inputs["Base Color"])
gb.inputs["Roughness"].default_value = 0.95
bump = nt.nodes.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.35
nt.links.new(n2.outputs["Fac"], bump.inputs["Height"]); nt.links.new(bump.outputs["Normal"], gb.inputs["Normal"])
ground.data.materials.append(gm)

# ── Небо: физическое (Nishita), золотой час ──────────────────────────────────
world = bpy.data.worlds.new("Sunset"); scene.world = world; world.use_nodes = True
wn = world.node_tree; wn.nodes.clear()
sky = wn.nodes.new("ShaderNodeTexSky")
# Blender 5.x: физическое небо (бывшее Nishita) — MULTIPLE_SCATTERING самое реалистичное
sky.sky_type = "MULTIPLE_SCATTERING" if "MULTIPLE_SCATTERING" in [i.identifier for i in sky.bl_rna.properties["sky_type"].enum_items] else "NISHITA"
def sky_set(attr, val):
    if hasattr(sky, attr):
        setattr(sky, attr, val)
SUN_ELEV = float(argv[5]) if len(argv) > 5 else 2.5
SUN_ROT = float(argv[6]) if len(argv) > 6 else 40.0
sky_set("sun_elevation", math.radians(SUN_ELEV))
sky_set("sun_rotation", math.radians(SUN_ROT))   # солнце за станцией, в кадре: контровой закат, длинные тени к камере
sky_set("sun_intensity", 1.0)
sky_set("sun_size", math.radians(1.6))
sky_set("altitude", 300)
sky_set("air_density", 1.7)                      # плотнее воздух — теплее и мягче горизонт
print("=== SKY", sky.sky_type, [p.identifier for p in sky.bl_rna.properties if p.identifier.startswith(("sun","dust","air","alt"))])
bg = wn.nodes.new("ShaderNodeBackground"); bg.inputs["Strength"].default_value = 0.14
out = wn.nodes.new("ShaderNodeOutputWorld")
wn.links.new(sky.outputs["Color"], bg.inputs["Color"]); wn.links.new(bg.outputs["Background"], out.inputs["Surface"])

# ── Камера ───────────────────────────────────────────────────────────────────
cam_data = bpy.data.cameras.new("Cam"); cam = bpy.data.objects.new("Cam", cam_data)
scene.collection.objects.link(cam); scene.camera = cam
target = bpy.data.objects.new("CamTarget", None); scene.collection.objects.link(target)
tr = cam.constraints.new("TRACK_TO"); tr.target = target; tr.track_axis = "TRACK_NEGATIVE_Z"; tr.up_axis = "UP_Y"

if PRESET == "pumps":
    cam_data.lens = 40
    cam.location = (center.x - 14, center.y - 22, ground_z + 1.7)
    target.location = (center.x - 4, center.y - 2, ground_z + 2.2)
    cam_data.dof.use_dof = True; cam_data.dof.aperture_fstop = 2.8
    cam_data.dof.focus_object = target
else:  # wide
    cam_data.lens = 28
    cam.location = (center.x - 28, center.y - 26, ground_z + 1.9)
    target.location = (center.x + 4, center.y + 3, ground_z + 3.4)
    cam_data.dof.use_dof = True; cam_data.dof.aperture_fstop = 7.0
    cam_data.dof.focus_object = target

# ── Рендер ───────────────────────────────────────────────────────────────────
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = SAMPLES
scene.cycles.use_adaptive_sampling = True
scene.cycles.use_denoising = True
try:
    scene.cycles.denoiser = "OPENIMAGEDENOISE"
except Exception:
    pass
scene.cycles.max_bounces = 8
scene.render.resolution_x = W; scene.render.resolution_y = H; scene.render.resolution_percentage = 100
scene.render.film_transparent = False
scene.render.image_settings.file_format = "PNG"; scene.render.image_settings.color_depth = "8"
scene.view_settings.view_transform = "AgX"
try:
    scene.view_settings.look = "AgX - Medium High Contrast"
except Exception:
    pass
scene.view_settings.exposure = 0.6
scene.render.filepath = OUT
print(f"=== RENDER {PRESET} {W}x{H} samples={SAMPLES} -> {OUT}")
bpy.ops.render.render(write_still=True)
print("=== DONE")
