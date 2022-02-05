import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./screens/Home.js";
import { Provider as AlertProvider } from "react-alert";

ReactDOM.render(
  <AlertProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AlertProvider>,

  document.getElementById("root")
);
