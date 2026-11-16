import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AppBar from "@mui/material/AppBar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState } from "react";

import { HeaderIconButton,HeaderTabBar } from "./HeaderElements"


const MODES = [
  { key: "recommend", label: "Home", icon: <HomeIcon sx={{ fontSize: 20 }} /> },
  { key: "browse", label: "Browse", icon: <ExploreIcon sx={{ fontSize: 20 }} /> },
  { key: "analyse", label: "Analysis", icon: <BarChartIcon sx={{ fontSize: 20 }} /> },
];

export default function TopBar({
  activeYear,
  setActiveYear,
  loading,
  contentReady,
  user,
  mode,
  onModeChange,
  onSwitchUser,
  provider,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const headerRef = useRef(null);
  const profileOpen = activeMenu === "profile";
  const navOpen = activeMenu === "nav";

  const handleToggleMenu = useCallback(
    (menuKey) => (event) => {
      // If clicking the same menu that's already open, close it. Otherwise, open the new one.
      if (activeMenu === menuKey) {
        setAnchorEl(null);
        setActiveMenu(null);
      } else {
        setAnchorEl(event.currentTarget);
        setActiveMenu(menuKey);
      }
    },
    [activeMenu]
  );

  const handleClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  return (
    <AppBar position="sticky" ref={headerRef} sx={{ bgcolor: "background.paper" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Main row */}
        <Box sx={{ display: { xs: "block", md: "none" } }}
        >
          <HeaderIconButton
            open={navOpen}
            onClick={handleToggleMenu("nav")}
            icon={<MenuIcon sx={{ fontSize: 26, color: "text.primary" }} />}
          />
        </Box>
        {/* Left: nav dropdown (mobile) + title + mode tabs (desktop) */}
        <Box sx={{ display: "flex" }}>

          <Box gap={1} sx={{
            display: { xs: "none", md: "flex" },
          }}>
            <Button
              variant="text"
              color="text.main"
              onClick={() => onModeChange("recommend")}

            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  fontWeight: "800",
                  lineHeight: "1",
                  letterSpacing: "-0.025em",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Animeippo
              </Typography >
            </Button>
            {MODES.map((m) => (
              <Button variant="text"
                key={m.key}
                onClick={() => onModeChange(m.key)}
                sx={{
                  color: mode === m.key ? "text.primary" : "text.secondary",
                  textTransform: "none",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "background.default",
                    color: "text.primary"
                  }
                }}
              >
                {m.label}
              </Button>
            ))}
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "text.disabled",
                marginLeft: 2,
                height: "60%"
              }}
            />
          </Box>
          <HeaderTabBar
            activeYear={activeYear}
            setActiveYear={setActiveYear}
            disabled={!contentReady || loading}
          />

        </Box>



        {/* Nav dropdown (mobile) */}
        <Backdrop
          open={navOpen}
          onClick={handleClose}
        >
          <Menu
            anchorEl={anchorEl}
            open={navOpen}
            onClose={handleClose}
            onClick={handleClose}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "800",
                lineHeight: "1",
                letterSpacing: "-0.025em",
                color: "white",
                textTransform: "none",
                p: 2,
                display: { sm: "block", md: "none" }
              }}
            >
              Animeippo
            </Typography>
            {MODES.map((m) => (
              <MenuItem
                onClick={() => {
                  console.log("CHANGEEEE", m.key);
                  onModeChange(m.key);
                  handleClose();
                }}
                key={m.key}
              >
                <ListItemIcon sx={{ color: mode === m.key ? "text.primary" : "text.secondary" }}>{m.icon}</ListItemIcon>
                <ListItemText primary={m.label} sx={{ color: mode === m.key ? "text.primary" : "text.secondary" }} />
              </MenuItem>
            ))}
          </Menu>
        </Backdrop>

        {/* Right: profile button */}
        <HeaderIconButton
          open={profileOpen}
          onClick={handleToggleMenu("profile")}
          icon={<AccountCircleIcon sx={{ fontSize: 28, color: "text.primary" }} />}
        />

        {/* Profile dropdown */}
        <Backdrop
          open={profileOpen}
          onClick={handleClose}
        >
          <Menu
            anchorEl={anchorEl}
            open={profileOpen}
            onClose={handleClose}
            onClick={handleClose}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "text.secondary" }} />
                </ListItemIcon>
                <ListItemText
                  primary={user}
                  secondary={provider === "mixed" ? "MAL" : "AniList"}
                  sx={{ color: "#fff", "& .MuiListItemText-secondary": { color: "text.secondary" } }}
                />
              </ListItem>
            </List>
            <MenuItem
              onClick={() => {
                onSwitchUser();
                handleClose();
              }}
            >
              <ListItemIcon>
                <SwapHorizIcon sx={{ color: "text.secondary" }} />
              </ListItemIcon>
              <ListItemText primary="Switch User" />
            </MenuItem>
          </Menu>
        </Backdrop>
      </Toolbar>
    </AppBar >
  );
}
