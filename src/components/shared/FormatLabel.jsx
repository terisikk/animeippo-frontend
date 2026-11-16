import AlbumIcon from '@mui/icons-material/Album';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import TheatersIcon from '@mui/icons-material/Theaters';
import TimerIcon from '@mui/icons-material/Timer';

export const FORMAT_LABELS = {
  MOVIE: <TheatersIcon sx={{ fontSize: "2rem", color: "text.primary" }} />,
  ONA: <SmartDisplayIcon sx={{ fontSize: "2rem", color: "text.primary" }} />,
  OVA: <AlbumIcon sx={{ fontSize: "2rem", color: "text.primary" }} />,
  TV_SHORT: <TimerIcon sx={{ fontSize: "2rem", color: "text.primary" }} />,
  SPECIAL: <MovieFilterIcon sx={{ fontSize: "2rem", color: "text.primary" }} />,
  TV: <LiveTvIcon sx={{ fontSize: "2rem", color: "text.primary" }} />,
};

export function FormatLabel({ format }) {
  if (!FORMAT_LABELS[format]) return null;

  return (
    FORMAT_LABELS[format]
  );
}
