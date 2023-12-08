import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Header from './components/MenuBar/Header';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import CardTracks from "./components/CardTrack/CardTracks";
import CardTracksUpdates from "./components/CardTrack/CardTracksUpdates";
import DashBoard from "./components/DashBoard/DashBoard"
import { ErrorBoundary } from "./components/ErrorBoundary";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <>
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          MLNO - PARSPR
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
          {currentUser ? (
            <Link to={"/dashboard"} className="nav-link">
            DashBoard
          </Link>
            
          ):(
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          )}
          </li>
          <li className="nav-item">
            <Link to={"/cardtrack"} className="nav-link">
              Card Track
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/cardtrackUpdates"} className="nav-link">
              Card Updates
            </Link>
          </li>


          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav> */}
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/' errorElement={<ErrorBoundary />} element={<Header />}>
          <Route path="/home" index={true} element={<Home/>} />
          <Route path="/cardtrack" element={<CardTracks/>} />
          <Route path="/cardtrackUpdates" element={<CardTracksUpdates />} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
