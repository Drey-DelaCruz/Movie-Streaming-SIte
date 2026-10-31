# Movie Site

A Netflix-style movie browsing app built with **Next.js**, **TypeScript**, and **Tailwind CSS**, powered by the [TMDB API](https://www.themoviedb.org/). Browse trending and genre-based movies, search by title, bookmark favorites, and keep a watch history, all without needing an account.

**Live Demo:** [resume-personal-movie-streaming-sit.vercel.app](https://resume-personal-movie-streaming-sit.vercel.app)

<!-- Add a screenshot or GIF here, e.g. ![Home page](./screenshots/home.png) -->

---

## Features

- **Auto-rotating hero section** with fading backdrops, title, synopsis, and rating, cycling every 10 seconds
- **TOP 10 Today carousel** that highlights the movie currently shown in the hero
- **Reusable carousel component** (`MovieRows`) with chevron navigation, responsive visible-card calculation, and two card layouts (tall posters and wide backdrops)
- **Multiple categories**: Top Rated, Trending Today, Action, Horror, Romance, Fantasy, and Sci-Fi
- **Search** with a centered search bar that moves up when results appear, served through a server-side API route
- **Bookmarks** saved to `localStorage`, toggled from any card
- **Watch history** with timestamps, individual removal, and a clear-all option
- **Watch page** (`/watch/[id]`) with a fullscreen player and a back button
- **Collapsible animated navbar** that shrinks into a single button and hides itself on the watch page
- **Hover interactions** on cards: darkened overlay, play button, and bookmark toggle

---

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Data | TMDB API (REST) |
| Icons | Lucide React |
| Persistence | Browser `localStorage` |
| Package manager | pnpm |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A free TMDB account for an API token

### 1. Clone the repository

```bash
git clone https://github.com/Drey-DelaCruz/Movie-Streaming-SIte.git
cd Movie-Streaming-SIte/movie-site
```

> The Next.js project lives in the `movie-site` subfolder, so run all commands from there.

### 2. Install dependencies

```bash
pnpm install
```

If pnpm blocks build scripts for packages like `sharp`, run `pnpm approve-builds` and allow them.

### 3. Add your TMDB API token

Create a `.env.local` file in the `movie-site` folder:

```
TMDB_API_TOKEN=your_api_read_access_token_here
```

No quotes and no spaces around the `=`.

**Getting a token:**

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to **Settings → API** and request a developer key
3. Copy the **API Read Access Token** (the long one starting with `eyJ...`, not the short API key)

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Restart the server whenever you change `.env.local`.

### Other commands

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # run ESLint
```

---

## Project Structure

```
movie-site/
├── app/
│   ├── page.tsx              # Homepage: fetches TMDB data (Server Component)
│   ├── layout.tsx            # Root layout with navbar
│   ├── globals.css           # Tailwind import
│   ├── search/page.tsx       # Search page and results grid
│   ├── bookmarks/page.tsx    # Saved bookmarks
│   ├── history/page.tsx      # Watch history
│   ├── watch/[id]/page.tsx   # Player page (dynamic route)
│   └── api/search/route.ts   # Server-side proxy for TMDB search
├── components/
│   ├── HeroPage.tsx          # Rotating hero + TOP 10 row
│   ├── MovieRows.tsx         # Reusable carousel (tall / wide variants)
│   └── navbar.tsx            # Collapsible animated navbar
├── hooks/
│   ├── useBookmarks.ts       # Bookmark state + localStorage
│   └── useHistory.ts         # Watch history state + localStorage
└── public/images/            # Static assets
```

---

## How It Works

- **Server-side data fetching:** `app/page.tsx` is a Server Component that calls the TMDB API, so the API token never reaches the browser. The data is passed as props to the client components.
- **Search proxy:** the search page is a Client Component, so it calls `/api/search?q=...`, a Next.js route handler that adds the token on the server and forwards the request to TMDB.
- **Carousel logic:** `MovieRows` measures its container with a ref, works out how many cards fit, and clamps the scroll position on resize so it never scrolls past the last card.
- **Persistence:** bookmarks and history are stored in `localStorage` through custom hooks. The hooks wait until the saved data has loaded before writing, so a fresh page load never overwrites existing data.
- **Dynamic routing:** `/watch/[id]` uses the TMDB movie ID from the URL to load the player.

---

## Deployment

Deployed on [Vercel](https://vercel.com/), with automatic redeploys on every push to `main`.

If you deploy your own copy:

1. Import the repository into Vercel
2. Set **Root Directory** to `movie-site`
3. Add the environment variable `TMDB_API_TOKEN`
4. Deploy

---

## Known Limitations

- Bookmarks and history are stored per browser and per device. There are no user accounts, so they don't sync.
- Search covers movies only (no TV shows).
- The video player is a third-party embed that is outside this project's control. It may show ads, and availability can change at any time.

---

## Disclaimer

This is a personal portfolio project built for learning purposes, focused on frontend architecture, API integration, and state management. It does not host, store, or distribute any video content. Playback is provided by a third-party embed service.

This product uses the TMDB API but is not endorsed or certified by TMDB.

<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB logo" width="120" />

---

## Author

**Marc Earl Dreighan Dela Cruz**
BS Computer Science (Software Engineering), FEU Institute of Technology

[GitHub](https://github.com/Drey-DelaCruz) · [LinkedIn](https://www.linkedin.com/in/marc-earl-dreighan-dela-cruz-74b380384/)
