#!/usr/bin/env python3
"""Build ARC-only rail and install artwork from approved repository sources.

No letterform is drawn or reconstructed here. The immutable ARC pixels are
cropped from the approved primary logo, resized proportionally, and composited.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
PRIMARY = ROOT / "assets/brand/source/arc-welding-primary-logo-approved.png"
BACKGROUND = ROOT / "assets/brand/source/arc-titanium-industrial-background-approved.png"
RUNTIME = ROOT / "assets/brand/runtime"
ICONS = ROOT / "icons"

# Pixel boundary between the approved ARC lettermark and the subtitle stack.
# The crop keeps the complete flare/streak and preserves all source x positions.
LETTERMARK_CROP = (0, 0, 2048, 410)
LANCZOS = Image.Resampling.LANCZOS


def contain(image, width, height):
    result = image.copy()
    result.thumbnail((width, height), LANCZOS)
    return result


def cover(image, size):
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    return image.crop((left, top, left + side, top + side)).resize((size, size), LANCZOS)


def app_icon(lettermark, size, maskable=False):
    background = cover(Image.open(BACKGROUND).convert("RGB"), size)
    background = ImageEnhance.Brightness(background).enhance(0.48)
    blue = Image.new("RGB", (size, size), (6, 25, 45))
    background = Image.blend(background, blue, 0.34).convert("RGBA")

    inset = round(size * (0.105 if maskable else 0.045))
    radius = round(size * 0.105)
    stroke = max(2, round(size * 0.010))
    draw = ImageDraw.Draw(background)
    draw.rounded_rectangle(
        (inset, inset, size - inset - 1, size - inset - 1),
        radius=radius,
        outline=(218, 168, 61, 255),
        width=stroke,
    )

    mark_width = round(size * (0.70 if maskable else 0.80))
    mark_height = round(size * 0.30)
    mark = contain(lettermark, mark_width, mark_height)
    x = (size - mark.width) // 2
    y = (size - mark.height) // 2
    background.alpha_composite(mark, (x, y))
    return background


def main():
    RUNTIME.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)

    source = Image.open(PRIMARY).convert("RGBA")
    if source.size != (2048, 682):
        raise RuntimeError(f"Unexpected approved primary-logo dimensions: {source.size}")
    lettermark = source.crop(LETTERMARK_CROP)
    alpha_box = lettermark.getchannel("A").getbbox()
    if alpha_box != (0, 0, 2047, 410):
        raise RuntimeError(f"Unexpected ARC crop alpha bounds: {alpha_box}")
    lettermark = lettermark.crop(alpha_box)
    rail = contain(lettermark, 720, 720)
    rail.save(RUNTIME / "arc-welding-lettermark-720.png", optimize=True)

    for size in (192, 512):
        app_icon(rail, size, False).save(ICONS / f"icon-{size}.png", optimize=True)
        app_icon(rail, size, True).save(ICONS / f"icon-maskable-{size}.png", optimize=True)
    app_icon(rail, 180, False).save(ICONS / "apple-touch-icon-180.png", optimize=True)
    app_icon(rail, 32, False).save(ICONS / "favicon-32.png", optimize=True)


if __name__ == "__main__":
    main()
