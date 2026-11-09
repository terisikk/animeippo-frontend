# Animeippo Frontend

A React-based frontend for anime recommendations and analysis, built with Vite.

## Features

- **Anime Recommendations**: Get personalized anime recommendations based on your AniList profile
- **Profile Analysis**: Analyze your watching habits and preferences

## Environment Variables

Create `.env.development.local` and `.env.production.local` files with the following variables:

```bash
# API endpoint URL
VITE_API_URL="http://127.0.0.1:5000"

# Enable mock backend (uses local test data)
VITE_MOCK_BACKEND=true

# Enable debug mode (shows score overlays on anime cards)
VITE_DEBUG=true
```

### Environment Variable Options

- **VITE_API_URL**: Backend API endpoint
  - Development: `http://127.0.0.1:5000`
  - Production: Your production API URL

- **VITE_MOCK_BACKEND**: Use mock data instead of API calls
  - `true`: Uses data from `src/test.json`
  - `false`: Makes API calls to backend

- **VITE_DEBUG**: Show debug information
  - `true`: Displays score overlays on anime cards showing all score-related fields
  - `false`: Normal display mode

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes. You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

## Features Detail

### Recommendation Mode

- Browse anime recommendations based on your watching history
- Filter by year and genre
- See personalized scores (when backend debug mode is enabled)

### Analysis Mode

- View insights about your anime watching preferences
- Year selector is hidden in this mode
- Analyze patterns in your viewing history

### Debug Mode

When `VITE_DEBUG=true`:

- Overlays on anime cards show all scoring fields
- Useful for understanding recommendation algorithm
- Backend should also be in debug mode to send score data
