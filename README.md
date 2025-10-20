# Animeippo Frontend

A React-based frontend for anime recommendations and analysis, built with Create React App.

## Features

- **Anime Recommendations**: Get personalized anime recommendations based on your AniList profile
- **Profile Analysis**: Analyze your watching habits and preferences
- **Genre Filtering**: Filter anime by genre/tags with search functionality
- **Year Selection**: Browse anime by season/year
- **Debug Mode**: Inspect recommendation scores and algorithm details
- **Dark Theme**: Modern dark UI with blue accents

## Environment Variables

Create `.env.development.local` and `.env.production.local` files with the following variables:

```bash
# API endpoint URL
REACT_APP_API_URL="http://127.0.0.1:5000"

# Enable mock backend (uses local test data)
REACT_APP_MOCK_BACKEND=false

# Enable debug mode (shows score overlays on anime cards)
REACT_APP_DEBUG=false
```

### Environment Variable Options

- **REACT_APP_API_URL**: Backend API endpoint
  - Development: `http://127.0.0.1:5000`
  - Production: Your production API URL

- **REACT_APP_MOCK_BACKEND**: Use mock data instead of API calls
  - `true`: Uses data from `src/test.json`
  - `false`: Makes API calls to backend

- **REACT_APP_DEBUG**: Show debug information
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

## Project Structure

```
src/
├── App.js              # Main app component with routing and state
├── Header.js           # Search bar and year selector
├── AnimeList.js        # Anime card grid and carousel components
├── TestData.js         # Mock data loader
├── test.json           # Mock anime data
├── App.css             # Custom styles and carousel overrides
└── Icons.js            # SVG icon components
```

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
When `REACT_APP_DEBUG=true`:
- Overlays on anime cards show all scoring fields
- Useful for understanding recommendation algorithm
- Backend should also be in debug mode to send score data

## Development Tips

1. **Environment Changes**: Restart the dev server after changing `.env` files
2. **Mock Data**: Update `src/test.json` to test with different data
3. **Styling**: Uses Tailwind CSS for utility classes
4. **Icons**: Material-UI icons for UI elements

## Deployment

Build the production bundle with `npm run build` and deploy the `build/` folder to your hosting service (Vercel, Netlify, S3, etc.).

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material-UI](https://mui.com/)
