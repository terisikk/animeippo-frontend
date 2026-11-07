import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { anilistUrl } from "../../styles";
import { HeroDetails } from "../shared/HeroDetails";
import { Card, CardMedia, Box, MobileStepper } from "@mui/material";


export function HeroCarousel({ shows, title, limit = 99 }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

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
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInitOrReInit);

    // Clean up listeners on unmount
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInitOrReInit);
    };
  }, [emblaApi]);

  const cards = shows.slice(0, limit).map((node) => {
    const url = anilistUrl(node["id"]);

    return (
      <Box
        sx={{
          position: "relative",
          "&:hover .animeImage": {
            /*scale: "105%",*/
          },
          "&:hover .reveal-me": {
            opacity: 1,
          },
          "&:hover .hide-me": {
            opacity: 0,
          },
          "& .animeImage": {
            transition: "scale 0.3s ease-in",
          },
          cursor: "pointer",
        }}
        key={node["id"]}
      >
        <a target="_blank" href={url} rel="noreferrer">
          <Card
            className="animeImage"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "background.main",
            }}
          >
            <Box sx={{ position: "relative" }}>
              { /*TODO: Mobile view. Show normal image but as bigger? Need to combine the elements. */}
              <CardMedia
                component="img"
                image={node["banner_image"]}
                title={node["title"]}
                sx={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
              <HeroDetails node={node} />
            </Box>
          </Card>
        </a>
      </Box>
    );
  });

  return (
    <Box sx={{ padding: '2em' }}>
      { /* Bit of a hack to hide title based on it's text */}
      {title && title != "Picked for You" && <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{title}</h2>}
      <Box ref={emblaRef} sx={{ overflow: 'hidden', width: '100%' }}>        {/* Container */}
        <Box sx={{ display: 'flex', touchAction: 'pan-y pinch-zoom' }}>
          {cards.map((card, i) => (
            <div
              className="hero-slide flex-[0_0_100%] px-4"
              key={card.key}
            >
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
          bgcolor: 'transparent',
          justifyContent: 'center',
          '& .MuiMobileStepper-dots': {
            gap: 1,
          },
          '& .MuiMobileStepper-dot': {
            backgroundColor: 'primary.dark',
            '&.MuiMobileStepper-dotActive': {
              backgroundColor: 'primary.light',
            },
          },
        }}
      />
    </Box>
  );
}
