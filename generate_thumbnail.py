import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_thumbnail():
    WIDTH = 1200
    HEIGHT = 630

    # 1. Base Canvas - Deep Cyber Navy Slate
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), color=(10, 15, 29, 255))
    draw = ImageDraw.Draw(canvas)

    # Fonts
    font_dir = r"C:\Windows\Fonts"
    f_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 44)
    f_version = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    f_sub = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    f_desc = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 13)
    f_tag = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 11)
    f_card_t = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 13)
    f_card_d = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 11)
    f_pill = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 11)
    f_footer = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 11)
    f_footer_b = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 11)

    # 2. Tech Background Elements (Subtle Grid & Glow)
    # Background subtle radial/ambient blue glow behind mockup on right
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([500, 40, 1180, 580], fill=(26, 86, 219, 45))
    glow_draw.ellipse([700, 100, 1100, 500], fill=(37, 99, 235, 30))
    glow = glow.filter(ImageFilter.GaussianBlur(50))
    canvas.paste(glow, (0, 0), glow)

    # Subtle tech grid dots
    for x in range(30, WIDTH, 35):
        for y in range(30, HEIGHT - 50, 35):
            if x < 480 or y > 530:
                canvas.putpixel((x, y), (30, 41, 59, 255))

    # Top category badge
    badge_x, badge_y = 50, 42
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 360, badge_y + 26], radius=13, fill=(15, 23, 42, 220), outline=(59, 130, 246), width=1)
    # Glowing dot in badge
    draw.ellipse([badge_x + 10, badge_y + 8, badge_x + 20, badge_y + 18], fill=(59, 130, 246))
    draw.text((badge_x + 28, badge_y + 5), "SISTEM PERINGATAN DINI KOGNITIF  •  EWS AI", font=f_tag, fill=(191, 219, 254))

    # Main Brand Title
    title_y = 80
    draw.text((50, title_y), "SONAR", font=f_title, fill=(255, 255, 255))
    # Version badge next to SONAR
    v_badge_x = 225
    draw.rounded_rectangle([v_badge_x, title_y + 12, v_badge_x + 85, title_y + 38], radius=6, fill=(26, 86, 219), outline=(96, 165, 250), width=1)
    draw.text((v_badge_x + 10, title_y + 15), "v2.5 AI", font=f_version, fill=(255, 255, 255))

    # Full Name Subtitle
    sub_y = title_y + 60
    draw.text((50, sub_y), "Sistem Observasi Narasi & Analisis Reaksi", font=f_sub, fill=(147, 197, 253))

    # Summary Description
    desc_y = sub_y + 28
    desc_text_1 = "Dasbor intelijen ruang siber sosial bertenaga AI Agent untuk memantau,"
    desc_text_2 = "mengklasifikasi teks narasi publik, serta mendeteksi operasi disinformasi"
    desc_text_3 = "dan sindikat botnet terkoordinasi secara real-time."
    draw.text((50, desc_y), desc_text_1, font=f_desc, fill=(148, 163, 184))
    draw.text((50, desc_y + 18), desc_text_2, font=f_desc, fill=(148, 163, 184))
    draw.text((50, desc_y + 36), desc_text_3, font=f_desc, fill=(148, 163, 184))

    # 3 Feature Cards
    cards_start_y = desc_y + 65
    card_w = 405
    card_h = 58
    card_gap = 12

    feature_cards = [
        ("Early Warning System (EWS 5-Level)", "Deteksi lonjakan velositas narasi & ancaman kognitif instan", (224, 36, 36)),
        ("NLP & Botnet Classifier (92.4% Akurasi)", "Klasifikasi sentimen, astroturfing & taktik propaganda", (245, 158, 11)),
        ("AI Tactical Agent & Mitigasi Otomatis", "Penyusunan SitRep pimpinan & draf multi-tone kontra-narasi", (16, 185, 129))
    ]

    for i, (c_title, c_desc, c_color) in enumerate(feature_cards):
        cy = cards_start_y + i * (card_h + card_gap)
        # Card background
        draw.rounded_rectangle([50, cy, 50 + card_w, cy + card_h], radius=8, fill=(15, 23, 42, 230), outline=(30, 41, 59), width=1)
        # Left color strip
        draw.rounded_rectangle([50, cy, 55, cy + card_h], radius=3, fill=c_color)
        # Card title
        draw.text((68, cy + 8), c_title, font=f_card_t, fill=(241, 245, 249))
        # Card desc
        draw.text((68, cy + 28), c_desc, font=f_card_d, fill=(148, 163, 184))

    # Stat Pills under cards
    pill_y = cards_start_y + 3 * (card_h + card_gap) + 8
    pills = [
        (">95% Efisiensi Waktu", (26, 86, 219)),
        ("92.4% Akurasi AI", (16, 185, 129)),
        ("Real-Time EWS", (224, 36, 36))
    ]
    px = 50
    for p_text, p_col in pills:
        pw = int(f_pill.getlength(p_text)) + 24
        draw.rounded_rectangle([px, pill_y, px + pw, pill_y + 24], radius=6, fill=(15, 23, 42), outline=p_col, width=1)
        draw.text((px + 12, pill_y + 4), p_text, font=f_pill, fill=(226, 232, 240))
        px += pw + 12

    # 4. Device Mockup on Right Side
    mockup_path = r"C:\Users\Abdurrahman\.gemini\antigravity\brain\d4e07e3f-d190-4120-ae21-d68de86bc837\.user_uploaded\media_1794448880001_2064ddda.jpg"
    if os.path.exists(mockup_path):
        mockup = Image.open(mockup_path).convert("RGBA")
        
        # Frame dimensions
        frame_x = 485
        frame_y = 42
        frame_w = 665
        frame_h = 495

        # Resize & crop mockup to fill frame gracefully
        m_w, m_h = mockup.size
        scale = max(frame_w / m_w, frame_h / m_h)
        new_w = int(m_w * scale)
        new_h = int(m_h * scale)
        resized_mockup = mockup.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center crop
        crop_x = (new_w - frame_w) // 2
        crop_y = (new_h - frame_h) // 2
        cropped_mockup = resized_mockup.crop((crop_x, crop_y, crop_x + frame_w, crop_y + frame_h))

        # Create rounded mask
        mask = Image.new("L", (frame_w, frame_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, frame_w, frame_h], radius=16, fill=255)

        # Drop shadow for frame
        shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle([frame_x - 4, frame_y + 6, frame_x + frame_w + 4, frame_y + frame_h + 12], radius=18, fill=(0, 0, 0, 180))
        shadow = shadow.filter(ImageFilter.GaussianBlur(10))
        canvas.paste(shadow, (0, 0), shadow)

        # Paste framed mockup
        canvas.paste(cropped_mockup, (frame_x, frame_y), mask)

        # Border for framed mockup
        border_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        b_draw = ImageDraw.Draw(border_overlay)
        b_draw.rounded_rectangle([frame_x, frame_y, frame_x + frame_w, frame_y + frame_h], radius=16, outline=(59, 130, 246, 200), width=2)
        canvas.paste(border_overlay, (0, 0), border_overlay)

        # Floating Badges over device mockup
        # 1. Top Left: DARURAT KOGNITIF ALERT
        alert_w = 265
        alert_h = 32
        ax, ay = frame_x + 16, frame_y + 16
        draw.rounded_rectangle([ax, ay, ax + alert_w, ay + alert_h], radius=8, fill=(224, 36, 36, 240), outline=(254, 202, 202), width=1)
        draw.text((ax + 12, ay + 7), "⚠ DARURAT KOGNITIF: INDEKS 92", font=f_card_t, fill=(255, 255, 255))

        # 2. Top Right: ENGINE ONLINE
        online_w = 145
        online_h = 32
        ox, oy = frame_x + frame_w - online_w - 16, frame_y + 16
        draw.rounded_rectangle([ox, oy, ox + online_w, oy + online_h], radius=8, fill=(15, 23, 42, 220), outline=(16, 185, 129), width=1)
        # green dot
        draw.ellipse([ox + 12, oy + 11, ox + 22, oy + 21], fill=(16, 185, 129))
        draw.text((ox + 28, oy + 7), "ENGINE ONLINE", font=f_tag, fill=(167, 243, 208))

        # 3. Bottom Banner: RESPONSIVE MULTI-DEVICE
        resp_w = 460
        resp_h = 36
        rx = frame_x + (frame_w - resp_w) // 2
        ry = frame_y + frame_h - resp_h - 16
        draw.rounded_rectangle([rx, ry, rx + resp_w, ry + resp_h], radius=18, fill=(15, 23, 42, 235), outline=(59, 130, 246), width=2)
        resp_text = "📱 100% RESPONSIVE: DESKTOP  •  TABLET  •  MOBILE"
        draw.text((rx + 22, ry + 9), resp_text, font=f_card_t, fill=(255, 255, 255))

    # 5. Bottom Footer Bar (Divider & Metadata)
    foot_y = 562
    draw.line([(40, foot_y), (WIDTH - 40, foot_y)], fill=(30, 41, 59), width=1)

    # Footer Left
    draw.text((50, foot_y + 14), "KARYA INOVASI TEKNOLOGI KEAMANAN SIBER & AI", font=f_footer_b, fill=(148, 163, 184))
    draw.text((360, foot_y + 14), "•", font=f_footer, fill=(71, 85, 105))
    draw.text((375, foot_y + 14), "Sistem Observasi Narasi & Analisis Reaksi (SONAR)", font=f_footer, fill=(100, 116, 139))

    # Footer Right (Tech Stack)
    tech_str = "React 19  •  TypeScript  •  Vite  •  Tailwind CSS v4  •  Framer Motion"
    t_len = int(f_footer.getlength(tech_str))
    draw.text((WIDTH - 50 - t_len, foot_y + 14), tech_str, font=f_footer, fill=(147, 197, 253))

    # Convert to RGB (strict compliance with PNG standard)
    rgb_canvas = canvas.convert("RGB")

    # Save initial file
    output_path = r"d:\SONAR\Thumbnail.PNG"
    public_path = r"d:\SONAR\public\Thumbnail.PNG"
    
    # Save optimized
    rgb_canvas.save(output_path, format="PNG", optimize=True)
    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"Generated at: {output_path}")
    print(f"Dimensions: {rgb_canvas.size}")
    print(f"File size: {file_size_kb:.2f} KB")

    # If file size is > 500 KB, optimize with adaptive palette or color reduction
    if file_size_kb > 495:
        print("Size exceeds 495 KB, applying adaptive color quantization...")
        quantized = rgb_canvas.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
        quantized.save(output_path, format="PNG", optimize=True)
        file_size_kb = os.path.getsize(output_path) / 1024
        print(f"Optimized size: {file_size_kb:.2f} KB")

    # Also save a copy in public/ for web asset access
    os.makedirs(os.path.dirname(public_path), exist_ok=True)
    import shutil
    shutil.copy2(output_path, public_path)
    print(f"Copied to: {public_path}")

if __name__ == "__main__":
    generate_thumbnail()
