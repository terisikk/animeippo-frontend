import { AnimeItem } from "./AnimeItem";
import { SECTION_TITLE } from "../../styles";

export function AnimeListFlex({ shows, genreTitle }) {
  return (
    <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      {genreTitle && (
        <h2 className={`mb-5 text-center ${SECTION_TITLE}`}>{genreTitle}</h2>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {shows.map((node, i) => (
          <div key={node["id"]} className="w-52 animate-hero-fade-in" style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}>
            <AnimeItem node={node} />
          </div>
        ))}
      </div>
    </div>
  );
}
