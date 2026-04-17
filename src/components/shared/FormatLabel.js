export const FORMAT_LABELS = {
  MOVIE: "Movie",
  ONA: "ONA",
  OVA: "OVA",
  TV_SHORT: "Short",
  SPECIAL: "Special",
};

export function FormatLabel({ format }) {
  if (!FORMAT_LABELS[format]) return null;

  return (
    <span className="rounded bg-black/60 px-1.5 py-0.5 font-sans text-[0.625rem] font-medium uppercase tracking-wide text-white">
      {FORMAT_LABELS[format]}
    </span>
  );
}
