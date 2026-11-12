"""
SONAR v2.5 AI - Screenshot Generator
Menghasilkan 5 screenshot tampilan antarmuka sistem untuk keperluan Kartika Cyber Hactown 2026.
Resolusi: 1440 x 900 px (Laptop HD) | Format: PNG
"""
import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────
#  CONSTANTS
# ─────────────────────────────────────────────────────────────────
W, H = 1440, 900
FONTS = r"C:\Windows\Fonts"
OUT   = r"d:\SONAR\Kartika Cyber Hactown 2026"

# Palette
C = {
    "navy":      (10,  15,  29),
    "header":    (26,  86,  219),
    "header_dk": (19,  64,  166),
    "slate50":   (248, 250, 252),
    "slate100":  (241, 245, 249),
    "slate200":  (226, 232, 240),
    "slate300":  (203, 213, 225),
    "slate400":  (148, 163, 184),
    "slate500":  (100, 116, 139),
    "slate600":  (71,  85,  105),
    "slate700":  (51,  65,  85),
    "slate800":  (30,  41,  59),
    "slate900":  (15,  23,  42),
    "white":     (255, 255, 255),
    "blue_lt":   (239, 246, 255),
    "blue_md":   (96,  165, 250),
    "blue_b":    (59,  130, 246),
    "red":       (224, 36,  36),
    "red_lt":    (254, 226, 226),
    "amber":     (245, 158, 11),
    "amber_lt":  (255, 251, 235),
    "green":     (16,  185, 129),
    "green_lt":  (209, 250, 229),
    "purple":    (168, 85,  247),
    "cyan":      (6,   182, 212),
    "orange":    (249, 115, 22),
    "indigo":    (99,  102, 241),
}

def fnt(name, size):
    names = {"b": "segoeuib.ttf", "r": "segoeui.ttf",
             "i": "segoeuii.ttf", "ab": "arialbd.ttf", "a": "arial.ttf",
             "cb": "calibrib.ttf", "c": "calibri.ttf"}
    return ImageFont.truetype(os.path.join(FONTS, names.get(name, "segoeui.ttf")), size)

def draw_rrect(d, box, r, fill=None, outline=None, width=1):
    """Rounded rectangle helper."""
    x0, y0, x1, y1 = box
    if fill:
        d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=fill, outline=outline, width=width)
    else:
        d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=None, outline=outline, width=width)

def new_canvas():
    return Image.new("RGB", (W, H), C["slate50"])

def draw_browser_chrome(canvas, url="http://localhost:5173/"):
    """Draw a subtle browser chrome at top."""
    d = ImageDraw.Draw(canvas)
    # Chrome bar
    d.rectangle([0, 0, W, 36], fill=(55, 65, 81))
    # 3 dots
    for i, col in enumerate([(239,68,68),(250,204,21),(34,197,94)]):
        d.ellipse([16 + i*20, 11, 28 + i*20, 23], fill=col)
    # URL bar
    draw_rrect(d, [120, 7, 900, 29], 4, fill=(75, 85, 99))
    fa = fnt("r", 11)
    d.text((135, 11), url, font=fa, fill=(209, 213, 219))
    # favicon (sonar icon: tiny circle)
    d.ellipse([123, 12, 131, 24], fill=C["blue_b"])
    return 36  # chrome height

def draw_header(canvas, active_tab="Dasbor"):
    """Draw SONAR royal-blue top header."""
    d  = ImageDraw.Draw(canvas)
    d.rectangle([0, 36, W, 36 + 56], fill=C["header"])
    # Logo area
    d.ellipse([16, 48, 40, 72], fill=C["white"], outline=C["blue_md"], width=1)
    # sonar rings
    for r_ in [4, 8, 12]:
        d.ellipse([28-r_, 60-r_, 28+r_, 60+r_], outline=(255,255,255,160), width=1)
    d.ellipse([26, 58, 30, 62], fill=C["white"])
    fb  = fnt("b", 16)
    fr  = fnt("r", 11)
    d.text((50, 46), "SONAR", font=fb, fill=C["white"])
    d.text((50, 65), "v2.5 AI", font=fnt("r", 10), fill=(191, 219, 254))
    # ENGINE ONLINE badge
    draw_rrect(d, [128, 48, 258, 68], 4, fill=C["navy"], outline=C["green"])
    d.ellipse([138, 56, 148, 66], fill=C["green"])
    d.text((153, 53), "● ENGINE ONLINE", font=fnt("b", 10), fill=(167, 243, 208))

    tabs = ["Dasbor", "Narasi", "Sentimen", "Provokatif", "Klaster", "Anatomi", "Mitigasi"]
    tx = 290
    for tab in tabs:
        tw = int(fnt("b", 12).getlength(tab)) + 24
        if tab == active_tab:
            draw_rrect(d, [tx-2, 44, tx+tw-2, 80], 4, fill=(255,255,255,30))
            d.rectangle([tx-2, 78, tx+tw-2, 80], fill=C["white"])
            d.text((tx + 10, 54), tab, font=fnt("b", 12), fill=C["white"])
        else:
            d.text((tx + 10, 54), tab, font=fnt("r", 12), fill=(191, 219, 254))
        tx += tw + 8

    # Right: icons placeholder
    draw_rrect(d, [W-120, 46, W-16, 66], 20, fill=(255,255,255,20))
    d.text((W-110, 50), "⚙  🔔  👤", font=fnt("r", 11), fill=C["white"])
    return 36 + 56  # header bottom y

def draw_sidebar(canvas, active="Dasbor"):
    """Left sidebar navigation."""
    d = ImageDraw.Draw(canvas)
    SB = 220
    d.rectangle([0, 92, SB, H], fill=C["white"])
    d.line([(SB, 92), (SB, H)], fill=C["slate200"], width=1)

    items = [
        ("🏠", "Beranda"),
        ("📊", "Dasbor"),
        ("📡", "Narasi"),
        ("💬", "Sentimen"),
        ("⚠",  "Provokatif"),
        ("🔮", "Klaster"),
        ("🗺",  "Anatomi"),
        ("🛡",  "Mitigasi"),
    ]
    y = 110
    for icon, label in items:
        is_active = label == active
        if is_active:
            d.rectangle([0, y - 4, SB - 1, y + 32], fill=C["blue_lt"])
            d.rectangle([0, y - 4, 4, y + 32], fill=C["header"])
            d.text((18, y + 4), icon + "  " + label, font=fnt("b", 13), fill=C["header"])
        else:
            d.text((18, y + 4), icon + "  " + label, font=fnt("r", 13), fill=C["slate700"])
        y += 42

    # Footer
    d.line([(12, H - 50), (SB - 12, H - 50)], fill=C["slate200"], width=1)
    d.text((18, H - 36), "⚙  Basis & Konfigurasi", font=fnt("r", 11), fill=C["slate400"])
    return SB

def metric_card(d, x, y, w, h, label, value, sub, col, bg=None):
    bg = bg or C["white"]
    draw_rrect(d, [x, y, x+w, y+h], 10, fill=bg, outline=C["slate200"])
    d.rectangle([x, y, x+8, y+h], fill=col)  # left accent strip
    d.text((x+18, y+10), label, font=fnt("r", 10), fill=C["slate500"])
    d.text((x+18, y+26), value, font=fnt("b", 26), fill=col)
    d.text((x+18, y+58), sub, font=fnt("r", 10), fill=C["slate400"])

def save_png(img, filename, max_kb=490):
    path = os.path.join(OUT, filename)
    img.save(path, format="PNG", optimize=True)
    kb = os.path.getsize(path) / 1024
    if kb > max_kb:
        # reduce via quantize
        q = img.quantize(colors=256)
        q.save(path, format="PNG", optimize=True)
        kb = os.path.getsize(path) / 1024
    print(f"  ✓  {filename}  ({kb:.1f} KB)")
    return path


# ═══════════════════════════════════════════════════════════════
#  SCREENSHOT 1: DASBOR UTAMA (Main Dashboard)
# ═══════════════════════════════════════════════════════════════
def screenshot_01():
    print("Generating Screenshot 1: Dasbor Utama...")
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_browser_chrome(img)
    draw_header(img, "Dasbor")
    SB = draw_sidebar(img, "Dasbor")

    cx  = SB + 16  # content x
    cw  = W - SB - 32

    # ── EWS ALERT BANNER
    bx, by = cx, 100
    bw, bh = cw, 60
    d.rectangle([bx, by, bx+bw, by+bh], fill=C["red"])
    # pulsing ring
    d.ellipse([bx+16, by+10, bx+40, by+50], outline=(255,255,255,80), width=2)
    d.ellipse([bx+22, by+16, bx+34, by+44], fill=C["white"])
    d.text((bx+22, by+25), "!", font=fnt("b", 16), fill=C["red"])
    d.text((bx+50, by+8), "DARURAT KOGNITIF:", font=fnt("b", 18), fill=C["white"])
    d.text((bx+50, by+32), "Operasi Disinformasi Terkoordinasi Aktif Terdeteksi", font=fnt("r", 13), fill=(254, 202, 202))
    # Score badge
    draw_rrect(d, [bx+bw-200, by+8, bx+bw-100, by+52], 8, fill=C["white"])
    d.text((bx+bw-193, by+10), "92", font=fnt("b", 26), fill=C["red"])
    d.text((bx+bw-193, by+40), "Indeks Ancaman", font=fnt("r", 10), fill=C["slate500"])
    # Mitigasi button
    draw_rrect(d, [bx+bw-90, by+14, bx+bw-6, by+46], 6, fill=C["navy"])
    d.text((bx+bw-80, by+22), "Mitigasi AI", font=fnt("b", 12), fill=C["white"])

    # ── METRIC CARDS (4 cards)
    card_w = (cw - 48) // 4
    metrics = [
        ("TOTAL VOLUME NARASI", "61.3k", "▲ +18.4%  Laju Aliran", C["header"]),
        ("KERAPATAN AKUN BOT",  "68.5%", "▲ +32.1%  Anomali",     C["red"]),
        ("SENTIMEN PROVOKATIF", "68%",   "▲ +45.0%  Polarisasi",  C["amber"]),
        ("KLASTER ANCAMAN",     "2",     "Topologi Terpetakan",   C["purple"]),
    ]
    my = 172
    for i, (lbl, val, sub, col) in enumerate(metrics):
        mx = cx + i * (card_w + 16)
        metric_card(d, mx, my, card_w, 86, lbl, val, sub, col)

    # ── CHART LEFT: Narasi Velocity
    ch_lx, ch_ly = cx, 270
    ch_lw, ch_lh = int(cw * 0.60), 230
    draw_rrect(d, [ch_lx, ch_ly, ch_lx+ch_lw, ch_ly+ch_lh], 10, fill=C["white"], outline=C["slate200"])
    d.text((ch_lx+16, ch_ly+12), "Pemantauan Narasi  —  Velositas & Amplifikasi", font=fnt("b", 13), fill=C["slate900"])

    # Bot legend
    for xi, (lbl, col) in enumerate([("Bot", C["red"]), ("Hijau/Organik", C["green"])]):
        lx = ch_lx + ch_lw - 220 + xi * 110
        d.rectangle([lx, ch_ly+13, lx+14, ch_ly+23], fill=col)
        d.text((lx+18, ch_ly+12), lbl, font=fnt("r", 10), fill=C["slate500"])

    # Draw simple line chart (simulated)
    months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Okt","Des"]
    bot_pts = [22,28,35,32,55,45,70,65,80,75]
    org_pts = [60,55,65,70,60,72,55,68,50,62]
    px0 = ch_lx + 50
    py0 = ch_ly + ch_lh - 40
    pw  = ch_lw - 70
    ph  = ch_lh - 80

    def to_xy(i, v, pts):
        x = int(px0 + i * pw / (len(pts)-1))
        y = int(py0 - v / 100 * ph)
        return x, y

    # Grid lines
    for yv in [25, 50, 75, 100]:
        gy = int(py0 - yv/100*ph)
        d.line([(px0, gy), (px0+pw, gy)], fill=C["slate200"], width=1)
        d.text((px0 - 36, gy - 6), str(yv), font=fnt("r", 9), fill=C["slate400"])

    # Filled area under bot line
    bot_coords = [to_xy(i, v, bot_pts) for i, v in enumerate(bot_pts)]
    poly = bot_coords + [(px0+pw, py0), (px0, py0)]
    # draw filled polygon
    fill_layer = Image.new("RGBA", (W, H), (0,0,0,0))
    fd = ImageDraw.Draw(fill_layer)
    fd.polygon(poly, fill=(224, 36, 36, 50))
    img.paste(Image.alpha_composite(img.convert("RGBA"), fill_layer).convert("RGB"), (0,0))
    d = ImageDraw.Draw(img)

    # Lines
    for pts, col in [(bot_pts, C["red"]), (org_pts, C["green"])]:
        coords = [to_xy(i, v, pts) for i, v in enumerate(pts)]
        for j in range(len(coords)-1):
            d.line([coords[j], coords[j+1]], fill=col, width=2)
        for x_, y_ in coords:
            d.ellipse([x_-3, y_-3, x_+3, y_+3], fill=col)

    # X labels
    for i, m in enumerate(months):
        x_ = int(px0 + i * pw/(len(months)-1))
        d.text((x_-8, py0+6), m, font=fnt("r", 9), fill=C["slate400"])

    # ── CHART RIGHT: Sentiment Donut
    ch_rx = ch_lx + ch_lw + 16
    ch_rw = cw - ch_lw - 16
    draw_rrect(d, [ch_rx, ch_ly, ch_rx+ch_rw, ch_ly+ch_lh], 10, fill=C["white"], outline=C["slate200"])
    d.text((ch_rx+14, ch_ly+12), "Distribusi Sentimen\n& Polarisasi Kognitif", font=fnt("b", 12), fill=C["slate900"])

    # Donut chart
    cx_ = ch_rx + ch_rw//2
    cy_ = ch_ly + ch_lh//2 + 10
    r_out, r_in = 72, 44
    segments = [(68, C["red"]), (22, C["amber"]), (10, C["green"])]
    start = -90
    for pct, col in segments:
        angle = pct * 3.6
        d.pieslice([cx_-r_out, cy_-r_out, cx_+r_out, cy_+r_out], start, start+angle, fill=col)
        start += angle
    d.ellipse([cx_-r_in, cy_-r_in, cx_+r_in, cy_+r_in], fill=C["white"])
    d.text((cx_-18, cy_-12), "68%", font=fnt("b", 16), fill=C["red"])
    d.text((cx_-22, cy_+2), "Provokatif", font=fnt("r", 9), fill=C["slate500"])

    # Legend
    for i, (lbl, col) in enumerate([("Merah — Provokatif", C["red"]), ("Orange — Kritis", C["amber"]), ("Hijau — Aman", C["green"])]):
        d.rectangle([ch_rx+16, ch_ly+ch_lh-72+i*22, ch_rx+28, ch_ly+ch_lh-60+i*22], fill=col)
        d.text((ch_rx+34, ch_ly+ch_lh-73+i*22), lbl, font=fnt("r", 10), fill=C["slate500"])

    # ── LIVE FEED PREVIEW (bottom strip)
    lf_y = 512
    draw_rrect(d, [cx, lf_y, cx+cw, lf_y+30], 6, fill=C["slate900"])
    d.text((cx+16, lf_y+8), "📡  Aliran Narasi Publik Terkini (Real-Time Ingestion Stream)  —  2.4k narasi/menit", font=fnt("b", 11), fill=C["white"])

    feed = [
        ("@acct_ptrk84_x", "X",  "BREAKING: Dana nasabah hilang! Rush sebelum terlambat!! #BankGagal #RushMoney", C["red"],   "BOT 94%"),
        ("@warga.jkt2024",  "FB", "Hei teman-teman, apakah berita ini benar? Ada yang bisa konfirmasi?",         C["amber"], "Bot 41%"),
        ("@ojk_official",   "WEB","OJK: Tidak ada masalah pada sistem perbankan nasional. Tetap tenang.",        C["green"],  "Organik"),
        ("@tiktok_user92",  "TK", "VIRAL! Semua orang panik ambil tabungan!! SHARE KE SEMUA GRUP!!",           C["red"],   "BOT 88%"),
    ]
    for i, (user, platform, text, scol, bot) in enumerate(feed):
        fy = lf_y + 44 + i * 72
        draw_rrect(d, [cx, fy, cx+cw, fy+65], 8, fill=C["white"], outline=C["slate200"])
        # Avatar circle
        d.ellipse([cx+12, fy+10, cx+44, fy+42], fill=scol)
        d.text((cx+20, fy+17), user[1:3].upper(), font=fnt("b", 12), fill=C["white"])
        # Platform badge
        plt_col = {"X": (0,0,0), "FB": (24,119,242), "WEB": (99,102,241), "TK": (0,0,0)}.get(platform, C["slate700"])
        draw_rrect(d, [cx+50, fy+10, cx+76, fy+26], 4, fill=plt_col)
        d.text((cx+54, fy+13), platform, font=fnt("b", 9), fill=C["white"])
        # Bot badge
        b_col = C["red"] if "BOT" in bot or "Bot" in bot else C["green"]
        draw_rrect(d, [cx+82, fy+10, cx+82+int(fnt("b",9).getlength(bot))+14, fy+26], 4, fill=b_col)
        d.text((cx+89, fy+13), bot, font=fnt("b", 9), fill=C["white"])
        d.text((cx+50, fy+30), user, font=fnt("b", 11), fill=C["slate800"])
        # Truncate text
        d.text((cx+50, fy+46), text[:85] + ("…" if len(text)>85 else ""), font=fnt("r", 10), fill=C["slate500"])

    save_png(img, "Screenshot_01_Dasbor_Utama.PNG")


# ═══════════════════════════════════════════════════════════════
#  SCREENSHOT 2: PEMANTAUAN NARASI (Live Feed)
# ═══════════════════════════════════════════════════════════════
def screenshot_02():
    print("Generating Screenshot 2: Pemantauan Narasi...")
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_browser_chrome(img, "http://localhost:5173/#narasi")
    draw_header(img, "Narasi")
    SB = draw_sidebar(img, "Narasi")

    cx  = SB + 16
    cw  = W - SB - 32

    # Page title
    d.text((cx, 102), "Pemantauan Narasi  —  Aliran Data Publik Terkini", font=fnt("b", 18), fill=C["slate900"])
    d.text((cx, 126), "Real-Time Ingestion: Memproses 2.4k narasi/menit dari 5 platform aktif", font=fnt("r", 12), fill=C["slate500"])

    # Filter bar
    fy = 150
    draw_rrect(d, [cx, fy, cx+cw, fy+44], 8, fill=C["white"], outline=C["slate200"])
    filters = [("Semua Platform", True), ("X (Twitter)", False), ("TikTok", False), ("Telegram", False), ("Facebook", False), ("Media Online", False)]
    fx = cx + 12
    for label, active in filters:
        fw = int(fnt("b" if active else "r", 11).getlength(label)) + 22
        col = C["header"] if active else None
        outline = C["header"] if active else C["slate200"]
        draw_rrect(d, [fx, fy+8, fx+fw, fy+36], 20, fill=col, outline=outline)
        d.text((fx+11, fy+15), label, font=fnt("b" if active else "r", 11),
               fill=C["white"] if active else C["slate700"])
        fx += fw + 10

    # Sentiment filter buttons
    sf_x = cx + cw - 310
    draw_rrect(d, [sf_x, fy+8, sf_x+90, fy+36], 20, fill=C["red_lt"], outline=C["red"])
    d.text((sf_x+12, fy+16), "Provokatif", font=fnt("b", 10), fill=C["red"])
    draw_rrect(d, [sf_x+100, fy+8, sf_x+185, fy+36], 20, fill=C["amber_lt"], outline=C["amber"])
    d.text((sf_x+112, fy+16), "Bot Suspek", font=fnt("b", 10), fill=C["amber"])
    draw_rrect(d, [sf_x+195, fy+8, sf_x+295, fy+36], 20, fill=C["green_lt"], outline=C["green"])
    d.text((sf_x+207, fy+16), "Organik", font=fnt("b", 10), fill=C["green"])

    # Feed items
    feed_items = [
        {
            "user": "@acct_patrk84_xd", "platform": "X", "time": "09:34",
            "text": "BREAKING‼️ Uang nasabah BankXYZ HILANG!! Rush sekarang sebelum terlambat!!! #BankGagal #RushMoney #VIRAL",
            "sentiment": "PROVOKATIF", "s_col": C["red"],
            "bot": "BOT 94%", "b_col": C["red"],
            "emotions": [("Kemarahan", 82, C["red"]), ("Ketakutan", 61, C["amber"]), ("Keterkejutan", 44, C["purple"])],
            "tactic": "Fear-Mongering + Hashtag Stuffing"
        },
        {
            "user": "@akunbot99_jkt", "platform": "TK", "time": "09:33",
            "text": "VIRALKAN SEBELUM DIHAPUS!! Konspirasi terbesar sepanjang masa. SHARE KE SEMUA GRUP!! 🔥🔥🔥",
            "sentiment": "PROVOKATIF", "s_col": C["red"],
            "bot": "BOT 88%", "b_col": C["red"],
            "emotions": [("Kemarahan", 75, C["red"]), ("Ketakutan", 50, C["amber"]), ("Kegembiraan", 12, C["green"])],
            "tactic": "Astroturfing + Call-to-Share Script"
        },
        {
            "user": "@warga_jkt2024", "platform": "FB", "time": "09:31",
            "text": "Ada yang bisa konfirmasi berita ini? Saya bingung apakah info ini valid atau tidak...",
            "sentiment": "KRITIS", "s_col": C["amber"],
            "bot": "Bot 41%", "b_col": C["amber"],
            "emotions": [("Ketakutan", 38, C["amber"]), ("Keterkejutan", 25, C["purple"]), ("Kegembiraan", 55, C["green"])],
            "tactic": "Organik — Masyarakat Bertanya"
        },
        {
            "user": "@ojk_official_id", "platform": "WEB", "time": "09:28",
            "text": "OJK menegaskan: seluruh sistem perbankan nasional dalam kondisi NORMAL dan AMAN. Mohon tidak menyebarkan informasi yang belum terverifikasi.",
            "sentiment": "AMAN", "s_col": C["green"],
            "bot": "Organik", "b_col": C["green"],
            "emotions": [("Kegembiraan", 72, C["green"]), ("Ketakutan", 8, C["amber"]), ("Kemarahan", 5, C["red"])],
            "tactic": "Klarifikasi Resmi Institusi"
        },
        {
            "user": "@buzzer_net_17", "platform": "TG", "time": "09:26",
            "text": "SEMUA ORANG SUDAH PANIK!! Antrean panjang di ATM!! JANGAN TINGGAL DIAM!! #BANGKRUT",
            "sentiment": "PROVOKATIF", "s_col": C["red"],
            "bot": "BOT 97%", "b_col": C["red"],
            "emotions": [("Kemarahan", 90, C["red"]), ("Ketakutan", 78, C["amber"]), ("Keterkejutan", 60, C["purple"])],
            "tactic": "Bandwagon Effect + Fake Urgency"
        },
    ]

    item_y = 206
    for item in feed_items[:5]:
        item_h = 112
        draw_rrect(d, [cx, item_y, cx+cw, item_y+item_h], 10, fill=C["white"], outline=C["slate200"])
        # Left sentiment strip
        d.rectangle([cx, item_y, cx+5, item_y+item_h], fill=item["s_col"])

        # Avatar
        d.ellipse([cx+14, item_y+10, cx+46, item_y+42], fill=item["s_col"])
        d.text((cx+22, item_y+17), item["user"][1:3].upper(), font=fnt("b", 13), fill=C["white"])

        # Platform badge
        plt_colors = {"X":(0,0,0),"FB":(24,119,242),"WEB":C["indigo"],"TK":(0,0,0),"TG":(0,136,204)}
        pc = plt_colors.get(item["platform"], C["slate700"])
        draw_rrect(d, [cx+54, item_y+10, cx+86, item_y+26], 4, fill=pc)
        d.text((cx+58, item_y+13), item["platform"], font=fnt("b", 9), fill=C["white"])

        # Bot probability badge
        draw_rrect(d, [cx+92, item_y+10, cx+92+int(fnt("b",9).getlength(item["bot"]))+14, item_y+26], 4, fill=item["b_col"])
        d.text((cx+99, item_y+13), item["bot"], font=fnt("b", 9), fill=C["white"])

        # Sentiment badge
        draw_rrect(d, [cx+92+int(fnt("b",9).getlength(item["bot"]))+20, item_y+10,
                        cx+92+int(fnt("b",9).getlength(item["bot"]))+20+int(fnt("b",9).getlength(item["sentiment"]))+16, item_y+26],
                    4, fill=item["s_col"])
        d.text((cx+92+int(fnt("b",9).getlength(item["bot"]))+27, item_y+13),
               item["sentiment"], font=fnt("b", 9), fill=C["white"])

        # Time
        d.text((cx+cw-50, item_y+10), item["time"], font=fnt("r", 10), fill=C["slate400"])

        # Username
        d.text((cx+54, item_y+30), item["user"], font=fnt("b", 11), fill=C["slate800"])

        # Content text (truncated)
        txt = item["text"][:100] + ("…" if len(item["text"])>100 else "")
        d.text((cx+14, item_y+50), txt, font=fnt("r", 11), fill=C["slate700"])

        # Emotion bars (compact, right side)
        bx0 = cx + cw - 350
        for j, (emo, pct, col) in enumerate(item["emotions"]):
            by = item_y + 10 + j * 20
            d.text((bx0, by), emo, font=fnt("r", 9), fill=C["slate400"])
            bar_start = bx0 + 90
            bar_w = 180
            d.rounded_rectangle([bar_start, by+2, bar_start+bar_w, by+12], radius=4, fill=C["slate100"])
            d.rounded_rectangle([bar_start, by+2, bar_start+int(bar_w*pct/100), by+12], radius=4, fill=col)
            d.text((bar_start+bar_w+6, by), f"{pct}%", font=fnt("r", 9), fill=col)

        # Tactic tag
        d.text((cx+14, item_y+90), f"▸  {item['tactic']}", font=fnt("r", 10), fill=C["slate500"])

        item_y += item_h + 8

    save_png(img, "Screenshot_02_Pemantauan_Narasi.PNG")


# ═══════════════════════════════════════════════════════════════
#  SCREENSHOT 3: INSPEKTOR NLP (Provokatif Tab)
# ═══════════════════════════════════════════════════════════════
def screenshot_03():
    print("Generating Screenshot 3: Inspektor NLP...")
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_browser_chrome(img, "http://localhost:5173/#provokatif")
    draw_header(img, "Provokatif")
    SB = draw_sidebar(img, "Provokatif")

    cx = SB + 16
    cw = W - SB - 32

    d.text((cx, 102), "Inspektor Narasi & Deteksi Taktik Propaganda", font=fnt("b", 18), fill=C["slate900"])
    d.text((cx, 126), "Analisis teks tunggal secara mendalam — NLP + Bot Classifier + Taktik Manipulasi", font=fnt("r", 12), fill=C["slate500"])

    # Input area
    draw_rrect(d, [cx, 150, cx+cw, 150+90], 10, fill=C["white"], outline=C["slate200"])
    d.text((cx+16, 160), "Tempel teks yang ingin dianalisis (cuitan, siaran broadcast, caption, dll.)", font=fnt("r", 11), fill=C["slate400"])
    sample_text = "BREAKING‼️ Uang nasabah BankXYZ HILANG!!! Rush SEKARANG sebelum TERLAMBAT!!! Viralkan sebelum dihapus pemerintah! #BankGagal #RushMoney #KORBAN"
    d.text((cx+16, 182), sample_text[:105]+"…", font=fnt("r", 12), fill=C["slate700"])
    # Analyze button
    draw_rrect(d, [cx+cw-150, 162, cx+cw-16, 192], 8, fill=C["header"])
    d.text((cx+cw-130, 170), "🔍  Analisis Sekarang", font=fnt("b", 12), fill=C["white"])
    d.text((cx+16, 220), "Karakter: 148  |  Kata: 23  |  Hashtag: 2  |  Kapital Berlebih: 68%", font=fnt("r", 10), fill=C["slate400"])

    # ── BOT PROBABILITY card (left top)
    draw_rrect(d, [cx, 248, cx+310, 248+180], 10, fill=C["white"], outline=C["slate200"])
    draw_rrect(d, [cx, 248, cx+310, 248+6], 3, fill=C["red"])
    d.text((cx+16, 262), "PROBABILITAS BOT", font=fnt("b", 12), fill=C["slate700"])
    d.text((cx+16, 284), "94%", font=fnt("b", 48), fill=C["red"])
    d.text((cx+16, 336), "Klasifikasi: SINDIKAT BOTNET", font=fnt("b", 12), fill=C["red"])
    # Progress bar
    d.rounded_rectangle([cx+16, 356, cx+290, 370], radius=6, fill=C["red_lt"])
    d.rounded_rectangle([cx+16, 356, cx+16+int(274*0.94), 370], radius=6, fill=C["red"])
    d.text((cx+16, 376), "Indeks Keyakinan: Sangat Tinggi", font=fnt("r", 10), fill=C["slate500"])
    d.text((cx+16, 394), "Faktor: CAPS 68% • Hashtag Stuffing • Call-to-Share", font=fnt("r", 9), fill=C["slate400"])

    # ── SENTIMENT card
    draw_rrect(d, [cx+326, 248, cx+326+310, 248+180], 10, fill=C["white"], outline=C["slate200"])
    draw_rrect(d, [cx+326, 248, cx+326+310, 248+6], 3, fill=C["red"])
    d.text((cx+342, 262), "SENTIMEN TEKS", font=fnt("b", 12), fill=C["slate700"])
    d.text((cx+342, 284), "PROVOKATIF", font=fnt("b", 32), fill=C["red"])
    d.text((cx+342, 322), "Ekstrem / Berbahaya", font=fnt("r", 12), fill=C["red"])
    draw_rrect(d, [cx+342, 345, cx+600, 361], 6, fill=C["red_lt"])
    draw_rrect(d, [cx+342, 345, cx+590, 361], 6, fill=C["red"])
    d.text((cx+342, 368), "Polaritas: -0.92  |  Subjectivity: 0.87", font=fnt("r", 10), fill=C["slate500"])

    # ── EMOTION SPECTRUM card
    draw_rrect(d, [cx+652, 248, cx+652+330, 248+180], 10, fill=C["white"], outline=C["slate200"])
    d.text((cx+668, 262), "SPEKTRUM EMOSI KOGNITIF", font=fnt("b", 12), fill=C["slate700"])
    emotions = [("Kemarahan (Anger)", 82, C["red"]), ("Ketakutan (Fear)", 61, C["amber"]),
                ("Keterkejutan (Surprise)", 44, C["purple"]), ("Kegembiraan (Joy)", 8, C["green"])]
    for j, (emo, pct, col) in enumerate(emotions):
        ey = 285 + j * 36
        d.text((cx+668, ey), emo, font=fnt("r", 10), fill=C["slate500"])
        bw = 230
        d.rounded_rectangle([cx+668, ey+14, cx+668+bw, ey+26], radius=5, fill=C["slate100"])
        d.rounded_rectangle([cx+668, ey+14, cx+668+int(bw*pct/100), ey+26], radius=5, fill=col)
        d.text((cx+668+bw+8, ey+13), f"{pct}%", font=fnt("b", 10), fill=col)

    # ── TAKTIK PROPAGANDA (bottom left card)
    draw_rrect(d, [cx, 442, cx+640, 442+300], 10, fill=C["white"], outline=C["slate200"])
    d.text((cx+16, 456), "Pengenalan Taktik Manipulasi Informasi — Terdeteksi", font=fnt("b", 13), fill=C["slate900"])

    tactics_det = [
        ("Fear-Mongering & Urgensi Palsu", C["red"], "Terpicu frasa: 'HILANG', 'sebelum TERLAMBAT'. Mendorong kepanikan untuk mencegah verifikasi fakta."),
        ("Astroturfing & Call-to-Share", C["red"], "Templat 'Viralkan sebelum dihapus' adalah pola koordinasi sindikat bot untuk manipulasi algoritma tren."),
        ("Hashtag Stuffing (Algorithmic Hijack)", C["amber"], "2 hashtag (#BankGagal, #RushMoney) digunakan untuk membobol daftar trending topik."),
        ("Kapitalisasi Berlebih (CAPS Lock Abuse)", C["amber"], "68% teks dalam huruf kapital — indikator kuat pola naskah buzzer berkoordinasi."),
    ]
    ty = 480
    for t_name, t_col, t_desc in tactics_det:
        draw_rrect(d, [cx+16, ty, cx+620, ty+52], 6, fill=(t_col[0], t_col[1], t_col[2]) if t_col!=C["amber"] else C["amber_lt"],
                   outline=t_col)
        draw_rrect(d, [cx+16, ty, cx+22, ty+52], 3, fill=t_col)
        d.text((cx+30, ty+6), t_name, font=fnt("b", 11), fill=C["slate900"])
        d.text((cx+30, ty+24), t_desc[:90]+"…", font=fnt("r", 10), fill=C["slate500"])
        ty += 60

    # ── KONTRA NARASI card (bottom right)
    draw_rrect(d, [cx+656, 442, cx+cw, 442+300], 10, fill=C["navy"])
    d.text((cx+672, 456), "🤖  AI Counter-Narrative Generator", font=fnt("b", 13), fill=C["white"])
    tones = [("Tegas & Otoritatif", C["red"]), ("Edukatif & Literasi", C["blue_b"]), ("Menenangkan & Empatik", C["green"])]
    tx2 = cx + 672
    ty2 = 480
    for label, col in tones:
        draw_rrect(d, [tx2, ty2, tx2+int(fnt("b",10).getlength(label))+20, ty2+24], 20, fill=col)
        d.text((tx2+10, ty2+5), label, font=fnt("b", 10), fill=C["white"])
        tx2 += int(fnt("b",10).getlength(label))+28

    draw_rrect(d, [cx+672, 512, cx+cw-16, 710], 8, fill=(20,30,50))
    draft_text = (
        "⚡ [KLARIFIKASI RESMI — TEGAS]\n\n"
        "Merespons narasi yang beredar terkait dugaan masalah\n"
        "perbankan nasional:\n\n"
        "✓ Otoritas Jasa Keuangan (OJK) menyatakan TIDAK ADA\n"
        "  permasalahan sistemik pada perbankan nasional.\n\n"
        "✓ Informasi 'rush money' adalah disinformasi terkoordinasi\n"
        "  yang sengaja disebarkan untuk menciptakan kepanikan.\n\n"
        "✓ Laporkan konten tersebut ke: lapor.go.id/hoaks\n\n"
        "TETAP TENANG. VERIFIKASI SEBELUM SEBAR."
    )
    dy2 = 522
    for line in draft_text.split("\n"):
        col = C["blue_md"] if line.startswith("⚡") else (C["green"] if line.startswith("✓") else C["slate400"] if line.startswith("  ") else C["white"])
        d.text((cx+688, dy2), line, font=fnt("b" if line.startswith("⚡") else "r", 10), fill=col)
        dy2 += 15

    draw_rrect(d, [cx+680, 718, cx+cw-80, 740], 6, fill=C["header"])
    d.text((cx+690, 724), "📋  Salin Draf Tanggapan", font=fnt("b", 10), fill=C["white"])

    save_png(img, "Screenshot_03_Inspektor_NLP.PNG")


# ═══════════════════════════════════════════════════════════════
#  SCREENSHOT 4: KLASTER & RADAR BOTNET
# ═══════════════════════════════════════════════════════════════
def screenshot_04():
    print("Generating Screenshot 4: Radar Topologi Botnet...")
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_browser_chrome(img, "http://localhost:5173/#klaster")
    draw_header(img, "Klaster")
    SB = draw_sidebar(img, "Klaster")

    cx = SB + 16
    cw = W - SB - 32

    d.text((cx, 102), "Radar Jaringan & Topologi Botnet", font=fnt("b", 18), fill=C["slate900"])
    d.text((cx, 126), "Pemetaan real-time klaster akun inotentik, sindikat buzzer, dan relay disinformasi lintas platform", font=fnt("r", 12), fill=C["slate500"])

    # Stat strip
    stats = [("Akun Terklasifikasi", "1.247", C["header"]), ("Node Botnet Aktif", "342", C["red"]),
             ("Bridge Relay", "89", C["amber"]), ("Akun Organik", "816", C["green"])]
    for i, (lbl, val, col) in enumerate(stats):
        sx = cx + i * 240
        draw_rrect(d, [sx, 148, sx+228, 148+56], 8, fill=C["white"], outline=C["slate200"])
        d.rectangle([sx, 148, sx+5, 148+56], fill=col)
        d.text((sx+16, 155), lbl, font=fnt("r", 10), fill=C["slate500"])
        d.text((sx+16, 171), val, font=fnt("b", 22), fill=col)

    # Graph area
    gx, gy = cx, 216
    gw, gh = int(cw * 0.62), 480
    draw_rrect(d, [gx, gy, gx+gw, gy+gh], 12, fill=C["navy"])
    d.text((gx+16, gy+12), "Graph Topology  —  Klaster Aktif: 2  |  Sindikat Aktif", font=fnt("b", 12), fill=C["white"])

    # Draw graph nodes
    gcx, gcy = gx + gw//2, gy + gh//2 + 20

    # Central seed node
    seed_x, seed_y = gcx - 30, gcy
    for r_ in [60, 45, 30]:
        alpha = int(80 * 30 / r_)
        ring = Image.new("RGBA", (W, H), (0,0,0,0))
        rd = ImageDraw.Draw(ring)
        rd.ellipse([seed_x-r_, seed_y-r_, seed_x+r_, seed_y+r_], outline=(224,36,36,alpha), width=2)
        img.paste(ring, (0,0), ring)
        d = ImageDraw.Draw(img)
    d.ellipse([seed_x-18, seed_y-18, seed_x+18, seed_y+18], fill=C["red"], outline=(255,100,100), width=2)
    d.text((seed_x-6, seed_y-8), "!", font=fnt("b", 16), fill=C["white"])
    d.text((seed_x-30, seed_y+22), "Seed Disinfo", font=fnt("b", 10), fill=(255,150,150))

    # Botnet nodes
    bot_positions = [
        (seed_x-120, seed_y-100), (seed_x+90, seed_y-120), (seed_x-110, seed_y+90),
        (seed_x+130, seed_y+70), (seed_x-60, seed_y-160), (seed_x+160, seed_y-30),
    ]
    for bx_, by_ in bot_positions:
        d.line([(seed_x, seed_y), (bx_, by_)], fill=(224,36,36,100), width=1)
        d.ellipse([bx_-10, by_-10, bx_+10, by_+10], fill=(244,63,94), outline=(255,100,100), width=1)
        d.text((bx_-4, by_-6), "B", font=fnt("b", 10), fill=C["white"])

    # Bridge relay nodes
    relay_positions = [(seed_x-200, seed_y-40), (seed_x+200, seed_y-80), (seed_x+50, seed_y+170)]
    for rx_, ry_ in relay_positions:
        d.line([(seed_x, seed_y), (rx_, ry_)], fill=(245,158,11,80), width=1)
        d.ellipse([rx_-11, ry_-11, rx_+11, ry_+11], fill=C["amber"], outline=(253,230,138), width=1)
        d.text((rx_-5, ry_-6), "R", font=fnt("b", 10), fill=C["white"])

    # Organic nodes
    organic_positions = [
        (seed_x-250, seed_y+80), (seed_x+250, seed_y+100), (seed_x-180, seed_y+200),
        (seed_x+180, seed_y+180), (seed_x, seed_y+240), (seed_x-280, seed_y-120),
    ]
    for ox_, oy_ in organic_positions:
        d.ellipse([ox_-8, oy_-8, ox_+8, oy_+8], fill=C["green"], outline=(110,231,183), width=1)

    # Second cluster (smaller)
    sc_x, sc_y = gcx + 220, gcy - 120
    for r_ in [35, 22]:
        d.ellipse([sc_x-r_, sc_y-r_, sc_x+r_, sc_y+r_], outline=(224,36,36,60), width=1)
    d.ellipse([sc_x-12, sc_y-12, sc_x+12, sc_y+12], fill=C["red"])
    for _ in range(4):
        ang = _ * 90 + 30
        nbx = int(sc_x + 60 * math.cos(math.radians(ang)))
        nby = int(sc_y + 60 * math.sin(math.radians(ang)))
        d.line([(sc_x, sc_y), (nbx, nby)], fill=(224,36,36,80), width=1)
        d.ellipse([nbx-8, nby-8, nbx+8, nby+8], fill=(244,63,94))

    # Legend
    legend_items = [("● Seed Disinfo",C["red"]),("● Botnet Amplifier",(244,63,94)),
                    ("● Bridge Relay",C["amber"]),("● Akun Organik",C["green"])]
    lx2 = gx + 16
    for li, (ll, lc) in enumerate(legend_items):
        d.text((lx2, gy+gh-30), ll, font=fnt("r", 10), fill=lc)
        lx2 += int(fnt("r",10).getlength(ll)) + 24

    # Right panel
    rx2 = gx + gw + 16
    rw2 = cw - gw - 16

    # Klaster detail cards
    klaster_data = [
        ("Klaster #1 — AKTIF", "SINDIKAT BUZZER FINANSIAL", C["red"], [
            "342 Node Botnet Aktif", "2.847 Siaran Pesan", "Target: Kepanikan Perbankan",
        ]),
        ("Klaster #2 — AKTIF", "SINDIKAT POLITIK ELEKTORAL", C["orange"], [
            "189 Node Botnet", "1.203 Siaran Pesan", "Target: Delegitimasi KPU",
        ]),
    ]
    ky = 216
    for k_title, k_sub, k_col, k_items in klaster_data:
        draw_rrect(d, [rx2, ky, rx2+rw2, ky+170], 10, fill=C["white"], outline=k_col, width=2)
        d.rectangle([rx2, ky, rx2+rw2, ky+5], fill=k_col)
        d.text((rx2+14, ky+14), k_title, font=fnt("b", 13), fill=k_col)
        d.text((rx2+14, ky+32), k_sub, font=fnt("b", 11), fill=C["slate700"])
        for j, item in enumerate(k_items):
            d.text((rx2+14, ky+56+j*26), "▶  " + item, font=fnt("r", 11), fill=C["slate500"])
        draw_rrect(d, [rx2+14, ky+140, rx2+rw2-14, ky+162], 6, fill=k_col)
        d.text((rx2+14+30, ky+147), "Detail Jaringan Klaster →", font=fnt("b", 10), fill=C["white"])
        ky += 182

    # Timeline
    draw_rrect(d, [rx2, ky, rx2+rw2, ky+180], 10, fill=C["white"], outline=C["slate200"])
    d.text((rx2+14, ky+12), "Kronologi Aktivitas Bot (60 Menit Terakhir)", font=fnt("b", 12), fill=C["slate900"])
    times = ["08:35","08:45","08:55","09:05","09:15","09:25","09:35"]
    vals2  = [15, 28, 42, 88, 120, 95, 110]
    bw2 = rw2 - 50
    bh2 = 90
    bx0 = rx2 + 20
    by0 = ky + 155
    max_v = max(vals2)
    for i in range(len(times)-1):
        x1b = bx0 + int(i * bw2 / (len(times)-1))
        x2b = bx0 + int((i+1) * bw2 / (len(times)-1))
        y1b = by0 - int(vals2[i] / max_v * bh2)
        y2b = by0 - int(vals2[i+1] / max_v * bh2)
        d.line([(x1b, y1b), (x2b, y2b)], fill=C["red"], width=2)
        d.ellipse([x1b-3, y1b-3, x1b+3, y1b+3], fill=C["red"])
    for i, t in enumerate(times):
        tx3 = bx0 + int(i * bw2 / (len(times)-1))
        d.text((tx3-10, by0+6), t, font=fnt("r", 8), fill=C["slate400"])

    save_png(img, "Screenshot_04_Radar_Botnet.PNG")


# ═══════════════════════════════════════════════════════════════
#  SCREENSHOT 5: PETA NUSANTARA & MITIGASI AI
# ═══════════════════════════════════════════════════════════════
def screenshot_05():
    print("Generating Screenshot 5: Peta Nusantara & Mitigasi AI Agent...")
    img = new_canvas()
    d = ImageDraw.Draw(img)
    draw_browser_chrome(img, "http://localhost:5173/#anatomi")
    draw_header(img, "Anatomi")
    SB = draw_sidebar(img, "Anatomi")

    cx = SB + 16
    cw = W - SB - 32

    d.text((cx, 102), "Peta Sebaran Kognitif Nusantara  &  Agen Mitigasi AI Satgas", font=fnt("b", 17), fill=C["slate900"])
    d.text((cx, 126), "Visualisasi geospasial hotspot ancaman kognitif per wilayah + AI Cognitive Shield Agent", font=fnt("r", 12), fill=C["slate500"])

    # ── MAP PANEL (left 65%)
    mx, my = cx, 148
    mw, mh = int(cw * 0.63), 450
    draw_rrect(d, [mx, my, mx+mw, my+mh], 12, fill=(240, 244, 250), outline=C["slate200"])
    d.text((mx+16, my+10), "RADAR GEOSPASIAL INDONESIA  —  PROYEKSI WGS84 EPSG:4326", font=fnt("b", 10), fill=C["slate500"])

    # Draw simplified island shapes
    # Sumatra (narrow vertical-ish)
    sumatra = [(mx+100,my+120), (mx+108,my+100), (mx+118,my+90), (mx+128,my+95),
               (mx+138,my+120), (mx+148,my+150), (mx+158,my+185), (mx+162,my+220),
               (mx+158,my+255), (mx+148,my+270), (mx+135,my+275), (mx+120,my+265),
               (mx+108,my+245), (mx+98,my+220), (mx+92,my+185), (mx+95,my+155)]
    d.polygon(sumatra, fill=(210, 220, 235), outline=C["slate300"])

    # Java (long narrow horizontal)
    java = [(mx+200,my+255), (mx+218,my+248), (mx+248,my+244), (mx+288,my+246),
            (mx+328,my+250), (mx+368,my+252), (mx+395,my+255), (mx+400,my+262),
            (mx+385,my+270), (mx+348,my+272), (mx+305,my+270), (mx+265,my+268),
            (mx+225,my+266), (mx+205,my+264)]
    d.polygon(java, fill=(210, 220, 235), outline=C["slate300"])

    # Bali (small)
    bali = [(mx+408,my+252),(mx+418,my+248),(mx+426,my+252),(mx+428,my+262),(mx+418,my+268),(mx+408,my+264)]
    d.polygon(bali, fill=(210, 220, 235), outline=C["slate300"])

    # Kalimantan (large blob)
    kal = [(mx+280,my+90), (mx+310,my+78), (mx+350,my+72), (mx+390,my+76),
           (mx+428,my+88), (mx+450,my+108), (mx+458,my+136), (mx+452,my+165),
           (mx+440,my+190), (mx+418,my+210), (mx+390,my+225), (mx+358,my+230),
           (mx+325,my+228), (mx+296,my+215), (mx+272,my+195), (mx+258,my+170),
           (mx+256,my+140), (mx+264,my+112)]
    d.polygon(kal, fill=(210, 220, 235), outline=C["slate300"])

    # Sulawesi (K-shape, simplified)
    sul = [(mx+490,my+110),(mx+510,my+100),(mx+525,my+108),(mx+528,my+128),
           (mx+520,my+152),(mx+530,my+170),(mx+545,my+180),(mx+548,my+195),
           (mx+535,my+202),(mx+518,my+194),(mx+508,my+178),(mx+498,my+185),
           (mx+488,my+200),(mx+472,my+205),(mx+460,my+198),(mx+458,my+182),
           (mx+465,my+165),(mx+475,my+150),(mx+482,my+130)]
    d.polygon(sul, fill=(210, 220, 235), outline=C["slate300"])

    # Papua (large right)
    papua = [(mx+640,my+140),(mx+670,my+128),(mx+700,my+124),(mx+728,my+130),
             (mx+748,my+148),(mx+755,my+170),(mx+748,my+195),(mx+728,my+215),
             (mx+700,my+228),(mx+668,my+232),(mx+640,my+225),(mx+622,my+206),
             (mx+616,my+184),(mx+622,my+162)]
    d.polygon(papua, fill=(210, 220, 235), outline=C["slate300"])

    # NTT/NTB strip
    ntt = [(mx+432,my+268),(mx+460,my+265),(mx+490,my+268),(mx+510,my+274),
           (mx+505,my+282),(mx+475,my+285),(mx+445,my+282),(mx+432,my+278)]
    d.polygon(ntt, fill=(210, 220, 235), outline=C["slate300"])

    # Maluku (small islands)
    for mx_, my_, mr in [(mx+582,my+170,14),(mx+600,my+198,10),(mx+568,my+198,8)]:
        d.ellipse([mx_-mr, my_-mr, mx_+mr, my_+mr], fill=(210,220,235), outline=C["slate300"])

    # Province hotspot pins
    pins = [
        ("SMU", mx+118, my+100, C["amber"],    "68", "Sumatera Utara"),
        ("SMS", mx+140, my+185, C["amber"],    "52", "Sumatera Selatan"),
        ("JKT", mx+248, my+252, C["red"],      "91", "DKI Jakarta"),
        ("JBR", mx+285, my+248, C["red"],      "79", "Jawa Barat"),
        ("JTG", mx+325, my+252, C["green"],    "38", "Jawa Tengah"),
        ("JTM", mx+370, my+250, C["red"],      "84", "Jawa Timur"),
        ("BLI", mx+418, my+256, C["green"],    "32", "Bali"),
        ("IKN", mx+360, my+140, C["green"],    "28", "IKN / Kaltim"),
        ("SLS", mx+502, my+175, C["amber"],    "61", "Sulawesi Selatan"),
        ("PAP", mx+685, my+175, C["amber"],    "55", "Papua"),
    ]
    for code, px_, py_, pcol, score, name in pins:
        # Pulsing ring
        for r_ in [16, 10]:
            alpha = 100 if r_ == 16 else 180
            ring = Image.new("RGBA", (W, H), (0,0,0,0))
            rd = ImageDraw.Draw(ring)
            rd.ellipse([px_-r_, py_-r_, px_+r_, py_+r_], outline=(pcol[0],pcol[1],pcol[2],alpha), width=1)
            img.paste(ring, (0,0), ring)
        d = ImageDraw.Draw(img)
        d.ellipse([px_-7, py_-7, px_+7, py_+7], fill=pcol, outline=C["white"], width=1)
        # Tooltip on hover (Jakarta shown expanded)
        if code == "JKT":
            draw_rrect(d, [px_+10, py_-20, px_+120, py_+28], 6, fill=C["white"], outline=C["red"], width=2)
            d.text((px_+16, py_-14), "DKI JAKARTA", font=fnt("b", 10), fill=C["red"])
            d.text((px_+16, py_+2), f"Indeks: {score}", font=fnt("b", 10), fill=C["slate700"])
            d.text((px_+16, py_+16), "Bot: 71%", font=fnt("r", 9), fill=C["slate500"])
        else:
            lbl_x = px_+10 if px_ < mx+mw-80 else px_-int(fnt("b",9).getlength(code))-14
            d.text((lbl_x, py_-6), code, font=fnt("b", 9), fill=C["slate700"])

    # Map Legend
    for i, (lbl, col) in enumerate([("Ancaman Tinggi (>70)", C["red"]), ("Waspada (45-70)", C["amber"]), ("Aman / Normal (<45)", C["green"])]):
        lx3 = mx + 16 + i * 230
        d.ellipse([lx3, my+mh-28, lx3+14, my+mh-14], fill=col)
        d.text((lx3+20, my+mh-30), lbl, font=fnt("r", 10), fill=C["slate600"] if "slate600" in C else C["slate500"])

    # ── MITIGASI AI PANEL (right 35%)
    ax = mx + mw + 16
    aw = cw - mw - 16

    # Header
    draw_rrect(d, [ax, my, ax+aw, my+54], 10, fill=C["navy"])
    d.text((ax+14, my+8), "🤖  AI COGNITIVE SHIELD AGENT", font=fnt("b", 12), fill=C["white"])
    d.text((ax+14, my+26), "Rekomendasi Tindakan Mitigasi Aktif", font=fnt("r", 10), fill=(191, 219, 254))
    draw_rrect(d, [ax+aw-80, my+14, ax+aw-10, my+40], 6, fill=C["green"])
    d.text((ax+aw-70, my+20), "AKTIF ●", font=fnt("b", 10), fill=C["white"])

    # SitRep
    draw_rrect(d, [ax, my+62, ax+aw, my+200], 10, fill=C["white"], outline=C["slate200"])
    d.text((ax+14, my+74), "Executive SitRep — 09:34 WIB", font=fnt("b", 12), fill=C["slate900"])
    sitrep_lines = [
        "STATUS: DARURAT KOGNITIF — Level 5",
        "Operasi disinformasi finansial terdeteksi. Klaster",
        "342 bot aktif dengan pivot target: Rush Money.",
        "Sentimen Provokatif: 68%  |  Bot Score: 94%",
        "Klaster Aktif: 2  |  Hotspot: JKT, JBR, JTM",
    ]
    for j, line in enumerate(sitrep_lines):
        col = C["red"] if j==0 else C["slate600"] if "slate600" in C else C["slate500"]
        d.text((ax+14, my+96+j*18), line, font=fnt("b" if j==0 else "r", 10), fill=col)

    # Direktif Taktis
    draw_rrect(d, [ax, my+208, ax+aw, my+320], 10, fill=C["white"], outline=C["slate200"])
    d.text((ax+14, my+220), "Direktif Tindakan Taktis", font=fnt("b", 12), fill=C["slate900"])
    directives = [
        ("🔴", "Luncurkan Flash Clearance OJK/BI", C["red"]),
        ("🟡", "Aktifkan unit kontra-narasi media sosial", C["amber"]),
        ("🟢", "Distribusikan konten penyejuk via channel resmi", C["green"]),
        ("🔵", "Laporkan akun bot ke platform X, TikTok, Telegram", C["blue_b"]),
    ]
    for j, (icon, txt, col) in enumerate(directives):
        draw_rrect(d, [ax+14, my+240+j*18, ax+aw-14, my+256+j*18], 4, fill=(col[0],col[1],col[2],20) if col!=C["blue_b"] else (59,130,246,20))
        d.text((ax+18, my+241+j*18), f"{icon}  {txt}", font=fnt("r", 10), fill=C["slate700"])

    # Export buttons
    draw_rrect(d, [ax, my+328, ax+aw, my+400], 10, fill=C["white"], outline=C["slate200"])
    d.text((ax+14, my+340), "Ekspor Dokumen Intelijen", font=fnt("b", 12), fill=C["slate900"])
    btn_data = [("📄 Cetak SitRep PDF", C["red"]), ("📋 Unduh Markdown .md", C["header"]), ("📊 Ekspor CSV Metrik", C["green"])]
    for j, (btn_lbl, btn_col) in enumerate(btn_data):
        bx_ = ax + 14 + j * 125
        draw_rrect(d, [bx_, my+362, bx_+118, my+390], 6, fill=btn_col)
        d.text((bx_+8, my+369), btn_lbl, font=fnt("b", 9), fill=C["white"])

    # Timeline bar (narrow at bottom of right panel)
    draw_rrect(d, [ax, my+410, ax+aw, my+450], 10, fill=C["white"], outline=C["slate200"])
    d.text((ax+14, my+420), "Riwayat EWS Level — 7 Hari Terakhir", font=fnt("b", 10), fill=C["slate700"])
    days_ews = [(1,C["green"]),(1,C["green"]),(2,C["cyan"]),(3,C["amber"]),(4,C["orange"]),(5,C["red"]),(5,C["red"])]
    bw3 = aw - 30
    for k, (lvl, col) in enumerate(days_ews):
        ex = ax + 14 + int(k * bw3 / len(days_ews))
        eh = int(lvl * 6)
        d.rectangle([ex, my+445-eh, ex+int(bw3/len(days_ews))-4, my+445], fill=col)

    save_png(img, "Screenshot_05_Peta_Nusantara_Mitigasi.PNG")


# ─────────────────────────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    print(f"\n SONAR v2.5 AI — Screenshot Generator")
    print(f" Output → {OUT}\n")
    screenshot_01()
    screenshot_02()
    screenshot_03()
    screenshot_04()
    screenshot_05()
    print("\n Semua screenshot berhasil dibuat!")
    files = [f for f in os.listdir(OUT) if f.endswith(".PNG")]
    for f in sorted(files):
        kb = os.path.getsize(os.path.join(OUT, f)) / 1024
        print(f"   {f}  ({kb:.1f} KB)")
