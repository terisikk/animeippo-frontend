import { memo } from "react";
import Tooltip from "@mui/material/Tooltip";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { anilistUrl } from "../../styles";
import { FORMAT_LABELS } from "../content/AnimeItem";
import { useLazyImage } from "../../hooks/useLazyImage";

export const AnalysisItem = memo(function AnalysisItem({ node }) {
  const url = anilistUrl(node["id"]);
  const img = useLazyImage(node["cover_image"]);

  return (
    <Tooltip title={node["title"]} arrow placement="bottom">
      <a href={url} target="_blank" rel="noopener noreferrer" className="relative block rounded aspect-[2/3]">
        <img ref={img.ref} className="h-full w-full rounded object-cover" src={img.src} alt={node["title"]} />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-1 pb-1">
          <div>
            {node["status"]?.toUpperCase() === "NOT_YET_RELEASED" && (
              <span className="flex items-center gap-0.5 rounded bg-amber-500 px-1.5 py-0.5 font-sans text-[0.6rem] font-semibold capitalize text-amber-950">
                <CalendarMonthIcon sx={{ fontSize: 12 }} />
                {node["season"]?.toLowerCase()}
              </span>
            )}
            {node["status"]?.toUpperCase() === "RELEASING" && (
              <span className="flex items-center gap-0.5 rounded bg-emerald-500 px-1.5 py-0.5 font-sans text-[0.6rem] font-semibold capitalize text-emerald-950">
                <CalendarMonthIcon sx={{ fontSize: 12 }} />
                Airing
              </span>
            )}
          </div>
          {FORMAT_LABELS[node["format"]] && (
            <span className="rounded bg-black/60 px-1 py-0.5 font-sans text-[0.55rem] font-medium uppercase tracking-wide text-white">
              {FORMAT_LABELS[node["format"]]}
            </span>
          )}
        </div>
      </a>
    </Tooltip>
  );
});
