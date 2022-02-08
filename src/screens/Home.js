import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import state from "../store/Store";
import { mergeSort } from "../algorithms/mergsort";
import bg from "../assets/HomeBG.svg";
import logo from "../assets/Logo.svg";

const useStyles = makeStyles((theme) => ({
  //put css here
  container: {
    position: "fixed",
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover ",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 65, //Toolbar takes up 65px
  },

  button: {
    position: "relative",
    display: "inline-flex",
    flex: "none",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    padding: 12,
    margin: 10,
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Raleway",
    color: "white",
    textAlign: "center",
    backgroundColor: "#757575",
    border: 0,
    borderRadius: 10,
  },
  link: {
    textDecoration: "none",
  },
}));

export function generateEmptyArr() {
  state.input = [];
  for (let i = 0; i < state.ans[state.step].array.length; i++) {
    state.input.push(0);
  }
}
const random = (min, max) => {
  let num = [];
  for (let i = 0; i < 10; i++) {
    num.push(Math.floor(Math.random() * (max - min) + min));
  }
  return num;
};
function initializeSheets() {
  let depth = state.depth;
  //Fill sheetSplit
  let temp = [];
  for (let i = 0; i < depth; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetSplit.push(temp);
  }

  //Fill sheetMerge
  for (let i = 0; i < depth - 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].length; j++) {
      temp.push(0);
    }
    state.sheetMerge.push(temp);
  }
}

function handleClick(level) {
  switch (level) {
    case 1:
      console.log("level 1");
      break;
    case 2:
      console.log("level 2");
      break;
    case 3:
      mergeSort([...random(1, 10)]);
      generateEmptyArr();
      initializeSheets();
      break;
    default:
  }
}

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.logo}>
          <img src={logo} style={{ height: 209, width: 661 }} alt="logo" />
        </div>
        <div className={classes.buttonContainer}>
          <Link to="/app" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Merge Sort
            </button>
          </Link>
          <Link to="/app" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Quick Sort
            </button>
          </Link>
          <Link to="/app" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Insertion Sort
            </button>
          </Link>
          <Link to="/app" className={classes.link}>
            <button
              className={classes.button}
              onClick={() => {
                handleClick(3);
              }}
            >
              Recursive Sort
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/*<Button
            variant="contained"
            onClick={() => {
              handleClick(3);
            }}
            sx={{
              backgroundColor: "#3D3D3D",
              height: "50px",
              width: "250px",
            }}
          >
            This goes to App.js
          </Button>
          */
