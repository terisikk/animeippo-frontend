import { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnimeGrid } from "../shared/AnimeGrid";
import { PAGE_TITLE, toggleGroupSx } from "../../styles";

export function AnalysisExpandedView({ category, shows, recommendations, onClose }) {
  const [view, setView] = useState("watched");
  const stats = category.stats;
  const hasRecs = recommendations.length > 0;
  const activeShows = view === "recommendations" && hasRecs ? recommendations : shows;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleView = (_, newView) => {
    if (newView !== null) setView(newView);
  };

  return (
    <div className="px-6 py-6 animate-hero-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center justify-center rounded border-none bg-transparent p-1 text-zinc-400 cursor-pointer transition-colors hover:text-white"
          aria-label="Back to cards"
        >
          <ArrowBackIcon />
        </button>
        <div>
          <h1 className={PAGE_TITLE}>{category.name}</h1>
          {stats && (
            <div className="mt-1 flex gap-4 text-sm">
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
        </div>
      </div>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleView}
        size="small"
        sx={{ ...toggleGroupSx, maxWidth: 400 }}
      >
        <ToggleButton value="watched">
          Your titles ({shows.length})
        </ToggleButton>
        <ToggleButton value="recommendations" disabled={!hasRecs}>
          Recommendations ({recommendations.length})
        </ToggleButton>
      </ToggleButtonGroup>

      <div className="pt-2">
        <AnimeGrid shows={activeShows} />
      </div>
    </div>
  );
}
