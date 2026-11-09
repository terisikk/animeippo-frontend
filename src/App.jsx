import "./App.css";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { fetchAnimeList } from "./api.js";
import { AnimeContent } from "./components/content/AnimeContent";
import { AnalysisPlaceholderContent, PlaceHolderContent } from "./components/content/PlaceholderContent";
import { AnalysisContent } from "./features/analysis/AnalysisContent";
import { BrowseContent } from "./features/browse/BrowseContent";
import { FunnelContent } from "./features/funnel/FunnelContent";
import { SearchForm } from "./Header";
import theme from "./styles";
import TopBar from "./TopBar";

function App() {
  const [shows, setShows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(() => localStorage.getItem("animeippo_last_user") || "");
  const [contentReady, setContentReady] = useState(null);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [mode, setMode] = useState("recommend");
  const [provider, setProvider] = useState(() => localStorage.getItem("animeippo_provider") || "anilist");
  const [browseFilters, setBrowseFilters] = useState({
    selectedGenre: "All",
    searchQuery: "",
    statusFilter: "",
    seasonFilter: "",
    formatFilter: "",
    listStatusFilter: "",
  });

  const toggleMenu = useCallback(
    (menu) => () => {
      setOpenMenu((prev) => (prev === menu ? null : menu));
    },
    [],
  );

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  const handleSearch = (e) => {
    e.preventDefault();

    const new_user = e.target.maluser.value;

    if (new_user !== user) {
      // Clear old user's cached data
      Object.keys(localStorage).forEach((k) => {
        if (k.includes("user=" + user)) localStorage.removeItem(k);
      });
      localStorage.setItem("animeippo_last_user", new_user);
      setShows(null);
      setContentReady(null);
      setError(null);
      setLoading(true);
      setActiveYear(new Date().getFullYear());
      setUser(new_user);
    }
  };

  const handleSwitchUser = () => {
    setShows(null);
    setContentReady(null);
    setError(null);
    setActiveYear(new Date().getFullYear());
    setUser("");
    setMode("recommend");
    localStorage.removeItem("animeippo_last_user");
  };

  const handleSetProvider = (newProvider) => {
    if (newProvider !== provider) {
      localStorage.setItem("animeippo_provider", newProvider);
      setProvider(newProvider);
      setShows(null);
      setContentReady(null);
      setUser("");
      localStorage.removeItem("animeippo_last_user");
    }
  };

  const fetchAnimeListCb = useCallback(fetchAnimeList, []);

  const apiMode = mode === "browse" || mode === "funnel" ? "recommend" : mode;

  useEffect(() => {
    if (import.meta.env.VITE_MOCK_BACKEND === "true") {
      import("./TestData.js").then(({ default: testJson }) => {
        setShows(testJson());
        setContentReady(true);
      });
    } else {
      setError(null);
      fetchAnimeListCb(user, activeYear, setLoading, setShows, setContentReady, setError, apiMode, provider);
    }
  }, [user, activeYear, fetchAnimeListCb, apiMode, provider]);

  const hasContent = loading || contentReady;

  const lastAnalysisData = useRef(null);
  if (shows?.data && mode === "analyse") lastAnalysisData.current = shows.data;

  const analysisData = mode === "analyse" ? shows?.data || lastAnalysisData.current : null;

  const content = useMemo(
    () => (
      <div>
        {loading ? (
          <>
            <p className="mb-4 w-full text-center text-lg text-blue-200 animate-pulse">
              Loading {mode === "analyse" ? "analysis" : "recommendations"} for{" "}
              <span className="font-semibold text-white">{user}</span>...
            </p>
            {mode === "analyse" ? <AnalysisPlaceholderContent /> : <PlaceHolderContent />}
          </>
        ) : shows != null ? (
          mode === "analyse" ? null : mode === "browse" ? (
            <BrowseContent data={shows?.data} filters={browseFilters} setFilters={setBrowseFilters} />
          ) : mode === "funnel" ? (
            <FunnelContent data={shows?.data} />
          ) : (
            <AnimeContent data={shows?.data} />
          )
        ) : error != null ? (
          <p className="w-full text-center text-lg text-zinc-400">{error}</p>
        ) : null}
        {analysisData && (
          <div className={loading ? "hidden" : undefined}>
            <AnalysisContent data={analysisData} />
          </div>
        )}
      </div>
    ),
    [loading, mode, user, shows, error, browseFilters, setBrowseFilters, analysisData],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets browser styles and applies default background */}
      <Box component="main" bgcolor={"background.main"}>
        <div className={`${hasContent ? "pt-0" : "h-screen pt-[15%]"} transition-all duration-1000 ease-out`}>
          {/* Landing state: centered title + search */}
          {!hasContent && (
            <>
              <h1 className="w-full pb-5 pl-5 pr-5 text-center text-6xl font-extrabold leading-none tracking-tight text-white">
                Animeippo
              </h1>
              <div className="flex justify-center">
                <SearchForm
                  onSubmit={handleSearch}
                  loading={loading}
                  contentReady={contentReady}
                  user={user}
                  provider={provider}
                  setProvider={handleSetProvider}
                />
              </div>
            </>
          )}

          {/* Content state: TopBar replaces title + header */}
          {hasContent && (
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
              provider={provider}
              setProvider={handleSetProvider}
            />
          )}

          {content}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
