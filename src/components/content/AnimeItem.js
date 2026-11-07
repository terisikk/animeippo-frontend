import { memo } from "react";
import { anilistUrl } from "../../styles";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { StatusBadge } from "../shared/StatusBadge";
import { FormatLabel } from "../shared/FormatLabel";
import Card from "@mui/material/Card";
import { CardMedia, Typography, Box, Stack } from "@mui/material";
import { AnimeDescription } from "./AnimeDescription";

export { FORMAT_LABELS } from "../shared/FormatLabel";

function toStars(value) {
  if (typeof value !== "number") return String(value);
  const full = Math.round(value * 5);
  return "\u2605".repeat(full); //+ '\u2606'.repeat(5 - full);
}

export const AnimeItem = memo(function AnimeItem({ node }) {
  const url = anilistUrl(node["id"]);
  const debugMode = process.env.REACT_APP_DEBUG === "true";

  const img = node["cover_image"]

  let scoreFields = debugMode ? Object.keys(node).filter((key) => key.includes("score") || key.includes("Score")) : [];

  if (debugMode && scoreFields.length > 0) {
    scoreFields = scoreFields.sort((a, b) => {
      if (a === "discovery_score") return -1;
      if (b === "discovery_score") return 1;
      return a.localeCompare(b);
    });
  }

  return (
    <Box
      sx={{
        position: "relative",
        "&:hover .animeImage": {
          scale: "105%",
        },
        "&:hover .reveal-me": {
          opacity: 1,
        },
        "&:hover .hide-me": {
          opacity: 0,
        },
        "& .animeImage": {
          transition: "scale 0.3s ease-in",
        },
        cursor: "pointer",
      }}
      key={node["id"]}
    >
      <a target="_blank" href={url} rel="noreferrer">
        <Card
          className="animeImage"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "background.main",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              image={img}
              title={node["title"]}
              sx={{ objectFit: "cover", width: "100%", height: "auto", aspectRatio: "2/3" }}
            />
            <Box className="hide-me" sx={{ position: "absolute", bottom: 0, m: 1, transition: "opacity 0.3s ease" }}>
              <StatusBadge status={node["status"]} season={node["season"]} />
            </Box>
            <Stack
              className="reveal-me"
              spacing={1}
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "50%",
                opacity: 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
                background:
                  "linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(10, 10, 10, 0) 100%)",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <StatusBadge status={node["status"]} season={node["season"]} />
                <FormatLabel format={node["format"]} />
                {node["user_status"] != null && (
                  <BookmarkIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: "primary.main", // or 'blue.400' if defined in your theme
                      opacity: 0.8,
                      filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.8))",
                    }}
                  />
                )}
              </Stack>
              <AnimeDescription node={node} sx={{
                color: "white",
                bottom: 0,
                padding: "0px 15px 15px 15px",
              }} />
            </Stack>
          </Box>
        </Card>
        <Box>
          <Typography
            variant="body1"
            align="center"
            alignContent="center"
            color="primary.main"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              paddingTop: "20px",
              paddingBottom: "5px",
            }}
          >
            {node["title"]}
          </Typography>
        </Box>
      </a>
    </Box>
  );
});
