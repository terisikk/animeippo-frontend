import { useRef } from "react";
import { useClickOutside } from "./hooks/useClickOutside";
import { colors, listItemHoverSx } from "./styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import BarChartIcon from '@mui/icons-material/BarChart';
import { HeaderTabBar } from "./Header";

const MODES = [
  { key: "recommend", label: "Home", icon: <HomeIcon sx={{ fontSize: 20 }} /> },
  { key: "browse", label: "Browse", icon: <ExploreIcon sx={{ fontSize: 20 }} /> },
  { key: "analyse", label: "Analysis", icon: <BarChartIcon sx={{ fontSize: 20 }} /> },
];

function HeaderIconButton({ open, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-1 border-none bg-transparent px-5 text-base font-medium text-blue-200 transition-colors duration-200 hover:bg-zinc-800 ${
        open ? "bg-zinc-800" : ""
      }`}
    >
      {icon}
      {children}
      <ExpandMoreIcon sx={{ fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
    </button>
  );
}

export default function TopBar({
  activeYear, setActiveYear, loading, contentReady,
  user, mode, setMode, toggleMenu, openMenu, closeMenu, onSwitchUser
}) {
  const headerRef = useRef(null);
  const topRowRef = useRef(null);
  const profileOpen = openMenu === "profile";
  const navOpen = openMenu === "nav";

  useClickOutside(headerRef, closeMenu);

  const goHome = () => {
    if (mode !== "recommend") setMode("recommend");
  };

  const showTabs = mode !== "analyse";

  return (
    <div ref={headerRef} className="sticky top-0 z-40">
    <header className="bg-zinc-950/95 backdrop-blur">
      {/* Main row */}
      <div ref={topRowRef} className="relative flex items-stretch justify-between px-2 py-4 lg:min-h-16">
        {/* Left: nav dropdown (mobile) + title + mode tabs (desktop) */}
        <div className="flex items-stretch gap-0 -my-4 -ml-2">
          <div className="lg:hidden flex items-stretch">
            <HeaderIconButton open={navOpen} onClick={toggleMenu("nav")} icon={<AppsIcon sx={{ fontSize: 26 }} />} />
          </div>
          <button
            onClick={goHome}
            className="cursor-pointer border-none bg-transparent text-2xl font-extrabold tracking-tight text-white transition-colors duration-200 py-2 px-4 hover:bg-zinc-800"
          >
            Animeippo
          </button>
          <div className="hidden lg:flex items-stretch">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`cursor-pointer border-none bg-transparent px-4 font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:bg-zinc-800 ${
                  mode === m.key ? "text-white" : "text-blue-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center: year tabs (desktop only) */}
        {showTabs && (
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex items-stretch max-lg:hidden">
            <HeaderTabBar
              activeYear={activeYear}
              contentReady={contentReady}
              setActiveYear={setActiveYear}
              loading={loading}
            />
          </div>
        )}

        {/* Right: profile button */}
        <div className="flex items-stretch -my-4 -mr-2">
          <HeaderIconButton open={profileOpen} onClick={toggleMenu("profile")} icon={<AccountCircleIcon sx={{ fontSize: 28 }} />} />
        </div>
      </div>

      {/* Mobile: year tabs second row */}
      {showTabs && (
        <div className="flex items-stretch justify-center pb-2 lg:hidden">
          <HeaderTabBar
            activeYear={activeYear}
            contentReady={contentReady}
            setActiveYear={setActiveYear}
            loading={loading}
          />
        </div>
      )}
    </header>

    {/* Dropdown backdrop */}
    {(profileOpen || navOpen) && (
      <div className="fixed inset-0 z-30 bg-black/50" onClick={closeMenu} />
    )}

    {/* Nav dropdown (mobile) */}
    {navOpen && topRowRef.current && (
      <div
        className="fixed left-0 z-40"
        style={{ top: topRowRef.current.getBoundingClientRect().bottom }}
      >
        <div className="w-[250px] bg-zinc-800 shadow-lg">
          <List>
            {MODES.map((m) => (
              <ListItem key={m.key} disablePadding>
                <ListItemButton
                  onClick={() => { setMode(m.key); closeMenu(); }}
                  sx={listItemHoverSx}
                  selected={mode === m.key}
                >
                  <ListItemIcon sx={{ color: mode === m.key ? '#ffffff' : colors.zinc400 }}>
                    {m.icon}
                  </ListItemIcon>
                  <ListItemText primary={m.label} sx={{ color: mode === m.key ? '#ffffff' : colors.blue200 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )}

    {/* Profile dropdown */}
    {profileOpen && topRowRef.current && (
      <div
        className="fixed right-0 z-40 flex justify-end"
        style={{ top: topRowRef.current.getBoundingClientRect().bottom }}
      >
        <div className="w-[250px] bg-zinc-800 shadow-lg">
          <List>
            <ListItem>
              <ListItemIcon><AccountCircleIcon sx={{ color: colors.blue200 }} /></ListItemIcon>
              <ListItemText primary={user} sx={{ color: '#fff' }} />
            </ListItem>
          </List>
          <Divider sx={{ borderColor: colors.zinc600 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => { onSwitchUser(); closeMenu(); }}
                sx={listItemHoverSx}
              >
                <ListItemIcon><SwapHorizIcon sx={{ color: colors.zinc400 }} /></ListItemIcon>
                <ListItemText primary="Switch User" sx={{ color: colors.blue200 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </div>
    )}
    </div>
  );
}
