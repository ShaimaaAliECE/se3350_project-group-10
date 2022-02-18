import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import state from "../store/Store";
import {
  generateEmptyArr,
  initializeSheets,
  initializeSplit,
  random,
  handleClick,
} from "../screens/Home";
import { mergeSort } from "../algorithms/mergesort";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  content: {
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "20px",
    width: "800px",
    height: "500px",
    backgroundSize: "cover",
    backgroundColor: "darkgrey",
    // backgroundImage: `url(${image})`,
  },

  title: {
    textAlign: "center",
    fontSize: "50px",
  },

  buttonSection: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    height: "200px",
    flexDirection: "column",
    padding: "100px",
  },

  buttons: {
    padding: "20px",
  },
}));

function btnClick(restart) {
  if (restart === true) {
    handleClick(state.level);
  } else {
    state.resetStates();
  }
}

export default function LoseScreen() {
  const style = useStyles();
  var currentLevel = "/level_" + state.level;
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>Nice Try!</div>

        <div className={style.buttonSection}>
          <div className={style.buttons}>
            <Link to={currentLevel}>
              <Button
                variant="contained"
                className={style.button}
                sx={{
                  backgroundColor: "#3D3D3D",
                  height: "50px",
                  width: "250px",
                }}
                onClick={() => {
                  btnClick(true);
                }}
              >
                Restart Level
              </Button>
            </Link>
          </div>

          <div className={style.buttons}>
            <Link to="/">
              <Button
                variant="contained"
                className={style.button}
                sx={{
                  backgroundColor: "#3D3D3D",
                  height: "50px",
                  width: "250px",
                }}
                onClick={() => {
                  btnClick(false);
                }}
              >
                Quit Level
              </Button>
            </Link>
          </div>

          <div className={style.buttons}>
            <Link to="/">
              <Button
                variant="contained"
                className={style.button}
                sx={{
                  backgroundColor: "#3D3D3D",
                  height: "50px",
                  width: "250px",
                }}
                onClick={() => {
                  btnClick(false);
                }}
              >
                Switch Algorithms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
