import React from "react";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { makeStyles } from "@material-ui/core";
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

export default function Home() {
  //Values and States for the Tabs
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  state.resetStates();
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
                <Link to="/level_1" className={classes.link}>
                  <button className={classes.button}>Level 1</button>
                </Link>
                <Link to="/level_2" className={classes.link}>
                  <button className={classes.button}>Level 2</button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button className={classes.button}>Level 3</button>
                </Link>
                <Link to="/level_4" className={classes.link}>
                  <button className={classes.button}>Level 4</button>
                </Link>
                <Link to="/level_5" className={classes.link}>
                  <button className={classes.button}>Level 5</button>
                </Link>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Link to="/level_1" className={classes.link}>
                  <button className={classes.button}>Level 1</button>
                </Link>
                <Link to="/level_2" className={classes.link}>
                  <button className={classes.button}>Level 2</button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button className={classes.button}>Level 3</button>
                </Link>
                <Link to="/level_4" className={classes.link}>
                  <button className={classes.button}>Level 4</button>
                </Link>
                <Link to="/level_5" className={classes.link}>
                  <button className={classes.button}>Level 5</button>
                </Link>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Link to="/level_1" className={classes.link}>
                  <button className={classes.button}>Level 1</button>
                </Link>
                <Link to="/level_2" className={classes.link}>
                  <button className={classes.button}>Level 2</button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button className={classes.button}>Level 3</button>
                </Link>
                <Link to="/level_4" className={classes.link}>
                  <button className={classes.button}>Level 4</button>
                </Link>
                <Link to="/level_5" className={classes.link}>
                  <button className={classes.button}>Level 5</button>
                </Link>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <Link to="/level_1" className={classes.link}>
                  <button className={classes.button}>Level 1</button>
                </Link>
                <Link to="/level_2" className={classes.link}>
                  <button className={classes.button}>Level 2</button>
                </Link>
                <Link to="/level_3" className={classes.link}>
                  <button className={classes.button}>Level 3</button>
                </Link>
                <Link to="/level_4" className={classes.link}>
                  <button className={classes.button}>Level 4</button>
                </Link>
                <Link to="/level_5" className={classes.link}>
                  <button className={classes.button}>Level 5</button>
                </Link>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </div>
    </div>
  );
}
