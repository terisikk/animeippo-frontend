import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AnimeDescription } from "../content/AnimeDescription";

export function HeroDetails({ node, align = "left" }) {
  const gradientDirection = (align == "left") ? "right" : "top";
  const gradient = "linear-gradient(to " + gradientDirection + ", rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(10, 10, 10, 0) 80%)";
  const gWidth = (align == "left") ? "66%" : "100%"
  const gHeight = (align == "left") ? "100%" : "66%"

  return (
    <Stack
      className="reveal-me"
      spacing={1}
      sx={{
        position: "absolute",
        bottom: 0,
        width: gWidth,
        height: gHeight,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        background: gradient,
        justifyContent: "flex-end",
        alignItems: "left",
        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
        padding: "1em 1em 1em 2em",
        zIndex: 3
      }}
    >
      <Typography variant="h3" align={align} color="primary.light">{node["title"]}</Typography>
      <AnimeDescription
        node={node}
        align={align}
        sx={{
          color: "white",
          paddingTop: "0.5em",
          paddingLeft: "0.5em"
        }}
      />
    </Stack>
  );
}
