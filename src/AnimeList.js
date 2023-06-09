import { Flipper, Flipped } from "react-flip-toolkit";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function AnimeList(category, shows) {
  var render = shows.filter((item) => category.items.includes(item.id));

  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 2048 },
      items: 9,
      slidesToSlide: 9,
    },
    desktop: {
      breakpoint: { max: 2048, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };

  return (
    <div>
      <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{category.name}</h2>
      <Carousel responsive={responsive} centerMode={true}>
        {render.map((node) => AnimeItem(node))}
      </Carousel>
    </div>
  );

  /*return (
    <div className="mb-10">
      <Flipper flipKey={shows}>
        <div className="flex flex-wrap justify-center justify-items-center gap-4">
          {render.map((node) => AnimeItem(node))}
        </div>
      </Flipper>
    </div>
  );*/
}

export function AnimeItem(node) {
  // const url = `https://myanimelist.net/anime/${node["id"]}`;
  const url = `https://anilist.co/anime/${node["id"]}`;

  //<Flipped flipId={encodeURIComponent(node["title"])}>
  // </Flipped>

  return (
    <div className="card mb-10">
      <a href={url}>
        <img className="rounded" src={node["coverImage"]} alt={node["title"]} />
      </a>
      <h4 className="card-text text-bottom my-2 line-clamp-2 text-center font-sans text-lg font-medium tracking-wide text-blue-200 hover:underline">
        <a href={url}>{node["title"]}</a>
      </h4>
    </div>
  );
}
