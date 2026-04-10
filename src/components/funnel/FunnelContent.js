import { useState, useMemo, useEffect } from "react";
import { anilistUrl, PAGE_TITLE } from "../../styles";
import { HeroDetails } from "../shared/HeroDetails";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExploreIcon from '@mui/icons-material/Explore';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SpaIcon from '@mui/icons-material/Spa';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BoltIcon from '@mui/icons-material/Bolt';
import MovieIcon from '@mui/icons-material/Movie';
import TimerIcon from '@mui/icons-material/Timer';
import TvIcon from '@mui/icons-material/Tv';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CasinoIcon from '@mui/icons-material/Casino';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const MOODS = [
  { key: "adventurous", label: "Adventurous", icon: <ExploreIcon sx={{ fontSize: 28 }} />, color: "#f59e0b" },
  { key: "cerebral", label: "Cerebral", icon: <PsychologyIcon sx={{ fontSize: 28 }} />, color: "#8b5cf6" },
  { key: "chill", label: "Chill", icon: <SpaIcon sx={{ fontSize: 28 }} />, color: "#34d399" },
  { key: "dark", label: "Dark", icon: <DarkModeIcon sx={{ fontSize: 28 }} />, color: "#6366f1" },
  { key: "emotional", label: "Emotional", icon: <FavoriteIcon sx={{ fontSize: 28 }} />, color: "#f472b6" },
  { key: "funny", label: "Funny", icon: <EmojiEmotionsIcon sx={{ fontSize: 28 }} />, color: "#fbbf24" },
  { key: "hype", label: "Hype", icon: <WhatshotIcon sx={{ fontSize: 28 }} />, color: "#ef4444" },
  { key: "sporty", label: "Sporty", icon: <SportsMartialArtsIcon sx={{ fontSize: 28 }} />, color: "#06b6d4" },
];

const INTENSITIES = [
  { key: "light", label: "Light", icon: <WbTwilightIcon sx={{ fontSize: 28 }} />, color: "#93c5fd" },
  { key: "moderate", label: "Moderate", icon: <LocalFireDepartmentIcon sx={{ fontSize: 28 }} />, color: "#f97316" },
  { key: "all_in", label: "All-in", icon: <BoltIcon sx={{ fontSize: 28 }} />, color: "#eab308" },
];

const LENGTHS = [
  { key: "movie", label: "Movie", formats: ["MOVIE"], icon: <MovieIcon sx={{ fontSize: 28 }} />, color: "#c084fc" },
  { key: "series", label: "Series", formats: ["TV", "ONA"], icon: <TvIcon sx={{ fontSize: 28 }} />, color: "#60a5fa" },
  { key: "short", label: "Short", formats: ["TV_SHORT", "OVA", "SPECIAL"], icon: <TimerIcon sx={{ fontSize: 28 }} />, color: "#2dd4bf" },
];

const NOVELTIES = [
  { key: "surprise", label: "Surprise me", icon: <CasinoIcon sx={{ fontSize: 28 }} />, color: "#a78bfa" },
  { key: "match", label: "Best match", icon: <AutoAwesomeIcon sx={{ fontSize: 28 }} />, color: "#3b82f6" },
  { key: "popular", label: "Most popular", icon: <TrendingUpIcon sx={{ fontSize: 28 }} />, color: "#34d399" },
];

const EXCLUDED_USER_STATUSES = ["COMPLETED", "PAUSED", "DROPPED", "CURRENT"];

const STEP_LABELS = ["Mood", "Intensity", "Length", "Style", "Result"];

function GridTile({ label, icon, selected, disabled, onClick, color }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-2 rounded-lg px-4 py-5 font-sans text-sm font-medium tracking-wide transition-all duration-200 border-none cursor-pointer ${
        selected
          ? "text-white scale-105"
          : disabled
          ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          : "bg-zinc-800 text-blue-200 hover:bg-zinc-700"
      }`}
      style={selected && color ? { backgroundColor: color } : undefined}
    >
      <span style={!selected && !disabled && color ? { color } : undefined}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function RevealCard({ show }) {
  const url = anilistUrl(show["id"]);

  return (
    <div className="relative overflow-hidden rounded-lg p-4 animate-hero-fade-in">
      <img
        className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-30 pointer-events-none"
        src={show["cover_image"]}
        alt=""
        aria-hidden="true"
      />
      <a href={url} target="_blank" rel="noopener noreferrer" className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 no-underline">
        <div className="shrink-0 aspect-[2/3] h-[300px] lg:h-[400px]">
          <img
            className="h-full w-full rounded object-cover"
            src={show["cover_image"]}
            alt={show["title"]}
          />
        </div>
        <HeroDetails node={show} titleSize="text-2xl" />
      </a>
    </div>
  );
}

export function FunnelContent({ data }) {
  const [step, setStep] = useState(1);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const [selectedNovelty, setSelectedNovelty] = useState("match");
  const [shuffleIndex, setShuffleIndex] = useState(0);

  const allShows = useMemo(() =>
    (data?.shows ?? []).filter((show) =>
      show["status"]?.toUpperCase() !== "NOT_YET_RELEASED" &&
      !EXCLUDED_USER_STATUSES.includes(show["user_status"])
    ), [data?.shows]);

  // Step 1 → mood pool
  const moodPool = useMemo(() => {
    if (selectedMoods.length === 0) return [];
    return allShows.filter((show) =>
      show["moods"]?.some((m) => selectedMoods.includes(m))
    );
  }, [allShows, selectedMoods]);

  // Mood candidate counts (for disabling pills with 0 matches)
  const moodCounts = useMemo(() => {
    const counts = {};
    for (const mood of MOODS) {
      counts[mood.key] = allShows.filter((show) =>
        show["moods"]?.includes(mood.key)
      ).length;
    }
    return counts;
  }, [allShows]);

  // Step 2 → intensity pool
  const intensityPool = useMemo(() => {
    if (!selectedIntensity) return [];
    return moodPool.filter((show) => show["intensity"] === selectedIntensity);
  }, [moodPool, selectedIntensity]);

  // Unique intensities in mood pool (for auto-skip)
  const uniqueIntensities = useMemo(() => {
    const set = new Set(moodPool.map((s) => s["intensity"]).filter(Boolean));
    return [...set];
  }, [moodPool]);

  // Intensity candidate counts
  const intensityCounts = useMemo(() => {
    const counts = {};
    for (const i of INTENSITIES) {
      counts[i.key] = moodPool.filter((show) => show["intensity"] === i.key).length;
    }
    return counts;
  }, [moodPool]);

  // Step 3 → length pool
  const lengthPool = useMemo(() => {
    if (!selectedLength) return [];
    const formats = LENGTHS.find((l) => l.key === selectedLength)?.formats ?? [];
    return intensityPool.filter((show) => formats.includes(show["format"]));
  }, [intensityPool, selectedLength]);

  // Length candidate counts
  const lengthCounts = useMemo(() => {
    const counts = {};
    for (const l of LENGTHS) {
      counts[l.key] = intensityPool.filter((show) => l.formats.includes(show["format"])).length;
    }
    return counts;
  }, [intensityPool]);

  // Step 4 → ranked pool
  const rankedPool = useMemo(() => {
    const pool = [...lengthPool];
    if (selectedNovelty === "match") {
      pool.sort((a, b) => (b["discovery_score"] ?? 0) - (a["discovery_score"] ?? 0));
    } else if (selectedNovelty === "surprise") {
      pool.sort((a, b) => (a["discovery_score"] ?? 0) - (b["discovery_score"] ?? 0));
    } else if (selectedNovelty === "popular") {
      pool.sort((a, b) => (b["popularityscore"] ?? 0) - (a["popularityscore"] ?? 0));
    }
    return pool;
  }, [lengthPool, selectedNovelty]);

  // Auto-skip step 2 if all candidates share the same intensity
  useEffect(() => {
    if (step === 2 && uniqueIntensities.length === 1) {
      setSelectedIntensity(uniqueIntensities[0]);
      setStep(3);
    }
  }, [step, uniqueIntensities]);

  const toggleMood = (mood) => {
    setSelectedMoods([mood]);
    setSelectedIntensity(null);
    setSelectedLength(null);
    setSelectedNovelty("match");
    setShuffleIndex(0);
    setStep(2);
  };

  const goToStep = (target) => {
    if (target >= step) return;
    if (target <= 1) { startOver(); return; }
    if (target <= 2) { setSelectedIntensity(null); setSelectedLength(null); setSelectedNovelty("match"); setShuffleIndex(0); }
    else if (target <= 3) { setSelectedLength(null); setSelectedNovelty("match"); setShuffleIndex(0); }
    else if (target <= 4) { setSelectedNovelty("match"); setShuffleIndex(0); }
    setStep(target);
  };

  const startOver = () => {
    setStep(1);
    setSelectedMoods([]);
    setSelectedIntensity(null);
    setSelectedLength(null);
    setSelectedNovelty("match");
    setShuffleIndex(0);
  };

  if (!data) return null;

  const poolSize =
    step === 1 ? moodPool.length
    : step === 2 ? moodPool.length
    : step === 3 ? intensityPool.length
    : step === 4 ? lengthPool.length
    : rankedPool.length;

  const revealShow = rankedPool.length > 0 ? rankedPool[shuffleIndex % rankedPool.length] : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className={`${PAGE_TITLE} mb-6 text-center`}>Pick Your Next Watch</h1>

      {/* Step indicator */}
      <div className="mb-8 flex items-start justify-center">
        {STEP_LABELS.map((label, i) => {
          const s = i + 1;
          const visited = s < step;
          const active = s === step;
          const choices = [
            selectedMoods[0],
            INTENSITIES.find((x) => x.key === selectedIntensity)?.label,
            LENGTHS.find((x) => x.key === selectedLength)?.label,
            NOVELTIES.find((x) => x.key === selectedNovelty)?.label,
            null,
          ];
          const choice = visited ? choices[i] : null;
          return (
            <div key={s} className="flex items-start">
              <button
                onClick={() => goToStep(s)}
                disabled={!visited}
                className="flex flex-col items-center gap-1.5 bg-transparent border-none px-1 cursor-default"
                style={visited ? { cursor: "pointer" } : undefined}
              >
                <div className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  active
                    ? "bg-blue-500 ring-2 ring-blue-500/30"
                    : visited
                    ? "bg-blue-400 hover:bg-blue-300"
                    : "bg-zinc-700"
                }`} />
                <span className={`font-sans text-xs font-medium tracking-wide ${
                  active ? "text-blue-200" : visited ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  {label}
                </span>
                {choice && (
                  <span className="font-sans text-xs text-blue-400 capitalize">
                    {choice}
                  </span>
                )}
              </button>
              {i < STEP_LABELS.length - 1 && (
                <div className={`mt-[5px] h-px w-6 sm:w-10 ${visited ? "bg-blue-400/50" : "bg-zinc-700"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div key={step} className="animate-hero-fade-in">
        {/* Step 1: Mood */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-sans text-xl font-medium text-blue-200">What mood are you in?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {MOODS.map((mood) => (
                <GridTile
                  key={mood.key}
                  label={mood.label}
                  icon={mood.icon}
                  color={mood.color}
                  selected={selectedMoods.includes(mood.key)}
                  disabled={moodCounts[mood.key] === 0}
                  onClick={() => toggleMood(mood.key)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Intensity */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-sans text-xl font-medium text-blue-200">How intense?</h2>
            <div className="grid grid-cols-3 gap-3 w-full">
              {INTENSITIES.map((i) => (
                <GridTile
                  key={i.key}
                  label={i.label}
                  icon={i.icon}
                  color={i.color}
                  selected={selectedIntensity === i.key}
                  disabled={intensityCounts[i.key] === 0}
                  onClick={() => {
                    setSelectedIntensity(i.key);
                    setSelectedLength(null);
                    setSelectedNovelty("match");
                    setShuffleIndex(0);
                    setStep(3);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Length */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-sans text-xl font-medium text-blue-200">What length?</h2>
            <div className="grid grid-cols-3 gap-3 w-full">
              {LENGTHS.map((l) => (
                <GridTile
                  key={l.key}
                  label={l.label}
                  icon={l.icon}
                  color={l.color}
                  selected={selectedLength === l.key}
                  disabled={lengthCounts[l.key] === 0}
                  onClick={() => {
                    setSelectedLength(l.key);
                    setSelectedNovelty("match");
                    setShuffleIndex(0);
                    setStep(4);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Novelty */}
        {step === 4 && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-sans text-xl font-medium text-blue-200">How should we pick?</h2>
            <div className="grid grid-cols-3 gap-3 w-full">
              {NOVELTIES.map((n) => (
                <GridTile
                  key={n.key}
                  label={n.label}
                  icon={n.icon}
                  color={n.color}
                  selected={selectedNovelty === n.key}
                  disabled={false}
                  onClick={() => {
                    setSelectedNovelty(n.key);
                    setShuffleIndex(0);
                    setStep(5);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Reveal */}
        {step === 5 && (
          <div className="flex flex-col items-center gap-6">
            {revealShow ? (
              <>
                <RevealCard show={revealShow} />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShuffleIndex((i) => i + 1)}
                    className="flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 font-sans text-sm font-medium text-blue-200 border-none cursor-pointer hover:bg-zinc-700 transition-colors"
                  >
                    <ShuffleIcon sx={{ fontSize: 18 }} />
                    Shuffle
                  </button>
                  <button
                    onClick={startOver}
                    className="flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 font-sans text-sm font-medium text-blue-200 border-none cursor-pointer hover:bg-zinc-700 transition-colors"
                  >
                    <RestartAltIcon sx={{ fontSize: 18 }} />
                    Start over
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="font-sans text-lg text-zinc-400">No matches found</p>
                <button
                  onClick={startOver}
                  className="flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 font-sans text-sm font-medium text-blue-200 border-none cursor-pointer hover:bg-zinc-700 transition-colors"
                >
                  <RestartAltIcon sx={{ fontSize: 18 }} />
                  Start over
                </button>
              </>
            )}
          </div>
        )}

        {/* Footer: candidate count */}
        {step >= 2 && step < 5 && (
          <div className="mt-8 flex justify-center">
            <p className="font-sans text-sm text-zinc-400">{poolSize} shows remaining</p>
          </div>
        )}
      </div>
    </div>
  );
}
