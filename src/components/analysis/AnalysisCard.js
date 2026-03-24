import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AnalysisCarousel } from "../carousel/AnalysisCarousel";
import { AnalysisItem } from "./AnalysisItem";
import { colors } from "../../styles";

const toggleGroupSx = {
  width: '100%',
  mb: 1.5,
  '& .MuiToggleButton-root': {
    flex: 1,
    py: 0.5,
    px: 1,
    fontSize: '0.75rem',
    textTransform: 'none',
    color: colors.blue200,
    borderColor: 'transparent',
    '&:hover': { bgcolor: colors.zinc600 },
    '&.Mui-selected': {
      bgcolor: 'rgba(96,165,250,0.15)',
      color: '#fff',
      '&:hover': { bgcolor: 'rgba(96,165,250,0.25)' },
    },
    '&.Mui-disabled': {
      opacity: 0.4,
      color: colors.zinc400,
    },
  },
  bgcolor: 'rgba(63,63,70,0.4)',
  borderRadius: 1,
};

export function AnalysisCard({ category, shows, recommendations = [], index }) {
  const [view, setView] = useState("watched");
  const stats = category.stats;
  const accentImage = shows[0]?.cover_image;
  const hasRecs = recommendations.length > 0;

  const handleView = (_, newView) => {
    if (newView !== null) setView(newView);
  };

  return (
    <div
      className="relative w-full rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-4 transition-all duration-300 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-blue-900/20 animate-hero-fade-in md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {accentImage && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover opacity-[0.07] blur-3xl"
            src={accentImage}
            alt=""
            aria-hidden="true"
          />
        </div>
      )}

      <div className="relative">
        <h3 className="mb-2 font-sans text-lg font-semibold tracking-wide text-white">
          {category.name}
        </h3>

        {stats && (
          <div className="mb-3 flex gap-4 text-sm">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.mean_score != null ? stats.mean_score.toFixed(1) : "?"}</span>
              <span className="text-xs text-zinc-400">avg</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.completion_rate?.toFixed(0)}%</span>
              <span className="text-xs text-zinc-400">completed</span>
            </div>
          </div>
        )}

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleView}
          size="small"
          sx={toggleGroupSx}
        >
          <ToggleButton value="watched">
            Your titles ({shows.length})
          </ToggleButton>
          <ToggleButton value="recommendations" disabled={!hasRecs}>
            Recommendations ({recommendations.length})
          </ToggleButton>
        </ToggleButtonGroup>

        <AnalysisCarousel>
          {(view === "recommendations" && hasRecs ? recommendations : shows).map((node) => (
            <AnalysisItem key={node["id"]} node={node} />
          ))}
        </AnalysisCarousel>
      </div>
    </div>
  );
}
