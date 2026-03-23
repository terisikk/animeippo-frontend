import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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
          <ChevronLeftIcon />
        </button>
      )}
      {canScrollNext && (
        <button
          className="embla__button embla__button--next"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slides"
        >
          <ChevronRightIcon />
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
  const placeholders = [];
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
const HERO_CATEGORIES = new Set([TOP_PICKS_CATEGORY, "Hidden Gems for You", "Top Movies for You"]);

export function AnimeContent(data) {

  if (data === undefined || data.length === 0) {
    return
  }

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
        <h1 className="ml-6 mt-6 font-sans text-3xl font-bold tracking-tight text-white">Picked for You</h1>
        {topPicks.length > 0 && <TopPicksHero shows={topPicks} />}
        {otherCategories.map((category) => {
          const render = data.shows
            .filter((item) => category.items.includes(item.id))
            .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));

          if (HERO_CATEGORIES.has(category.name)) {
            return <TopPicksHero key={category.name} shows={render} title={category.name} />;
          }
          return <AnimeListCarousel key={category.name} shows={render} category={category} />;
        })}
      </>
    )
  } else {
    return AnimeListFlex(data?.shows || []);
  }
}

function FilterDropdown({ label, value, options, onChange, width = "w-[140px]" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel = options.find(o => o.value === value)?.label || label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`${width} flex cursor-pointer items-center justify-between gap-1 rounded border-none bg-zinc-800 px-4 py-2 font-sans text-sm font-medium tracking-wide text-blue-200 transition-colors duration-200 hover:bg-zinc-700`}
      >
        <span className="truncate">{activeLabel}</span>
        <ExpandMoreIcon sx={{ fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      {open && (
        <div className={`absolute left-0 top-full z-30 ${width} bg-zinc-800 shadow-lg`}>
          <List disablePadding>
            {options.map(o => (
              <ListItem key={o.value} disablePadding>
                <ListItemButton
                  selected={value === o.value}
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  sx={{ '&:hover': { bgcolor: '#3f3f46' } }}
                >
                  <ListItemText primary={o.label} sx={{ color: value === o.value ? '#ffffff' : '#bfdbfe' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}

function GenreCombobox({ selectedGenre, onSelect, genres, tags, matchCounts, searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const comboRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (comboRef.current && !comboRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const query = searchQuery.toLowerCase();
  const filteredGenres = query ? genres.filter(g => g.toLowerCase().includes(query)) : genres;
  const filteredTags = query ? tags.filter(t => t.toLowerCase().includes(query)) : tags;

  const handleSelect = (value) => {
    onSelect(value);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-[200px]" ref={comboRef}>
      {selectedGenre !== "All" ? (
        <button
          onClick={() => { handleSelect("All"); setIsOpen(false); }}
          className="flex w-full cursor-pointer items-center justify-between gap-1 rounded border-none bg-zinc-800 px-4 py-2 font-sans text-sm font-medium tracking-wide text-blue-200 transition-colors duration-200 hover:bg-zinc-700"
        >
          <span className="truncate">{selectedGenre}</span>
          <ClearIcon sx={{ fontSize: 16 }} />
        </button>
      ) : (
        <button
          className="flex w-full cursor-pointer items-center justify-between gap-1 rounded border-none bg-zinc-800 px-4 py-2 font-sans text-sm font-medium tracking-wide text-blue-200 transition-colors duration-200 hover:bg-zinc-700"
          onClick={() => setIsOpen(o => !o)}
        >
          <input
            type="text"
            placeholder="All genres & tags"
            value={searchQuery}
            onChange={(e) => { e.stopPropagation(); setSearchQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            aria-label="Search genres and tags"
            className="w-full border-none bg-transparent p-0 font-sans text-sm font-medium tracking-wide text-blue-200 placeholder-blue-200/50 outline-none"
          />
          <ExpandMoreIcon sx={{ fontSize: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
      )}
      {isOpen && selectedGenre === "All" && (
        <div className="absolute left-0 top-full z-30 max-h-72 w-[250px] overflow-y-auto bg-zinc-800 shadow-lg">
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelect("All")} sx={{ '&:hover': { bgcolor: '#3f3f46' } }}>
                <ListItemText primary="All" sx={{ color: '#bfdbfe' }} />
                <span className="text-xs text-zinc-500">{matchCounts.get("All")}</span>
              </ListItemButton>
            </ListItem>
            {filteredGenres.map(g => (
              <ListItem key={g} disablePadding>
                <ListItemButton onClick={() => handleSelect(g)} sx={{ '&:hover': { bgcolor: '#3f3f46' } }}>
                  <ListItemText primary={g} sx={{ color: '#bfdbfe' }} />
                  <span className="text-xs text-zinc-500">{matchCounts.get(g) ?? 0}</span>
                </ListItemButton>
              </ListItem>
            ))}
            {filteredTags.length > 0 && (
              <ListItem>
                <ListItemText primary="Tags" sx={{ color: '#71717a', '& .MuiTypography-root': { fontSize: '0.75rem', textTransform: 'uppercase' } }} />
              </ListItem>
            )}
            {filteredTags.map(t => (
              <ListItem key={t} disablePadding>
                <ListItemButton onClick={() => handleSelect(t)} sx={{ '&:hover': { bgcolor: '#3f3f46' } }}>
                  <ListItemText primary={t} sx={{ color: '#bfdbfe' }} />
                  <span className="text-xs text-zinc-500">{matchCounts.get(t) ?? 0}</span>
                </ListItemButton>
              </ListItem>
            ))}
            {filteredGenres.length === 0 && filteredTags.length === 0 && (
              <ListItem>
                <ListItemText primary="No matches" sx={{ color: '#71717a' }} />
              </ListItem>
            )}
          </List>
        </div>
      )}
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "FINISHED", label: "Finished" },
  { value: "RELEASING", label: "Releasing" },
  { value: "NOT_YET_RELEASED", label: "Upcoming" },
];

const SEASON_OPTIONS = [
  { value: "", label: "All seasons" },
  { value: "WINTER", label: "Winter" },
  { value: "SPRING", label: "Spring" },
  { value: "SUMMER", label: "Summer" },
  { value: "FALL", label: "Fall" },
];

export function BrowseContent({ data }) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");

  const availableGenres = useMemo(() => {
    const presentGenres = new Set();
    for (const show of (data?.shows || [])) {
      for (const g of (show.genres || [])) presentGenres.add(g);
    }
    return [...presentGenres].sort();
  }, [data?.shows]);

  const availableTags = useMemo(() => {
    const presentTags = new Set();
    for (const show of (data?.shows || [])) {
      for (const tag of (show.tags || [])) presentTags.add(tag);
    }
    return (data?.tags || []).filter(tag => presentTags.has(tag) && !availableGenres.includes(tag));
  }, [data?.tags, data?.shows, availableGenres]);

  const matchCounts = useMemo(() => {
    const counts = new Map();
    let shows = data?.shows || [];
    if (statusFilter) shows = shows.filter(s => s.status === statusFilter);
    if (seasonFilter) shows = shows.filter(s => s.season === seasonFilter);
    for (const show of shows) {
      for (const g of (show.genres || [])) {
        counts.set(g, (counts.get(g) || 0) + 1);
      }
      for (const t of (show.tags || [])) {
        counts.set(t, (counts.get(t) || 0) + 1);
      }
    }
    counts.set("All", shows.length);
    return counts;
  }, [data?.shows, statusFilter, seasonFilter]);

  const filteredShows = useMemo(() => {
    let result = data?.shows || [];
    if (selectedGenre !== "All") result = result.filter(s => s.genres?.includes(selectedGenre) || s.tags?.includes(selectedGenre));
    if (statusFilter) result = result.filter(s => s.status === statusFilter);
    if (seasonFilter) result = result.filter(s => s.season === seasonFilter);
    return result;
  }, [data?.shows, selectedGenre, statusFilter, seasonFilter]);

  const hasActiveFilters = selectedGenre !== "All" || statusFilter || seasonFilter;

  const clearAllFilters = () => {
    setSelectedGenre("All");
    setStatusFilter("");
    setSeasonFilter("");
    setSearchQuery("");
  };

  if (!data) return null;

  return (
    <>
      <div className="my-4 py-3">
        <h1 className="mb-3 pl-6 font-sans text-3xl font-bold tracking-tight text-white">Your Recommendations</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <GenreCombobox
            selectedGenre={selectedGenre}
            onSelect={setSelectedGenre}
            genres={availableGenres}
            tags={availableTags}
            matchCounts={matchCounts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <FilterDropdown label="Status" value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} />
          <FilterDropdown label="Season" value={seasonFilter} options={SEASON_OPTIONS} onChange={setSeasonFilter} />
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-sm text-zinc-400">Showing:</span>
            {selectedGenre !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-0.5 text-sm text-white">
                {selectedGenre}
                <button onClick={() => setSelectedGenre("All")} className="flex items-center border-none bg-transparent p-0 text-white/70 cursor-pointer hover:text-white" aria-label={`Remove ${selectedGenre} filter`}>
                  <ClearIcon style={{ fontSize: 14 }} />
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-0.5 text-sm text-white">
                {STATUS_OPTIONS.find(o => o.value === statusFilter)?.label}
                <button onClick={() => setStatusFilter("")} className="flex items-center border-none bg-transparent p-0 text-white/70 cursor-pointer hover:text-white" aria-label="Remove status filter">
                  <ClearIcon style={{ fontSize: 14 }} />
                </button>
              </span>
            )}
            {seasonFilter && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-0.5 text-sm text-white">
                {SEASON_OPTIONS.find(o => o.value === seasonFilter)?.label}
                <button onClick={() => setSeasonFilter("")} className="flex items-center border-none bg-transparent p-0 text-white/70 cursor-pointer hover:text-white" aria-label="Remove season filter">
                  <ClearIcon style={{ fontSize: 14 }} />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="cursor-pointer border-none bg-transparent px-2 py-0.5 text-sm text-zinc-400 hover:text-white"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      <div aria-live="polite">
        {filteredShows.length > 0
          ? AnimeListFlex(filteredShows, selectedGenre !== "All" ? selectedGenre : undefined)
          : (
            <div className="flex justify-center py-16 text-zinc-400 text-lg">
              No shows match these filters.
            </div>
          )
        }
      </div>
    </>
  );
}

function TopPicksHero({ shows, title }) {
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
      {title && <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{title}</h2>}
      <div className="lg:flex lg:justify-center lg:gap-6 lg:px-6">
        <div className="overflow-x-clip overflow-y-visible lg:contents cursor-grab active:cursor-grabbing" ref={emblaRef}>
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

export function AnalysisContent(data) {
  if (data === undefined || data.length === 0) {
    return;
  }

  if (!data?.categories) {
    return null;
  }

  return (
    <>
    <h1 className="ml-6 mt-6 font-sans text-3xl font-bold tracking-tight text-white">Your Profile Insights</h1>
    <div className="flex flex-wrap justify-center gap-6 px-6 py-6">
      {data.categories.map((category, index) => {
        const shows = data.shows
          .filter((item) => category.items.includes(item.id))
          .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));

        return <AnalysisCard key={category.name} category={category} shows={shows} index={index} />;
      })}
    </div>
    </>
  );
}

function AnalysisCard({ category, shows, index }) {
  const stats = category.stats;
  const accentImage = shows[0]?.cover_image;

  return (
    <div
      className="relative w-full rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-4 transition-all duration-300 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-blue-900/20 animate-hero-fade-in md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {accentImage && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover opacity-[0.07] blur-3xl"
            src={accentImage}
            alt=""
            aria-hidden="true"
          />
        </div>
      )}

      <div className="relative">
        <h3 className="mb-2 font-sans text-lg font-semibold tracking-wide text-white">
          {category.name}
        </h3>

        {stats && (
          <div className="mb-3 flex gap-4 text-sm">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.count}</span>
              <span className="text-xs text-zinc-400">titles</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.mean_score != null ? stats.mean_score.toFixed(1) : "?"}</span>
              <span className="text-xs text-zinc-400">avg</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.completion_rate?.toFixed(0)}%</span>
              <span className="text-xs text-zinc-400">completed</span>
            </div>
          </div>
        )}

        <AnalysisCarousel>
          {shows.map((node) => (
            <AnalysisItem key={node["id"]} node={node} />
          ))}
        </AnalysisCarousel>
      </div>
    </div>
  );
}

function AnalysisCarousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
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

  return (
    <div className="group/carousel relative">
      <div className="overflow-x-clip" ref={emblaRef}>
        <div className="flex gap-1">
          {Array.isArray(children) ? children.map((child, i) => (
            <div className="flex-[0_0_23%] min-w-0" key={i}>
              {child}
            </div>
          )) : children}
        </div>
      </div>
      {canScrollPrev && (
        <button
          className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none bg-blue-500/90 text-white shadow cursor-pointer opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-blue-600"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slides"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>
      )}
      {canScrollNext && (
        <button
          className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none bg-blue-500/90 text-white shadow cursor-pointer opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-100 hover:bg-blue-600"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slides"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      )}
    </div>
  );
}

function AnalysisItem({ node }) {
  const url = `https://anilist.co/anime/${node["id"]}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block rounded">
      <img className="max-h-[150px] rounded" src={node["cover_image"]} alt={node["title"]} />
    </a>
  );
}

export function AnimeListFlex(shows, genreTitle) {
  return (
    <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      {genreTitle && (
        <h2 className="mb-5 text-center font-sans text-2xl font-medium tracking-wide text-white">{genreTitle}</h2>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {shows.map((node, i) => (
          <div key={node["id"]} className="animate-hero-fade-in" style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}>
            {AnimeItem(node)}
          </div>
        ))}
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
    <a key={node["id"]} href={url} target="_blank" rel="noopener noreferrer" className="group flex w-fit flex-col rounded bg-zinc-900 duration-300 ease-in hover:scale-105 hover:bg-zinc-600 hover:z-10">
      <div className="card-image-container relative flex items-end">
        <img className="card-image rounded" src={node["cover_image"]} alt={node["title"]} />
        {node["status"]?.toUpperCase() === "NOT_YET_RELEASED" && (
          <span className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 text-center font-sans text-xs uppercase text-white rounded">
            Upcoming {node["season"]?.toLowerCase()}
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
