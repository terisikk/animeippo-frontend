import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"



export function HeaderIconButton({ open, onClick, icon }) {
    return (
        <IconButton
            onClick={onClick}
        >
            {icon}
            <ExpandMoreIcon
                sx={{
                    fontSize: 18,
                    transition: "transform 0.2s",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    color: "text.primary"
                }}
            />
        </IconButton>
    );
}


export function HeaderTabBar({ activeYear, setActiveYear, disabled }) {
    const currentYear = new Date().getFullYear();

    let renderLastTab = true;

    if (activeYear > currentYear) {
        renderLastTab = false;
    }

    return (
        <Tabs centered value={activeYear} onChange={(event, newValue) => setActiveYear(newValue)} sx={{ alignItems: "center" }}>
            <Tab value={activeYear - 1} label={activeYear - 1} disabled={disabled} />
            <Tab value={activeYear} label={activeYear} disabled={disabled} />
            {renderLastTab && (
                <Tab value={activeYear + 1} label={activeYear + 1} disabled={disabled} />
            )}
        </Tabs>
    );
}