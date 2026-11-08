import { Stack } from "@mui/material";

import { AnimeDescription } from "../content/AnimeDescription";


export function HeroDetails({ node, titleSize = "text-xl" }) {
  return (
    <Stack
      className="reveal-me"
      spacing={1}
      sx={{
        position: "absolute",
        bottom: 0,
        width: "30%",
        height: "100%",
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        background:
          "linear-gradient(to right, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(10, 10, 10, 0) 100%)",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        className="relative min-w-0 flex-1 pt-1 flex flex-col self-stretch"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)", position: "absolute", bottom: 20, left: 20 }}
      >
        <h3 className={`line-clamp-2 font-sans ${titleSize} font-semibold tracking-wide text-white`}>{node["title"]}</h3>
        <AnimeDescription node={node} align="left" sx={
          {
            color: "white",
            bottom: 0,
            paddingTop: '10px'
          }
        } />
        <div className="mt-auto flex items-center justify-between pt-4">
          {node["discovery_score"] != null && (
            <span className="font-sans text-3xl font-bold text-blue-400">
              {(node["discovery_score"] * 100).toFixed(0)}%
            </span>
          )}
        </div>
      </div>
    </Stack>
  );
}
