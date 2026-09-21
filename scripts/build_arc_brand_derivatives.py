#!/usr/bin/env python3
"""Build ARC-only rail and install artwork from approved repository sources.

No letterform is drawn or reconstructed here. The immutable ARC pixels are
cropped from the approved primary logo, resized proportionally, and composited.
"""
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter


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


def fit(image, width, height):
    scale = min(width / image.width, height / image.height)
    dimensions = (round(image.width * scale), round(image.height * scale))
    return image.resize(dimensions, LANCZOS)


def cover(image, size):
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    return image.crop((left, top, left + side, top + side)).resize((size, size), LANCZOS)


def _metal_field(size):
    """Deterministic champagne-gold field with physical tonal variation."""
    field = Image.new("RGBA", (size, size))
    pixels = field.load()
    for y in range(size):
        for x in range(size):
            diagonal = (x + y) / (2 * max(1, size - 1))
            wave = (1 + math.sin((diagonal * 8.0 + y / size) * math.pi)) / 2
            highlight = max(0.0, 1.0 - abs(diagonal - 0.32) / 0.075)
            shade = 0.70 + 0.20 * wave + 0.22 * highlight
            pixels[x, y] = (
                min(255, round(226 * shade)),
                min(255, round(172 * shade)),
                min(255, round(73 * shade)),
                255,
            )
    return field


def _icon_master(lettermark, maskable=False):
    """Render the approved artwork at 2x, then resolve the 512px master."""
    size = 1024
    source = cover(Image.open(BACKGROUND).convert("RGB"), size)
    source = ImageEnhance.Contrast(source).enhance(1.16)
    source = ImageEnhance.Color(source).enhance(1.08)
    source = ImageEnhance.Brightness(source).enhance(0.76)
    source = Image.blend(source, Image.new("RGB", (size, size), (3, 19, 36)), 0.13)
    source = ImageEnhance.Sharpness(source).enhance(1.24).convert("RGBA")

    # A restrained cool illumination brings forward the approved smoke and the
    # metallic lettermark without flattening the industrial source artwork.
    light = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    light_px = light.load()
    cx, cy = size * 0.50, size * 0.46
    for y in range(size):
        for x in range(size):
            distance = (((x - cx) / (size * 0.56)) ** 2 + ((y - cy) / (size * 0.42)) ** 2) ** 0.5
            alpha = round(48 * max(0.0, 1.0 - distance) ** 2)
            light_px[x, y] = (24, 105, 170, alpha)
    source = Image.alpha_composite(source, light)

    # The polished perimeter begins at the actual canvas boundary. There is no
    # ordinary-background band outside it. Multiple masks create reflective
    # metal depth rather than a flat yellow outline.
    outer = Image.new("L", (size, size), 0)
    ImageDraw.Draw(outer).rounded_rectangle((0, 0, size - 1, size - 1), radius=150, fill=255)
    inner_inset = 27
    inner = Image.new("L", (size, size), 0)
    ImageDraw.Draw(inner).rounded_rectangle(
        (inner_inset, inner_inset, size - inner_inset - 1, size - inner_inset - 1),
        radius=126,
        fill=255,
    )
    ring = ImageChops.subtract(outer, inner)
    glow = ring.filter(ImageFilter.GaussianBlur(18))
    glow_layer = Image.new("RGBA", (size, size), (236, 178, 66, 0))
    glow_layer.putalpha(glow.point(lambda value: round(value * 0.42)))
    source = Image.alpha_composite(source, glow_layer)
    metal = _metal_field(size)
    metal.putalpha(ring)
    source = Image.alpha_composite(source, metal)

    # Fine inner/outer highlights provide a polished edge at normal icon size.
    edge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    edge_draw = ImageDraw.Draw(edge)
    edge_draw.rounded_rectangle((2, 2, size - 3, size - 3), radius=148, outline=(255, 231, 158, 230), width=4)
    edge_draw.rounded_rectangle((inner_inset, inner_inset, size - inner_inset - 1, size - inner_inset - 1), radius=126, outline=(99, 59, 17, 210), width=5)
    edge_draw.rounded_rectangle((inner_inset + 5, inner_inset + 5, size - inner_inset - 6, size - inner_inset - 6), radius=121, outline=(255, 215, 119, 145), width=3)
    source = Image.alpha_composite(source, edge)

    # Remove only sub-visible alpha fringe from the locked derivative so its
    # actual artwork—not transparent canvas—controls fit. Pixel geometry and
    # relative A/R/C spacing remain untouched.
    visible_alpha = lettermark.getchannel("A").point(lambda value: 255 if value >= 8 else 0)
    visible_box = visible_alpha.getbbox()
    if visible_box != (34, 3, 617, 144):
        raise RuntimeError(f"Unexpected locked-lettermark visible bounds: {visible_box}")
    icon_mark = lettermark.crop(visible_box)
    mark_width = round(size * (0.78 if maskable else 0.925))
    mark = fit(icon_mark, mark_width, round(size * 0.29))
    x = (size - mark.width) // 2
    y = round(size * 0.475 - mark.height / 2)
    shadow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    shadow.alpha_composite(mark, (x, y + 10))
    shadow_alpha = shadow.getchannel("A").filter(ImageFilter.GaussianBlur(12))
    shadow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    shadow.putalpha(shadow_alpha.point(lambda value: round(value * 0.52)))
    source = Image.alpha_composite(source, shadow)
    source.alpha_composite(mark, (x, y))
    return source.resize((512, 512), LANCZOS)


def _favicon(lettermark, master):
    """Simplify at tiny scale while retaining the exact approved ARC pixels."""
    canvas = master.resize((256, 256), LANCZOS)
    alpha = lettermark.getchannel("A").point(lambda value: 255 if value >= 8 else 0)
    mark = fit(lettermark.crop(alpha.getbbox()), 244, 78)
    shade = Image.new("RGBA", canvas.size, (1, 10, 20, 205))
    canvas = Image.alpha_composite(canvas, shade)
    canvas.alpha_composite(mark, ((256 - mark.width) // 2, (256 - mark.height) // 2))
    return canvas.resize((32, 32), LANCZOS)


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

    general = _icon_master(rail, False)
    maskable = _icon_master(rail, True)
    general.save(ICONS / "icon-512.png", optimize=True)
    maskable.save(ICONS / "icon-maskable-512.png", optimize=True)
    general.resize((192, 192), LANCZOS).save(ICONS / "icon-192.png", optimize=True)
    maskable.resize((192, 192), LANCZOS).save(ICONS / "icon-maskable-192.png", optimize=True)
    general.resize((180, 180), LANCZOS).save(ICONS / "apple-touch-icon-180.png", optimize=True)
    _favicon(rail, general).save(ICONS / "favicon-32.png", optimize=True)


if __name__ == "__main__":
    main()
