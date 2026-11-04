import { FormatLabel } from "./FormatLabel";
import { GenrePill } from "./GenrePill";

export function HeroDetails({ node, titleSize = "text-xl" }) {
  return (
    <div className="relative min-w-0 flex-1 pt-1 flex flex-col self-stretch" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
      <h3 className={`line-clamp-2 font-sans ${titleSize} font-semibold tracking-wide text-white`}>
        {node["title"]}
      </h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {((node["description"]?.length ? node["description"] : node["genres"]) || []).map((item) => (
          <GenrePill key={item} genre={item} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between pt-4">
        {node["discovery_score"] != null && (
          <span className="font-sans text-3xl font-bold text-blue-400">
            {(node["discovery_score"] * 100).toFixed(0)}%
          </span>
        )}
        <FormatLabel format={node["format"]} />
      </div>
    </div>
  );
}
