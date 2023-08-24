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
    if (process.env.REACT_APP_MOCK_BACKEND === true) {
      console.log("Using fake backend.");
      console.log(process.env.REACT_APP_MOCK_BACKEND);
      setShows(testJson());
    } else {
      fetchAnimeList(user, yearFromTab(activeTab), setLoading, setShows);
    }
  }, [user, activeTab, fetchAnimeList]);

  return (
    <main className="App-Content overflow-hidden">
      <div className="bg-zinc-900">
        <Header onSubmit={handleMalSearch} loading={loading} activeTab={activeTab} setActiveTab={setActiveTab}></Header>
        {console.log(shows)}
        {shows.data?.categories.map((item) => AnimeList(item, shows.data.shows))}
      </div>
    </main>
  );
}

function fetchAnimeListCallBack(user, year, setLoading, setShows) {
  if (user !== "") {
    setLoading(true);

    const domain = process.env.REACT_APP_API_URL || "http://localhost:5000";

    var url = `${domain}/recommend?user=${user}&year=${year}`;
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
}

function yearFromTab(tab) {
  var season = "";

  switch (tab) {
    case "0":
      season = "2022";
      break;
    case "1":
      season = "2023";
      break;
    case "2":
      season = "2024";
      break;
    default:
      break;
  }

  return season;
}

export default App;
