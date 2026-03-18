import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const breakpoints = [
  { min: 1920, items: 8 },
  { min: 1024, items: 6 },
  { min: 720,  items: 4 },
  { min: 464,  items: 2 },
  { min: 0,    items: 2 },
];

function getItemsForWidth(width) {
  for (const bp of breakpoints) {
    if (width >= bp.min) return bp.items;
  }
  return 2;
}

function useItemCount() {
  const [items, setItems] = useState(() => getItemsForWidth(window.innerWidth));

  useEffect(() => {
    const onResize = () => setItems(getItemsForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return items;
}

function EmblaCarousel({ children }) {
  const itemCount = useItemCount();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: itemCount,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit({ slidesToScroll: itemCount });
  }, [emblaApi, itemCount]);

  const handleKeyDown = useCallback((e) => {
    if (!emblaApi) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      emblaApi.scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const slideWidth = `${100 / (itemCount + 0.5)}%`;

  return (
    <div className="embla relative px-6" tabIndex={0} onKeyDown={handleKeyDown} role="region" aria-label="Carousel">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {Array.isArray(children) ? children.map((child, i) => (
            <div className="embla__slide shrink-0 px-0.5 flex justify-center" style={{ flex: `0 0 ${slideWidth}` }} key={i}>
              {child}
            </div>
          )) : children}
        </div>
      </div>
      {canScrollPrev && (
        <button
          className="embla__button embla__button--prev"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slides"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {canScrollNext && (
        <button
          className="embla__button embla__button--next"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slides"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

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

export function PlaceholderList() {
  var placeholders = [];
  for (let i = 0; i < 10; i++) {
    placeholders.push(<PlaceholderItem key={i} />);
  }

  return (
    <div className="pb-8">
      <h2 className="ml-5 pb-5 font-sans text-2xl font-medium tracking-wide text-white">...</h2>
      <EmblaCarousel>
        {placeholders}
      </EmblaCarousel>
    </div>
  );
}

export function PlaceholderItem() {
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

export function AnimeContent(data, selectedGenre) {

  if (data === undefined || data.length === 0) {
    return
  }

  if (selectedGenre !== "All") {
    var render = data?.shows.filter((item) => item.genres?.includes(selectedGenre) || item.tags?.includes(selectedGenre));

    return (
          AnimeListFlex(render, selectedGenre)
      )
  } else {
      if (data?.categories) {
        return (
          data.categories.map((item) => {
            var category = item;
            var render = data.shows
              .filter((item) => category.items.includes(item.id))
              .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));
              return <AnimeListCarousel key={category.name} shows={render} category={category} />;
          })
        )
      } else {
        // If no categories, show all shows in a flex layout
        return AnimeListFlex(data?.shows || []);
      }
  }
}

export function AnimeListFlex(shows, genreTitle) {
  return (
    <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      {genreTitle && (
        <h2 className="mb-5 text-center font-sans text-2xl font-medium tracking-wide text-white">{genreTitle}</h2>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {shows.map((node) => AnimeItem(node))}
      </div>
    </div>
  );
}

export function AnimeListCarousel({ shows, category }) {
  return (
  <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{category.name}</h2>
      <EmblaCarousel>
        {shows.map((node) => AnimeItem(node))}
      </EmblaCarousel>
      </div>
  )
}

export function AnimeItem(node) {
  const url = `https://anilist.co/anime/${node["id"]}`;
  const debugMode = process.env.REACT_APP_DEBUG === "true";

  // Extract all score fields from the node
  let scoreFields = debugMode ? Object.keys(node).filter(key =>
    key.includes('score') || key.includes('Score')
  ) : [];

  // Sort to show recommend_score first
  if (debugMode && scoreFields.length > 0) {
    scoreFields = scoreFields.sort((a, b) => {
      if (a === 'recommend_score') return -1;
      if (b === 'recommend_score') return 1;
      return a.localeCompare(b);
    });
  }

  return (
    <div key={node["id"]} className="group flex w-fit flex-col rounded bg-zinc-900 duration-300 ease-in hover:scale-125 hover:bg-zinc-600 hover:z-10">
      <a className="card-image relative block h-[326px] flex items-end" href={url} target="_blank" rel="noopener noreferrer">
        <img className="card-image rounded" src={node["cover_image"]} alt={node["title"]} />
        {node["status"] === "not_yet_released" && (
          <span className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 text-center font-sans text-xs uppercase text-white rounded">
            Upcoming {node["season"]}
          </span>
        )}
        {debugMode && scoreFields.length > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-95 px-3 py-2 rounded text-xs text-white overflow-y-auto invisible group-hover:visible">
            {scoreFields.map((field) => (
              <div key={field} className="mb-1">
                <span className={`font-semibold ${field === 'recommend_score' ? 'text-green-400' : 'text-blue-300'}`}>{field}:</span>{" "}
                <span className={field === 'recommend_score' ? 'text-green-200 font-bold' : 'text-white'}>{typeof node[field] === 'number' ? node[field].toFixed(3) : node[field]}</span>
              </div>
            ))}
          </div>
        )}
      </a>
      <div className="card-text h-28">
        <a className="mt-2 flex h-12 items-center justify-center align-middle" href={url} target="_blank" rel="noopener noreferrer" title={node["title"]}>
          <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200 hover:underline">
            {node["title"]}
          </h4>
        </a>
        <p className="invisible flex-wrap justify-center text-center align-middle font-sans text-xs font-medium tracking-wide text-blue-50 group-hover:visible group-hover:flex">
          {node["genres"].map((genre) => (
            <span className="mx-1" key={genre}>{genre}</span>
          ))}
        </p>
      </div>
    </div>
  );

}
