# MovieWatch (Movie Watchlist)

A small React + TypeScript app that lets you search movies/series using the **OMDb API**, view details, and manage a personal watchlist.

## Features

- Search movies/series by title (OMDb `s=` search)
- Movie details page (OMDb `i=` lookup by IMDb ID)
- Add/remove items from a watchlist using React Context
- Routing with React Router
- Styling with Tailwind CSS

## Tech Stack

- React (Vite)
- TypeScript
- React Router
- Tailwind CSS
- ESLint

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

This project expects an OMDb API key in a Vite env var.

Create a `.env` file in the project root:

```bash
VITE_OMB_API_KEY=YOUR_OMDB_API_KEY
```

Notes:

- The code reads `import.meta.env.VITE_OMB_API_KEY`.
- If the key is missing/invalid, searches and details will fail.

### 3) Run the app

```bash
npm run dev
```

Vite will print the local dev URL in the terminal.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## App Routes

- `/` — Home (search results)
- `/movie/:imdbID` — Movie details
- `/watchlist` — Watchlist page

## Watchlist Behavior

The watchlist is stored in React Context state (in-memory). That means:

- It resets on page refresh.
- It is not persisted to `localStorage` or a database.

## Project Structure

```text
src/
	components/
		MovieCard.tsx
		Navbar.tsx
	context/
		WatchlistContext.tsx
	pages/
		Home.tsx
		MovieDetails.tsx
		Watchlist.tsx
	types/
		movie.ts
	App.tsx
	main.tsx
	index.css
```

## API

This project uses the public OMDb API:

- Search: `https://www.omdbapi.com/?s=<term>&apikey=<key>`
- Details: `https://www.omdbapi.com/?i=<imdbID>&apikey=<key>`

## Notes

- Posters may be `"N/A"` from OMDb; the UI falls back to a placeholder image.
