import axios from "axios";

const CACHE_TTL = 1000 * 60 * 60 * 24; // 1 day

export function fetchAnimeList(user, year, setLoading, setShows, setContentReady, mode = "recommend", provider = "anilist") {
  if (user !== "") {
    setLoading(true);
    setShows(null);

    const domain = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const params = new URLSearchParams({ user, year });
    if (provider && provider !== "anilist") params.set("provider", provider);
    const url = `${domain}/${mode}?${params}`;

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
