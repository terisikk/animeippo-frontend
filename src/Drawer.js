import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HomeIcon from '@mui/icons-material/Home';

export default function TemporaryDrawer({ tags, shows, open, closeMenu, setSelectedGenre, mode, setMode, onSwitchUser }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const availableTags = React.useMemo(() => {
    const presentTags = new Set();
    for (const show of (shows || [])) {
      for (const tag of [...(show.genres || []), ...(show.tags || [])]) {
        presentTags.add(tag);
      }
    }
    return (tags || []).filter(tag => presentTags.has(tag));
  }, [tags, shows]);

  const filteredTags = availableTags.filter(tag =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
  };

  const DrawerList = (
    <Box sx={{
      width: 250,
      bgcolor: '#27272a',
      height: '100%'
    }} role="presentation">
      {/* Navigation */}
      <Box onClick={closeMenu}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setMode("recommend")}
              sx={{ '&:hover': { bgcolor: '#3f3f46' } }}
              selected={mode === "recommend"}
            >
              <ListItemIcon><HomeIcon sx={{ color: mode === "recommend" ? '#60a5fa' : '#a1a1aa' }} /></ListItemIcon>
              <ListItemText primary="Home" sx={{ color: mode === "recommend" ? '#60a5fa' : '#bfdbfe' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setMode("analyse")}
              sx={{ '&:hover': { bgcolor: '#3f3f46' } }}
              selected={mode === "analyse"}
            >
              <ListItemIcon><BarChartIcon sx={{ color: mode === "analyse" ? '#60a5fa' : '#a1a1aa' }} /></ListItemIcon>
              <ListItemText primary="Analysis" sx={{ color: mode === "analyse" ? '#60a5fa' : '#bfdbfe' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={onSwitchUser}
              sx={{ '&:hover': { bgcolor: '#3f3f46' } }}
            >
              <ListItemIcon><SwapHorizIcon sx={{ color: '#a1a1aa' }} /></ListItemIcon>
              <ListItemText primary="Switch User" sx={{ color: '#bfdbfe' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ borderColor: '#3f3f46' }} />
      {/* Genre filter (hidden in analysis mode) */}
      {mode !== "analyse" && <><Box sx={{ p: 2 }} onClick={(e) => e.stopPropagation()}>
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
      <Box onClick={closeMenu}>
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
      </>}
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={closeMenu}
        transitionDuration={150}
        PaperProps={{
          sx: { bgcolor: '#27272a' },
          className: 'scrollbar-thin-zinc',
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
