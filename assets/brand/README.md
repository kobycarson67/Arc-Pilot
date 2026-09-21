# ARC Welding/Titanium approved artwork

The files in `source/` preserve the supplied authoritative bytes. They are not edited by the application build.

| Source | SHA-256 |
|---|---|
| `arc-titanium-authoritative-visual-reference-v1.jpg` | `04824a21ed3b47f2976cef351fedc3ebd8cf7bbb0d3dfc6a796f24727ac62787` |
| `arc-titanium-industrial-background-approved.png` | `ba903d24f846b4ec43dc5d5edecbb7d8b7774c9a3332ae540a397ff5241201e4` |
| `arc-welding-dashboard-hero-approved.png` | `8b308c7f5d6a475b00440d370a0ce6b8012e537803a813cd35b0840ba2af2b12` |
| `arc-welding-primary-logo-approved.png` | `dd0f686506ed0d05f986017b97af7a4808a47451e4fa5e002e40f1fba98c01d1` |

`runtime/` contains local tablet delivery variants. The two photographic assets are resized to 1440×805 WebP. The primary logo is a transparency-preserving 960-pixel PNG. The compact rail mark is a deterministic crop of the approved logo artwork, retaining the exact separated A/R/C geometry; it is not a redraw.

No favicon, PWA icon, or install icon was replaced. A safe production app-icon conversion needs an explicitly approved square treatment and mask/safe-zone review; inventing one here would violate the logo-geometry requirement.
