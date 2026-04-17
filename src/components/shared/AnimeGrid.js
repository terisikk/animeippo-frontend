import { AnimeItem } from "../content/AnimeItem";

export function AnimeGrid({ shows }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {shows.map((node, i) => (
        <div key={node["id"]} className="w-52 animate-hero-fade-in hover:z-10" style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}>
          <AnimeItem node={node} />
        </div>
      ))}
    </div>
  );
}
