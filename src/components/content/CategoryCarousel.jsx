import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TypoGraphy from "@mui/material/Typography"

import { AnimeCard } from "./AnimeCard";

export function CategoryCarousel({ shows, category }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 2561px)": { slidesToScroll: 10 },
      "(min-width: 1921px) and (max-width: 2560px)": { slidesToScroll: 8 },
      "(min-width: 1025px) and (max-width: 1920px)": { slidesToScroll: 6 },
      "(min-width: 721px) and (max-width: 1024px)": { slidesToScroll: 4 },
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

  const handleKeyDown = useCallback(
    (e) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      }
    },
    [emblaApi],
  );

  const visible = shows?.length ? "visible" : "hidden"
  return (
    <Box sx={{ visible: { visible }, marginBottom: "1em" }}>
      <TypoGraphy variant="h5" color="white" sx={{ marginBottom: "0.5em", marginLeft: "1em" }}>{category?.name}</TypoGraphy>
      <div
        className="embla relative overflow-x-clip"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Carousel"
      >
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex">
            {shows?.map((node) => (
              <div className="embla__slide" key={node["id"]}>
                <AnimeCard key={node["id"]} node={node} />
              </div>
            ))}
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
    </Box >
  );
}
