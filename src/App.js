import './App.css';
import Results from "./Results";
import React, { useState, useEffect } from "react";
import HomePage from "./HomePage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  NavLink
} from "react-router-dom";

function App() {
  return (
    <Router basename='/bazi-calculator'>
      <Routes>
        <Route exact path="/results/:groomBday/:brideBday/:reportDuration/:groomName/:brideName" element={<Results/>} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
