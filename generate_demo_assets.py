"""
generate_demo_assets.py
Generates visual assets (1920x1080 PNGs) and 05_SLIDE_PRESENTASI_VIDEO_DEMO.pptx
for the YouTube demo submission of SONAR v2.5 AI.
"""

import os
from PIL import Image, ImageDraw, ImageFont
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

OUTPUT_DIR = r"d:\SONAR\demo"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "visual_assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

# Font loading helpers
FONT_DIR = r"C:\Windows\Fonts"

def get_font(name="arial.ttf", size=24):
    path = os.path.join(FONT_DIR, name)
    if os.path.exists(path):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

# -------------------------------------------------------------
# 1. GENERATE VISUAL CARDS (1920x1080 PNG)
# -------------------------------------------------------------

def draw_header_bar(draw, title_text, category_text):
    # Top banner
    draw.rectangle([(0, 0), (1920, 100)], fill=(26, 86, 219))
    draw.rectangle([(0, 100), (1920, 106)], fill=(14, 165, 233))
    
    # Left logo text
    f_logo = get_font("arialbd.ttf", 36)
    f_sub = get_font("arial.ttf", 18)
    draw.text((70, 32), "SONAR v2.5 AI", font=f_logo, fill=(255, 255, 255))
    draw.text((360, 42), "|  Sistem Observasi Narasi & Analisis Reaksi Kognitif", font=f_sub, fill=(219, 234, 254))
    
    # Right category badge
    f_badge = get_font("arialbd.ttf", 18)
    draw.rounded_rectangle([(1480, 28), (1850, 72)], radius=8, fill=(30, 58, 138), outline=(96, 165, 250), width=2)
    draw.text((1500, 38), "KARTIKA CYBER HACTOWN 2026", font=f_badge, fill=(255, 255, 255))

def draw_footer_bar(draw, current_slide="1/5"):
    draw.rectangle([(0, 1010), (1920, 1080)], fill=(15, 23, 42))
    f_foot = get_font("arial.ttf", 18)
    f_page = get_font("arialbd.ttf", 18)
    draw.text((70, 1034), "Karya Inovasi Teknologi Pertahanan Siber & Kecerdasan Kognitif Nasional", font=f_foot, fill=(148, 163, 184))
    draw.text((1780, 1034), current_slide, font=f_page, fill=(14, 165, 233))


def generate_card_01_intro():
    img = Image.new("RGB", (1920, 1080), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    
    # Header & Footer
    draw_header_bar(draw, "SONAR v2.5 AI", "KARTIKA CYBER HACTOWN 2026")
    draw_footer_bar(draw, "SLIDE 01 / 05")
    
    # Center Hero Card
    draw.rounded_rectangle([(100, 160), (1820, 960)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    # Top Tag
    f_tag = get_font("arialbd.ttf", 20)
    draw.rounded_rectangle([(160, 210), (520, 260)], radius=8, fill=(239, 246, 255), outline=(191, 219, 254), width=1)
    draw.text((180, 222), "DEMO KARYA RESMI (DURASI 10 MENIT)", font=f_tag, fill=(26, 86, 219))
    
    # Main Title
    f_title = get_font("arialbd.ttf", 56)
    draw.text((160, 280), "SONAR v2.5 AI", font=f_title, fill=(15, 23, 42))
    
    f_h2 = get_font("arialbd.ttf", 32)
    draw.text((160, 360), "Sistem Observasi Narasi & Analisis Reaksi Kognitif", font=f_h2, fill=(26, 86, 219))
    
    f_desc = get_font("arial.ttf", 24)
    desc_p1 = "Platform Social Cyber Intelligence & Early Warning System (EWS) Kognitif"
    desc_p2 = "untuk Mendeteksi, Menganalisis, dan Memitigasi Operasi Disinformasi Terkoordinasi & Sindikat Botnet"
    draw.text((160, 420), desc_p1, font=f_desc, fill=(51, 65, 85))
    draw.text((160, 460), desc_p2, font=f_desc, fill=(71, 85, 105))
    
    # 3 Key Feature Pillars (horizontal boxes)
    pillars = [
        ("DETEKSI DINI PROAKTIF", "Pemindaian omnichannel real-time dengan indeks ancaman komposit 0-100 dan notifikasi darurat instan.", (26, 86, 219)),
        ("INSPEKSI DEEP NLP & GRAF", "Model IndoBERT multi-task untuk polaritas leksikal, spektrum emosi, dan radar topologi botnet 360°.", (14, 165, 233)),
        ("MITIGASI TAKTIS & GEOINTEL", "Generator kontra-narasi AI otomatis, peta 38 provinsi otentik WGS84, dan ekspor Laporan SitRep resmi.", (16, 185, 129))
    ]
    
    box_w = 480
    box_gap = 40
    start_x = 160
    box_y = 540
    box_h = 240
    
    f_p_title = get_font("arialbd.ttf", 22)
    f_p_body = get_font("arial.ttf", 18)
    
    for i, (p_title, p_body, p_col) in enumerate(pillars):
        bx = start_x + i * (box_w + box_gap)
        draw.rounded_rectangle([(bx, box_y), (bx + box_w, box_y + box_h)], radius=16, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        # Top color accent
        draw.rounded_rectangle([(bx, box_y), (bx + box_w, box_y + 12)], radius=6, fill=p_col)
        draw.text((bx + 24, box_y + 35), p_title, font=f_p_title, fill=p_col)
        
        # Word wrap body
        words = p_body.split()
        lines = []
        cur = []
        for w in words:
            cur.append(w)
            if len(" ".join(cur)) > 34:
                lines.append(" ".join(cur[:-1]))
                cur = [w]
        if cur:
            lines.append(" ".join(cur))
        
        for l_idx, line in enumerate(lines):
            draw.text((bx + 24, box_y + 85 + l_idx * 28), line, font=f_p_body, fill=(71, 85, 105))
            
    # Presenter signature at bottom
    f_pres = get_font("arialbd.ttf", 20)
    draw.text((160, 830), "Disusun Untuk Dewan Juri Kartika Cyber Hactown 2026", font=f_pres, fill=(15, 23, 42))
    f_subpres = get_font("arial.ttf", 18)
    draw.text((160, 865), "Tim Pengembang Inovasi Pertahanan Siber Nasional | Demonstrasi Video Maksimal 10 Menit", font=f_subpres, fill=(100, 116, 139))
    
    img.save(os.path.join(ASSETS_DIR, "01_Intro_Title_Card.png"))
    print("✓ Created 01_Intro_Title_Card.png")


def generate_card_02_problem():
    img = Image.new("RGB", (1920, 1080), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_header_bar(draw, "SONAR v2.5 AI", "LATAR BELAKANG ANCAMAN")
    draw_footer_bar(draw, "SLIDE 02 / 05")
    
    draw.rounded_rectangle([(100, 160), (1820, 960)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    f_h = get_font("arialbd.ttf", 38)
    draw.text((160, 200), "Tantangan Kritis: Pergeseran Ke Perang Kognitif (Cognitive Warfare)", font=f_h, fill=(15, 23, 42))
    
    f_sub = get_font("arial.ttf", 22)
    draw.text((160, 255), "Disinformasi terkoordinasi modern menargetkan persepsi psikologis masyarakat untuk memicu instabilitas nasional.", font=f_sub, fill=(71, 85, 105))
    
    # 3 Threat Columns
    threats = [
        ("1. Sindikat Botnet Terorganisir", [
            "Pemanfaatan ribuan akun bot otomatis",
            "Mekanisme burst-flooding terkoordinasi",
            "Algorithmic hijacking di X, TikTok & Telegram",
            "Membuat hoaks fiktif tampak didukung mayoritas"
        ], (239, 68, 68)),
        ("2. Polarisasi Emosi & Panic Buying", [
            "Eksploitasi emosi kemarahan dan ketakutan publik",
            "Serangan terarah ke sektor moneter (Rush Money)",
            "Hoaks kelangkaan logistik pangan & energi",
            "Kerugian ekonomi masif dalam hitungan menit"
        ], (245, 158, 11)),
        ("3. Lambatnya Respon Manual", [
            "Metode konvensional membutuhkan 4-12 jam",
            "Klarifikasi baru rilis setelah kepanikan meluas",
            "Sulit mengatribusi siapa aktor intelektual (Seed)",
            "Ketiadaan instrumen Early Warning System terpadu"
        ], (99, 102, 241))
    ]
    
    box_w = 480
    box_gap = 40
    start_x = 160
    box_y = 330
    box_h = 420
    
    f_t_head = get_font("arialbd.ttf", 22)
    f_t_item = get_font("arial.ttf", 18)
    
    for i, (t_title, t_items, t_color) in enumerate(threats):
        bx = start_x + i * (box_w + box_gap)
        draw.rounded_rectangle([(bx, box_y), (bx + box_w, box_y + box_h)], radius=16, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        draw.rounded_rectangle([(bx, box_y), (bx + box_w, box_y + 12)], radius=6, fill=t_color)
        draw.text((bx + 24, box_y + 35), t_title, font=f_t_head, fill=t_color)
        
        for idx, item in enumerate(t_items):
            iy = box_y + 90 + idx * 75
            draw.ellipse([(bx + 24, iy + 6), (bx + 34, iy + 16)], fill=t_color)
            # wrap item text
            words = item.split()
            l1 = " ".join(words[:4])
            l2 = " ".join(words[4:])
            draw.text((bx + 44, iy), l1, font=f_t_item, fill=(30, 41, 59))
            if l2:
                draw.text((bx + 44, iy + 25), l2, font=f_t_item, fill=(71, 85, 105))
                
    # Bottom callout
    draw.rounded_rectangle([(160, 780), (1760, 890)], radius=12, fill=(239, 246, 255), outline=(191, 219, 254), width=2)
    f_call_t = get_font("arialbd.ttf", 22)
    f_call_b = get_font("arial.ttf", 19)
    draw.text((190, 805), "KEBUTUHAN STRATEGIS NASIONAL:", font=f_call_t, fill=(26, 86, 219))
    draw.text((190, 842), "Indonesia memerlukan instrumen intelijen sosial otomatis dengan deteksi berkecepatan milidetik: SONAR v2.5 AI.", font=f_call_b, fill=(15, 23, 42))
    
    img.save(os.path.join(ASSETS_DIR, "02_Latar_Belakang_Ancaman_Kognitif.png"))
    print("✓ Created 02_Latar_Belakang_Ancaman_Kognitif.png")


def generate_card_03_architecture():
    img = Image.new("RGB", (1920, 1080), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_header_bar(draw, "SONAR v2.5 AI", "ARSITEKTUR & CARA KERJA SISTEM")
    draw_footer_bar(draw, "SLIDE 03 / 05")
    
    draw.rounded_rectangle([(100, 160), (1820, 960)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    f_h = get_font("arialbd.ttf", 38)
    draw.text((160, 200), "Arsitektur Sistem 3 Lapis: Dari Ingestion Hingga Tindakan Taktis", font=f_h, fill=(15, 23, 42))
    
    # 3 Layers Stack
    layers = [
        ("LAPISAN 1: MULTI-SOURCE OMNICHANNEL INGESTION",
         "Menyerap aliran data publik real-time dari X (Twitter API v2 stream), TikTok public comments, Telegram OSINT channels, Facebook pages, dan RSS portal berita nasional melalui antrean streaming terenkripsi.",
         (26, 86, 219), [(220, "X / Twitter"), (400, "TikTok"), (560, "Telegram"), (740, "Media Berita"), (940, "Facebook")]),
        
        ("LAPISAN 2: COGNITIVE INTELLIGENCE ENGINE (AI & MACHINE LEARNING)",
         "Pipeline pemrosesan kognitif: (1) IndoBERT Multi-Task NLP untuk polaritas leksikal & emosi; (2) Heuristic Bot Scorer menganalisis entropi sintaksis & burst-rate; (3) Directed Graph Calculator menghitung Betweenness Centrality; (4) EWS Threat Index Calculator (0-100).",
         (14, 165, 233), [(220, "IndoBERT NLP"), (440, "Bot Scorer (>91%)"), (700, "Graph Topologi"), (960, "Kalkulator EWS (0-100)")]),
        
        ("LAPISAN 3: TACTICAL DEFENSE & COMMAND ACTIONS",
         "Visualisasi situasi taktis bagi jajaran komando: Executive Dashboard, Radar Botnet 360°, Peta Geospasial 38 Provinsi, Generator Kontra-Narasi AI Instan, Pusat Notifikasi Terintegrasi, dan Ekspor Laporan Situasi (SitRep) Berstandar Militer.",
         (16, 185, 129), [(220, "Executive Dashboard"), (480, "Radar Scope 360°"), (740, "Peta 38 Provinsi"), (980, "Ekspor SitRep")])
    ]
    
    f_l_title = get_font("arialbd.ttf", 22)
    f_l_desc = get_font("arial.ttf", 18)
    f_tag = get_font("arialbd.ttf", 16)
    
    card_y = 270
    card_h = 190
    card_gap = 35
    
    for idx, (ltitle, ldesc, lcol, tags) in enumerate(layers):
        cy = card_y + idx * (card_h + card_gap)
        draw.rounded_rectangle([(160, cy), (1760, cy + card_h)], radius=16, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        # Left color bar
        draw.rounded_rectangle([(160, cy), (175, cy + card_h)], radius=4, fill=lcol)
        
        draw.text((200, cy + 20), ltitle, font=f_l_title, fill=lcol)
        
        # Wrap desc
        words = ldesc.split()
        l1 = " ".join(words[:20])
        l2 = " ".join(words[20:])
        draw.text((200, cy + 60), l1, font=f_l_desc, fill=(51, 65, 85))
        if l2:
            draw.text((200, cy + 90), l2, font=f_l_desc, fill=(71, 85, 105))
            
        # Tags badges at bottom
        for tx, tname in tags:
            draw.rounded_rectangle([(tx, cy + 135), (tx + len(tname)*11 + 30, cy + 170)], radius=8, fill=(255, 255, 255), outline=lcol, width=1)
            draw.text((tx + 14, cy + 144), tname, font=f_tag, fill=lcol)
            
    img.save(os.path.join(ASSETS_DIR, "03_Arsitektur_Teknologi_AI.png"))
    print("✓ Created 03_Arsitektur_Teknologi_AI.png")


def generate_card_04_benefits():
    img = Image.new("RGB", (1920, 1080), color=(248, 250, 252))
    draw = ImageDraw.Draw(img)
    draw_header_bar(draw, "SONAR v2.5 AI", "MATRIKS MANFAAT STRATEGIS")
    draw_footer_bar(draw, "SLIDE 04 / 05")
    
    draw.rounded_rectangle([(100, 160), (1820, 960)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    f_h = get_font("arialbd.ttf", 38)
    draw.text((160, 200), "Perbandingan Komparatif: Nilai Tambah & Efisiensi Operasional", font=f_h, fill=(15, 23, 42))
    
    # Table header
    draw.rounded_rectangle([(160, 280), (1760, 340)], radius=10, fill=(26, 86, 219))
    f_th = get_font("arialbd.ttf", 20)
    draw.text((200, 298), "PARAMETER OPERASIONAL", font=f_th, fill=(255, 255, 255))
    draw.text((680, 298), "METODE KONVENSIONAL (MANUAL)", font=f_th, fill=(255, 255, 255))
    draw.text((1220, 298), "DENGAN SONAR v2.5 AI", font=f_th, fill=(255, 255, 255))
    
    rows = [
        ("Waktu Deteksi Anomali", "4 hingga 12 jam setelah narasi membakar ruang publik", "Kurang dari 3 menit pada fase pembibitan (seed phase)"),
        ("Identifikasi Sindikat Bot", "Pemeriksaan profil satu-persatu, akurasi sangat rendah", "Heuristic Bot Scorer otomatis dengan akurasi >91%"),
        ("Analisis Sentimen & Emosi", "Hanya klasifikasi positif/negatif umum tanpa nuansa", "Deep IndoBERT: polaritas leksikal + 4 spektrum emosi"),
        ("Pemetaan Relasi Jaringan", "Data terpisah-pisah, aktor intelektual tidak terpetakan", "Radar Cognitive Scope 360° memetakan Seed, Amplifier, Bridge"),
        ("Formulasi Kontra-Narasi", "Rapat birokrasi panjang, rilis pers terlambat 1-2 hari", "Generator Kontra-Narasi AI instan siap rilis dalam 15 detik"),
        ("Laporan Situasi (SitRep)", "Pengetikan manual dokumen intelijen memakan waktu berjam-jam", "Ekspor 1-Klik SitRep terstandarisasi Mabes TNI/BSSN")
    ]
    
    f_td_param = get_font("arialbd.ttf", 18)
    f_td_old = get_font("arial.ttf", 17)
    f_td_new = get_font("arialbd.ttf", 17)
    
    row_y = 355
    row_h = 70
    
    for i, (param, old_val, new_val) in enumerate(rows):
        ry = row_y + i * row_h
        bg_col = (248, 250, 252) if i % 2 == 0 else (255, 255, 255)
        draw.rounded_rectangle([(160, ry), (1760, ry + row_h - 10)], radius=8, fill=bg_col, outline=(226, 232, 240), width=1)
        
        draw.text((200, ry + 16), param, font=f_td_param, fill=(15, 23, 42))
        draw.text((680, ry + 16), old_val, font=f_td_old, fill=(220, 38, 38))
        draw.text((1220, ry + 16), new_val, font=f_td_new, fill=(16, 185, 129))
        
    # Impact Banner at bottom
    draw.rounded_rectangle([(160, 790), (1760, 900)], radius=12, fill=(236, 253, 245), outline=(167, 243, 208), width=2)
    f_imp_t = get_font("arialbd.ttf", 22)
    f_imp_b = get_font("arial.ttf", 19)
    draw.text((190, 815), "DAMPAK STRATEGIS BAGI KEDAULATAN NEGARA:", font=f_imp_t, fill=(16, 185, 129))
    draw.text((190, 852), "Mencegah kepanikan massal ekonomi (Rush Money), menangkal disintegrasi bangsa, dan menjaga supremasi ruang informasi NKRI.", font=f_imp_b, fill=(6, 78, 59))
    
    img.save(os.path.join(ASSETS_DIR, "04_Tabel_Manfaat_Komparatif.png"))
    print("✓ Created 04_Tabel_Manfaat_Komparatif.png")


def generate_card_05_outro():
    img = Image.new("RGB", (1920, 1080), color=(15, 23, 42)) # Dark navy outro
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw.rectangle([(0, 0), (1920, 1080)], fill=(15, 23, 42))
    draw.rectangle([(0, 0), (1920, 8)], fill=(14, 165, 233))
    draw.rectangle([(0, 1072), (1920, 1080)], fill=(26, 86, 219))
    
    # Center Card
    draw.rounded_rectangle([(200, 140), (1720, 940)], radius=24, fill=(30, 41, 59), outline=(51, 65, 85), width=2)
    
    # Emblem circle
    draw.ellipse([(860, 200), (1060, 400)], fill=(26, 86, 219), outline=(56, 189, 248), width=4)
    f_emb = get_font("arialbd.ttf", 52)
    draw.text((915, 270), "AI", font=f_emb, fill=(255, 255, 255))
    
    # Title
    f_t = get_font("arialbd.ttf", 48)
    draw.text((580, 430), "SONAR v2.5 AI", font=f_t, fill=(255, 255, 255))
    
    f_slogan = get_font("arialbd.ttf", 26)
    draw.text((450, 500), "\"Cakra Pertahanan Siber Berpadu Kecerdasan Kognitif Nusantara\"", font=f_slogan, fill=(56, 189, 248))
    
    f_desc = get_font("arial.ttf", 22)
    draw.text((520, 560), "Perisai Kedaulatan Kognitif Menuju Indonesia Emas 2045", font=f_desc, fill=(203, 213, 225))
    
    # Thank you box
    draw.rounded_rectangle([(400, 630), (1520, 750)], radius=16, fill=(15, 23, 42), outline=(56, 189, 248), width=2)
    f_ty = get_font("arialbd.ttf", 28)
    f_subty = get_font("arial.ttf", 20)
    draw.text((540, 655), "TERIMA KASIH KEPADA DEWAN JURI", font=f_ty, fill=(255, 255, 255))
    draw.text((610, 700), "KARTIKA CYBER HACTOWN 2026", font=f_subty, fill=(148, 163, 184))
    
    # Footer meta
    f_meta = get_font("arial.ttf", 18)
    draw.text((560, 800), "Sistem Siap Diintegrasikan Dengan SOC BSSN, TNI AD, dan Satgas Siber Nasional", font=f_meta, fill=(148, 163, 184))
    f_sal = get_font("arialbd.ttf", 22)
    draw.text((790, 850), "SALAM BELA NEGARA!", font=f_sal, fill=(34, 197, 94))
    
    img.save(os.path.join(ASSETS_DIR, "05_Outro_Closing_Card.png"))
    print("✓ Created 05_Outro_Closing_Card.png")


# -------------------------------------------------------------
# 2. GENERATE POWERPOINT PRESENTATION (05_SLIDE_PRESENTASI_VIDEO_DEMO.pptx)
# -------------------------------------------------------------

def generate_demo_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    
    slides_data = [
        ("01_Intro_Title_Card.png", "Title Card - SONAR v2.5 AI"),
        ("02_Latar_Belakang_Ancaman_Kognitif.png", "Latar Belakang - Ancaman Perang Kognitif"),
        ("03_Arsitektur_Teknologi_AI.png", "Arsitektur Sistem & Cara Kerja 3 Lapis"),
        ("04_Tabel_Manfaat_Komparatif.png", "Matriks Manfaat Strategis & Komparasi"),
        ("05_Outro_Closing_Card.png", "Closing Card - Salam Bela Negara")
    ]
    
    for img_name, title in slides_data:
        slide = prs.slides.add_slide(blank_layout)
        img_path = os.path.join(ASSETS_DIR, img_name)
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(0), Inches(0), width=Inches(13.333), height=Inches(7.5))
            
    ppt_out = os.path.join(OUTPUT_DIR, "05_SLIDE_PRESENTASI_VIDEO_DEMO.pptx")
    prs.save(ppt_out)
    print("✓ Created 05_SLIDE_PRESENTASI_VIDEO_DEMO.pptx")


if __name__ == "__main__":
    generate_card_01_intro()
    generate_card_02_problem()
    generate_card_03_architecture()
    generate_card_04_benefits()
    generate_card_05_outro()
    generate_demo_presentation()
    print("\nAll demo materials successfully generated!")

