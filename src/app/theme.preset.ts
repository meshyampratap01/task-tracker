import { definePreset } from "@primeng/themes";
import Aura from "@primeng/themes/aura";

export const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e0e7ff",
      100: "#c0d4ff",
      200: "#a1bfff",
      300: "#82aaff",
      400: "#6395ff",
      500: "#4480ff",
      600: "#1769ff",
      700: "#145edc",
      800: "#104bb3",
      900: "#0d3d94",
      950: "#0a2f75"
    },
    colorScheme: {
      light: {
        primary: {
          color: "#1769ff",
          hoverColor: "#145edc",
          activeColor: "#104bb3"
        },
        highlight: {
          background: "#e0e7ff",
          focusBackground: "#c0d4ff",
          color: "#222222",
          focusColor: "#222222"
        },
        surface: {
        }
      },
      dark: {
        primary: {
          color: "#e0e7ff",
          hoverColor: "#c0d4ff",
          activeColor: "#a1bfff"
        },
        highlight: {
          background: "rgba(250, 250, 250, .16)",
          focusBackground: "rgba(250, 250, 250, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)"
        },
        surface: {
        }
      }
    }
  }
});