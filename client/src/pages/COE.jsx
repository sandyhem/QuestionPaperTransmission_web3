import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddSuperintendent from "./Superintendent";
import CreatePaperRequest from "./PaperRequest";
import AddTeacher from "./AssignTeacher"; // Import Teacher Page

function COE({ setUser }) {
  const navigate = useNavigate();

  // Load state from localStorage or default to "home"
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePage") || "home"
  );

  useEffect(() => {
    // Save active page to localStorage whenever it changes
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("activePage"); // Clear stored page state
    setUser(null);
    navigate("/");
  };

  return (
    <div className="coe-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <h1 className="title">Admin Portal (COE)</h1>
          </div>
          <nav className="nav">
            <a href="#" onClick={() => setActivePage("home")}>Home</a>
            <a href="#/add-superintendent" onClick={() => setActivePage("superintendent")}>Superintendents</a>
            <a href="#/add-teachers" onClick={() => setActivePage("teachers")}>Teachers</a> {/* Added Teachers Link */}
            <a href="#/add-paperRequest" onClick={() => setActivePage("paperRequest")}>Raise Paper Requests</a>
            <a href="#" onClick={handleLogout}>Logout</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="full-page-content">
        {activePage === "superintendent" ? (
          <AddSuperintendent />
        ) : activePage === "teachers" ? (  // Render Teacher Page
          <AddTeacher />
        ) : activePage === "paperRequest" ? (
          <CreatePaperRequest />
        ) : (
          <div className="welcome-box">
            <h2>Welcome Controller of Examination (COE)</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default COE;
