import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export function HeaderTabBar({ activeYear, contentReady, setActiveYear, loading }) {
  const currentYear = new Date().getFullYear();

  let renderLastTab = true;

  if (activeYear > currentYear) {
    renderLastTab = false;
  }

  return (
    <div className={`flex flex-nowrap items-stretch justify-center ${contentReady ? "visible" : "hidden"}`}>
      <Tab text={activeYear - 1} active={false} onClick={() => setActiveYear(activeYear - 1)} disabled={loading} />
      <Tab text={activeYear} active={true} onClick={() => setActiveYear(activeYear)} disabled={loading} />
      {renderLastTab && (
        <Tab text={activeYear + 1} active={false} onClick={() => setActiveYear(activeYear + 1)} disabled={loading} />
      )}
    </div>
  );
}

const PROVIDERS = [
  { key: "anilist", label: "AniList" },
  { key: "mixed", label: "MAL" },
];

export function SearchForm({ onSubmit, loading, contentReady, user, provider, setProvider }) {
  const [editing, setEditing] = useState(!user);
  const placeholder = provider === "mixed" ? "MAL username" : "AniList username";

  const handleSubmit = (e) => {
    onSubmit(e);
    setEditing(false);
  };

  if (!editing && user && contentReady) {
    return (
      <button
        className="flex items-center gap-2 rounded-lg px-4 py-2 font-sans text-lg font-medium text-blue-200 transition-colors duration-200 hover:bg-zinc-800"
        onClick={() => setEditing(true)}
      >
        <span>{user}</span>
        <SwapHorizIcon sx={{ fontSize: 18, color: '#a1a1aa' }} />
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <form className="flex items-center" onSubmit={handleSubmit} onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget) && user) setEditing(false);
      }}>
        <input
          className="rounded-l border border-blue-700 p-2.5 disabled:!bg-zinc-400 disabled:text-zinc-600"
          name="maluser"
          type="text"
          placeholder={placeholder}
          defaultValue={user}
          disabled={loading}
          autoFocus={!!user}
        />
        <label className="margin-0 text-white" id="recommendLabel" htmlFor="maluser">
          <button
            type="submit"
            className="rounded-r border border-blue-700 bg-blue-600 p-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <SearchIcon />}
          </button>
        </label>
        <input type="submit" hidden />
      </form>
      <div className="flex rounded-lg bg-zinc-800 p-0.5 text-sm">
        {PROVIDERS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setProvider(p.key)}
            className={`rounded-md px-4 py-1 font-sans font-medium tracking-wide transition-colors ${
              provider === p.key
                ? "bg-blue-600 text-white"
                : "text-blue-200 hover:bg-zinc-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Tab({ active, onClick, text, disabled }) {
  return (
    <button
      className={`cursor-pointer border-0 bg-transparent px-5 font-sans text-lg font-semibold tracking-wide transition-colors duration-200 hover:bg-zinc-800 ${
        active ? "text-white !border-b-2 border-blue-400" : "text-zinc-400"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
