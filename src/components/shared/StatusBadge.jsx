import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Chip } from "@mui/material";

const sizes = {
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
      <Chip
        color="success"
        icon={<CalendarMonthIcon sx={{ fontSize: s.iconSize }} />}
        label="Airing"
        sx={{ borderRadius: 1, height: s.height }}
      />
    );
  }

  return null;
}
