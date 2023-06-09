import { Flipper, Flipped } from "react-flip-toolkit";
import Carousel from "react-multi-carousel";

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
      <h2 className="mb-30 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{category.name}</h2>
      <Carousel className="z-0" responsive={responsive} centerMode={true}>
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
    <div className="card group rounded hover:scale-125 ease-in duration-300 bg-zinc-900 hover:bg-zinc-600">
      <a href={url}>
        <img className="rounded" src={node["coverImage"]} alt={node["title"]} />
      </a>
      <div className="card-text pb-5">
        <h4 className="text-bottom my-2 px-2 line-clamp-2 text-center font-sans text-lg font-medium tracking-wide text-blue-200 hover:underline">
          <a href={url}>{node["title"]}</a>
        </h4>
        <p className="group-hover:flex flex-wrap justify-center font-sans text-sm text-center tracking-wide font-medium text-blue-50 invisible group-hover:visible">
          {node["genres"].map((genre) => <span className="mx-1">{genre}</span>)}
        </p>
      </div>
    </div>
  );
}
