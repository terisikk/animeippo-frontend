import Grid from "@mui/material/Grid";

import { AnimeItem } from "../content/AnimeItem";

export function AnimeGrid({ shows }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {shows.map((node, i) => (
        <Grid key={node["id"]} item sx={{ width: 208 }}>
          <AnimeItem node={node} />
        </Grid>
      ))}
    </Grid>
  );
}
