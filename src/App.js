import { useEffect, useState, useCallback, useMemo } from "react";
import { SearchForm } from "./Header";
import TopBar from "./TopBar";

import "./App.css";
import testJson from "./TestData";
import { AnimeContent } from "./components/content/AnimeContent";
import { AnalysisContent } from "./components/analysis/AnalysisContent";
import { PlaceHolderContent } from "./components/placeholder/PlaceholderContent";
import { BrowseContent } from "./components/browse/BrowseContent";
import { fetchAnimeList } from "./api";


function App() {
  const [shows, setShows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(() => localStorage.getItem("animeippo_last_user") || "");
  const [contentReady, setContentReady] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mode, setMode] = useState("recommend");

  const toggleMenu = useCallback((menu) => () => {
    setOpenMenu((prev) => prev === menu ? null : menu);
  }, []);

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  const handleSearch = (e) => {
    e.preventDefault();

    const new_user = e.target.maluser.value;

    if (new_user !== user) {
      // Clear old user's cached data
      Object.keys(localStorage).forEach(k => {
        if (k.includes("user=" + user)) localStorage.removeItem(k);
      });
      localStorage.setItem("animeippo_last_user", new_user);
      setUser(new_user);
    }
  };

  const handleSwitchUser = () => {
    setShows(null);
    setContentReady(false);
    setUser("");
    setMode("recommend");
    localStorage.removeItem("animeippo_last_user");
  };

  const fetchAnimeListCb = useCallback(fetchAnimeList, []);

  const apiMode = mode === "browse" ? "recommend" : mode;

  useEffect(() => {
    if (process.env.REACT_APP_MOCK_BACKEND === "true") {
      setShows(testJson());
      setContentReady(true);
    } else {
      fetchAnimeListCb(user, activeYear, setLoading, setShows, setContentReady, apiMode);
    }
  }, [user, activeYear, fetchAnimeListCb, apiMode]);

  const hasContent = loading || contentReady;

  const content = useMemo(() => (
    <div>
      {loading
        ? <><p className="mb-4 w-full text-center font-sans text-lg text-blue-200 animate-pulse">Loading {mode === "analyse" ? "analysis" : "recommendations"} for <span className="font-semibold text-white">{user}</span>...</p>{PlaceHolderContent()}</>
        : shows != null
        ? mode === "analyse"
          ? AnalysisContent(shows?.data)
          : mode === "browse"
          ? <BrowseContent data={shows?.data} />
          : AnimeContent(shows?.data)
        : user !== ""
        ? backendErrorMessage()
        : null}
    </div>
  ), [loading, mode, user, shows]);

  return (
    <main className="App-Content min-h-full bg-zinc-900">
      <div
        className={`${hasContent ? "pt-0" : "h-screen pt-[15%]"} transition-all duration-1000 ease-out`}
      >
        {/* Landing state: centered title + search */}
        {!hasContent && (
          <>
            <h1 className="w-full pb-5 pl-5 pr-5 text-center text-6xl font-extrabold leading-none tracking-tight text-white">
              Animeippo
            </h1>
            <div className="flex justify-center">
              <SearchForm onSubmit={handleSearch} loading={loading} contentReady={contentReady} user={user} />
            </div>
          </>
        )}

        {/* Content state: TopBar replaces title + header */}
        {hasContent && shows?.data && (
          <TopBar
            activeYear={activeYear}
            setActiveYear={setActiveYear}
            loading={loading}
            contentReady={contentReady}
            user={user}
            mode={mode}
            setMode={setMode}
            toggleMenu={toggleMenu}
            openMenu={openMenu}
            closeMenu={closeMenu}
            onSwitchUser={handleSwitchUser}
          />
        )}

        {content}
      </div>
    </main>
  );
}


function backendErrorMessage() {
  return <p className="w-full text-center text-lg text-red-700">Could not find data for that user.</p>;
}

export default App;
