import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { HeaderTabBar, SearchForm } from "./Header";

function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex gap-0.5">
      <button
        onClick={() => setMode("recommend")}
        className={`cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 ${
          mode === "recommend"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-zinc-700 text-blue-200 hover:bg-zinc-600"
        }`}
      >
        R
      </button>
      <button
        onClick={() => setMode("analyse")}
        className={`cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 ${
          mode === "analyse"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-zinc-700 text-blue-200 hover:bg-zinc-600"
        }`}
      >
        A
      </button>
    </div>
  );
}

export default function TopBar({
  activeYear, setActiveYear, loading, contentReady,
  onSubmit, user, mode, setMode, toggleDrawer
}) {
  return (
    <header className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur">
      {/* Desktop layout */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center px-2 py-2">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-1">
          <IconButton edge="start" color="primary" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <span className="text-xl font-extrabold tracking-tight text-white">Animeippo</span>
        </div>

        {/* Center: year tabs (hidden on mobile) */}
        <div className="flex justify-center max-lg:hidden">
          {mode !== "analyse" && (
            <HeaderTabBar
              activeYear={activeYear}
              contentReady={contentReady}
              setActiveYear={setActiveYear}
              loading={loading}
            />
          )}
        </div>

        {/* Right: user + mode toggle */}
        <div className="flex items-center gap-2">
          <SearchForm onSubmit={onSubmit} loading={loading} contentReady={contentReady} user={user} />
          <ModeToggle mode={mode} setMode={setMode} />
        </div>
      </div>

      {/* Mobile: year tabs second row */}
      {mode !== "analyse" && (
        <div className="flex justify-center pb-2 lg:hidden">
          <HeaderTabBar
            activeYear={activeYear}
            contentReady={contentReady}
            setActiveYear={setActiveYear}
            loading={loading}
          />
        </div>
      )}
    </header>
  );
}
