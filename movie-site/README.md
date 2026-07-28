# Movie Site

A movie browsing and discovery app built with Next.js, powered by the TMDB API.

## Note

The video player uses a third-party embed service which may display ads. 
This is outside the scope of the project — the focus is on the frontend 
architecture, API integration, and UI/UX.

## Features

- Hero section with auto-rotating featured movies
- Browse movies by category (Popular, Trending, Now Playing, Top Rated, by Genre)
- Search movies by title
- Bookmark movies for later
- Watch history with timestamps
- Integrated video player
- Collapsible animated navbar

## Tech Stack

- Next.js 16
- React
- Tailwind CSS
- TypeScript
- TMDB API
- Lucide React (icons)
- localStorage (bookmarks and history)

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
   pnpm install
```
3. Create a `.env.local` file in the root directory and add your TMDB API key:
4. Run the development server:
```bash
   pnpm dev
```
5. Open [http://localhost:3000](http://localhost.com:3000) in your browser

## Getting a TMDB API Key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org)
2. Go to Settings → API
3. Copy the **API Read Access Token** (the long one)
4. Paste it in your `.env.local` file

## Project Structure