import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_sonar_presentation():
    prs = Presentation()
    # 16:9 widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Professional Color Palette
    PRIMARY_BLUE = RGBColor(26, 86, 219)     # #1a56db (Royal Blue)
    DARK_BLUE = RGBColor(30, 58, 138)        # #1e3a8a
    TEXT_MAIN = RGBColor(15, 23, 42)         # #0f172a (Dark Slate)
    TEXT_MUTED = RGBColor(100, 116, 139)     # #64748b (Slate 500)
    BG_LIGHT = RGBColor(248, 250, 252)       # #f8fafc (Slate 50)
    CARD_BG = RGBColor(255, 255, 255)        # Pure White
    CARD_BORDER = RGBColor(226, 232, 240)    # #e2e8f0 (Slate 200)
    ACCENT_RED = RGBColor(224, 36, 36)       # #e02424 (Critical Red)
    ACCENT_GREEN = RGBColor(16, 185, 129)    # #10b981 (Emerald)
    ACCENT_AMBER = RGBColor(245, 158, 11)    # #f59e0b (Amber)
    ACCENT_BLUE_LIGHT = RGBColor(239, 246, 255) # #eff6ff

    def add_slide_header(slide, title_text, category_text="SONAR v2.5 AI • DOKUMEN PENJELASAN KARYA"):
        # Header banner shape
        header_rect = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(1.1))
        header_rect.fill.solid()
        header_rect.fill.fore_color.rgb = PRIMARY_BLUE
        header_rect.line.fill.background()

        # Category text
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.12), Inches(11.5), Inches(0.3))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = RGBColor(191, 219, 254)

        # Title text
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.5), Inches(0.6))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = RGBColor(255, 255, 255)

        # Bottom subtle footer
        footer_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(7.15), Inches(13.333), Inches(0.35))
        footer_line.fill.solid()
        footer_line.fill.fore_color.rgb = CARD_BG
        footer_line.line.color.rgb = CARD_BORDER

        foot_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.18), Inches(11.733), Inches(0.3))
        tf_foot = foot_box.text_frame
        p_foot = tf_foot.paragraphs[0]
        p_foot.text = "SONAR — Sistem Observasi Narasi & Analisis Reaksi • Purwarupa Dasbor Intelijen Ruang Siber Sosial"
        p_foot.font.size = Pt(9.5)
        p_foot.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 1: TITLE SLIDE
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = PRIMARY_BLUE
    bg1.line.fill.background()

    # White inner card
    card1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.0), Inches(11.333), Inches(5.5))
    card1.fill.solid()
    card1.fill.fore_color.rgb = CARD_BG
    card1.line.fill.background()

    # Content Box
    t1_box = s1.shapes.add_textbox(Inches(1.5), Inches(1.5), Inches(10.333), Inches(4.5))
    tf1 = t1_box.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "SISTEM OBSERVASI NARASI & ANALISIS REAKSI"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    p2 = tf1.add_paragraph()
    p2.text = "SONAR v2.5 AI"
    p2.font.size = Pt(46)
    p2.font.bold = True
    p2.font.color.rgb = TEXT_MAIN

    p3 = tf1.add_paragraph()
    p3.text = "Purwarupa Dasbor Intelijen Ruang Siber Sosial (Cognitive Domain) Bertenaga AI Agent & Sistem Peringatan Dini (Early Warning System)"
    p3.font.size = Pt(16)
    p3.font.color.rgb = TEXT_MUTED

    p4 = tf1.add_paragraph()
    p4.text = "\nTameng Pertahanan Digital Kognitif untuk Mitigasi Cepat Disinformasi, Propaganda, dan Operasi Botnet Terkoordinasi"
    p4.font.size = Pt(13)
    p4.font.bold = True
    p4.font.color.rgb = DARK_BLUE

    p5 = tf1.add_paragraph()
    p5.text = "\n• Kategori: Keamanan Siber & Rekayasa Perangkat Lunak AI   • Arsitektur: Enterprise Full-Stack Responsive SaaS"
    p5.font.size = Pt(11)
    p5.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 2: LATAR BELAKANG & URGENSI
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    add_slide_header(s2, "1. Latar Belakang & Urgensi Masalah")

    # 3 Column Cards
    col_width = Inches(3.65)
    gap = Inches(0.4)
    start_left = Inches(0.8)
    top_pos = Inches(1.6)
    card_h = Inches(5.1)

    cards_data_2 = [
        ("Evolusi Serangan Kognitif", ACCENT_RED, [
            "Ancaman siber modern telah bergeser dari peretasan jaringan fisik (cyber network attack) menuju manipulasi persepsi publik (Cognitive Warfare).",
            "Menargetkan emosi, cara pandang, dan keyakinan masyarakat melalui kanal percakapan sosial daring.",
            "Dampaknya nyata: instabilitas moneter, kepanikan sosial, hingga pelemahan legitimasi institusi publik."
        ]),
        ("Modus Operandi Terkoordinasi", ACCENT_AMBER, [
            "Penyebaran hoaks dan rumor tidak terjadi secara acak, melainkan menggunakan sindikat bot terkoordinasi (Inauthentic Coordinated Behavior).",
            "Praktik Astroturfing: Memanipulasi algoritma tren media sosial melalui templat pesan berulang dan penumpukan tagar.",
            "Penyusupan lintas platform dari grup tertutup (WhatsApp/Telegram) ke ruang publik terbuka."
        ]),
        ("Kelemahan Analisis Manual", PRIMARY_BLUE, [
            "Volume data percakapan harian mencapai jutaan unggahan, mustahil dipilah dan diverifikasi manual oleh manusia secara tepat waktu.",
            "Keterlambatan verifikasi menyebabkan disinformasi viral tak terkendali sebelum tim komunikasi sempat merespons.",
            "Dibutuhkan otomasi cerdas yang mengubah aliran teks masif menjadi metrik taktis dan draf respon instan."
        ])
    ]

    for i, (title, color, bullets) in enumerate(cards_data_2):
        left_pos = start_left + i * (col_width + gap)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, col_width, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER

        # Stripe top
        stripe = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, col_width, Inches(0.12))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = color
        stripe.line.fill.background()

        tb = s2.shapes.add_textbox(left_pos + Inches(0.2), top_pos + Inches(0.25), col_width - Inches(0.4), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = TEXT_MAIN

        for b in bullets:
            p_b = tf.add_paragraph()
            p_b.text = "• " + b
            p_b.font.size = Pt(12)
            p_b.font.color.rgb = TEXT_MUTED
            p_b.space_before = Pt(8)

    # ==========================================
    # SLIDE 3: DEFINISI & NILAI KARYA (SOLUTION)
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    add_slide_header(s3, "2. Definisi & Nilai Solutif SONAR")

    # Big Solution Card Left
    c3_left = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(7.5), Inches(5.1))
    c3_left.fill.solid()
    c3_left.fill.fore_color.rgb = CARD_BG
    c3_left.line.color.rgb = CARD_BORDER

    tb3_l = s3.shapes.add_textbox(Inches(1.1), Inches(1.9), Inches(6.9), Inches(4.5))
    tf3_l = tb3_l.text_frame
    tf3_l.word_wrap = True

    p = tf3_l.paragraphs[0]
    p.text = "Apa itu SONAR?"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    p_desc = tf3_l.add_paragraph()
    p_desc.text = "SONAR (Sistem Observasi Narasi & Analisis Reaksi) adalah purwarupa dasbor intelijen ruang siber sosial bertenaga AI Agent yang dirancang untuk memantau, mengklasifikasi, dan memitigasi manipulasi teks narasi publik secara real-time."
    p_desc.font.size = Pt(13)
    p_desc.font.color.rgb = TEXT_MAIN
    p_desc.space_before = Pt(6)

    p_key = tf3_l.add_paragraph()
    p_key.text = "\nNilai Utama & Keunggulan bagi Tim Satgas:"
    p_key.font.size = Pt(14)
    p_key.font.bold = True
    p_key.font.color.rgb = DARK_BLUE

    bullets_3 = [
        "Sistem Peringatan Dini (EWS): Mendeteksi lonjakan anomali kognitif dalam hitungan detik sebelum hoaks meluas.",
        "Metrik Terbaca Jelas: Mengotomatiskan teks masif menjadi klasifikasi sentimen, probabilitas bot %, dan indeks ancaman (0-100).",
        "Rekomendasi Aksi Mandiri: Agen AI secara otonom merumuskan draf rilis tanggapan kontra-narasi bagi divisi humas dan pengambil kebijakan.",
        "High-Contrast Enterprise UI: Visual bersih, bebas distraksi, dan sepenuhnya responsif di Desktop, Tablet, dan Ponsel pintar."
    ]
    for b in bullets_3:
        p_b = tf3_l.add_paragraph()
        p_b.text = "✓  " + b
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(6)

    # 2 Metrics Box Right
    c3_r1 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.6), Inches(1.6), Inches(3.9), Inches(2.35))
    c3_r1.fill.solid()
    c3_r1.fill.fore_color.rgb = ACCENT_BLUE_LIGHT
    c3_r1.line.color.rgb = PRIMARY_BLUE

    tb3_r1 = s3.shapes.add_textbox(Inches(8.8), Inches(1.8), Inches(3.5), Inches(2.0))
    tf3_r1 = tb3_r1.text_frame
    tf3_r1.word_wrap = True
    p = tf3_r1.paragraphs[0]
    p.text = "EFISIENSI WAKTU ANALISIS"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE
    p_sub = tf3_r1.add_paragraph()
    p_sub.text = "> 95% Lebih Cepat"
    p_sub.font.size = Pt(26)
    p_sub.font.bold = True
    p_sub.font.color.rgb = TEXT_MAIN
    p_desc = tf3_r1.add_paragraph()
    p_desc.text = "Memangkas proses pemilahan data dari 4-6 jam kerja manual menjadi kurang dari 3 detik."
    p_desc.font.size = Pt(11.5)
    p_desc.font.color.rgb = TEXT_MUTED

    c3_r2 = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.6), Inches(4.35), Inches(3.9), Inches(2.35))
    c3_r2.fill.solid()
    c3_r2.fill.fore_color.rgb = CARD_BG
    c3_r2.line.color.rgb = CARD_BORDER

    tb3_r2 = s3.shapes.add_textbox(Inches(8.8), Inches(4.55), Inches(3.5), Inches(2.0))
    tf3_r2 = tb3_r2.text_frame
    tf3_r2.word_wrap = True
    p = tf3_r2.paragraphs[0]
    p.text = "AKURASI KLASIFIKASI NLP"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN
    p_sub = tf3_r2.add_paragraph()
    p_sub.text = "92.4% Akurasi Deteksi"
    p_sub.font.size = Pt(26)
    p_sub.font.bold = True
    p_sub.font.color.rgb = TEXT_MAIN
    p_desc = tf3_r2.add_paragraph()
    p_desc.text = "Kombinasi leksikon kontekstual bahasa Indonesia dan pemodelan statistik anomali sintaksis."
    p_desc.font.size = Pt(11.5)
    p_desc.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 4: ARSITEKTUR SISTEM & PIPELINE
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    add_slide_header(s4, "3. Arsitektur Sistem & Pipeline Pengolahan Data")

    arch_layers = [
        ("1. Data Ingestion Layer", "Multi-Platform Social Feeds", [
            "Pengumpulan data percakapan real-time dari berbagai kanal: X (Twitter), TikTok, Telegram, Facebook, dan Media Daring.",
            "Normalisasi token teks, pembersihan metadata, dan penandaan stempel waktu presisi."
        ]),
        ("2. Cognitive NLP Engine", "Pemrosesan Bahasa Alami", [
            "Analisis Polaritas Sentimen: Positif, Netral, Negatif, hingga Provokatif Ekstrem.",
            "Ekstraksi Spektrum Emosi: Mengukur tingkat Kemarahan (Anger), Ketakutan (Fear), Harapan (Joy), dan Keterkejutan (Surprise).",
            "Pengenalan Taktik Propaganda: Astroturfing, Fear-Mongering, Name-Calling, dan Delegitimasi Institusi."
        ]),
        ("3. Bot Anomaly Classifier", "Deteksi Akun Inotentik", [
            "Algoritma pembobotan: Rasio kapital (CAPS lock), hashtag stuffing, syntactic punctuation flooding, dan skrip ajakan sebar massal.",
            "Penetapan skor probabilitas bot (0 - 100%) dan klasifikasi akun: Organik vs Sindikat Botnet."
        ]),
        ("4. AI Tactical Agent Layer", "Otomasi Keputusan & Mitigasi", [
            "Evaluasi indeks ancaman kognitif ke dalam skala 5 tingkat EWS (Normal hingga Darurat).",
            "Perumusan SitRep otomatis dan penyusunan draf kontra-narasi berbasis multi-tone (Tegas, Edukatif, Menenangkan)."
        ])
    ]

    row_h = Inches(1.15)
    start_top_4 = Inches(1.6)
    for idx, (title_l, sub_l, bullets_l) in enumerate(arch_layers):
        curr_top = start_top_4 + idx * (row_h + Inches(0.15))
        box_shape = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), curr_top, Inches(11.733), row_h)
        box_shape.fill.solid()
        box_shape.fill.fore_color.rgb = CARD_BG
        box_shape.line.color.rgb = CARD_BORDER

        # Indicator tag
        tag_shape = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), curr_top + Inches(0.2), Inches(2.8), Inches(0.75))
        tag_shape.fill.solid()
        tag_shape.fill.fore_color.rgb = PRIMARY_BLUE if idx != 2 else ACCENT_RED
        tag_shape.line.fill.background()

        tb_tag = s4.shapes.add_textbox(Inches(1.0), curr_top + Inches(0.2), Inches(2.8), Inches(0.75))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p = tf_tag.paragraphs[0]
        p.text = title_l
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = RGBColor(255, 255, 255)
        p2 = tf_tag.add_paragraph()
        p2.text = sub_l
        p2.font.size = Pt(10)
        p2.font.color.rgb = RGBColor(219, 234, 254)

        # Bullets
        tb_detail = s4.shapes.add_textbox(Inches(4.0), curr_top + Inches(0.12), Inches(8.3), Inches(0.95))
        tf_detail = tb_detail.text_frame
        tf_detail.word_wrap = True
        for b_idx, b_text in enumerate(bullets_l):
            p_d = tf_detail.paragraphs[0] if b_idx == 0 else tf_detail.add_paragraph()
            p_d.text = "• " + b_text
            p_d.font.size = Pt(11)
            p_d.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 5: MATRIKS EARLY WARNING SYSTEM (EWS)
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    add_slide_header(s5, "4. Matriks Peringatan Dini 5 Tingkat (Early Warning System)")

    ews_levels = [
        ("LEVEL 1: NORMAL", "Indeks: 0 - 25", ACCENT_GREEN, "Kondisi ruang siber sosial aman dan kondusif. Percakapan didominasi oleh akun organik masyarakat tanpa indikasi koordinasi astroturfing."),
        ("LEVEL 2: MONITORING", "Indeks: 26 - 45", RGBColor(6, 182, 212), "Fluktuasi sentimen minor. Terjadi peningkatan volume percakapan wajar terkait kebijakan atau peristiwa tertentu."),
        ("LEVEL 3: WASPADA", "Indeks: 46 - 65", ACCENT_AMBER, "Terdeteksi anomali kecepatan (velocity spike) dan kemunculan klaster akun berumur muda yang menaikkan tagar berulang."),
        ("LEVEL 4: SIAGA", "Indeks: 66 - 80", RGBColor(249, 115, 22), "Operasi buzzer dan sindikat botnet terkoordinasi aktif. Sentimen negatif/provokatif melonjak tajam disertai narasi manipulatif."),
        ("LEVEL 5: KRITIS / DARURAT", "Indeks: 81 - 100", ACCENT_RED, "SERANGAN KOGNITIF MASIF AKTIF. Tingkat akun bot > 60%, penyebaran hoaks berbahaya berpotensi memicu kepanikan nyata (e.g. rush money).")
    ]

    card_h_5 = Inches(0.95)
    for idx, (lvl_name, score_range, color, desc) in enumerate(ews_levels):
        y_pos = Inches(1.55) + idx * (card_h_5 + Inches(0.15))
        c_shape = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y_pos, Inches(11.733), card_h_5)
        c_shape.fill.solid()
        c_shape.fill.fore_color.rgb = CARD_BG
        c_shape.line.color.rgb = CARD_BORDER

        # Left color bar
        bar = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y_pos, Inches(0.25), card_h_5)
        bar.fill.solid()
        bar.fill.fore_color.rgb = color
        bar.line.fill.background()

        # Text
        tb = s5.shapes.add_textbox(Inches(1.2), y_pos + Inches(0.12), Inches(3.2), Inches(0.7))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = lvl_name
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = color
        p2 = tf.add_paragraph()
        p2.text = score_range
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_MUTED

        tb_desc = s5.shapes.add_textbox(Inches(4.5), y_pos + Inches(0.15), Inches(7.8), Inches(0.7))
        tf_desc = tb_desc.text_frame
        tf_desc.word_wrap = True
        p_desc = tf_desc.paragraphs[0]
        p_desc.text = desc
        p_desc.font.size = Pt(11.5)
        p_desc.font.color.rgb = TEXT_MAIN

    # ==========================================
    # SLIDE 6: FITUR: DASBOR UTAMA & TELEMETRI REAL-TIME
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    add_slide_header(s6, "5. Fitur: Dasbor Utama & Telemetri Real-Time")

    # 4 Metric Cards top
    m_w = Inches(2.75)
    m_gap = Inches(0.24)
    metrics_top = [
        ("TOTAL VOLUME NARASI", "61.3k", "+18.4% Laju Aliran", PRIMARY_BLUE),
        ("KERAPATAN AKUN BOT", "68.5%", "+32.1% Anomali", ACCENT_RED),
        ("SENTIMEN PROVOKATIF", "68%", "+45.0% Polarisasi", ACCENT_AMBER),
        ("KLASTER ANCAMAN", "2 Sindikat", "Topologi Terpetakan", RGBColor(168, 85, 247))
    ]

    for i, (m_title, m_val, m_sub, m_col) in enumerate(metrics_top):
        x = Inches(0.8) + i * (m_w + m_gap)
        c_m = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.5), m_w, Inches(1.4))
        c_m.fill.solid()
        c_m.fill.fore_color.rgb = CARD_BG
        c_m.line.color.rgb = CARD_BORDER

        tb = s6.shapes.add_textbox(x + Inches(0.15), Inches(1.6), m_w - Inches(0.3), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = m_title
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED

        p_v = tf.add_paragraph()
        p_v.text = m_val
        p_v.font.size = Pt(22)
        p_v.font.bold = True
        p_v.font.color.rgb = m_col

        p_s = tf.add_paragraph()
        p_s.text = m_sub
        p_s.font.size = Pt(9.5)
        p_s.font.color.rgb = TEXT_MUTED

    # Bottom 2 Feature blocks
    c_g1 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.1), Inches(7.0), Inches(3.7))
    c_g1.fill.solid()
    c_g1.fill.fore_color.rgb = CARD_BG
    c_g1.line.color.rgb = CARD_BORDER

    tb_g1 = s6.shapes.add_textbox(Inches(1.0), Inches(3.3), Inches(6.6), Inches(3.3))
    tf_g1 = tb_g1.text_frame
    tf_g1.word_wrap = True
    p = tf_g1.paragraphs[0]
    p.text = "Grafik Velositas Narasi & Amplifikasi Bot"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_MAIN

    bullets_g1 = [
        "Visualisasi kurva per jam memisahkan volume percakapan wajar (organik masyarakat) dari lonjakan tajam botnet.",
        "Deteksi Lonjakan Spontan: Memicu notifikasi saat kecepatan unggahan akun bot melonjak > 200% dalam waktu kurang dari 60 menit.",
        "Pemberian indikator titik kritis (Spike Hours) untuk mengidentifikasi jam operasional penggerak buzzer."
    ]
    for b in bullets_g1:
        p_b = tf_g1.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(6)

    c_g2 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.04), Inches(3.1), Inches(4.49), Inches(3.7))
    c_g2.fill.solid()
    c_g2.fill.fore_color.rgb = CARD_BG
    c_g2.line.color.rgb = CARD_BORDER

    tb_g2 = s6.shapes.add_textbox(Inches(8.24), Inches(3.3), Inches(4.09), Inches(3.3))
    tf_g2 = tb_g2.text_frame
    tf_g2.word_wrap = True
    p = tf_g2.paragraphs[0]
    p.text = "Distribusi Polaritas Sentimen"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEXT_MAIN

    bullets_g2 = [
        "Donut Chart Interaktif dengan 3 spektrum utama:",
        "  - Merah (Provokatif / Ekstrem): Ujaran kebencian, hasutan, provokasi anarkis.",
        "  - Orange (Kritis / Negatif): Keluhan warga, pertanyaan kritis publik.",
        "  - Hijau (Aman / Positif): Apresiasi, klarifikasi resmi, narasi penyejuk.",
        "Memberikan gambaran rasio polarisasi kognitif secara langsung kepada pimpinan."
    ]
    for b in bullets_g2:
        p_b = tf_g2.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(11.5)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(4)

    # ==========================================
    # SLIDE 7: FITUR: INSPEKTOR NLP & DETEKSI PROPAGANDA
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    add_slide_header(s7, "6. Fitur: Inspektor Narasi Tunggal & Deteksi Propaganda")

    card_7_left = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.1))
    card_7_left.fill.solid()
    card_7_left.fill.fore_color.rgb = CARD_BG
    card_7_left.line.color.rgb = CARD_BORDER

    tb_7l = s7.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(4.7))
    tf_7l = tb_7l.text_frame
    tf_7l.word_wrap = True
    p = tf_7l.paragraphs[0]
    p.text = "Inspektor Narasi Tunggal (Deep Scanner)"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    bullets_7l = [
        "Analisis Teks Instan: Pengguna dapat menempelkan teks unggahan, cuitan, atau siaran broadcast WhatsApp untuk dipindai secara komprehensif.",
        "Spektrum Emosi Kognitif: Mengukur persentase Kemarahan (Anger), Ketakutan (Fear), Kegembiraan (Joy), dan Keterkejutan (Surprise).",
        "Probabilitas Bot & Faktor Pembobot:",
        "  • Rasio huruf kapital berlebih (CAPS LOCK).",
        "  • Penumpukan tagar (Hashtag Stuffing / Algorithmic Hijack).",
        "  • Tanda baca beruntun berulang (Syntactic Flooding).",
        "  • Pola skrip ajakan sebar massal ('Viralkan sebelum dihapus', 'Wajib share ke semua grup')."
    ]
    for b in bullets_7l:
        p_b = tf_7l.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(11.5)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(5)

    card_7_right = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.733), Inches(5.1))
    card_7_right.fill.solid()
    card_7_right.fill.fore_color.rgb = CARD_BG
    card_7_right.line.color.rgb = CARD_BORDER

    tb_7r = s7.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.333), Inches(4.7))
    tf_7r = tb_7r.text_frame
    tf_7r.word_wrap = True
    p = tf_7r.paragraphs[0]
    p.text = "Pengenalan Taktik Manipulasi Informasi"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = ACCENT_RED

    tactics = [
        ("Astroturfing & Koordinasi Akun:", "Menciptakan kesan seolah-olah terjadi gerakan publik organik melalui templat teks berulang serentak."),
        ("Fear-Mongering & Urgensi Palsu:", "Memicu histeria dan kepanikan instan agar audiens tidak memverifikasi fakta data secara rasional."),
        ("Name-Calling & Demonization:", "Menyerang identitas dan mendelegitimasi figur/institusi tanpa bukti audit objektif."),
        ("Bandwagon Effect:", "Menyebarkan narasi bahwa 'semua orang sudah panik' untuk menciptakan efek domino penarikan dana atau pemboikotan.")
    ]
    for t_name, t_desc in tactics:
        p_t = tf_7r.add_paragraph()
        p_t.text = "▶  " + t_name
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_MAIN
        p_t.space_before = Pt(6)

        p_d = tf_7r.add_paragraph()
        p_d.text = "   " + t_desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 8: FITUR: RADAR TOPOLOGI BOTNET
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    add_slide_header(s8, "7. Fitur: Radar Jaringan & Topologi Botnet (Graph Topology)")

    nodes_info = [
        ("(!) Seed Disinfo", ACCENT_RED, "Akun Pusat Pembuat Narasi Awal", "Akun inisiator yang pertama kali menyusun materi distorsi fakta atau rekaman potongan sebelum disebarkan."),
        ("(B) Botnet Amplifier", RGBColor(244, 63, 94), "Pengganda Otomatis", "Jaringan akun bot berkecepatan tinggi yang memprogramkan repost/retweet otomatis dalam hitungan detik untuk mendorong tagar."),
        ("(R) Bridge Relay", ACCENT_AMBER, "Jembatan Antar-Kanal", "Node jembatan yang menyalurkan tangkapan layar dari grup obrolan tertutup (WhatsApp/Telegram) ke linimasa publik terbuka."),
        ("(O) Akun Organik", ACCENT_GREEN, "Masyarakat & Pemeriksa Fakta", "Akun wajar milik masyarakat umum yang terimbas pusaran percakapan, serta kanal kredibel cek fakta pemeriksa kebenaran data.")
    ]

    card_h_8 = Inches(2.35)
    row_1_y = Inches(1.6)
    row_2_y = Inches(4.25)
    c_w_8 = Inches(5.7)

    for i, (n_name, n_color, n_role, n_desc) in enumerate(nodes_info):
        x_pos = Inches(0.8) if (i % 2 == 0) else Inches(6.833)
        y_pos = row_1_y if i < 2 else row_2_y

        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, y_pos, c_w_8, card_h_8)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER

        # Left bar
        l_bar = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, y_pos, Inches(0.2), card_h_8)
        l_bar.fill.solid()
        l_bar.fill.fore_color.rgb = n_color
        l_bar.line.fill.background()

        tb = s8.shapes.add_textbox(x_pos + Inches(0.35), y_pos + Inches(0.2), c_w_8 - Inches(0.5), card_h_8 - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = n_name + " — " + n_role
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = n_color

        p_desc = tf.add_paragraph()
        p_desc.text = n_desc
        p_desc.font.size = Pt(11.5)
        p_desc.font.color.rgb = TEXT_MUTED
        p_desc.space_before = Pt(6)

    # ==========================================
    # SLIDE 9: FITUR: PETA SEBARAN WILAYAH (NUSANTARA)
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    add_slide_header(s9, "8. Fitur: Peta Sebaran Kognitif & Hotspot Wilayah Nusantara")

    c9_left = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(7.5), Inches(5.1))
    c9_left.fill.solid()
    c9_left.fill.fore_color.rgb = CARD_BG
    c9_left.line.color.rgb = CARD_BORDER

    tb_9l = s9.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(7.1), Inches(4.7))
    tf_9l = tb_9l.text_frame
    tf_9l.word_wrap = True

    p = tf_9l.paragraphs[0]
    p.text = "Visualisasi Geospasial Vektor Terkalibrasi"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    bullets_9l = [
        "Geometri Vektor Otentik: Peta kepulauan Indonesia direkonstruksi presisi (Sumatera, Jawa, Bali & Nusa Tenggara, Kalimantan, Sulawesi, Maluku, dan Papua).",
        "Titik GPS Terkunci Sempurna: Koordinat titik hotspot terintegrasi langsung di dalam sistem koordinat vektor (viewBox 1000x480), mengeliminasi risiko pergeseran titik saat responsif di berbagai perangkat.",
        "Suar Berkedip Dinamis (Pulsing Beacons): Warna titik mencerminkan tingkat ancaman wilayah:",
        "  • Merah (> 70): Hotspot Kritis (e.g. DKI Jakarta, Jawa Timur, Jawa Barat).",
        "  • Orange (45 - 70): Waspada Pemantauan (e.g. Sumatera Utara, Sulawesi Selatan, Papua).",
        "  • Hijau (< 45): Wilayah Kondusif (e.g. Jawa Tengah, Bali, Kalimantan/IKN)."
    ]
    for b in bullets_9l:
        p_b = tf_9l.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(6)

    c9_r = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.6), Inches(1.6), Inches(3.933), Inches(5.1))
    c9_r.fill.solid()
    c9_r.fill.fore_color.rgb = ACCENT_BLUE_LIGHT
    c9_r.line.color.rgb = PRIMARY_BLUE

    tb_9r = s9.shapes.add_textbox(Inches(8.8), Inches(1.8), Inches(3.533), Inches(4.7))
    tf_9r = tb_9r.text_frame
    tf_9r.word_wrap = True

    p = tf_9r.paragraphs[0]
    p.text = "Telemetri Provinsi Terpilih"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = DARK_BLUE

    items_9r = [
        ("Volume Narasi Lokal:", "Memantau jumlah percakapan spesifik per provinsi."),
        ("Kerapatan Botnet Regional:", "Mengukur konsentrasi akun buzzer pada klaster kedaerahan."),
        ("Sentimen Dominan:", "Deteksi reaksi mayoritas masyarakat setempat."),
        ("Tagar Menonjol Lokal:", "Pemetaan isu kedaerahan yang sedang dimanfaatkan pihak provokator.")
    ]
    for lbl, desc in items_9r:
        p_i = tf_9r.add_paragraph()
        p_i.text = "▶  " + lbl
        p_i.font.size = Pt(12)
        p_i.font.bold = True
        p_i.font.color.rgb = TEXT_MAIN
        p_i.space_before = Pt(8)
        p_d = tf_9r.add_paragraph()
        p_d.text = "   " + desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 10: AGEN INTELIJEN SATGAS & EKSPOR SITREP
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    add_slide_header(s10, "9. Agen Intelijen Satgas & Ekspor Laporan SitRep")

    c10_l = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.1))
    c10_l.fill.solid()
    c10_l.fill.fore_color.rgb = CARD_BG
    c10_l.line.color.rgb = CARD_BORDER

    tb_10l = s10.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(4.7))
    tf_10l = tb_10l.text_frame
    tf_10l.word_wrap = True
    p = tf_10l.paragraphs[0]
    p.text = "AI Cognitive Shield Agent"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    bullets_10l = [
        "Executive SitRep Generator: Menyusun laporan situasi narasi secara otomatis untuk dikaji oleh komandan satgas dan jajaran pimpinan.",
        "Direktif Tindakan Taktis: Panduan aksi respons cepat (e.g. penerbitan flash clearance OJK/BI, pelabelan konten pada platform digital, dan peluncuran konten penyejuk).",
        "Multi-Tone Counter-Narrative Composer:",
        "  • Tegas & Otoritatif: Klarifikasi hukum resmi penegakan regulasi.",
        "  • Edukatif Literasi: Panduan verifikasi data dan literasi digital publik.",
        "  • Menenangkan / Empatik: Pesan penyejuk stabilitas damai kebangsaan."
    ]
    for b in bullets_10l:
        p_b = tf_10l.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(6)

    c10_r = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.733), Inches(5.1))
    c10_r.fill.solid()
    c10_r.fill.fore_color.rgb = CARD_BG
    c10_r.line.color.rgb = CARD_BORDER

    tb_10r = s10.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.333), Inches(4.7))
    tf_10r = tb_10r.text_frame
    tf_10r.word_wrap = True
    p = tf_10r.paragraphs[0]
    p.text = "Ekspor Terstandarisasi Dokumen Intelijen"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = DARK_BLUE

    bullets_10r = [
        "Standar Laporan Militer/Intelijen Siber: Mengikuti tata format dokumen klasifikasi 'TERBATAS / TINGKAT STRATEGIS'.",
        "Dukungan Format Cetak / PDF: Siap dicetak langsung dengan styling khusus print CSS (border hitam-putih formal dan layout halaman rapi).",
        "Unduh Berkas Markdown (.md): Mendukung integrasi cepat ke sistem catatan komando siber atau arsip digital.",
        "Menghilangkan friksi birokrasi penulisan laporan dari jam kerja menjadi hitungan detik."
    ]
    for b in bullets_10r:
        p_b = tf_10r.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(8)

    # ==========================================
    # SLIDE 11: TUMPUKAN TEKNOLOGI & DESAIN UI/UX
    # ==========================================
    s11 = prs.slides.add_slide(blank_layout)
    add_slide_header(s11, "10. Tumpukan Teknologi & Standar Desain UI/UX")

    tech_cards = [
        ("Frontend & Framework", PRIMARY_BLUE, [
            "React 19 (Modern UI Architecture)",
            "TypeScript (Type-Safe Strict Mode)",
            "Vite 8 (Lightning Fast Build & HMR)",
            "Framer Motion (Spring Physics Transitions)"
        ]),
        ("Styling & Visual Design", RGBColor(14, 165, 233), [
            "Tailwind CSS v4 (Light High-Contrast Palette)",
            "Enterprise Royal Blue & Slate Theme",
            "Lucide React (Vector Icon Library)",
            "Fluid Responsive Grid System"
        ]),
        ("Visualisasi & Audio Taktis", ACCENT_GREEN, [
            "Recharts (Interactive Responsive Charts)",
            "Accurate SVG Vector Geo Map",
            "Web Audio API (Synthesized Sonar Sounds)",
            "Zero External Asset Overhead"
        ]),
        ("NLP & Machine Learning", RGBColor(168, 85, 247), [
            "Indonesian Cognitive Domain Lexicon",
            "Emotional Spectrum Analysis Model",
            "Botnet Statistical Anomaly Scorer",
            "Autonomous Prompt Optimization Agent"
        ])
    ]

    w_11 = Inches(2.75)
    gap_11 = Inches(0.24)
    for i, (t_title, t_col, t_bullets) in enumerate(tech_cards):
        x_pos = Inches(0.8) + i * (w_11 + gap_11)
        card = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(1.6), w_11, Inches(5.1))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER

        # Top bar
        t_bar = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, Inches(1.6), w_11, Inches(0.12))
        t_bar.fill.solid()
        t_bar.fill.fore_color.rgb = t_col
        t_bar.line.fill.background()

        tb = s11.shapes.add_textbox(x_pos + Inches(0.15), Inches(1.85), w_11 - Inches(0.3), Inches(4.7))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = t_title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = t_col

        for b in t_bullets:
            p_b = tf.add_paragraph()
            p_b.text = "• " + b
            p_b.font.size = Pt(11)
            p_b.font.color.rgb = TEXT_MUTED
            p_b.space_before = Pt(10)

    # ==========================================
    # SLIDE 12: KESIMPULAN & DAMPAK KARYA
    # ==========================================
    s12 = prs.slides.add_slide(blank_layout)
    bg12 = s12.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg12.fill.solid()
    bg12.fill.fore_color.rgb = PRIMARY_BLUE
    bg12.line.fill.background()

    card12 = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(0.9), Inches(11.333), Inches(5.7))
    card12.fill.solid()
    card12.fill.fore_color.rgb = CARD_BG
    card12.line.fill.background()

    tb12 = s12.shapes.add_textbox(Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    tf12 = tb12.text_frame
    tf12.word_wrap = True

    p = tf12.paragraphs[0]
    p.text = "KESIMPULAN & DAMPAK STRATEGIS KARYA"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    p_title = tf12.add_paragraph()
    p_title.text = "SONAR: Menjaga Kedaulatan Kognitif Ruang Siber Nusantara"
    p_title.font.size = Pt(28)
    p_title.font.bold = True
    p_title.font.color.rgb = TEXT_MAIN
    p_title.space_before = Pt(4)

    summary_bullets = [
        "Relevansi Mendesak: Menjawab tantangan keamanan siber generasi baru di mana target serangan adalah alam pikir dan kepercayaan publik.",
        "Inovasi Nyata: Menggabungkan deteksi anomali algoritma botnet, klasifikasi NLP bahasa Indonesia, dan rekomendasi otonom AI Agent dalam satu antarmuka terintegrasi.",
        "Dampak Terukur: Mengurangi waktu mitigasi krisis hingga > 95%, mencegah kepanikan massal seperti rush money perbankan dan segregasi pemilu.",
        "Skalabilitas & Road Map: Siap dikembangkan lebih lanjut untuk terhubung dengan data stream API resmi platform media sosial skala gigabit dan model multimodal LLM mutakhir."
    ]

    for b in summary_bullets:
        p_b = tf12.add_paragraph()
        p_b.text = "✓  " + b
        p_b.font.size = Pt(13)
        p_b.font.color.rgb = TEXT_MUTED
        p_b.space_before = Pt(8)

    output_path = r"d:\SONAR\SONAR_Penjelasan_Karya.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully at: {output_path}")

if __name__ == '__main__':
    create_sonar_presentation()

