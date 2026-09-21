# ARC Welding/Titanium approved artwork

The files in `source/` preserve the supplied authoritative bytes. They are not edited by the application build.

| Source | SHA-256 |
|---|---|
| `arc-titanium-authoritative-visual-reference-v1.jpg` | `04824a21ed3b47f2976cef351fedc3ebd8cf7bbb0d3dfc6a796f24727ac62787` |
| `arc-titanium-industrial-background-approved.png` | `ba903d24f846b4ec43dc5d5edecbb7d8b7774c9a3332ae540a397ff5241201e4` |
| `arc-welding-dashboard-hero-approved.png` | `8b308c7f5d6a475b00440d370a0ce6b8012e537803a813cd35b0840ba2af2b12` |
| `arc-welding-primary-logo-approved.png` | `dd0f686506ed0d05f986017b97af7a4808a47451e4fa5e002e40f1fba98c01d1` |

`runtime/` contains local tablet delivery variants. The two photographic assets are resized to 1440×805 WebP. The primary logo is a transparency-preserving 960-pixel PNG.

## ARC-only derivatives

`scripts/build_arc_brand_derivatives.py` is the sole production method. It crops source pixels `(0, 0, 2048, 410)` from the approved 2048×682 primary logo, trims only the transparent rightmost pixel, and resizes proportionally with Lanczos. That boundary retains the complete ARC letters and welding flare/streak while excluding Advanced Welding Classroom, the signature, and Learn/Practice/Master. No letter is drawn, reconstructed, re-spaced, or generated.

| Derivative | Dimensions | SHA-256 |
|---|---:|---|
| `runtime/arc-welding-lettermark-720.png` | 720×144 | `8f704c138ac8e32a4ef8ac76e3561677e3b5b500f232d36d8d7c0fbc142c4be1` |
| `../../icons/favicon-32.png` | 32×32 | `eba86ceff3722534e313eb660a20f60d90315407da25b788839c1123759d8970` |
| `../../icons/apple-touch-icon-180.png` | 180×180 | `930010ce9c10195d6bc00c56d3da79405c090563a5ac93efe102cbbe91adba6c` |
| `../../icons/icon-192.png` | 192×192 | `aea9731650741cee6c986c51ba3f3caa0976cfc6c145bdca7329a09fd927480b` |
| `../../icons/icon-512.png` | 512×512 | `e8a6cc7461df996e439351ab976f4cdcbee811153433715434547330734570a2` |
| `../../icons/icon-maskable-192.png` | 192×192 | `7aa98bcd3062bda79b0a15b111a15c4b088c213c242d718ebbdba17e82e535d7` |
| `../../icons/icon-maskable-512.png` | 512×512 | `fc3e82250828505165fec5c6e0a77e0f332990fcb9d8c31fef17bd5a2e159f2d` |

App icons use a deterministic centered crop of the approved industrial background, a fixed dark-blue blend, a fixed gold rounded border, and the same ARC-only PNG. General-purpose and maskable variants use separate safe-area insets. The A/R/C pixel geometry and relative spacing remain unchanged apart from proportional scaling.
