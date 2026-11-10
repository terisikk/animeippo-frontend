import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { memo } from "react";

import { anilistUrl } from "../../styles";
import { HeroDetails } from "../shared/HeroDetails";
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';

export const HeroCard = memo(function HeroCard({ node }) {
  const url = anilistUrl(node["id"]);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"))

  const imageType = isMobile ? "cover_image" : "banner_image"

  const img = node[imageType]

  const aspectRatio = isMobile ? "2/3" : undefined
  const height = isMobile ? "60vh" : undefined
  const detailAlign = isMobile ? "center" : "left"

  const title = node["title"]

  return (
    <Box
      sx={{
        position: "relative",
        cursor: "pointer",
      }}
      key={node["id"]}
    >
      <a target="_blank" href={url} rel="noreferrer">
        <Card
          className="animeImage"
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box>
            <CardMedia
              component="img"
              image={img}
              title={title}
              alt=""
              sx={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                aspectRatio: aspectRatio,
                height: height
              }}
            />
            <HeroDetails node={node} align={detailAlign} />
          </Box>
        </Card>
      </a>
    </Box>
  );
});
