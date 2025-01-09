import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import NewEntry from "./Pages/NewEntry";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const isAuthenticated = token !== "";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/new-entry"
          element={isAuthenticated ? <NewEntry /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
