import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./assets/pages/home.jsx";
import Login from "./assets/pages/login.jsx";
import Signup from "./assets/pages/signup.jsx";
import MovieDetail from "./assets/pages/movieDetails.jsx";
import { AuthProvider } from "./context/authContext";
import ResponsiveAppBar from "./assets/components/appBar.jsx";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ResponsiveAppBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;