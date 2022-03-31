import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home.js";
import Level from "./screens/Level.js";
import Admin from "./screens/Admin.js";
import Analytics from "./screens/Analytics.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Need env file set up for this to work
const firebaseConfig = {
  apiKey: "AIzaSyAXK2FpB-Rk9iC2IZ5T26DvzcdnBhl4mqc",
  authDomain: "algorhythm-se3350-group-10.firebaseapp.com",
  projectId: "algorhythm-se3350-group-10",
  storageBucket: "algorhythm-se3350-group-10.appspot.com",
  messagingSenderId: "520746370090",
  appId: "1:520746370090:web:91a884d3a4bfdc72502f53",
  measurementId: "G-3Z6WTR6QVE",
};

//Firebase Initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level_:level" element={<Level />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
