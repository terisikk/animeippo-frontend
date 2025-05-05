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

export function AnimeContent(data, selectedGenre) {

  if (data === undefined || data.length === 0) {
    return
  }

  if (selectedGenre !== "All") {
    var render = data?.shows.filter((item) => item.genres?.includes(selectedGenre) || item.tags?.includes(selectedGenre));

    return (
          AnimeListFlex(render)
      )
  } else {
      return (
        data?.categories.map((item) => {
          var category = item;
          var render = data.shows
            .filter((item) => category.items.includes(item.id))
            .sort((a, b) => category.items.indexOf(a.id) - category.items.indexOf(b.id));
            return AnimeListCarousel(render, category);
        })
      )
  }
}

export function AnimeListFlex(shows) {
  return (
    <div className={`flex flex-wrap justify-center ${shows.length ? "visible" : "hidden"}`}>
      {shows.map((node) => AnimeItem(node))}
    </div>
  );
}

export function AnimeListCarousel(shows, category) {
  return (
  <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      <h2 className="mb-5 ml-5 font-sans text-2xl font-medium tracking-wide text-white">{category.name}</h2>
      <Carousel responsive={responsive} centerMode={true}>
        {shows.map((node) => AnimeItem(node))}
      </Carousel>
      </div>
  )
}

export function AnimeItem(node) {
  const url = `https://anilist.co/anime/${node["id"]}`;

  return (
    <div className="group mx-2 w-40 sm:w-48 md:w-56 rounded bg-zinc-900 duration-300 ease-in hover:scale-125 hover:bg-zinc-600 hover:z-10">
      <a className="relative block card-image overflow-hidden" href={url}>
        <img className="card-image rounded" src={node["cover_image"]} alt={node["title"]} />
        {node["status"] === "not_yet_released" && (
          <span className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 text-xs uppercase text-white rounded">
            Upcoming {node["season"]}
          </span>
        )}
      </a>
      <div className="h-28">
        <a className="mt-2 flex h-12 items-center justify-center" href={url}>
          <h4 className="line-clamp-2 px-2 text-center text-base font-medium tracking-wide text-blue-200 hover:underline">
            {node["title"]}
          </h4>
        </a>
        <p className="invisible justify-center text-center text-xs font-medium text-blue-50 group-hover:visible group-hover:flex flex-wrap">
          {node["genres"].map((genre) => (
            <span key={genre} className="mx-1">{genre}</span>
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
