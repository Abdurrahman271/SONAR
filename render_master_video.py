import os
import subprocess
import imageio_ffmpeg

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
BUILD_DIR = "demo_build"
PARTS_DIR = "demo_build/parts"
os.makedirs(PARTS_DIR, exist_ok=True)

def run_ffmpeg(cmd, desc=""):
    print(f"\n[FFMPEG] {desc}...")
    full_cmd = [FFMPEG_EXE, "-y"] + cmd
    res = subprocess.run(full_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error in {desc}:")
        print(res.stderr[-500:])
        raise RuntimeError(f"FFMPEG failed with code {res.returncode}")
    print(f"✓ {desc} completed.")

def get_audio_duration(file_path):
    cmd = [FFMPEG_EXE, "-i", file_path]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            parts = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = parts.split(":")
            return float(h) * 3600 + float(m) * 60 + float(s)
    return 0.0

def build_scene_1(dur):
    # Scene 1: 0 to dur/2 is Title Card, dur/2 to dur is Threat Slide
    half = dur / 2.0
    overlay = "demo_build/overlays/overlay_scene_01.png"
    audio = "demo_build/audio/scene_01_intro.mp3"
    out_file = f"{PARTS_DIR}/part_01.mp4"

    # Part A
    run_ffmpeg([
        "-loop", "1", "-i", "demo/visual_assets/01_Intro_Title_Card.png",
        "-t", f"{half:.2f}",
        "-vf", "scale=1920:1080,fps=30,format=yuv420p",
        f"{PARTS_DIR}/s1_a.mp4"
    ], "Render Scene 1A Title")

    # Part B
    run_ffmpeg([
        "-loop", "1", "-i", "demo/visual_assets/02_Latar_Belakang_Ancaman_Kognitif.png",
        "-t", f"{(dur - half):.2f}",
        "-vf", "scale=1920:1080,fps=30,format=yuv420p",
        f"{PARTS_DIR}/s1_b.mp4"
    ], "Render Scene 1B Threat")

    # Concat s1_a and s1_b
    concat_txt = f"{PARTS_DIR}/s1_concat.txt"
    with open(concat_txt, "w") as f:
        f.write(f"file 's1_a.mp4'\nfile 's1_b.mp4'\n")

    run_ffmpeg([
        "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-i", overlay,
        "-i", audio,
        "-filter_complex", "[0:v][1:v]overlay=0:0[v]",
        "-map", "[v]", "-map", "2:a",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
        "-shortest", out_file
    ], "Render Scene 1 Final")

def build_slide_scene(scene_num, slide_img, overlay_img, audio_path, dur):
    out_file = f"{PARTS_DIR}/part_{scene_num:02d}.mp4"
    run_ffmpeg([
        "-loop", "1", "-i", slide_img,
        "-i", overlay_img,
        "-i", audio_path,
        "-t", f"{dur:.2f}",
        "-filter_complex", "[0:v]scale=1920:1080,fps=30[scaled];[scaled][1:v]overlay=0:0[v]",
        "-map", "[v]", "-map", "2:a",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
        "-shortest", out_file
    ], f"Render Scene {scene_num} Final")

def build_live_scene(scene_num, raw_webm, overlay_img, audio_path, dur):
    out_file = f"{PARTS_DIR}/part_{scene_num:02d}.mp4"
    run_ffmpeg([
        "-stream_loop", "-1", "-i", raw_webm,
        "-i", overlay_img,
        "-i", audio_path,
        "-t", f"{dur:.2f}",
        "-filter_complex", "[0:v]scale=1920:1080,fps=30[scaled];[scaled][1:v]overlay=0:0[v]",
        "-map", "[v]", "-map", "2:a",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
        "-shortest", out_file
    ], f"Render Scene {scene_num} Live Screencast Final")

def main():
    print("=== STARTING FULL BROADCAST DEMO VIDEO COMPOSITION ===")

    # 1. Measure audio durations
    durs = {}
    scenes_keys = [
        "scene_01_intro",
        "scene_02_benefits",
        "scene_03_architecture",
        "scene_04_live_overview",
        "scene_05_live_inspector_radar",
        "scene_06_live_map",
        "scene_07_live_scenarios_sitrep",
        "scene_08_conclusion"
    ]
    for k in scenes_keys:
        a_path = f"demo_build/audio/{k}.mp3"
        d = get_audio_duration(a_path)
        durs[k] = d
        print(f"Audio {k}: {d:.2f}s")

    # 2. Build each scene
    # Scene 1: Intro & Latar Belakang
    build_scene_1(durs["scene_01_intro"])

    # Scene 2: 4 Manfaat Utama
    build_slide_scene(
        2,
        "demo/visual_assets/04_Tabel_Manfaat_Komparatif.png",
        "demo_build/overlays/overlay_scene_02.png",
        "demo_build/audio/scene_02_benefits.mp3",
        durs["scene_02_benefits"]
    )

    # Scene 3: Arsitektur AI
    build_slide_scene(
        3,
        "demo/visual_assets/03_Arsitektur_Teknologi_AI.png",
        "demo_build/overlays/overlay_scene_03.png",
        "demo_build/audio/scene_03_architecture.mp3",
        durs["scene_03_architecture"]
    )

    # Scene 4: Live Dasbor Utama & Pemantauan
    build_live_scene(
        4,
        "demo_build/recordings/raw_scene_04.webm",
        "demo_build/overlays/overlay_scene_04.png",
        "demo_build/audio/scene_04_live_overview.mp3",
        durs["scene_04_live_overview"]
    )

    # Scene 5: Live Inspektor NLP & Radar Botnet
    build_live_scene(
        5,
        "demo_build/recordings/raw_scene_05.webm",
        "demo_build/overlays/overlay_scene_05.png",
        "demo_build/audio/scene_05_live_inspector_radar.mp3",
        durs["scene_05_live_inspector_radar"]
    )

    # Scene 6: Live Peta 38 Provinsi
    build_live_scene(
        6,
        "demo_build/recordings/raw_scene_06.webm",
        "demo_build/overlays/overlay_scene_06.png",
        "demo_build/audio/scene_06_live_map.mp3",
        durs["scene_06_live_map"]
    )

    # Scene 7: Live 14 Skenario & SitRep A4
    build_live_scene(
        7,
        "demo_build/recordings/raw_scene_07.webm",
        "demo_build/overlays/overlay_scene_07.png",
        "demo_build/audio/scene_07_live_scenarios_sitrep.mp3",
        durs["scene_07_live_scenarios_sitrep"]
    )

    # Scene 8: Kesimpulan & Penutup
    build_slide_scene(
        8,
        "demo/visual_assets/05_Outro_Closing_Card.png",
        "demo_build/overlays/overlay_scene_08.png",
        "demo_build/audio/scene_08_conclusion.mp3",
        durs["scene_08_conclusion"]
    )

    # 3. Concatenate all 8 parts into final demo.mp4
    master_concat_txt = f"{PARTS_DIR}/master_concat.txt"
    with open(master_concat_txt, "w") as f:
        for i in range(1, 9):
            f.write(f"file 'part_{i:02d}.mp4'\n")

    out_root = "d:/SONAR/demo.mp4"
    out_demo = "d:/SONAR/demo/demo.mp4"

    run_ffmpeg([
        "-f", "concat", "-safe", "0", "-i", master_concat_txt,
        "-c", "copy",
        out_root
    ], "Assemble Master demo.mp4")

    # Copy to demo/demo.mp4
    import shutil
    shutil.copyfile(out_root, out_demo)
    print(f"✓ Copied master video to {out_demo}")

    total_dur = get_audio_duration(out_root)
    file_size_mb = os.path.getsize(out_root) / (1024 * 1024)
    print("\n=======================================================")
    print(f"SUCCESS! Master Video Generated:")
    print(f"  Path: {out_root}")
    print(f"  Demo Path: {out_demo}")
    print(f"  Duration: {total_dur:.2f}s ({total_dur/60:.2f} minutes)")
    print(f"  Size: {file_size_mb:.2f} MB")
    print("=======================================================")

if __name__ == "__main__":
    main()
