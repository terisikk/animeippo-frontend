export const FILTER_BUTTON = "flex cursor-pointer items-center justify-between gap-1 rounded border-none bg-zinc-800 px-4 py-2 font-sans text-sm font-medium tracking-wide text-blue-200 transition-colors duration-200 hover:bg-zinc-700";
export const ACTIVE_FILTER_PILL = "inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-0.5 text-sm text-white";
export const PAGE_TITLE = "font-sans text-3xl font-bold tracking-tight text-white";
export const SECTION_TITLE = "font-sans text-2xl font-medium tracking-wide text-white";

export const colors = {
  blue200: '#bfdbfe',
  blue400: '#60a5fa',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  zinc600: '#3f3f46',
};

export const listItemHoverSx = { '&:hover': { bgcolor: colors.zinc600 } };

export const anilistUrl = (id) => `https://anilist.co/anime/${id}`;
