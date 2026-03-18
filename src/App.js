import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Header from "./Header";

import "./App.css";
import testJson from "./TestData";
import { AnimeContent, AnimeListCarousel, PlaceHolderContent } from "./AnimeList";


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [shows, setShows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState("");
  const [contentReady, setContentReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mode, setMode] = useState("recommend");

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    var new_user = e.target.maluser.value;

    if (new_user !== user) {
      setUser(new_user);
    }
  };

  const fetchAnimeList = useCallback(fetchAnimeListCallBack, []);

  useEffect(() => {
    if (process.env.REACT_APP_MOCK_BACKEND === "true") {
      setShows(testJson());
      setContentReady(true);
    } else {
      fetchAnimeList(user, activeYear, setLoading, setShows, setContentReady, mode);
    }
  }, [user, activeYear, fetchAnimeList, mode]);

  return (
    <main className="App-Content h-full overflow-hidden bg-zinc-900">
      <div
        className={`${loading || contentReady ? "pt-0" : "h-screen pt-[15%]"} transition-all duration-1000 ease-out`}
      >
        { shows?.data ? <IconButton edge="start" color="primary" aria-label="menu" sx={{ pl: 2}} onClick={toggleDrawer(true)}>
            <MenuIcon />
        </IconButton> : null
        }
        <h1
          className={`${
            loading || contentReady ? "absolute w-20 object-top pt-5 text-left" : "w-full object-bottom"
          } pb-5 pl-5 pr-5 text-center text-6xl font-extrabold leading-none tracking-tight text-white transition-all duration-1000 ease-out max-lg:w-full`}
        >
          Animeippo
        </h1>
        <Header
          onSubmit={handleSearch}
          loading={loading}
          activeYear={activeYear}
          setActiveYear={setActiveYear}
          contentReady={contentReady}
          mode={mode}
        ></Header>
        <div className="">
          {loading
            ? PlaceHolderContent()
            : shows != null
            ? AnimeContent(shows?.data, selectedGenre)
            : user !== ""
            ? backendErrorMessage()
            : null}
        </div>
        { shows?.data ? <TemporaryDrawer
          tags={shows.data.tags}
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          setSelectedGenre={setSelectedGenre}
          mode={mode}
          setMode={setMode}
        ></TemporaryDrawer> : null }
      </div>
    </main>
  );
}

function TemporaryDrawer({ tags, open, toggleDrawer, setSelectedGenre, mode, setMode }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTags = tags?.filter(tag =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
  };

  const DrawerList = (
    <Box sx={{
      width: 250,
      bgcolor: '#18181b',
      height: '100%'
    }} role="presentation">
      <Box sx={{ p: 2 }} onClick={(e) => e.stopPropagation()}>
        <Typography variant="h6" sx={{ mb: 1.5, color: '#fff', fontWeight: 600 }}>Mode</Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
          <Box
            onClick={() => setMode("recommend")}
            sx={{
              flex: 1,
              py: 0.75,
              px: 1,
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              bgcolor: mode === "recommend" ? '#3b82f6' : '#3f3f46',
              color: mode === "recommend" ? '#fff' : '#bfdbfe',
              '&:hover': {
                bgcolor: mode === "recommend" ? '#2563eb' : '#52525b',
              }
            }}
          >
            Recommend
          </Box>
          <Box
            onClick={() => setMode("analyse")}
            sx={{
              flex: 1,
              py: 0.75,
              px: 1,
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              bgcolor: mode === "analyse" ? '#3b82f6' : '#3f3f46',
              color: mode === "analyse" ? '#fff' : '#bfdbfe',
              '&:hover': {
                bgcolor: mode === "analyse" ? '#2563eb' : '#52525b',
              }
            }}
          >
            Analysis
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: '#3f3f46' }} />
      <Box sx={{ p: 2 }} onClick={(e) => e.stopPropagation()}>
        <Typography variant="h6" sx={{ mb: 1.5, color: '#fff', fontWeight: 600 }}>Genres</Typography>
        <input
          type="text"
          placeholder="Search genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: '#3f3f46',
            border: '1px solid #52525b',
            borderRadius: '6px',
            color: '#bfdbfe',
            fontSize: '0.875rem',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#52525b'}
        />
      </Box>
      <Box onClick={toggleDrawer(false)}>
        <List>
            <ListItem key="All" disablePadding onClick={() => handleGenreSelect("All")}>
              <ListItemButton sx={{
                '&:hover': { bgcolor: '#3f3f46' }
              }}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={"All"} sx={{ color: '#bfdbfe' }} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ borderColor: '#3f3f46' }} />
          {filteredTags.map((text) => (
            <ListItem key={text} disablePadding onClick={() => handleGenreSelect(text)}>
              <ListItemButton sx={{
                '&:hover': { bgcolor: '#3f3f46' }
              }}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#bfdbfe' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            bgcolor: '#18181b',
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

function backendErrorMessage() {
  return <p className="w-full text-center text-lg text-red-700">Could not find data for that user.</p>;
}

function fetchAnimeListCallBack(user, year, setLoading, setShows, setContentReady, mode = "recommend") {
  if (user !== "") {
    setLoading(true);

    const domain = process.env.REACT_APP_API_URL || "http://localhost:5000";

    var url = `${domain}/${mode}?user=${user}&year=${year}`;
    fetchWithCache(url)
      .then((data) => {
        setShows(data);
        setLoading(false);
        setContentReady(data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShows(null);
        setContentReady(false);
      });
  }
}

const CACHE_TTL = 1000 * 60 * 60 * 24; // 1 day

export async function fetchWithCache(url) {
  const debugMode = process.env.REACT_APP_DEBUG === "true";
  let cached = false;

  if (!debugMode) {
    cached = localStorage.getItem(url);
  }

  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  const response = await axios.get(url);
  localStorage.setItem(url, JSON.stringify({
    timestamp: Date.now(),
    data: response.data,
  }));

  return response.data;
}


export default App;
