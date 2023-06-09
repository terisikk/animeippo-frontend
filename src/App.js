import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "./Header";

import "react-multi-carousel/lib/styles.css";
import "./App.css";
import testJson from "./TestData";
import { AnimeList } from "./AnimeList";

function App() {
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
    if (false /*process.env.REACT_APP_MOCK_BACKEND*/) {
      setShows(testJson());
    } else {
      fetchAnimeList(user, seasonFromTab(activeTab), setLoading, setShows);
    }
  }, [user, activeTab, fetchAnimeList]);

  return (
    <main className="App-Content">
      <div className="bg-zinc-900">
        <Header onSubmit={handleMalSearch} loading={loading} activeTab={activeTab} setActiveTab={setActiveTab}></Header>
        {shows.data?.categories.map((item) => AnimeList(item, shows.data.shows))}
      </div>
    </main>
  );
}

function fetchAnimeListCallBack(user, season, setLoading, setShows) {
  setLoading(true);

  const domain = process.env.REACT_APP_API_URL;
  var url = "";

  //if (user !== "") {
  url = `${domain}/api/recommend?user=Janiskeisari&year=2023&season=${season}`;
  // } else {
  //   url = `${domain}/api/seasonal?year=2023&season=${season}`;
  //}
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
