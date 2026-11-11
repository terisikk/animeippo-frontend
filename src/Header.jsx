import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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

const PROVIDERS = [
  { key: "anilist", label: "AniList" },
  { key: "mixed", label: "MAL" },
];

export function SearchForm({ onSubmit, loading, contentReady, user, provider, setProvider }) {
  const placeholder = provider === "mixed" ? "MAL username" : "AniList username";

  const handleSubmit = (e) => {
    onSubmit(e);
  };

  const handleChange = (event, newProvider) => {
    if (newProvider !== null) {
      setProvider(newProvider);
    }
  };

  if (user && contentReady) {
    return (
      <button className="flex items-center gap-2 rounded-lg px-4 py-2 font-sans text-lg font-medium text-blue-200 transition-colors duration-200 hover:bg-zinc-800">
        <span>{user}</span>
        <SwapHorizIcon sx={{ fontSize: 18, color: "#a1a1aa" }} />
      </button>
    );
  }

  return (
    <Box gap={1} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box component="form" sx={{ display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
        <TextField
          size="small"
          name="search"
          type="search"
          disabled={loading}
          autoFocus={!!user}
          autoComplete="off"
          placeholder={placeholder}
          sx={{ bgcolor: "white" }}
        />
        <IconButton
          type="submit"
          sx={{ backgroundColor: "primary.main", borderRadius: "2%", "&:hover": { backgroundColor: "primary.light" } }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : <SearchIcon sx={{ color: "white" }} />}
        </IconButton>
      </Box>
      <ToggleButtonGroup
        value={provider}
        exclusive
        onChange={handleChange}
        sx={{ backgroundColor: "background.light" }}
      >
        {PROVIDERS.map((p) => (
          <ToggleButton
            size="small"
            value={p.key}
            sx={{
              width: "7em",
              "&.Mui-selected": { backgroundColor: "primary.main", color: "white" },
              "&.Mui-selected:hover": { backgroundColor: "primary.main" },
              "&:hover": { backgroundColor: "primary.dark", color: "white" },
              color: "background.main",
            }}
          >
            {p.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
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
