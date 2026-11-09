import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const FILTER_BUTTON =
  "flex cursor-pointer items-center justify-between gap-1 rounded border-none bg-zinc-800 px-4 py-2 font-sans text-sm font-medium tracking-wide text-blue-200 transition-colors duration-200 hover:bg-zinc-700";
export const PAGE_TITLE = "font-sans text-3xl font-bold tracking-tight text-white";
export const SECTION_TITLE = "font-sans text-2xl font-medium tracking-wide text-white";

export const colors = {
  blue200: "#bfdbfe",
  blue400: "#60a5fa",
  zinc400: "#a1a1aa",
  zinc500: "#71717a",
  zinc600: "#3f3f46",
};

export const listItemHoverSx = { "&:hover": { bgcolor: colors.zinc600 } };

export const toggleGroupSx = {
  width: "100%",
  mb: 1.5,
  "& .MuiToggleButton-root": {
    flex: 1,
    py: 0.5,
    px: 1,
    fontSize: "0.75rem",
    textTransform: "none",
    color: colors.blue200,
    borderColor: "transparent",
    "&:hover": { bgcolor: colors.zinc600 },
    "&.Mui-selected": {
      bgcolor: "rgba(96,165,250,0.15)",
      color: "#fff",
      "&:hover": { bgcolor: "rgba(96,165,250,0.25)" },
    },
    "&.Mui-disabled": {
      opacity: 0.4,
      color: colors.zinc400,
    },
  },
  bgcolor: "rgba(63,63,70,0.4)",
  borderRadius: 1,
};

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these

  typography: {
    fontFamily: [
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

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    primary: theme.palette.augmentColor({
      color: {
        main: "#66c7dc",
      },
      name: "primary",
    }),
    secondary: theme.palette.augmentColor({
      color: {
        main: "#644539",
      },
      name: "secondary",
    }),
    background: theme.palette.augmentColor({
      color: {
        main: "#131313",
      },
      name: "background",
    }),
  },
});

theme = responsiveFontSizes(theme);

export const anilistUrl = (id) => `https://anilist.co/anime/${id}`;

export default theme;
