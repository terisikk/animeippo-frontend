import { Flipper, Flipped } from "react-flip-toolkit";

export function AnimeList({ shows }) {
  return (
    <div>
      <Flipper flipKey={shows}>
        <div className="flex flex-wrap justify-center justify-items-center gap-4">
          {shows.map((node) => AnimeItem(node))}
        </div>
      </Flipper>
    </div>
  );
}

export function AnimeItem(node) {
  const url = `https://myanimelist.net/anime/${node["id"]}`;

  return (
    <Flipped flipId={encodeURIComponent(node["title"])}>
      <div>
        <a href={url}>
          <img src={node["coverImage"]} alt={node["title"]} />
        </a>
        <h4 className="card-text my-2 line-clamp-2 text-center font-sans text-lg font-medium tracking-wide text-blue-200 hover:underline">
          <a href={url}>{node["title"]}</a>
        </h4>
      </div>
    </Flipped>
  );
}
