import { EmblaCarousel } from "../carousel/EmblaCarousel";
import { PAGE_TITLE, SECTION_TITLE } from "../../styles";

export function PlaceHolderContent() {
  return (
    <div className="animate-pulse">
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
    <div className="pb-8">
      <h2 className={`ml-5 pb-5 ${SECTION_TITLE}`}>...</h2>
      <EmblaCarousel>
        {placeholders}
      </EmblaCarousel>
    </div>
  );
}

function PlaceholderItem() {
  return (
    <div className="group flex flex-col rounded">
      <img className="card-image rounded" src="./placeholder.png" alt="" />
      <div className="card-text h-28">
        <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200">
          ...
        </h4>
      </div>
    </div>
  );
}

export function AnalysisPlaceholderContent() {
  return (
    <div className="animate-pulse">
      <h1 className={`ml-6 mt-6 ${PAGE_TITLE}`}>Your Profile Insights</h1>
      <div className="flex flex-wrap justify-center gap-6 px-6 py-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-4 md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]">
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
