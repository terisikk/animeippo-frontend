import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export function AnalysisCarousel({ children }) {
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
