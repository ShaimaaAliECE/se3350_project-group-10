import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./screens/Home.js";
import Level from "./screens/Level.js";
import Admin from "./screens/Admin.js"; 

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level_:level" element={<Level />} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
