import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { anilistUrl } from "../../styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { HeroDetails } from "../shared/HeroDetails";

export function TopPicksHero({ shows, title }) {
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
    const url = anilistUrl(node["id"]);

    return (
      <a key={node["id"]} href={url} target="_blank" rel="noopener noreferrer" className="group relative flex flex-row items-start gap-4 rounded-lg p-3 overflow-hidden transition-all duration-300 hover:bg-zinc-800/50 hover:scale-105">
        <img
          className="absolute inset-0 h-full w-full rounded-lg object-cover blur-2xl opacity-30 pointer-events-none"
          src={node["cover_image"]}
          alt=""
          aria-hidden="true"
        />
        <div className="relative shrink-0 aspect-[2/3] h-[250px] lg:h-[300px]">
          <img
            className="h-full w-full rounded object-cover"
            src={node["cover_image"]}
            alt={node["title"]}
            />
          {node["status"]?.toUpperCase() === "NOT_YET_RELEASED" && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-amber-500 px-2 py-1 font-sans text-xs font-semibold capitalize text-amber-950">
              <CalendarMonthIcon sx={{ fontSize: 14 }} />
              {node["season"]?.toLowerCase()}
            </span>
          )}
          {node["status"]?.toUpperCase() === "RELEASING" && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-emerald-500 px-2 py-1 font-sans text-xs font-semibold capitalize text-emerald-950">
              <CalendarMonthIcon sx={{ fontSize: 14 }} />
              Airing
            </span>
          )}
        </div>
        <HeroDetails node={node} />
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
              <div className="hero-slide flex-[0_0_100%] min-w-0 lg:flex-1 px-6 lg:px-0 animate-hero-fade-in" style={{ animationDelay: `${i * 150}ms` }} key={card.key}>
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
