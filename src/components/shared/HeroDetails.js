import { FORMAT_LABELS } from "../content/AnimeItem";

export function HeroDetails({ node, titleSize = "text-xl" }) {
  return (
    <div className="relative min-w-0 flex-1 pt-1 flex flex-col self-stretch" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
      <h3 className={`line-clamp-2 font-sans ${titleSize} font-semibold tracking-wide text-white`}>
        {node["title"]}
      </h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {node["genres"]?.slice(0, 6).map((genre) => (
          <span key={genre} className="rounded-full border border-blue-300/20 px-2 py-0.5 font-sans text-xs font-medium text-blue-100">
            {genre}
          </span>
        ))}
      </div>
      {node["moods"]?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {node["moods"].map((mood) => (
            <span key={mood} className="rounded-full border border-blue-300/20 bg-zinc-700/80 px-2 py-0.5 font-sans text-xs font-medium text-blue-200 capitalize">
              {mood}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center justify-between pt-4">
        {node["discovery_score"] != null && (
          <span className="font-sans text-3xl font-bold text-blue-400">
            {(node["discovery_score"] * 100).toFixed(0)}%
          </span>
        )}
        {FORMAT_LABELS[node["format"]] && (
          <span className="rounded bg-black/60 px-1.5 py-0.5 font-sans text-[0.625rem] font-medium uppercase tracking-wide text-white">
            {FORMAT_LABELS[node["format"]]}
          </span>
        )}
      </div>
    </div>
  );
}
