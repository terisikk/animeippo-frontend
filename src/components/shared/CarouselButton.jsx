import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ButtonBase from "@mui/material/ButtonBase";

export function CarouselButton({ direction = "right", onClick = {} }) {
  const label = direction == "right" ? "Next slide" : "Previous slide";

  const gradientDir = direction == "right" ? "left" : "right";

  const gradient = "linear-gradient(to " + gradientDir + ", rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)";
  const hoverGradient = "linear-gradient(to " + gradientDir + ", rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)";
  const icon =
    direction == "right" ? <ChevronRightIcon sx={{ fontSize: 36 }} /> : <ChevronLeftIcon sx={{ fontSize: 36 }} />;

  const left = direction == "right" ? undefined : 0;
  const right = direction == "right" ? 0 : undefined;

  return (
    <ButtonBase
      className="side-nav-button"
      onClick={onClick}
      aria-label={label}
      sx={{
        position: "absolute",
        left: left,
        right: right,
        top: 0,
        bottom: 0,
        height: "66%",
        alignSelf: "center",
        borderRadius: 5,
        width: { sm: 64, md: 86 }, // Width of the clickable vertical strip
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        opacity: 0,
        transition: "opacity 0.2s ease, background-color 0.2s ease",
        // Gradient background so it subtly shades the edge on hover
        background: gradient,
        "&:hover": {
          background: hoverGradient,
        },
      }}
    >
      {icon}
    </ButtonBase>
  );
}
