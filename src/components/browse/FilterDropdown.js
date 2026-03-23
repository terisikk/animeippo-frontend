import { useState, useRef, useCallback } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useClickOutside } from "../../hooks/useClickOutside";
import { FILTER_BUTTON, colors, listItemHoverSx } from "../../styles";

export function FilterDropdown({ label, value, options, onChange, width = "w-[140px]" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close);

  const activeLabel = options.find(o => o.value === value)?.label || label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`${width} ${FILTER_BUTTON}`}
      >
        <span className="truncate">{activeLabel}</span>
        <ExpandMoreIcon sx={{ fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      {open && (
        <div className={`absolute left-0 top-full z-30 ${width} bg-zinc-800 shadow-lg`}>
          <List disablePadding>
            {options.map(o => (
              <ListItem key={o.value} disablePadding>
                <ListItemButton
                  selected={value === o.value}
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  sx={listItemHoverSx}
                >
                  <ListItemText primary={o.label} sx={{ color: value === o.value ? '#ffffff' : colors.blue200 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
