import { catalogColorSwatches } from "@/lib/catalog-colors";

const HEX_SHORT = /^#([0-9a-f]{3})$/i;
const HEX_FULL = /^#([0-9a-f]{6})$/i;
const RGB =
 /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;

function clampChannel(value) {
 return Math.max(0, Math.min(255, Number(value)));
}

function expandShortHex(hex) {
 const match = hex.match(HEX_SHORT);
 if (!match) return null;

 return `#${match[1]
  .split("")
  .map((char) => char + char)
  .join("")}`.toLowerCase();
}

export function isCssColorValue(value) {
 if (!value) return false;

 const trimmed = value.trim();
 return HEX_SHORT.test(trimmed) || HEX_FULL.test(trimmed) || RGB.test(trimmed);
}

export function normalizeColorValue(value) {
 if (!value) return "";

 const trimmed = value.trim();
 if (!trimmed) return "";

 if (HEX_FULL.test(trimmed)) {
  return trimmed.toLowerCase();
 }

 const shortHex = expandShortHex(trimmed);
 if (shortHex) return shortHex;

 const rgbMatch = trimmed.match(RGB);
 if (rgbMatch) {
  const [r, g, b] = rgbMatch.slice(1, 4).map(clampChannel);
  return `#${[r, g, b]
   .map((channel) => channel.toString(16).padStart(2, "0"))
   .join("")}`;
 }

 return trimmed;
}

export function resolveColorCss(value) {
 if (!value) return null;

 if (isCssColorValue(value)) {
  const normalized = normalizeColorValue(value);
  if (normalized.startsWith("#")) return normalized;

  const rgbMatch = value.trim().match(RGB);
  if (rgbMatch) {
   const [r, g, b] = rgbMatch.slice(1, 4).map(clampChannel);
   return `rgb(${r}, ${g}, ${b})`;
  }
 }

 return catalogColorSwatches[value] ?? null;
}

export function colorValueToPickerHex(value) {
 const css = resolveColorCss(value);
 if (!css) return "#d1d5db";

 if (css.startsWith("#")) {
  return normalizeColorValue(css);
 }

 const rgbMatch = css.match(RGB);
 if (rgbMatch) {
  return normalizeColorValue(css);
 }

 return "#d1d5db";
}

export function formatColorAsRgb(value) {
 const css = resolveColorCss(value);
 if (!css) return null;

 const hex = css.startsWith("#") ? normalizeColorValue(css) : normalizeColorValue(value);
 if (!hex?.startsWith("#")) return null;

 const rgb = hexToRgb(hex);
 if (!rgb) return null;

 return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function hexToRgb(hex) {
 const normalized = normalizeColorValue(hex);
 if (!normalized?.startsWith("#")) return null;

 return {
  r: parseInt(normalized.slice(1, 3), 16),
  g: parseInt(normalized.slice(3, 5), 16),
  b: parseInt(normalized.slice(5, 7), 16),
 };
}

export function rgbToHex(r, g, b) {
 return `#${[r, g, b]
  .map((channel) => clampChannel(channel).toString(16).padStart(2, "0"))
  .join("")}`;
}

export function rgbToHsv(r, g, b) {
 const rn = clampChannel(r) / 255;
 const gn = clampChannel(g) / 255;
 const bn = clampChannel(b) / 255;
 const max = Math.max(rn, gn, bn);
 const min = Math.min(rn, gn, bn);
 const delta = max - min;

 let h = 0;
 if (delta !== 0) {
  if (max === rn) h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / delta + 2) / 6;
  else h = ((rn - gn) / delta + 4) / 6;
 }

 return {
  h: Math.round(h * 360),
  s: max === 0 ? 0 : Math.round((delta / max) * 100),
  v: Math.round(max * 100),
 };
}

export function hsvToRgb(h, s, v) {
 const hue = ((h % 360) + 360) % 360;
 const saturation = Math.max(0, Math.min(100, s)) / 100;
 const value = Math.max(0, Math.min(100, v)) / 100;
 const chroma = value * saturation;
 const segment = (hue / 60) % 2;
 const x = chroma * (1 - Math.abs(segment - 1));
 const m = value - chroma;

 let rn = 0;
 let gn = 0;
 let bn = 0;

 if (hue < 60) [rn, gn, bn] = [chroma, x, 0];
 else if (hue < 120) [rn, gn, bn] = [x, chroma, 0];
 else if (hue < 180) [rn, gn, bn] = [0, chroma, x];
 else if (hue < 240) [rn, gn, bn] = [0, x, chroma];
 else if (hue < 300) [rn, gn, bn] = [x, 0, chroma];
 else [rn, gn, bn] = [chroma, 0, x];

 return {
  r: Math.round((rn + m) * 255),
  g: Math.round((gn + m) * 255),
  b: Math.round((bn + m) * 255),
 };
}

export function hexToHsv(hex) {
 const rgb = hexToRgb(colorValueToPickerHex(hex));
 if (!rgb) return { h: 0, s: 0, v: 82 };
 return rgbToHsv(rgb.r, rgb.g, rgb.b);
}

export function hsvToHex(h, s, v) {
 const rgb = hsvToRgb(h, s, v);
 return rgbToHex(rgb.r, rgb.g, rgb.b);
}
