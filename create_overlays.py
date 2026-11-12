import os
from PIL import Image, ImageDraw, ImageFont

OVERLAYS_DIR = "demo_build/overlays"
os.makedirs(OVERLAYS_DIR, exist_ok=True)

# 1920x1080 transparent canvas
WIDTH = 1920
HEIGHT = 1080

SCENE_OVERLAYS = [
    {
        "id": "scene_01",
        "tag": "LATAR BELAKANG",
        "title": "URGENSI PERTAHANAN KOGNITIF & ANCAMAN DISINFORMASI",
        "subtitle": "Pergeseran Medan Tempur Modern dari Domain Kinetik Menuju Domain Kognitif",
        "color": (220, 38, 38, 240) # Red
    },
    {
        "id": "scene_02",
        "tag": "KARYA & MANFAAT",
        "title": "4 PILAR MANFAAT STRATEGIS BAGI KETAHANAN NASIONAL",
        "subtitle": "Early Warning System Proaktif, Atribusi Botnet, Mitigasi AI, & Geointelijen 38 Provinsi",
        "color": (26, 86, 219, 240) # Blue
    },
    {
        "id": "scene_03",
        "tag": "ARSITEKTUR AI",
        "title": "ARSITEKTUR MULTI-TIER & PIPELINE MACHINE LEARNING",
        "subtitle": "Multi-Source Omnichannel Ingestion, IndoBERT Multi-Task NLP, & Graph Topology Scoring",
        "color": (124, 58, 237, 240) # Purple
    },
    {
        "id": "scene_04",
        "tag": "LIVE DEMO • MODUL 1 & 2",
        "title": "DASBOR UTAMA (EWS BANNER) & PEMANTAUAN NARASI",
        "subtitle": "Observasi Indeks Ancaman Real-time, Kerapatan Botnet, & Streaming Multikanal",
        "color": (217, 119, 6, 240) # Amber
    },
    {
        "id": "scene_05",
        "tag": "LIVE DEMO • MODUL 3 & 4",
        "title": "INSPEKTOR DEEP NLP INDOBERT & RADAR BOTNET 360°",
        "subtitle": "Analisis Spektrum Emosi, Uji Probabilitas Hoaks, & Pelacakan Akun Inisiator Sindikat",
        "color": (220, 38, 38, 240) # Red
    },
    {
        "id": "scene_06",
        "tag": "LIVE DEMO • MODUL 5",
        "title": "GEOINTELLIGENCE PETA NUSANTARA 38 PROVINSI (WGS-84)",
        "subtitle": "Pemetaan Sebaran Sentimen, Kerapatan Bot Kedaerahan, & 10 Titik Hub Terkalibrasi",
        "color": (5, 150, 105, 240) # Emerald
    },
    {
        "id": "scene_07",
        "tag": "LIVE DEMO • MODUL 6 & 7",
        "title": "14 SKENARIO MULTISEKTORAL & EKSPOR SITREP MILITER A4",
        "subtitle": "Adaptasi Skenario Kontinjensi Real-Time & Ekspor Dokumen Intelijen Format Dinas Mabes TNI",
        "color": (26, 86, 219, 240) # Blue
    },
    {
        "id": "scene_08",
        "tag": "KESIMPULAN",
        "title": "KEDAULATAN KOGNITIF INDONESIA 2026",
        "subtitle": "Kesiapan Operasional Penuh untuk Satuan Siber TNI, BSSN, Polri, & Kementerian",
        "color": (15, 23, 42, 240) # Dark Navy
    }
]

# Try to find standard fonts
FONT_BOLD = None
FONT_REG = None

candidates_bold = [
    "C:/Windows/Fonts/segoeuib.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/calibrib.ttf"
]
candidates_reg = [
    "C:/Windows/Fonts/segoeui.ttf",
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/calibri.ttf"
]

for p in candidates_bold:
    if os.path.exists(p):
        FONT_BOLD = p
        break
for p in candidates_reg:
    if os.path.exists(p):
        FONT_REG = p
        break

f_tag = ImageFont.truetype(FONT_BOLD or "arial.ttf", 20)
f_title = ImageFont.truetype(FONT_BOLD or "arial.ttf", 32)
f_sub = ImageFont.truetype(FONT_REG or "arial.ttf", 22)
f_brand = ImageFont.truetype(FONT_BOLD or "arial.ttf", 18)

for sc in SCENE_OVERLAYS:
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Lower-third container
    bar_y1 = 920
    bar_y2 = 1040
    
    # Dark semi-transparent background box with rounded corners
    box_rect = [60, bar_y1, WIDTH - 60, bar_y2]
    draw.rounded_rectangle(box_rect, radius=16, fill=(15, 23, 42, 235), outline=(51, 65, 85, 255), width=2)

    # Accent color tag bar on the left
    tag_bg = [80, bar_y1 + 18, 380, bar_y1 + 54]
    draw.rounded_rectangle(tag_bg, radius=8, fill=sc["color"])
    draw.text((100, bar_y1 + 22), sc["tag"], font=f_tag, fill=(255, 255, 255, 255))

    # Title text
    draw.text((405, bar_y1 + 20), sc["title"], font=f_title, fill=(255, 255, 255, 255))

    # Subtitle text
    draw.text((85, bar_y1 + 68), sc["subtitle"], font=f_sub, fill=(203, 213, 225, 255))

    # Brand on right
    brand_text = "SONAR v2.5 AI  |  KARTIKA CYBER HACTOWN 2026"
    draw.text((WIDTH - 550, bar_y1 + 70), brand_text, font=f_brand, fill=(148, 163, 184, 255))

    out_path = f"{OVERLAYS_DIR}/overlay_{sc['id']}.png"
    img.save(out_path)
    print(f"Generated {out_path}")

print("All overlays generated successfully!")
