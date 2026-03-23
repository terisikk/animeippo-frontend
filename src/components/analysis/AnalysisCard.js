import { AnalysisCarousel } from "../carousel/AnalysisCarousel";
import { AnalysisItem } from "./AnalysisItem";

export function AnalysisCard({ category, shows, index }) {
  const stats = category.stats;
  const accentImage = shows[0]?.cover_image;

  return (
    <div
      className="relative w-full rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-4 transition-all duration-300 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-blue-900/20 animate-hero-fade-in md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {accentImage && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover opacity-[0.07] blur-3xl"
            src={accentImage}
            alt=""
            aria-hidden="true"
          />
        </div>
      )}

      <div className="relative">
        <h3 className="mb-2 font-sans text-lg font-semibold tracking-wide text-white">
          {category.name}
        </h3>

        {stats && (
          <div className="mb-3 flex gap-4 text-sm">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.count}</span>
              <span className="text-xs text-zinc-400">titles</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.mean_score != null ? stats.mean_score.toFixed(1) : "?"}</span>
              <span className="text-xs text-zinc-400">avg</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-blue-200">{stats.completion_rate?.toFixed(0)}%</span>
              <span className="text-xs text-zinc-400">completed</span>
            </div>
          </div>
        )}

        <AnalysisCarousel>
          {shows.map((node) => (
            <AnalysisItem key={node["id"]} node={node} />
          ))}
        </AnalysisCarousel>
      </div>
    </div>
  );
}
