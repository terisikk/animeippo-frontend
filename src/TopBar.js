import { useRef, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { HeaderTabBar } from "./Header";

function ProfileButton({ open, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-1 px-5 text-base font-medium text-blue-200 transition-colors duration-200 hover:bg-zinc-800 ${
        open ? "bg-zinc-800" : ""
      } ${className || ""}`}
    >
      <AccountCircleIcon sx={{ fontSize: 28 }} />
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

  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeMenu]);

  const goHome = () => {
    if (mode !== "recommend") setMode("recommend");
  };

  const showTabs = mode !== "analyse";

  return (
    <>
    <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur" ref={headerRef}>
      {/* Main row */}
      <div ref={topRowRef} className="flex items-stretch justify-between px-2 py-4 lg:min-h-16">
        {/* Left: hamburger + title */}
        <div className="flex items-stretch gap-3 -my-4 -ml-2">
          <button
            onClick={toggleMenu("drawer")}
            aria-label="menu"
            className="flex cursor-pointer items-center px-5 text-blue-200 transition-colors duration-200 hover:bg-zinc-800"
          >
            <MenuIcon sx={{ fontSize: 26 }} />
          </button>
          <button
            onClick={goHome}
            className="cursor-pointer bg-transparent border-none text-2xl font-extrabold tracking-tight text-white transition-colors duration-200 py-2 px-4 hover:bg-zinc-800"
          >
            Animeippo
          </button>
        </div>

        {/* Center: year tabs (desktop only, recommend mode only) */}
        {showTabs && (
          <div className="flex items-center max-lg:hidden">
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
          <ProfileButton open={profileOpen} onClick={toggleMenu("profile")} />
        </div>
      </div>

      {/* Mobile: year tabs second row (recommend mode only) */}
      {showTabs && (
        <div className="flex justify-center pb-2 lg:hidden">
          <HeaderTabBar
            activeYear={activeYear}
            contentReady={contentReady}
            setActiveYear={setActiveYear}
            loading={loading}
          />
        </div>
      )}
    </header>

    {/* Profile backdrop */}
    {profileOpen && (
      <div className="fixed inset-0 z-30 bg-black/50" onClick={closeMenu} />
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
              <ListItemIcon><AccountCircleIcon sx={{ color: '#bfdbfe' }} /></ListItemIcon>
              <ListItemText primary={user} sx={{ color: '#fff' }} />
            </ListItem>
          </List>
          <Divider sx={{ borderColor: '#3f3f46' }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => { setMode("analyse"); closeMenu(); }}
                sx={{ '&:hover': { bgcolor: '#3f3f46' } }}
                selected={mode === "analyse"}
              >
                <ListItemIcon><BarChartIcon sx={{ color: mode === "analyse" ? '#60a5fa' : '#a1a1aa' }} /></ListItemIcon>
                <ListItemText primary="Analysis" sx={{ color: mode === "analyse" ? '#60a5fa' : '#bfdbfe' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => { onSwitchUser(); closeMenu(); }}
                sx={{ '&:hover': { bgcolor: '#3f3f46' } }}
              >
                <ListItemIcon><SwapHorizIcon sx={{ color: '#a1a1aa' }} /></ListItemIcon>
                <ListItemText primary="Switch User" sx={{ color: '#bfdbfe' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </div>
    )}
  </>
  );
}
