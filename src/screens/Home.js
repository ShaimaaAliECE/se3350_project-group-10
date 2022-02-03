import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import App from "../App";
import { Link } from "react-router-dom";
import LoseScreen from "../components/LoseScreen.js";
import state from "../store/Store";

const random = (min, max) => {
  for (let i = 0; i < 10; i++) {
    let num = Math.floor(Math.random() * (max - min) + min);
    state.sheet[0].push(num);
  }
};

function handleClick(level) {
  switch (level) {
    case 1:
      console.log("level 1");
      break;
    case 2:
      console.log("level 2");
      break;
    case 3:
      random(1, 20);
      break;
  }
}

export default function Home() {
  return (
    <div>
      HOME SCREEN
      <div>
        <Link to="/app">
          <Button
            variant="contained"
            onClick={() => handleClick(3)}
            sx={{
              backgroundColor: "#3D3D3D",
              height: "50px",
              width: "250px",
            }}
          >
            This goes to App.js
          </Button>
        </Link>
      </div>
    </div>
  );
}
