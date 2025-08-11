export const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#666666",
    background: "#ffffff",
    text: "#333333",
    border: "#eaeaea",
    error: "#ff0000",
    success: "#00ff00",
  },
  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  fontSizes: {
    xsmall: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
    xlarge: "1.25rem",
    xxlarge: "1.5rem",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "50%",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
} as const;

export type Theme = typeof theme;
