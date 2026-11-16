import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip";

const sizes = {
  large: { iconSize: "1.25rem", height: "1.75rem" },
  normal: { iconSize: 14, height: "26px" },
  small: { iconSize: 12, height: "22px" },
};

export function StatusBadge({ status, season, size = "normal" }) {
  const s = sizes[size];
  const upper = status?.toUpperCase();

  if (upper === "NOT_YET_RELEASED") {
    return (
      <Chip
        color="warning"
        icon={<CalendarMonthIcon sx={{ fontSize: s.iconSize }} />}
        label={season?.toLowerCase() || "TBA"}
        sx={{ borderRadius: 1, height: s.height, textTransform: "capitalize" }}
      />
    );
  }

  if (upper === "RELEASING") {
    return (
      <Box
        sx={{ display: "flex", borderRadius: 1, height: s.height, backgroundColor: "green", width: s.height, justifyContent: "center", alignItems: "center" }}
      >
        <CalendarMonthIcon sx={{ fontSize: s.iconSize }} />
      </Box>
    );
  }

  return null;
}
