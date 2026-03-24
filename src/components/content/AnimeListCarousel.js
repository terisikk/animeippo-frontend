import { EmblaCarousel } from "../carousel/EmblaCarousel";
import { AnimeItem } from "./AnimeItem";
import { SECTION_TITLE } from "../../styles";

export function AnimeListCarousel({ shows, category }) {
  return (
  <div className={`pb-8 ${shows.length ? "visible" : "hidden"}`}>
      <h2 className={`mb-5 ml-5 ${SECTION_TITLE}`}>{category.name}</h2>
      <EmblaCarousel>
        {shows.map((node) => <AnimeItem key={node["id"]} node={node} />)}
      </EmblaCarousel>
      </div>
  )
}
