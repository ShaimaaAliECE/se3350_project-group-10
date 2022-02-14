import React from "react";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { makeStyles } from "@material-ui/core";
import { mergeSort } from "../algorithms/mergesort";
import bg from "../assets/homeBG.svg";
import logo from "../assets/Logo.svg";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "../components/Tabs.js";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: "5px",
    backgroundColor: "#646464",
  },
  box: {
    width: "100%",
    borderRadius: "5px",
  },
  container: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 65, //Toolbar takes up 65px
  },
  button: {
    margin: 20,
    justifyContent: "space-between",
    padding: 12,
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Raleway",
    color: "white",
    textAlign: "center",
    backgroundColor: "#504c4c",
    border: 0,
    borderRadius: 10,
    "&:hover": {
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
  },
  tabs: {
    fontFamily: "Raleway",
    color: "white",
    fontSize: 15,
    fontWeight: 450,
  },
  tabContainer: {
    borderRadius: "5px",
    indicatorColor: "red",
    backgroundColor: "#646464",
  },
}));

export function generateEmptyArr() {
  state.input = [];
  for (let i = 0; i < state.ans[state.step]?.array.length; i++) {
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

function initializeSplit() {
  for (let i = 1; i < state.depth; i++) {
    state.splits.push(i);
  }
  //Switch to -2 for 0,1,2,3,4,3,2,1,0 instead of 0,1,2,3,4,4,3,2,1,0
  for (let i = state.depth - 1; i > 0; i--) {
    state.splits.push(i);
  }
  state.splits.push(0);
}

function initializeSheets() {
  let depth = state.depth;
  //Fill sheetSplit
  let temp = [];
  for (let i = 0; i < depth + 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetSplit.push({ array: temp, row: i });
  }

  //Fill sheetMerge
  for (let i = 0; i < depth - 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetMerge.push({ array: temp, row: i + depth + 1 });
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
      state.resetStates();
      mergeSort([...random(1, 11)]);
      generateEmptyArr();
      initializeSplit();
      initializeSheets();
      break;
    default:
  }
}

export default function Home() {
  //Values and States for the Tabs
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.logo}>
          <img src={logo} style={{ height: 209, width: 661 }} alt="logo" />
        </div>

        <div>
          <Box sx={{ bgcolor: "background.paper" }} className={classes.box}>
            <AppBar className={classes.appBar} position="static">
              <Tabs
                TabIndicatorProps={{ style: { backgroundColor: "white" } }}
                value={value}
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
                className={classes.tabContainer}
              >
                <Tab label={<span className={classes.tabs}>Merge Sort</span>} />
                <Tab label={<span className={classes.tabs}>Quick Sort</span>} />
                <Tab
                  label={<span className={classes.tabs}>Insertion Sort</span>}
                />
                <Tab
                  label={<span className={classes.tabs}>Recursive Sort</span>}
                />
              </Tabs>
            </AppBar>

            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 1
                  </button>
                </Link>

                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 2
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 3
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 4
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 5
                  </button>
                </Link>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 1
                  </button>
                </Link>

                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 2
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 3
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 4
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 5
                  </button>
                </Link>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 1
                  </button>
                </Link>

                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 2
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 3
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 4
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 5
                  </button>
                </Link>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 1
                  </button>
                </Link>

                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 2
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 3
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 4
                  </button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button
                    className={classes.button}
                    onClick={() => {
                      handleClick(3);
                    }}
                  >
                    Level 5
                  </button>
                </Link>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </div>
    </div>
  );
}
