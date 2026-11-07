import { Typography } from "@mui/material";


export function AnimeDescription({ node, align = "center", sx = {} }) {
    return (
        <Typography
            variant="body2"
            align={align}
            sx={sx}
        >
            {((node["description"]?.length ? node["description"] : node["genres"]) || [])
                .map((item) => item.replace(/ /g, "\u00A0"))
                .join(" ∙ ")}
        </Typography>
    )
}