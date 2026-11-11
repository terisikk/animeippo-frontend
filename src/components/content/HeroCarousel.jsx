import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper"
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { CarouselButton } from "../shared/CarouselButton";
import { HeroCard } from "./HeroCard";

export function HeroCarousel({ shows, title, limit = 99 }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false, containScroll: false, slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Navigation handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInitOrReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    onInitOrReInit();

    // Subscribe to Embla events
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInitOrReInit);

    // Clean up listeners on unmount
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInitOrReInit);
    };
  }, [emblaApi]);

  const cards = shows.slice(0, limit).map((node) => {
    return (
      <HeroCard node={node} />
    );
  });

  return (
    <Box sx={{
      position: 'relative',
      '&:hover .side-nav-button': { opacity: { xs: 0, sm: 1 }, }
    }}>
      {/* Bit of a hack to hide title based on it's text */}
      {title && title != "Picked for You" && (
        <h2 className="mb-5 ml-5 text-2xl font-medium tracking-wide text-white">{title}</h2>
      )}
      <Box
        ref={emblaRef}
        sx={{
          overflow: "hidden",
        }}
      >
        {/* Container */}
        <Box sx={{ display: "flex", alignItems: "center", touchAction: "pan-y pinch-zoom" }}>
          {cards.map((card, i) => (
            <Box key={i} sx={{
              flex: '0 0 100%',
            }}>
              {card}
            </Box>
          ))}
        </Box>
      </Box>
      <CarouselButton direction="left" onClick={scrollPrev} />
      <CarouselButton direction="right" onClick={scrollNext} />
      <MobileStepper
        variant="dots"
        steps={scrollSnaps.length}
        position="static"
        activeStep={selectedIndex}
        // Hide back/next arrow buttons since swiping or tapping dots handles navigation
        nextButton={<Box />}
        backButton={<Box />}
        sx={{
          bgcolor: "transparent",
          justifyContent: "center",
          "& .MuiMobileStepper-dots": {
            gap: 1,
          },
          "& .MuiMobileStepper-dot": {
            backgroundColor: "primary.dark",
            "&.MuiMobileStepper-dotActive": {
              backgroundColor: "primary.light",
            },
          },
        }}
      />
    </Box>
  );
}
