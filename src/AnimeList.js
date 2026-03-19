import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

function EmblaCarousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    breakpoints: {
      '(min-width: 1921px)': { slidesToScroll: 8 },
      '(min-width: 1025px) and (max-width: 1920px)': { slidesToScroll: 6 },
      '(min-width: 721px) and (max-width: 1024px)': { slidesToScroll: 4 },
    },
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

  return (
    <div className="embla relative px-6" tabIndex={0} onKeyDown={handleKeyDown} role="region" aria-label="Carousel">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {Array.isArray(children) ? children.map((child, i) => (
            <div className="embla__slide flex justify-center" key={i}>
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

const TOP_PICKS_CATEGORY = "Your Top 3";

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
        const topPicksCategory = data.categories.find((c) => c.name === TOP_PICKS_CATEGORY);
        const otherCategories = data.categories.filter((c) => c.name !== TOP_PICKS_CATEGORY);

        const topPicks = topPicksCategory
          ? data.shows
              .filter((item) => topPicksCategory.items.includes(item.id))
              .sort((a, b) => topPicksCategory.items.indexOf(a.id) - topPicksCategory.items.indexOf(b.id))
          : [];

        return (
          <>
            {topPicks.length > 0 && <TopPicksHero shows={topPicks} />}
            {otherCategories.map((item) => {
              var category = item;
              var render = data.shows
                .filter((item) => category.items.includes(item.id))
                .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));
                return <AnimeListCarousel key={category.name} shows={render} category={category} />;
            })}
          </>
        )
      } else {
        // If no categories, show all shows in a flex layout
        return AnimeListFlex(data?.shows || []);
      }
  }
}

function TopPicksHero({ shows }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      '(min-width: 1024px)': { active: false },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const cards = shows.slice(0, 3).map((node) => {
    const url = `https://anilist.co/anime/${node["id"]}`;

    return (
      <a key={node["id"]} href={url} target="_blank" rel="noopener noreferrer" className="group relative flex flex-row items-start gap-4 rounded-lg p-3 overflow-hidden transition-all duration-300 hover:bg-zinc-800/50 hover:scale-105">
        <img
          className="absolute inset-0 h-full w-full rounded-lg object-cover blur-2xl opacity-30 pointer-events-none"
          src={node["cover_image"]}
          alt=""
          aria-hidden="true"
        />
        <div className="relative shrink-0">
          <img
            className="card-image rounded"
            src={node["cover_image"]}
            alt={node["title"]}
          />
        </div>
        <div className="relative min-w-0 pt-1 flex flex-col self-stretch" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          <h3 className="line-clamp-2 font-sans text-xl font-semibold tracking-wide text-white">
            {node["title"]}
          </h3>
          <p className="mt-2 flex flex-col gap-1">
            {node["genres"]?.slice(0, 8).map((genre) => (
              <span key={genre} className="font-sans text-sm font-medium tracking-wide text-blue-100">
                {genre}
              </span>
            ))}
          </p>
          {node["recommend_score"] != null && (
            <span className="mt-auto pt-4 inline-block font-sans text-3xl font-bold text-blue-400">
              {(node["recommend_score"] * 100).toFixed(0)}%
            </span>
          )}
        </div>
      </a>
    );
  });

  return (
    <div className="hero-section mb-8 pb-8 pt-6" style={{ background: 'radial-gradient(ellipse 160% 100% at center, rgba(23,37,84,0.3) 0%, rgba(24,24,27,0.5) 70%, rgb(24,24,27) 100%)' }}>
      <div className="lg:flex lg:justify-center lg:gap-6 lg:px-6">
        <div className="overflow-hidden lg:contents cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex lg:contents">
            {cards.map((card, i) => (
              <div className="hero-slide flex-[0_0_100%] min-w-0 lg:flex-1 px-6 lg:px-0 animate-hero-fade-in" style={{ animationDelay: `${i * 150}ms` }} key={i}>
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-6 bg-blue-400" : "w-2 bg-zinc-600"
              }`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
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
    <a key={node["id"]} href={url} target="_blank" rel="noopener noreferrer" className="group flex w-fit flex-col rounded bg-zinc-900 duration-300 ease-in hover:scale-110 hover:bg-zinc-600 hover:z-10">
      <div className="card-image-container relative flex items-end">
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
      </div>
      <div className="card-text h-28">
        <div className="mt-2 flex h-12 items-center justify-center align-middle">
          <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200">
            {node["title"]}
          </h4>
        </div>
        <p className="invisible flex-wrap justify-center text-center align-middle font-sans text-xs font-medium tracking-wide text-blue-50 group-hover:visible group-hover:flex">
          {node["genres"].map((genre) => (
            <span className="mx-1" key={genre}>{genre}</span>
          ))}
        </p>
      </div>
    </a>
  );

}
