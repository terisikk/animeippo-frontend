import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Flipper, Flipped } from "react-flip-toolkit";

import "./App.css";
import testJson from "./TestData";
import { Spinner, Spyglass } from "./Icons";

export const UserContext = React.createContext(null);

function App() {
  return (
    <main className="App-Content">
      <div className="bg-zinc-900">
        <AnimeList></AnimeList>
      </div>
    </main>
  );
}

function AnimeList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch initial list of shows
    axios
      .get("http://127.0.0.1:5000/api/seasonal?year=2023&season=spring")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*useEffect(() => {
    setShows(testJson())
  }, []);*/

  const fetchRecommendationOrder = (e) => {
    e.preventDefault();

    var user = e.target.maluser.value;

    setLoading(true);

    axios
      .get(`http://127.0.0.1:5000/api/recommend?user=${user}&year=2023&season=spring`)
      .then((response) => {
        setTimeout(() => {
          setShows(response.data);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider value={{ loading: loading, setLoading: setLoading }}>
      <MalSearchForm className="w-full" onSubmit={fetchRecommendationOrder}></MalSearchForm>
      <div className="pb-5 text-center font-sans text-xl font-medium tracking-wide text-white">
        <p>Spring 2023</p>
      </div>
      <Flipper flipKey={shows}>
        <div className="flex flex-wrap justify-center justify-items-center gap-4">
          {shows.map((node) => AnimeItem(node))}
        </div>
      </Flipper>
    </UserContext.Provider>
  );
}

function MalSearchForm(props) {
  const { loading } = useContext(UserContext);

  return (
    <form className="flex items-center justify-center p-5" onSubmit={props.onSubmit}>
      <input
        className="rounded-l border border-blue-700 p-2.5 disabled:!bg-gray-400 disabled:text-gray-600"
        name="maluser"
        type="text"
        placeholder="MAL username"
        disabled={loading}
      />
      <label className="margin-0 text-white" id="recommendLabel" htmlFor="maluser">
        <button
          type="submit"
          class="rounded-r border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? <Spinner /> : <Spyglass />}
        </button>
      </label>
      <input type="submit" hidden />
    </form>
  );
}

function AnimeItem(node) {
  return (
    <Flipped flipId={encodeURIComponent(node["title"])}>
      <div>
        <img src={node["main_picture"]["medium"]} alt={node["title"]} />
        <h4 className="card-text my-2 line-clamp-2 text-center font-sans text-lg font-medium tracking-wide text-white">
          {node["title"]}
        </h4>
      </div>
    </Flipped>
  );
}

export default App;
