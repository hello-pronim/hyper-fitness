import "./normal.css";
import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import AppBar from "./components/AppBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
