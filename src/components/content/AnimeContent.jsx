import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from "react";

import { AnimeListFlex } from "../../features/browse/AnimeListFlex";
import { CategoryCarousel } from "./CategoryCarousel";
import { HeroCarousel } from "./HeroCarousel";

const TOP_PICKS_CATEGORY = "Your Top 3";
const HERO_CATEGORIES = new Set([
  TOP_PICKS_CATEGORY,
  "Hidden Gems for You",
  "Movie Night",
  "From Your Favourite Studios",
  "Relax & Unwind",
  "Get Hyped",
  "Emotional Rollercoasters",
  "Grim & Gritty Tales",
  "Goofy Comedies",
  "Mind-Bending Mysteries",
  "Embark on Grand Journeys",
  "Sweat it Out",
]);

const DEBUG_MODE = import.meta.env.VITE_DEBUG === "true";

function resolveShows(data, category) {
  return data.shows
    .filter((item) => category.items.includes(item.id))
    .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));
}

export function AnimeContent({ data }) {
  const { topPicks, otherCategories } = useMemo(() => {
    if (!data?.categories) return { topPicks: [], otherCategories: [] };

    const topPicksCategory = data.categories.find((c) => c.name === TOP_PICKS_CATEGORY);
    return {
      topPicks: topPicksCategory ? resolveShows(data, topPicksCategory) : [],
      otherCategories: data.categories.filter(
        (c) => c.name !== TOP_PICKS_CATEGORY && (DEBUG_MODE || c.name !== "Debug"),
      ),
    };
  }, [data]);

  if (data === undefined || data.length === 0) {
    return;
  }

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"))
  const xmargin = isMobile ? "2em" : "0"

  if (data?.categories) {
    return (
      <Box>
        {topPicks.length > 0 &&
          <Box sx={{ marginLeft: xmargin, marginRight: xmargin, marginTop: xmargin }} >
            <HeroCarousel shows={topPicks} title="Picked for You" />
          </Box>
        }
        {
          otherCategories.map((category) => {
            const render = resolveShows(data, category);
            if (render.length === 0) return null;

            if (HERO_CATEGORIES.has(category.name)) {
              return (
                <Box sx={{ marginLeft: xmargin, marginRight: xmargin }} >
                  <HeroCarousel key={category.name} shows={render} title={category.name} />
                </Box>
              )
            }
            return (
              <Box sx={{ marginLeft: "2em" }}>
                <CategoryCarousel key={category.name} shows={render} category={category} />
              </Box>
            )
          })
        }
      </Box >
    );
  } else {
    return <AnimeListFlex shows={data?.shows || []} />;
  }
}
