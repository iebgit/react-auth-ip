import React from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import { AuthProvider } from "./GlobalState";
import "./App.css";
import LookupIP from "./pages/LookupIP";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/iplookup" element={<LookupIP />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
