import Carousel from "react-multi-carousel";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 2048 },
    items: 10,
    slidesToSlide: 10,
  },
  desktop: {
    breakpoint: { max: 2048, min: 1024 },
    items: 6,
    slidesToSlide: 5,
  },
  mid: {
    breakpoint: { max: 1024, min: 720 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 720, min: 464 },
    items: 2,
    slidesToSlide: 3.5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};

export function PlaceHolderContent() {
  return (
    <div className="animate-pulse">
      {PlaceholderList()}
      {PlaceholderList()}
      {PlaceholderList()}
      {PlaceholderList()}
    </div>
  );
}

export function PlaceholderList() {
  var placeholders = [];
  for (let i = 0; i < 10; i++) {
    placeholders.push(PlaceholderItem());
  }

  console.log("Placeholders: ");
  console.log(placeholders);

  return (
    <div className="pb-8">
      <h2 className="ml-5 pb-5 font-sans text-2xl font-medium tracking-wide text-white">...</h2>
      <Carousel responsive={responsive} centerMode={true}>
        {placeholders.map((placeholder) => (
          <div>{placeholder}</div>
        ))}
      </Carousel>
    </div>
  );
}

export function PlaceholderItem() {
  return (
    <div className={`group mx-2 flex flex-row flex-wrap content-between rounded`}>
      <img className="card-image rounded" src="./placeholder.png" alt="" />
      <div className="card-text h-28">
        <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200">
          ...
        </h4>
      </div>
    </div>
  );
}

export function AnimeList(category, shows, loading) {
  var render = shows.filter((item) => category.items.includes(item.id));

  console.log(shows);

  return (
    <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{category.name}</h2>
      <Carousel responsive={responsive} centerMode={true}>
        {render.map((node) => AnimeItem(node))}
      </Carousel>
    </div>
  );
}

export function AnimeItem(node) {
  const url = `https://anilist.co/anime/${node["id"]}`;

  console.log(node);

  return (
    <div
      className={`group mx-2 flex flex-row flex-wrap content-between rounded bg-zinc-900 duration-300 ease-in hover:scale-125 hover:bg-zinc-600`}
    >
      <a className="card-image" href={url}>
        <img className="card-image rounded" src={node["coverImage"]} alt={node["title"]} />
        {node["status"] === "not_yet_released" && (
          <span className="absolute bottom-28 bg-red-500 px-4 py-2 text-center font-sans text-sm uppercase text-white">
            Upcoming {node["start_season"]}
          </span>
        )}
      </a>
      <div className="card-text h-28">
        <a className="mt-2 flex h-12 items-center justify-center align-middle" href={url}>
          <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200 hover:underline">
            {node["title"]}
          </h4>
        </a>
        <p className="invisible flex-wrap justify-center text-center align-middle font-sans text-xs font-medium tracking-wide text-blue-50 group-hover:visible group-hover:flex">
          {node["genres"].map((genre) => (
            <span className="mx-1">{genre}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

function BorderColorForStatus(status) {
  var color = "border-green-600";

  switch (status) {
    case "current":
      color = "border-blue-600";
      break;
    case "paused":
      color = "border-yellow-600";
      break;
    case "dropped":
      color = "border-red-600";
      break;
    case "planning":
      color = "border-gray-600";
      break;
    default:
      break;
  }

  return color;
}
