import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

import { AnimeListFlex } from "../../features/browse/AnimeListFlex";
import { CategoryCarousel } from "./CategoryCarousel";
import { HeroCarousel } from "./HeroCarousel";

const DEBUG_MODE = import.meta.env.VITE_DEBUG === "true";

function resolveShows(data, category) {
  return data.shows
    .filter((item) => category.items.includes(item.id))
    .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));
}

export function AnimeContent({ data }) {
  const categories = useMemo(() => {
    if (!data?.categories) return [];

    return data.categories.filter(
      (c) => c.name && (DEBUG_MODE || c.name !== "Debug"),
    )
  }, [data]);

  if (data === undefined || data.length === 0) {
    return;
  }

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const xmargin = isMobile ? "2em" : "0";

  if (data?.categories) {
    return (
      <Box>
        {categories.map((category, index) => {
          const render = resolveShows(data, category);
          if (render.length === 0) return null;

          if (category?.exclusive) {
            const title = (index == 0) ? "" : category.name

            return (
              <Box sx={{ marginLeft: xmargin, marginRight: xmargin }}>
                <HeroCarousel key={category.name} shows={render} title={title} />
              </Box>
            );
          }
          return (
            <Box sx={{ marginLeft: "2em" }}>
              <CategoryCarousel key={category.name} shows={render} category={category} />
            </Box>
          );
        })}
      </Box>
    );
  } else {
    return <AnimeListFlex shows={data?.shows || []} />;
  }
}
