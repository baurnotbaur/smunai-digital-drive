---
name: S-Munai Digital Experience
description: High-craft Apple-style digital ecosystem for S-Munai 30th anniversary
colors:
  primary: "oklch(0.464 0.079 219.5)"
  primary-deep: "oklch(0.315 0.062 220)"
  primary-deeper: "oklch(0.215 0.05 221)"
  gold: "oklch(0.749 0.113 76.6)"
  gold-bright: "oklch(0.82 0.135 82)"
  terracotta: "oklch(0.474 0.117 40.5)"
  background: "oklch(0.987 0.006 90)"
  foreground: "oklch(0.264 0.019 220)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.129 0.042 264.695)"
  primary-hex: "#0D6C89"
  gold-hex: "#D4AF37"
  neutral-dark: "#1A1A1A"
  neutral-muted: "#777777"
typography:
  display:
    fontFamily: "Oswald, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  accent-serif:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontWeight: 500
    fontStyle: "italic"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
  card: "0.875rem"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
---

# Design System: S-Munai (С-Мұнай)

## Overview

A premium, restrained, Apple-inspired editorial design system for the 30th anniversary of S-Munai (1996–2026).
Rooted in the pride of the Ulytau region («Жанармай — көлікке, Ұлытау — жүректе»), the system marries deep mineral teal with luminous gold foil accents, generous negative space, and crisp typographic hierarchy.

## Colors

- **Primary Teal** (`oklch(0.464 0.079 219.5)`): The bedrock identity of S-Munai, evoking stability, quality, and calm assurance.
- **Deep Teal & Deeper Teal** (`oklch(0.315 0.062 220)` / `oklch(0.215 0.05 221)`): Used for cinematic nighttime hero sections, vouchers, and footers.
- **Radiant Gold** (`oklch(0.749 0.113 76.6)` & bright `oklch(0.82 0.135 82)`): Reserved for milestone badges, key primary CTAs, and active fuel card foil elements.
- **Terracotta Accent** (`oklch(0.474 0.117 40.5)`): Subtle warmth for location pins and secondary tags, referencing the mineral red earth of Ulytau.

## Typography

- **Headings & Display**: `Oswald` — confident, vertical, condensed modern grotesque. Speaks with mechanical precision and architectural presence.
- **Body & Controls**: `Montserrat` — balanced, geometric clarity for high legibility in Russian and Kazakh text.
- **Editorial Voice**: `Cormorant Garamond` (italic) — heritage notes, 30th anniversary milestone kickers, and brand slogans.

## Layout

- **Max content container**: `max-w-6xl` (1152px) with fluid horizontal padding (`px-5 sm:px-8`).
- **Section rhythm**: generous vertical breathing room (`py-20 sm:py-28`), demarcated by subtle highway-stripe dividers (`road-stripe`).
- **Cards & Surfaces**: Flat-to-subtle elevation, avoiding nested card traps. High negative space.

## Elevation & Depth

- **Tonal Layering**: Depth is achieved through tonal contrast and optical frosted glass (`backdrop-blur-md` with `bg-background/90` or `glass-dark`) rather than heavy drop shadows.
- **Glow Gold**: Specialized soft ambient diffusion under primary action buttons (`glow-gold`).

## Shapes

- **Base Radius**: `10px` (`--radius-md`) for controls, inputs, and minor badges.
- **Surface Radius**: `16px` to `24px` for major cards and station banners.
- **Pill Badges**: `rounded-full` for chips, city filters, and status markers.

## Components

- **Header / Navigation**: Sticky, frosted glass with gold 30-year anniversary emblem, bilingual switcher, and clean links.
- **Anniversary Ribbon**: Interactive horizontal milestone cards (1996, 2005, 2016, 2026) and 4 key trust stats.
- **B2B Calculator**: Tactile slider and chips with live VAT 16% refund and leak protection computation.
- **Station Cards & 2GIS Leaflet Map**: Direct navigation links, 24/7 hours, service icon badges.

## Do's and Don'ts

### Do:
- Prioritize Kazakh text flow and ensure proper typography for Kazakh characters (Ә, І, Ң, Ғ, Ү, Ұ, Қ, Ө, Һ).
- Keep background surfaces organic: use soft radial light gradients (`ambient-overlay`).
- Use smooth spring physics (`ease-out-expo` or subtle transitions) for interactions.

### Don't:
- Never use dated `animate-bounce` on buttons or indicators.
- Never use artificial linear-gradient grid backgrounds (`grid-overlay`).
- Never publish raw retail fuel prices in social banners or promotional copy.
- Never nest cards inside cards.
