import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import { PAGE_TITLE, SECTION_TITLE } from "../../styles";

export function PlaceHolderContent() {
  return (
    <div>
      <PlaceholderList />
      <PlaceholderList />
      <PlaceholderList />
      <PlaceholderList />
    </div>
  );
}

function PlaceholderList() {
  const placeholders = [];
  for (let i = 0; i < 10; i++) {
    placeholders.push(<PlaceholderItem key={i} />);
  }

  return (
    <div className="pb-8 pl-8">
      <h2 className={`ml-5 pb-5 ${SECTION_TITLE}`}>...</h2>
      <Stack direction="row" gap={2}><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /><PlaceholderItem /></Stack>
    </div>
  );
}

function PlaceholderItem() {
  return (
    <Skeleton variant="rounded" width={230} height={326} sx={{ bgcolor: 'grey.800' }} />
  );
}

export function AnalysisPlaceholderContent() {
  return (
    <div className="animate-pulse">
      <h1 className={`ml-6 mt-6 ${PAGE_TITLE}`}>Your Profile Insights</h1>
      <div className="flex flex-wrap justify-center gap-6 px-6 py-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-4 md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
          >
            <div className="mb-2 h-6 w-1/2 rounded bg-zinc-700/50" />
            <div className="mb-3 flex gap-4">
              <div className="h-4 w-16 rounded bg-zinc-700/50" />
              <div className="h-4 w-20 rounded bg-zinc-700/50" />
            </div>
            <div className="mb-3 h-8 w-full rounded bg-zinc-700/30" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-24 w-16 shrink-0 rounded bg-zinc-700/40" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
