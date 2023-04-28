import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "./Header";

import "./App.css";
import testJson from "./TestData";
import { AnimeList } from "./AnimeList";

function App() {
  const FAKE_BACKEND = false;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [user, setUser] = useState("");

  const handleMalSearch = (e) => {
    e.preventDefault();

    var new_user = e.target.maluser.value;

    if (new_user !== user) {
      setUser(new_user);
    }
  };

  const fetchAnimeList = useCallback(fetchAnimeListCallBack, []);

  useEffect(() => {
    if (FAKE_BACKEND) {
      setShows(testJson());
    } else {
      fetchAnimeList(user, seasonFromTab(activeTab), setLoading, setShows);
    }
  }, [user, activeTab, fetchAnimeList, FAKE_BACKEND]);

  return (
    <main className="App-Content">
      <div className="bg-zinc-900">
        <Header onSubmit={handleMalSearch} loading={loading} activeTab={activeTab} setActiveTab={setActiveTab}></Header>
        <AnimeList shows={shows}></AnimeList>
      </div>
    </main>
  );
}

function fetchAnimeListCallBack(user, season, setLoading, setShows) {
  setLoading(true);

  var url = "";

  if (user !== "") {
    url = `http://127.0.0.1:5000/api/recommend?user=${user}&year=2023&season=${season}`;
  } else {
    url = `http://127.0.0.1:5000/api/seasonal?year=2023&season=${season}`;
  }
  axios
    .get(url)
    .then((response) => {
      setTimeout(() => {
        setShows(response.data);
        setLoading(false);
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
}

function seasonFromTab(tab) {
  var season = "";

  switch (tab) {
    case "0":
      season = "winter";
      break;
    case "1":
      season = "spring";
      break;
    case "2":
      season = "summer";
      break;
    default:
      break;
  }

  return season;
}

export default App;
