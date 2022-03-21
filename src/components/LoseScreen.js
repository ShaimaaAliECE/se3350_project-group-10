import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { StateTimeline } from "tone";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
    fontFamily: "Raleway",
    backgroundColor: "rgba(0, 0, 0, 0.93)",
  },

  content: {
    color: "white",
    backgroundSize: "cover",
    fontFamily: "Raleway",
  },

  title: {
    fontFamily: "Raleway",
    textAlign: "center",
    fontSize: "100px",
  },

  buttonSection: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: "5%",
    fontFamily: "Raleway",
  },

  buttons: {
    fontFamily: "Raleway",
    padding: "20px",
    textDecoration: "none",
  },
}));

export default function LoseScreen() {
  const style = useStyles();
  var currentLevel = "/level_" + state.level;
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>GAME OVER.</div>
        <div className={style.buttonSection}>
          <div className={style.buttons}>
            <a to={currentLevel}>
              <Button
                variant="contained"
                className={style.button}
                sx={{
                  color: "black",
                  backgroundColor: "rgba(208, 208, 208, 1)",
                  height: "50px",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "#38c6d9",
                  },
                }}
                onClick={() => {
                  state.restartGame = true;
                }}
              >
                Restart Level
              </Button>
            </a>
          </div>

          <div className={style.buttons}>
            <Link to="/">
              <Button
                variant="contained"
                className={style.button}
                sx={{
                  color: "black",
                  backgroundColor: "rgba(208, 208, 208, 1)",
                  height: "50px",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "#38c6d9",
                  },
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
                  color: "black",
                  backgroundColor: "rgba(208, 208, 208, 1)",
                  height: "50px",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "#38c6d9",
                  },
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
