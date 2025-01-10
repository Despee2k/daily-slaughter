import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import NewEntry from "./Pages/NewEntry";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route
          path="/"
          element={
            token ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/new-entry"
          element={
            token ? <NewEntry handleLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
