import { EmblaCarousel } from "../carousel/EmblaCarousel";
import { SECTION_TITLE } from "../../styles";

export function PlaceHolderContent() {
  return (
    <div className="animate-pulse">
      <PlaceholderList />
      <PlaceholderList />
      <PlaceholderList />
      <PlaceholderList />
    </div>
  );
}

function PlaceholderList() {
  const placeholders = [];
  for (let i = 0; i < 10; i++) {
    placeholders.push(<PlaceholderItem key={i} />);
  }

  return (
    <div className="pb-8">
      <h2 className={`ml-5 pb-5 ${SECTION_TITLE}`}>...</h2>
      <EmblaCarousel>
        {placeholders}
      </EmblaCarousel>
    </div>
  );
}

function PlaceholderItem() {
  return (
    <div className="group flex flex-col rounded">
      <img className="card-image rounded" src="./placeholder.png" alt="" loading="lazy" />
      <div className="card-text h-28">
        <h4 className="line-clamp-2 px-2 text-center font-sans text-base font-medium tracking-wide text-blue-200">
          ...
        </h4>
      </div>
    </div>
  );
}
