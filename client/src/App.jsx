<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./Crud.jsx";
import Encrypt from "./Encrypt.jsx";
import FileEncryptor from "./FileEncryptor.jsx";
import FileDecryptor from "./FileDecryptor.jsx";
import Connect from "./components/connect.jsx";

export default function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Crud />} />
       <Route path="/enc" element={<FileEncryptor />} />
       <Route path="/dec" element={<FileDecryptor />}></Route>
       <Route path="/home" element={<Connect/>}></Route>
     </Routes>
   </BrowserRouter>
 )
=======
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap here
import "./App.css"; // Keep your custom styles after Bootstrap
import "./COE.css";

import Login from "./pages/login";
import COE from "./pages/COE";
import SuperintendentPortal from "./pages/loginSuper";
import AddSuperintendent from "./pages/Superintendent";
import TeacherPortal from "./pages/Teacher";
import loginsuper from "./pages/loginSuper"; // Correctly added page
import RecipientPortal from "./pages/Recipient";
import CreatePaperRequest from "./pages/PaperRequest";

function App() {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    // Store user in localStorage when it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />

        {/* Restrict COE route */}
        <Route
          path="/coe"
          element={user?.role === "coe" ? <COE setUser={setUser} /> : <Navigate to="/" />}
        />

        {/* Restrict Superintendent Portal */}
        <Route
          path="/superintendent"
          element={user?.role === "superintendent" ? <SuperintendentPortal setUser={setUser} /> : <Navigate to="/" />}
        />

        <Route
          path="/teacher"
          element={user?.role === "teacher" ? <TeacherPortal setUser={setUser} /> : <Navigate to="/" />}
        />

        <Route
          path="/recipient"
          element={user?.role === "recipient" ? <RecipientPortal setUser={setUser} /> : <Navigate to="/" />}
        />

        {/* Only COE should be able to add a Superintendent */}
        <Route
          path="/add-superintendent"
          element={user?.role === "coe" ? <AddSuperintendent /> : <Navigate to="/" />}
        />

        <Route
          path="/add-paperRequest"
          element={user?.role === "coe" ? <CreatePaperRequest /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
>>>>>>> 4ad4634cf693b7c7fa0af182c21be2f913a719fe
}

export default App;
