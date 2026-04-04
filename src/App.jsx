import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./assets/pages/home.jsx";
import Login from "./assets/pages/login.jsx";
import Signup from "./assets/pages/signup.jsx";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;