/**
 * Central typography tokens for the FX Dashboard.
 *
 * All font family, size, weight, and line-height values should come from
 * here. Update this file to change typography across the entire project.
 *
 * Usage in components:
 *   import { font } from "../styles/typography";
 *   style={{ fontSize: font.size.sm, fontWeight: font.weight.semibold }}
 */

export const font = {
  // ------------------------------------------------------------
  // Family
  // ------------------------------------------------------------
  family:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",

  // ------------------------------------------------------------
  // Size scale  (rem keeps sizes relative to the browser default)
  // ------------------------------------------------------------
  size: {
    xs: "0.75rem",   // 12px — timestamps, labels, hints
    sm: "0.875rem",  // 14px — body, table cells, filter labels
    md: "1rem",      // 16px — default body
    lg: "1.05rem",   // ~17px — topbar row
    xl: "1.125rem",  // 18px — popup title
    "2xl": "1.375rem", // 22px — KPI value
  },

  // ------------------------------------------------------------
  // Weight
  // ------------------------------------------------------------
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // ------------------------------------------------------------
  // Line height
  // ------------------------------------------------------------
  lineHeight: {
    tight: 1.25,
    normal: 1.6,
    relaxed: 1.75,
  },
} as const;

// Convenience: CSS font-family string ready for inline styles
export const fontFamily = font.family;
