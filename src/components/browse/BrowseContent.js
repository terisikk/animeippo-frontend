import { useState, useMemo } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { GenreCombobox } from "./GenreCombobox";
import { FilterDropdown } from "./FilterDropdown";
import { AnimeListFlex } from "../content/AnimeListFlex";
import { PAGE_TITLE, ACTIVE_FILTER_PILL } from "../../styles";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "FINISHED", label: "Finished" },
  { value: "RELEASING", label: "Releasing" },
  { value: "NOT_YET_RELEASED", label: "Upcoming" },
];

const SEASON_OPTIONS = [
  { value: "", label: "All seasons" },
  { value: "WINTER", label: "Winter" },
  { value: "SPRING", label: "Spring" },
  { value: "SUMMER", label: "Summer" },
  { value: "FALL", label: "Fall" },
];

export function BrowseContent({ data }) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");

  const availableGenres = useMemo(() => {
    const presentGenres = new Set();
    for (const show of (data?.shows || [])) {
      for (const g of (show.genres || [])) presentGenres.add(g);
    }
    return [...presentGenres].sort();
  }, [data?.shows]);

  const availableTags = useMemo(() => {
    const presentTags = new Set();
    for (const show of (data?.shows || [])) {
      for (const tag of (show.tags || [])) presentTags.add(tag);
    }
    return (data?.tags || []).filter(tag => presentTags.has(tag) && !availableGenres.includes(tag));
  }, [data?.tags, data?.shows, availableGenres]);

  const matchCounts = useMemo(() => {
    const counts = new Map();
    let shows = data?.shows || [];
    if (statusFilter) shows = shows.filter(s => s.status === statusFilter);
    if (seasonFilter) shows = shows.filter(s => s.season === seasonFilter);
    for (const show of shows) {
      for (const g of (show.genres || [])) {
        counts.set(g, (counts.get(g) || 0) + 1);
      }
      for (const t of (show.tags || [])) {
        counts.set(t, (counts.get(t) || 0) + 1);
      }
    }
    counts.set("All", shows.length);
    return counts;
  }, [data?.shows, statusFilter, seasonFilter]);

  const filteredShows = useMemo(() => {
    let result = data?.shows || [];
    if (selectedGenre !== "All") result = result.filter(s => s.genres?.includes(selectedGenre) || s.tags?.includes(selectedGenre));
    if (statusFilter) result = result.filter(s => s.status === statusFilter);
    if (seasonFilter) result = result.filter(s => s.season === seasonFilter);
    return result;
  }, [data?.shows, selectedGenre, statusFilter, seasonFilter]);

  const hasActiveFilters = selectedGenre !== "All" || statusFilter || seasonFilter;

  const clearAllFilters = () => {
    setSelectedGenre("All");
    setStatusFilter("");
    setSeasonFilter("");
    setSearchQuery("");
  };

  if (!data) return null;

  return (
    <>
      <div className="my-4 py-3">
        <h1 className={`mb-3 pl-6 ${PAGE_TITLE}`}>Your Recommendations</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <GenreCombobox
            selectedGenre={selectedGenre}
            onSelect={setSelectedGenre}
            genres={availableGenres}
            tags={availableTags}
            matchCounts={matchCounts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <FilterDropdown label="Status" value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} />
          <FilterDropdown label="Season" value={seasonFilter} options={SEASON_OPTIONS} onChange={setSeasonFilter} />
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-sm text-zinc-400">Showing:</span>
            {selectedGenre !== "All" && (
              <span className={ACTIVE_FILTER_PILL}>
                {selectedGenre}
                <button onClick={() => setSelectedGenre("All")} className="flex items-center border-none bg-transparent p-0 text-white/70 cursor-pointer hover:text-white" aria-label={`Remove ${selectedGenre} filter`}>
                  <ClearIcon style={{ fontSize: 14 }} />
                </button>
              </span>
            )}
            {statusFilter && (
              <span className={ACTIVE_FILTER_PILL}>
                {STATUS_OPTIONS.find(o => o.value === statusFilter)?.label}
                <button onClick={() => setStatusFilter("")} className="flex items-center border-none bg-transparent p-0 text-white/70 cursor-pointer hover:text-white" aria-label="Remove status filter">
                  <ClearIcon style={{ fontSize: 14 }} />
                </button>
              </span>
            )}
            {seasonFilter && (
              <span className={ACTIVE_FILTER_PILL}>
                {SEASON_OPTIONS.find(o => o.value === seasonFilter)?.label}
                <button onClick={() => setSeasonFilter("")} className="flex items-center border-none bg-transparent p-0 text-white/70 cursor-pointer hover:text-white" aria-label="Remove season filter">
                  <ClearIcon style={{ fontSize: 14 }} />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="cursor-pointer border-none bg-transparent px-2 py-0.5 text-sm text-zinc-400 hover:text-white"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      <div aria-live="polite">
        {filteredShows.length > 0
          ? AnimeListFlex(filteredShows, selectedGenre !== "All" ? selectedGenre : undefined)
          : (
            <div className="flex justify-center py-16 text-zinc-400 text-lg">
              No shows match these filters.
            </div>
          )
        }
      </div>
    </>
  );
}
