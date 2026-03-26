import { useMemo } from "react";
import { TopPicksHero } from "./TopPicksHero";
import { AnimeListCarousel } from "./AnimeListCarousel";
import { AnimeListFlex } from "./AnimeListFlex";
import { PAGE_TITLE } from "../../styles";

const TOP_PICKS_CATEGORY = "Your Top 3";
const HERO_CATEGORIES = new Set([TOP_PICKS_CATEGORY, "Hidden Gems for You", "Top Movies for You"]);
const DEBUG_MODE = process.env.REACT_APP_DEBUG === "true";

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
      otherCategories: data.categories.filter((c) => c.name !== TOP_PICKS_CATEGORY && (DEBUG_MODE || c.name !== "Debug")),
    };
  }, [data]);

  if (data === undefined || data.length === 0) {
    return;
  }

  if (data?.categories) {
    return (
      <>
        <h1 className={`ml-6 mt-6 ${PAGE_TITLE}`}>Picked for You</h1>
        {topPicks.length > 0 && <TopPicksHero shows={topPicks} />}
        {otherCategories.map((category) => {
          const render = resolveShows(data, category);

          if (HERO_CATEGORIES.has(category.name)) {
            return <TopPicksHero key={category.name} shows={render} title={category.name} />;
          }
          return <AnimeListCarousel key={category.name} shows={render} category={category} />;
        })}
      </>
    )
  } else {
    return <AnimeListFlex shows={data?.shows || []} />;
  }
}
