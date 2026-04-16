import { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnimeItem } from "../content/AnimeItem";
import { PAGE_TITLE, colors } from "../../styles";

const toggleGroupSx = {
  width: '100%',
  maxWidth: 400,
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
        sx={toggleGroupSx}
      >
        <ToggleButton value="watched">
          Your titles ({shows.length})
        </ToggleButton>
        <ToggleButton value="recommendations" disabled={!hasRecs}>
          Recommendations ({recommendations.length})
        </ToggleButton>
      </ToggleButtonGroup>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        {activeShows.map((node, i) => (
          <div key={node["id"]} className="w-52 animate-hero-fade-in hover:z-10" style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}>
            <AnimeItem node={node} />
          </div>
        ))}
      </div>
    </div>
  );
}
