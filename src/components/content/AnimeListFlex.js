import { AnimeGrid } from "../shared/AnimeGrid";
import { SECTION_TITLE } from "../../styles";

export function AnimeListFlex({ shows, genreTitle }) {
  return (
    <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      {genreTitle && (
        <h2 className={`mb-5 text-center ${SECTION_TITLE}`}>{genreTitle}</h2>
      )}
      <AnimeGrid shows={shows} />
    </div>
  );
}
