# Movie App

A modern React application to search for movies using the [TMDB API](https://developers.themoviedb.org/3), track trending searches with [Appwrite](https://appwrite.io/), and ensure performance with debounced search input.

---
## Tech Stack

- **React** – Frontend framework  
- **TMDB API** – Source of movie data  
- **Appwrite** – Backend for search tracking  
- **Tailwind CSS** – Utility-first styling  
- **Vite** – Fast development build tool  
- **react-use** – For useDebounce functionality

  ---
## Features

- **Live Movie Search**  
  Users can search for any movie title using a simple input field. The app fetches movie data from the TMDB API, including titles, posters, and metadata, and displays them in a responsive grid layout.
   The search input is optimized using `useDebounce()` from the `react-use` library. This ensures that the API is **not called with every keystroke**, but only after the user stops typing for 500 milliseconds. This improves performance, reduces unnecessary API calls, and provides a smoother user experience.

- **Trending Section**  
  The app tracks search frequency using Appwrite. The top 5 most searched movies are displayed in a **Trending Movies** section, updated dynamically based on real-time usage data.

- **Appwrite Integration**  
  Each search is logged into a database using Appwrite. If a movie has already been searched before, its count is incremented; otherwise, a new record is created. This backend logic helps track movie popularity and powers the trending section.

- **Responsive UI**  
  Built with Tailwind CSS, the app is fully responsive and mobile-first. It features a clean grid layout for movies, smooth animations, and adaptive design that works across devices.

- **Secure API Access**  
  All sensitive API keys and project details are stored securely in a `.env.local` file using Vite’s environment variable support. This keeps credentials safe and makes the app easy to configure across environments.


