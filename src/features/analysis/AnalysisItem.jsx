import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip";
import { memo } from "react";

import { StatusBadge } from "../../components/shared/StatusBadge";
import { anilistUrl } from "../../styles";

export const AnalysisItem = memo(function AnalysisItem({ node }) {
  const url = anilistUrl(node["id"]);
  const img = node["cover_image"].replace("/large/", "/medium/");

  return (
    <Tooltip title={node["title"]} arrow placement="bottom">
      <Box
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'relative',
          display: 'block',
          aspectRatio: '2/3',
          overflow: 'hidden',
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={img}
          alt={node["title"]}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            px: 1,
            pb: 1,
          }}
        >
          <StatusBadge status={node["status"]} season={node["season"]} size="small" />
        </Box>
      </Box>
    </Tooltip>
  );
});
