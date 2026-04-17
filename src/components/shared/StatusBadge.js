import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const sizes = {
  normal: { className: "gap-1 px-2 py-1 text-xs", iconSize: 14 },
  small: { className: "gap-0.5 px-1.5 py-0.5 text-[0.6rem]", iconSize: 12 },
};

export function StatusBadge({ status, season, size = "normal" }) {
  const s = sizes[size];
  const upper = status?.toUpperCase();

  if (upper === "NOT_YET_RELEASED") {
    return (
      <span className={`flex items-center rounded bg-amber-500 font-sans font-semibold capitalize text-amber-950 ${s.className}`}>
        <CalendarMonthIcon sx={{ fontSize: s.iconSize }} />
        {season?.toLowerCase() || "TBA"}
      </span>
    );
  }

  if (upper === "RELEASING") {
    return (
      <span className={`flex items-center rounded bg-emerald-500 font-sans font-semibold capitalize text-emerald-950 ${s.className}`}>
        <CalendarMonthIcon sx={{ fontSize: s.iconSize }} />
        Airing
      </span>
    );
  }

  return null;
}
