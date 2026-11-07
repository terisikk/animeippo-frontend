import { memo } from "react";
import { anilistUrl } from "../../styles";
import { useLazyImage } from "../../hooks/useLazyImage";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { StatusBadge } from "../shared/StatusBadge";
import { FormatLabel } from "../shared/FormatLabel";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { GenrePill } from "../shared/GenrePill";

export { FORMAT_LABELS } from "../shared/FormatLabel";

function toStars(value) {
  if (typeof value !== 'number') return String(value);
  const full = Math.round(value * 5);
  return '\u2605'.repeat(full) //+ '\u2606'.repeat(5 - full);
}

export const AnimeItem = memo(function AnimeItem({ node }) {
  const url = anilistUrl(node["id"]);
  const debugMode = process.env.REACT_APP_DEBUG === "true";
  const img = node["cover_image"];

  let scoreFields = debugMode ? Object.keys(node).filter(key =>
    key.includes('score') || key.includes('Score')
  ) : [];

  if (debugMode && scoreFields.length > 0) {
    scoreFields = scoreFields.sort((a, b) => {
      if (a === 'discovery_score') return -1;
      if (b === 'discovery_score') return 1;
      return a.localeCompare(b);
    });
  }

  return (
    <Box sx={{
          position: 'relative',
          '&:hover .animeImage': {
              scale: '105%',
          },
          '&:hover .reveal-me': {
            opacity: 1,
          },
          '& .animeImage': {
            transition: 'scale 0.3s ease-in',
          },
          cursor: 'pointer'
    }}>
      <a target="_blank" href={url} rel="noreferrer">
      <Card
        className="animeImage"
        sx={{ 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          backgroundColor: 'background.main',
        }}
      >
        <Box sx={{ position: 'relative'}}>
          <CardMedia
            component="img"
            image={img}
            title={node["title"]}
            sx={{ objectFit: 'cover', width: '100%', height: 'auto', aspectRatio: '2/3'}}
          />
          {node["user_status"] != null && (
            <BookmarkIcon 
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              fontSize: '1.25rem', 
              color: 'primary.main', // or 'blue.400' if defined in your theme
              opacity: 0.8,
              filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.8))'
            }} 
          />)}
        <Box className='reveal-me' sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '33%',
            align: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(10, 10, 10, 0) 100%)',
            justifyItems: 'center',
        }}> 
        <Typography 
          variant="body2" 
          align="center"
          sx={{
            color: 'white',
            position: 'absolute',
            bottom: 0,
            padding: '15px 15px 15px 15px',
          }}
        >
          {((node["description"]?.length ? node["description"] : node["genres"]) || []).map(item => item.replace(/ /g, '\u00A0')).join(' ∙ ')}
        </Typography>
        </Box>
      </Box>
    </Card>
    <Box>
        <Typography variant="body1" align="center" alignContent="center" color="primary.main"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              paddingTop: '20px',
              paddingBottom: '5px'
          }}>
          {node["title"]}
        </Typography>
    </Box>
    </a>
    </Box>
  )});

  /*
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group relative grid grid-rows-[auto_4rem] lg:mx-auto lg:max-w-[230px] rounded-t bg-zinc-900 duration-300 ease-in hover:scale-105 hover:bg-zinc-600 hover:z-10">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img ref={img.ref} className="h-full w-full rounded-t object-cover" src={img.src} alt={node["title"]} />
        {node["user_status"] != null && (
          <BookmarkIcon className="absolute right-1 top-1 text-blue-400 opacity-80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" style={{ fontSize: '1.25rem' }} />
        )}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-1.5 pb-1.5">
          <div>
            <StatusBadge status={node["status"]} season={node["season"]} />
          </div>
          <FormatLabel format={node["format"]} />
        </div>
        {debugMode && scoreFields.length > 0 && (
          <div className="invisible absolute inset-0 overflow-x-hidden overflow-y-auto rounded bg-black bg-opacity-95 px-3 py-2 text-xs text-white group-hover:visible">
            {scoreFields.map((field) => (
              <div key={field} className="mb-1 flex justify-between gap-1">
                <span className={`font-semibold ${field === 'discovery_score' ? 'text-green-400' : 'text-blue-300'}`}>{field}:</span>
                <span className={field === 'discovery_score' ? 'text-yellow-300' : 'text-yellow-200'}>{node[field]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center px-3">
        <h4 className="line-clamp-2 text-center font-sans text-base font-medium tracking-wide text-blue-200">
          {node["title"]}
        </h4>
      </div>
      <div className="invisible absolute top-[calc(100%-1px)] left-0 right-0 flex flex-wrap content-start justify-center gap-1.5 rounded-b bg-zinc-900 px-3 pt-1 pb-2.5 duration-300 ease-in group-hover:visible group-hover:bg-zinc-600">
        {((node["description"]?.length ? node["description"] : node["genres"]) || []).map((item) => (
          <GenrePill key={item} genre={item} />
        ))}
      </div>
    </a>
  );
});*/
