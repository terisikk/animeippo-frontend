import BookmarkIcon from "@mui/icons-material/Bookmark";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo } from "react";

import { anilistUrl } from "../../styles";
import { FormatLabel } from "../shared/FormatLabel";
import { StatusBadge } from "../shared/StatusBadge";
import { AnimeDescription } from "./AnimeDescription";

export const AnimeCard = memo(function AnimeCard({ node, showDetails = true }) {
  const url = anilistUrl(node["id"]);
  const img = node["cover_image"]

  return (
    <Box
      sx={{
        position: "relative",
        cursor: "pointer",
        ...(showDetails && {
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
        }),
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
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                aspectRatio: "2/3"
              }}
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
              <AnimeDescription
                node={node}
                sx={{
                  color: "white",
                  bottom: 0,
                  padding: "0px 15px 15px 15px",
                }}
              />
            </Stack>
          </Box>
        </Card>
        {showDetails && (
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
                marginBottom: "5px",
              }}
            >
              {node["title"]}
            </Typography>
          </Box>
        )}
      </a>
    </Box>
  );
});
