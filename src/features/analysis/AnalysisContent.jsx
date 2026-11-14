import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";

import { AnalysisCard } from "./AnalysisCard";
import { AnalysisExpandedView } from "./AnalysisExpandedView";

const DEBUG_MODE = import.meta.env.VITE_DEBUG === "true";

export function AnalysisContent({ data }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const seasonalMap = useMemo(() => new Map(data?.seasonal?.map((s) => [s.id, s]) || []), [data?.seasonal]);

  const categories = useMemo(
    () => (data?.categories || []).filter((c) => DEBUG_MODE || c.name !== "Debug"),
    [data?.categories],
  );

  useEffect(() => {
    if (expandedCategory && categories.length > 0 && !categories.some((c) => c.name === expandedCategory)) {
      setExpandedCategory(null);
    }
  }, [categories, expandedCategory]);

  if (data === undefined || data.length === 0) {
    return;
  }

  if (!data?.categories) {
    return null;
  }

  const expandedMatch = expandedCategory ? categories.find((c) => c.name === expandedCategory) : null;

  if (expandedMatch) {
    const shows = data.shows
      .filter((item) => expandedMatch.items.includes(item.id))
      .sort((a, b) => expandedMatch.items.indexOf(a.id) - expandedMatch.items.indexOf(b.id));

    const recommendations = (expandedMatch.recommendations || []).map((id) => seasonalMap.get(id)).filter(Boolean);

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
      <Typography variant="h4" sx={{ marginTop: 4, marginX: 2 }}>Your Profile Insights</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, padding: "1em" }}>
        {categories.map((category) => {
          const shows = data.shows
            .filter((item) => category.items.includes(item.id))
            .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));

          const recommendations = (category.recommendations || []).map((id) => seasonalMap.get(id)).filter(Boolean);

          return (
            <Box
              key={category.name}
              sx={{
                flexBasis: {
                  xs: '100%',                             // 1 column on mobile
                  md: 'calc(50% - 12px)',                 // 2 columns on medium screens
                  xl: 'calc(33.333% - 16px)',             // 3 columns on extra-large screens
                },
                flexGrow: 0,  // Prevents cards from growing past their calc width
                flexShrink: 0,// Prevents cards from squishing
              }}
            >
              <AnalysisCard
                key={category.name}
                category={category}
                shows={shows}
                recommendations={recommendations}
                onExpand={setExpandedCategory}
              />
            </Box>
          );
        })}
      </Box >
    </>
  );
}
