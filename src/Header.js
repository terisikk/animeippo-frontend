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

export function SearchForm({ onSubmit, loading, contentReady, user }) {
  const [editing, setEditing] = useState(!user);

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
    <form className="flex items-center" onSubmit={handleSubmit} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget) && user) setEditing(false);
    }}>
      <input
        className="rounded-l border border-blue-700 p-2.5 disabled:!bg-gray-400 disabled:text-gray-600"
        name="maluser"
        type="text"
        placeholder="Anilist username"
        defaultValue={user}
        disabled={loading}
        autoFocus={!!user}
      />
      <label className="margin-0 text-white" id="recommendLabel" htmlFor="maluser">
        <button
          type="submit"
          className="rounded-r border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <SearchIcon />}
        </button>
      </label>
      <input type="submit" hidden />
    </form>
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
