import { memo } from "react";
import Tooltip from "@mui/material/Tooltip";
import { anilistUrl } from "../../styles";
import { useLazyImage } from "../../hooks/useLazyImage";
import { StatusBadge } from "../shared/StatusBadge";

export const AnalysisItem = memo(function AnalysisItem({ node }) {
  const url = anilistUrl(node["id"]);
  const img = useLazyImage(node["cover_image"]);

  return (
    <Tooltip title={node["title"]} arrow placement="bottom">
      <a href={url} target="_blank" rel="noopener noreferrer" className="relative block rounded aspect-[2/3]">
        <img ref={img.ref} className="h-full w-full rounded object-cover" src={img.src} alt={node["title"]} />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-1 pb-1">
          <div>
            <StatusBadge status={node["status"]} season={node["season"]} size="small" />
          </div>
        </div>
      </a>
    </Tooltip>
  );
});
