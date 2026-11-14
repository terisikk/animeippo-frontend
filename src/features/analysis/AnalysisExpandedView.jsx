import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { AnimeGrid } from "../../components/shared/AnimeGrid";


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
    <Box sx={{ margin: 4 }}>
      <Box sx={{ display: "flex", gap: 1, marginLeft: 1 }}>
        <IconButton size="small" onClick={onClose} aria-label="Back to cards" sx={{ color: "text.secondary" }}><ArrowBackIcon /></IconButton>
        <div>
          <Typography variant="h3">{category.name}</Typography>
          {stats && (
            <Grid container spacing={1} size={12} sx={{ alignItems: "center" }}>
              <Typography color="secondary.dark" variant="h5">
                {stats.mean_score != null ? stats.mean_score.toFixed(1) : "?"}
              </Typography>
              <Typography color="text.secondary" variant="body1">
                avg
              </Typography>
              <Typography color="secondary.dark" variant="h5">
                {stats.completion_rate?.toFixed(0)}%
              </Typography>
              <Typography color="text.secondary" variant="body1">
                completed
              </Typography>
            </Grid>
          )}
        </div>
      </Box>

      <Tabs value={view} onChange={handleView} sx={{ backgroundColor: "background.default", marginBottom: 2, marginLeft: { xs: 0, sm: 4 } }}>
        <Tab value="watched" label={`Your titles (${shows.length})`} />
        <Tab value="recommendations" disabled={!hasRecs} label={`Recommendations (${recommendations.length})`} />
      </Tabs>

      <AnimeGrid shows={activeShows} />
    </Box >
  );
}
