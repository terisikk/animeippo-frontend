import Tooltip from "@mui/material/Tooltip";
import { anilistUrl } from "../../styles";

export function AnalysisItem({ node }) {
  const url = anilistUrl(node["id"]);

  return (
    <Tooltip title={node["title"]} arrow placement="bottom">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded">
        <img className="max-h-[150px] rounded" src={node["cover_image"]} alt={node["title"]} />
      </a>
    </Tooltip>
  );
}
