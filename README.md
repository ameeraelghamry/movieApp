# Movie App

A modern React application to search for movies using the [TMDB API](https://developers.themoviedb.org/3), track trending searches with [Appwrite](https://appwrite.io/), and provide a personalized experience through a polished, responsive interface.

---

## Tech Stack

- **React** – Frontend framework  
- **Material UI (MUI)** – Component library for layout, navigation, and form elements
- **Tailwind CSS** – Utility-first styling for custom layouts  
- **TMDB API** – Source of movie data  
- **Appwrite** – Backend for authentication and search tracking  
- **Vite** – Fast development build tool  
- **react-use** – For `useDebounce()` functionality  

---

## Features

- **User Authentication**  
  The app includes a secure **Login** and **Signup** system powered by Appwrite. The interface is built using MUI components such as **TextField**, **Box**, and other form elements to deliver a clean, professional experience with responsive behavior across devices.

- **Live Movie Search & Discovery**  
  Users can search for any movie title through an optimized input field connected to the TMDB API. Search results include movie titles, posters, and metadata displayed in a responsive layout.  

  The search experience is enhanced using **useDebounce()** from the **react-use** library, ensuring API requests are sent only after the user stops typing for **500ms**. This improves performance, reduces unnecessary requests, and creates a smoother user experience.

- **Detailed Movie Insights**  
  The app includes a dedicated **Movie Details** page where users can click on any movie to explore extended information such as plot summaries, ratings, release dates, trailers, and high-quality imagery.

- **Trending Section**  
  Search activity is tracked using Appwrite. Each unique movie search is stored in the database, and repeated searches automatically increase its count. The top 5 most searched movies are displayed in a dynamic **Trending Movies** section based on real-time user activity.

- **Responsive Navigation & UI**  
  The application features a responsive navigation system built with MUI components and Tailwind CSS, the interface adapts seamlessly between desktop and mobile devices with optimized menus and layouts.

- **Appwrite Integration**  
  Appwrite powers both authentication and database operations. It manages user accounts, stores trending search data, and handles backend logic while keeping the frontend clean and maintainable.
