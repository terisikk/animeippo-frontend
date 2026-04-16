import { useMemo, useState, useEffect } from "react";
import { AnalysisCard } from "./AnalysisCard";
import { AnalysisExpandedView } from "./AnalysisExpandedView";
import { PAGE_TITLE } from "../../styles";

const DEBUG_MODE = process.env.REACT_APP_DEBUG === "true";

export function AnalysisContent({ data }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const seasonalMap = useMemo(
    () => new Map(data?.seasonal?.map(s => [s.id, s]) || []),
    [data?.seasonal]
  );

  const categories = useMemo(
    () => (data?.categories || []).filter((c) => DEBUG_MODE || c.name !== "Debug"),
    [data?.categories]
  );

  useEffect(() => {
    if (expandedCategory && categories.length > 0 && !categories.some(c => c.name === expandedCategory)) {
      setExpandedCategory(null);
    }
  }, [categories, expandedCategory]);

  if (data === undefined || data.length === 0) {
    return;
  }

  if (!data?.categories) {
    return null;
  }

  const expandedMatch = expandedCategory
    ? categories.find(c => c.name === expandedCategory)
    : null;

  if (expandedMatch) {
    const shows = data.shows
      .filter((item) => expandedMatch.items.includes(item.id))
      .sort((a, b) => expandedMatch.items.indexOf(a.id) - expandedMatch.items.indexOf(b.id));

    const recommendations = (expandedMatch.recommendations || [])
      .map(id => seasonalMap.get(id))
      .filter(Boolean);

    return (
      <AnalysisExpandedView
        category={expandedMatch}
        shows={shows}
        recommendations={recommendations}
        onClose={() => setExpandedCategory(null)}
      />
    );
  }

  return (
    <>
    <h1 className={`ml-6 mt-6 ${PAGE_TITLE}`}>Your Profile Insights</h1>
    <div className="flex flex-wrap justify-center gap-6 px-6 py-6">
      {categories.map((category, index) => {
        const shows = data.shows
          .filter((item) => category.items.includes(item.id))
          .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));

        const recommendations = (category.recommendations || [])
          .map(id => seasonalMap.get(id))
          .filter(Boolean);

        return <AnalysisCard key={category.name} category={category} shows={shows} recommendations={recommendations} index={index} onExpand={setExpandedCategory} />;
      })}
    </div>
    </>
  );
}
