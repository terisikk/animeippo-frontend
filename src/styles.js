import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const FILTER_BUTTON =
  "flex cursor-pointer items-center justify-between gap-1 rounded border-none bg-zinc-800 px-4 py-2 text-sm font-medium tracking-wide text-blue-200 transition-colors duration-200 hover:bg-zinc-700";
export const SECTION_TITLE = "text-2xl font-medium tracking-wide text-white";

export const colors = {
  blue200: "#bfdbfe",
  blue400: "#60a5fa",
  zinc400: "#a1a1aa",
  zinc500: "#71717a",
  zinc600: "#3f3f46",
};

export const listItemHoverSx = { "&:hover": { bgcolor: colors.zinc600 } };

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these

  typography: {
    fontFamily: [
      "Josefin Sans",
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ].join(","),
  },
});

const primary = theme.palette.augmentColor({
  color: {
    main: "#252a33"
  },
  name: "primary",
})

const secondary = theme.palette.augmentColor({
  color: {
    main: "#66c7dc",
  },
  name: "secondary",
})

const background = {
  default: "#1b1d20",
  paper: "#252a33"
}

const textColor = {
  "primary": "#ffffff",
  "secondary": "#ffffffb3",
  "disabled": "#ffffff50"
}

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    primary: primary,
    secondary: secondary,
    background: {
      default: background.default,
      paper: background.paper
    },
    text: textColor,
    mode: "dark"
  },
});

theme = createTheme(theme, {
  components: {
    mergeClassNameAndStyle: true,
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: secondary.dark,
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          '&.Mui-selected': {
            backgroundColor: secondary.main,
            '&:hover': {
              backgroundColor: secondary.main,
            }
          },
          "&.MuiToggleButton-sizeSmall": {
            padding: "7px"
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: secondary.light,
        },
        root: {
          backgroundColor: background.paper
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: textColor.secondary,
          '&.Mui-selected': {
            color: secondary.light
          }
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);

export const anilistUrl = (id) => `https://anilist.co/anime/${id}`;

export default theme;
