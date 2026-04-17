import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { AnalysisCarousel } from "../carousel/AnalysisCarousel";
import { AnalysisItem } from "./AnalysisItem";
import { toggleGroupSx } from "../../styles";

export function AnalysisCard({ category, shows, recommendations = [], index, onExpand }) {
  const [view, setView] = useState("watched");
  const stats = category.stats;
  const accentImage = shows[0]?.cover_image;
  const hasRecs = recommendations.length > 0;
  const activeShows = view === "recommendations" && hasRecs ? recommendations : shows;

  const handleView = (_, newView) => {
    if (newView !== null) setView(newView);
  };

  return (
    <div
      className="relative rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-4 transition-all duration-300 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-blue-900/20 animate-hero-fade-in w-full md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
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
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-sans text-lg font-semibold tracking-wide text-white">
            {category.name}
          </h3>
          <button
            onClick={() => onExpand(category.name)}
            className="flex items-center justify-center rounded border-none bg-transparent p-1 text-zinc-400 cursor-pointer transition-colors hover:text-white"
            aria-label="Expand"
          >
            <OpenInFullIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

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
          {activeShows.map((node) => (
            <AnalysisItem key={node["id"]} node={node} />
          ))}
        </AnalysisCarousel>
      </div>
    </div>
  );
}
