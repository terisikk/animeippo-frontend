import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "./Header";

import "react-multi-carousel/lib/styles.css";
import "./App.css";
import testJson from "./TestData";
import { AnimeList, PlaceHolderContent } from "./AnimeList";

function App() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState("");
  const [contentReady, setContentReady] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    var new_user = e.target.maluser.value;

    if (new_user !== user) {
      setUser(new_user);
    }
  };

  const fetchAnimeList = useCallback(fetchAnimeListCallBack, []);

  useEffect(() => {
    if (process.env.REACT_APP_MOCK_BACKEND === true) {
      setShows(testJson());
    } else {
      fetchAnimeList(user, activeYear, setLoading, setShows, setContentReady);
    }
  }, [user, activeYear, fetchAnimeList]);

  return (
    <main className="App-Content h-full overflow-hidden bg-zinc-900">
      <div
        className={`${loading || contentReady ? "pt-0" : "h-screen pt-[15%]"} transition-all duration-1000 ease-out`}
      >
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
        ></Header>
        <div className="">
          {loading
            ? PlaceHolderContent()
            : shows != null
            ? shows.data?.categories.map((item) => AnimeList(item, shows.data.shows, loading))
            : backendErrorMessage()}
        </div>
      </div>
    </main>
  );
}

function backendErrorMessage() {
  return <p className="w-full text-center text-lg text-red-700">Could not find data for that user.</p>;
}

function preFetchYearAnimeCallback(user, year) {
  const domain = process.env.REACT_APP_API_URL || "http://localhost:5000";

  var url = `${domain}/seasonal?year=${year}`;

  axios
    .get(url)
    .then((response) => {
      if (response.data.length > 0) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    }
    );
}

function fetchAnimeListCallBack(user, year, setLoading, setShows, setContentReady) {
  if (user !== "") {
    setLoading(true);

    const domain = process.env.REACT_APP_API_URL || "http://localhost:5000";

    var url = `${domain}/recommend?user=${user}&year=${year}`;
    fetchWithCache(url)
      .then((data) => {
        setTimeout(() => {
          setShows(data);
          setLoading(false);
          setContentReady(data);
        }, 1000);
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
  const cached = localStorage.getItem(url);
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
