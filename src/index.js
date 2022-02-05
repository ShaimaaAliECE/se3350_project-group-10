import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./screens/Home.js";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);
