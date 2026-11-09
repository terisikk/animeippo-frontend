import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper"
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

import { HeroCard } from "./HeroCard";

export function HeroCarousel({ shows, title, limit = 99 }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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
    <Box>
      {/* Bit of a hack to hide title based on it's text */}
      {title && title != "Picked for You" && (
        <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{title}</h2>
      )}
      <Box
        ref={emblaRef}
        sx={{
          overflow: "hidden",
        }}
      >
        {/* Container */}
        <Box sx={{ display: "flex", touchAction: "pan-y pinch-zoom" }}>
          {cards.map((card, i) => (
            <div className="flex-[0_0_100%]" key={card.key}>
              {card}
            </div>
          ))}
        </Box>
      </Box>
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
