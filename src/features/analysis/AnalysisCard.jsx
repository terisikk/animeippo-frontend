import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions"
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { AnalysisCarousel } from "./AnalysisCarousel";
import { AnalysisItem } from "./AnalysisItem";

export function AnalysisCard({ category, shows, recommendations = [], onExpand }) {
  const [view, setView] = useState("watched");
  const stats = category.stats;
  const hasRecs = recommendations.length > 0;
  const activeShows = view === "recommendations" && hasRecs ? recommendations : shows;

  const handleView = (_, newView) => {
    if (newView !== null) setView(newView);
  };

  return (
    <Card raised="true" sx={{
      transition: "box-shadow 0.3s ease",
      "&:hover": {
        boxShadow: "0px 0px 1px 2px #66c7dc50",
        transition: "box-shadow 0.3s ease",
      }
    }}>
      <CardContent sx={{ backgroundColor: "background.paper", paddingBottom: "0" }}>
        <CardActions>
          <Grid spacing={0.5} container direction="row" sx={{ width: "100%", alignItems: "flex-start" }}>
            <Grid container size={12} sx={{ justifyContent: "space-between" }}>
              <Typography variant="h5">{category.name}</Typography>
              <IconButton size="small" onClick={() => onExpand(category.name)} aria-label="Expand category" sx={{ color: "text.secondary" }}><OpenInFullIcon /></IconButton>
            </Grid>

            {stats && (
              <Grid container spacing={1} size={12} sx={{ alignItems: "center" }}>
                <Typography color="secondary.dark" variant="body1" >
                  {stats.mean_score != null ? stats.mean_score.toFixed(1) : "?"}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  avg
                </Typography>
                <Typography color="secondary.dark" variant="body1">
                  {stats.completion_rate?.toFixed(0)}%
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  completed
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardActions>
      </CardContent>
      <Divider />
      <CardMedia sx={{ backgroundColor: "background.paper" }}>
        <Tabs centered variant="fullWidth" value={view} onChange={handleView}>
          <Tab value="watched" label={`Your titles (${shows.length})`} />
          <Tab value="recommendations" disabled={!hasRecs} label={`Recommendations (${recommendations.length})`} />
        </Tabs>
        <AnalysisCarousel>
          {activeShows.map((node) => (
            <AnalysisItem key={node["id"]} node={node} />
          ))}
        </AnalysisCarousel>
      </CardMedia>
    </Card >
  );
}
