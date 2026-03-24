import { useState, useRef, useCallback } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useClickOutside } from "../../hooks/useClickOutside";
import { FILTER_BUTTON, colors, listItemHoverSx } from "../../styles";

export function GenreCombobox({ selectedGenre, onSelect, genres, tags, matchCounts, searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const comboRef = useRef(null);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(comboRef, close);

  const query = searchQuery.toLowerCase();
  const filteredGenres = query ? genres.filter(g => g.toLowerCase().includes(query)) : genres;
  const filteredTags = query ? tags.filter(t => t.toLowerCase().includes(query)) : tags;

  const handleSelect = (value) => {
    onSelect(value);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-[200px]" ref={comboRef}>
      <span className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">Genre / Tag</span>
      {selectedGenre !== "All" ? (
        <button
          onClick={() => { handleSelect("All"); setIsOpen(false); }}
          className={`w-full ${FILTER_BUTTON}`}
        >
          <span className="truncate">{selectedGenre}</span>
          <ClearIcon sx={{ fontSize: 16 }} />
        </button>
      ) : (
        <button
          className={`w-full ${FILTER_BUTTON}`}
          onClick={() => setIsOpen(o => !o)}
        >
          <input
            type="text"
            placeholder="All genres & tags"
            value={searchQuery}
            onChange={(e) => { e.stopPropagation(); setSearchQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            aria-label="Search genres and tags"
            className="w-full border-none bg-transparent p-0 font-sans text-sm font-medium tracking-wide text-blue-200 placeholder-blue-200/50 outline-none"
          />
          <ExpandMoreIcon sx={{ fontSize: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
      )}
      {isOpen && selectedGenre === "All" && (
        <div className="absolute left-0 top-full z-30 max-h-72 w-[250px] overflow-y-auto bg-zinc-800 shadow-lg">
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelect("All")} sx={listItemHoverSx}>
                <ListItemText primary="All" sx={{ color: colors.blue200 }} />
                <span className="text-xs text-zinc-500">{matchCounts.get("All")}</span>
              </ListItemButton>
            </ListItem>
            {filteredGenres.map(g => (
              <ListItem key={g} disablePadding>
                <ListItemButton onClick={() => handleSelect(g)} sx={listItemHoverSx}>
                  <ListItemText primary={g} sx={{ color: colors.blue200 }} />
                  <span className="text-xs text-zinc-500">{matchCounts.get(g) ?? 0}</span>
                </ListItemButton>
              </ListItem>
            ))}
            {filteredTags.length > 0 && (
              <ListItem>
                <ListItemText primary="Tags" sx={{ color: colors.zinc500, '& .MuiTypography-root': { fontSize: '0.75rem', textTransform: 'uppercase' } }} />
              </ListItem>
            )}
            {filteredTags.map(t => (
              <ListItem key={t} disablePadding>
                <ListItemButton onClick={() => handleSelect(t)} sx={listItemHoverSx}>
                  <ListItemText primary={t} sx={{ color: colors.blue200 }} />
                  <span className="text-xs text-zinc-500">{matchCounts.get(t) ?? 0}</span>
                </ListItemButton>
              </ListItem>
            ))}
            {filteredGenres.length === 0 && filteredTags.length === 0 && (
              <ListItem>
                <ListItemText primary="No matches" sx={{ color: colors.zinc500 }} />
              </ListItem>
            )}
          </List>
        </div>
      )}
    </div>
  );
}
