import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


const PROVIDERS = [
  { key: "anilist", label: "AniList" },
  { key: "mixed", label: "MAL" },
];

export function LoginForm({ onSubmit, loading, contentReady, user, provider, setProvider }) {
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
          color="secondary"
          sx={{ bgcolor: "white", "& input": { color: "black" } }}
        />
        <IconButton
          type="submit"
          loading={loading}
          sx={{ backgroundColor: "secondary.main", borderRadius: "2%", "&:hover": { backgroundColor: "secondary.light" } }}
        >
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <ToggleButtonGroup
        value={provider}
        exclusive
        onChange={handleChange}
      >
        {PROVIDERS.map((p) => (
          <ToggleButton
            value={p.key}
          >
            {p.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
