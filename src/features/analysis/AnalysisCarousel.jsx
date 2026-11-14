import Box from "@mui/material/Box";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { CarouselButton } from "../../components/shared/CarouselButton";


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
    <Box
      sx={{
        position: "relative",
        "&:hover .side-nav-button": { opacity: { xs: 0, sm: 1 } },
        overflowX: "clip",
      }}
    >
      <Box className="embla__viewport" ref={emblaRef}>
        <Box className="embla__container" sx={{ display: "flex" }}>
          {Array.isArray(children)
            ? children.map((child, i) => (
              <Box
                key={child.key ?? i}
                sx={{
                  // Override the Embla CSS variables directly per breakpoint:
                  '--slide-size': {
                    xs: '30%',
                    xl: '23%',
                  },
                  '--slide-spacing': '0.3rem',
                  '--slide-max-width': 'none',

                  // Core Embla slide layout rules:
                  flex: '0 0 var(--slide-size)',
                  maxWidth: 'var(--slide-max-width)',
                  paddingLeft: 'var(--slide-spacing)',
                  minWidth: 0,
                  zIndex: 0,
                  transitionDuration: '300ms',
                }}
              >
                {child}
              </Box>
            ))
            : children}
        </Box>
      </Box>
      {canScrollPrev && <CarouselButton direction="left" size="small" onClick={() => emblaApi?.scrollPrev()} />}
      {canScrollNext && <CarouselButton direction="right" size="small" onClick={() => emblaApi?.scrollNext()} />}
    </Box >
  );
}
