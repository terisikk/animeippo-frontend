import { useState, useRef, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { HeaderTabBar } from "./Header";

function ProfileBadge({ user, mode, setMode, onSwitchUser }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-200 transition-colors duration-200 hover:bg-zinc-800"
      >
        <PersonIcon sx={{ fontSize: 18 }} />
        <span className="max-w-[120px] truncate">{user}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-zinc-700 bg-zinc-800 py-2 shadow-xl">
          <div className="px-3 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Mode</span>
            <div className="mt-1.5 flex gap-1">
              <button
                onClick={() => { setMode("recommend"); setOpen(false); }}
                className={`flex-1 cursor-pointer rounded-md py-1 text-xs font-medium transition-all duration-200 ${
                  mode === "recommend"
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-700 text-blue-200 hover:bg-zinc-600"
                }`}
              >
                Recommend
              </button>
              <button
                onClick={() => { setMode("analyse"); setOpen(false); }}
                className={`flex-1 cursor-pointer rounded-md py-1 text-xs font-medium transition-all duration-200 ${
                  mode === "analyse"
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-700 text-blue-200 hover:bg-zinc-600"
                }`}
              >
                Analysis
              </button>
            </div>
          </div>
          <div className="my-1 border-t border-zinc-700" />
          <button
            onClick={() => { onSwitchUser(); setOpen(false); }}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-sm text-blue-200 transition-colors hover:bg-zinc-700"
          >
            <SwapHorizIcon sx={{ fontSize: 16 }} />
            Switch User
          </button>
        </div>
      )}
    </div>
  );
}

export default function TopBar({
  activeYear, setActiveYear, loading, contentReady,
  user, mode, setMode, toggleDrawer, onSwitchUser
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

        {/* Center: year tabs (hidden on mobile, hidden in analyse mode) */}
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

        {/* Right: profile badge */}
        <ProfileBadge user={user} mode={mode} setMode={setMode} onSwitchUser={onSwitchUser} />
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
