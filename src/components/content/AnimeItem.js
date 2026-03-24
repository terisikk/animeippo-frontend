import { memo } from "react";
import { anilistUrl } from "../../styles";

export const AnimeItem = memo(function AnimeItem({ node }) {
  const url = anilistUrl(node["id"]);
  const debugMode = process.env.REACT_APP_DEBUG === "true";

  let scoreFields = debugMode ? Object.keys(node).filter(key =>
    key.includes('score') || key.includes('Score')
  ) : [];

  if (debugMode && scoreFields.length > 0) {
    scoreFields = scoreFields.sort((a, b) => {
      if (a === 'recommend_score') return -1;
      if (b === 'recommend_score') return 1;
      return a.localeCompare(b);
    });
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex w-fit flex-col rounded bg-zinc-900 duration-300 ease-in hover:scale-105 hover:bg-zinc-600 hover:z-10">
      <div className="card-image-container relative flex items-end">
        <img className="card-image rounded" src={node["cover_image"]} alt={node["title"]} loading="lazy" />
        {node["status"]?.toUpperCase() === "NOT_YET_RELEASED" && (
          <span className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 text-center font-sans text-xs uppercase text-white rounded">
            Upcoming {node["season"]?.toLowerCase()}
          </span>
        )}
        {debugMode && scoreFields.length > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-95 px-3 py-2 rounded text-xs text-white overflow-y-auto invisible group-hover:visible">
            {scoreFields.map((field) => (
              <div key={field} className="mb-1">
                <span className={`font-semibold ${field === 'recommend_score' ? 'text-green-400' : 'text-blue-300'}`}>{field}:</span>{" "}
                <span className={field === 'recommend_score' ? 'text-green-200 font-bold' : 'text-white'}>{typeof node[field] === 'number' ? node[field].toFixed(3) : node[field]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card-text h-28">
        <div className="mt-2 flex h-12 items-center justify-center align-middle">
          <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200">
            {node["title"]}
          </h4>
        </div>
        <p className="invisible flex-wrap justify-center text-center align-middle font-sans text-xs font-medium tracking-wide text-blue-50 group-hover:visible group-hover:flex">
          {node["genres"].map((genre) => (
            <span className="mx-1" key={genre}>{genre}</span>
          ))}
        </p>
      </div>
    </a>
  );
});
