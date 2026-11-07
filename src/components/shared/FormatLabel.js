import { Chip } from '@mui/material';

export const FORMAT_LABELS = {
  MOVIE: "Movie",
  ONA: "ONA",
  OVA: "OVA",
  TV_SHORT: "Short",
  SPECIAL: "Special",
  TV: "Series",
};


export function FormatLabel({ format }) {
  if (!FORMAT_LABELS[format]) return null;

  return (
    <Chip variant="outlined" label={FORMAT_LABELS[format]} sx={{ borderRadius: 1, height: '26px', color: 'white'}}/>
  );
}
