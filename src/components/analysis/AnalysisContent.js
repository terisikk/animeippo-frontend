import { useMemo } from "react";
import { AnalysisCard } from "./AnalysisCard";
import { PAGE_TITLE } from "../../styles";

export function AnalysisContent({ data }) {
  const seasonalMap = useMemo(
    () => new Map(data?.seasonal?.map(s => [s.id, s]) || []),
    [data?.seasonal]
  );

  if (data === undefined || data.length === 0) {
    return;
  }

  if (!data?.categories) {
    return null;
  }

  return (
    <>
    <h1 className={`ml-6 mt-6 ${PAGE_TITLE}`}>Your Profile Insights</h1>
    <div className="flex flex-wrap justify-center gap-6 px-6 py-6">
      {data.categories.map((category, index) => {
        const shows = data.shows
          .filter((item) => category.items.includes(item.id))
          .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));

        const recommendations = (category.recommendations || [])
          .map(id => seasonalMap.get(id))
          .filter(Boolean);

        return <AnalysisCard key={category.name} category={category} shows={shows} recommendations={recommendations} index={index} />;
      })}
    </div>
    </>
  );
}
