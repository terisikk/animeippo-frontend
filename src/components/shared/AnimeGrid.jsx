import Grid from "@mui/material/Grid";

import { AnimeCard } from "../content/AnimeCard";

export function AnimeGrid({ shows }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {shows.map((node) => (
        <Grid key={node["id"]} item sx={{ width: 208 }}>
          <AnimeCard node={node} />
        </Grid>
      ))}
    </Grid>
  );
}
