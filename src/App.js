import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Outlet } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Header from "./components/MenuBar/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import CardTracks from "./components/CardTrack/CardTracks";
import BureauComparisionDashBoard from "./components/BureauComparision/BureauComparisionDashBoard"
import { ErrorBoundary } from "./components/ErrorBoundary";
import EventBus from "./common/EventBus";
import { FilesMaster } from "./components/BureauFileListing/FilesMaster";
import { FileTATReport } from "./components/BureauFileListing/FileTATReport";
import { BureauReportDashboard } from "./components/BureauDashboard/BureauReportDashboard";
import CreatePullRequestList from "./components/PullRequest/CreatePullRequestList";
import PullRequestList from "./components/PullRequest/PullRequestList";
import ViewPullRequestDetails from "./components/PullRequest/ViewPullRequestDetails";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();

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
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/' errorElement={<ErrorBoundary />} element={<Header />}>
          <Route path="home" index={true} element={<Home/>} />
          <Route path="files" element={<FilesMaster />} />
          <Route path="files/:id" element={<CardTracks fileDetails={location.state} navigate={navigate} />} />
          <Route path="file-tat-report" element={<FileTATReport />} />
          <Route path="bureau-comparision" element={<BureauComparisionDashBoard />} />
          <Route path="bureau-reports" element={<BureauReportDashboard />} />
          <Route path="pull-request" element={<Outlet />}>
            <Route path='create' index element={<CreatePullRequestList />} />
            <Route path='manage' element={<PullRequestList />} />
            <Route path='view/:id' element={<ViewPullRequestDetails />} />
          </Route>
          <Route path="profile" element={<Profile/>} />
          <Route path="admin" element={<BoardAdmin/>} />
          <Route path="user" element={<BoardUser/>} />
          <Route path="mod" element={<BoardModerator/>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
