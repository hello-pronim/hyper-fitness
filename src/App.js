import "./normal.css";
import "./App.css";

import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import AppBar from "./components/AppBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import React from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <React.Fragment>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/"></Navigate>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
