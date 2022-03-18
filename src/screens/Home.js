import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { makeStyles, TextField, Button } from "@material-ui/core";
import bg from "../assets/homeBG.svg";
import logo from "../assets/Logo.svg";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "../components/Tabs.js";
import { useState } from "react";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
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
  loginModal: {
    backgroundColor: "rgba(255,255,255,1)",
    padding: 40,
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  loginButton: {
    textDecoration: "none",
    fontFamily: "Raleway",
    backgroundColor: "rgba(0,0,0,0)",
    color: "white",
    border: "none",
    fontSize: 25,
    "&:hover": {
      cursor: "pointer",
      color: "grey",
    },
  },
  loginContainer: {
    position: "absolute",
    right: "5%",
    top: "5%",
  },
}));

export default function Home() {
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  state.resetStates();

  useEffect(() => {
    localStorage.setItem("algo", "");
    localStorage.setItem("level", 0);
    localStorage.setItem("attempts", 1);
    localStorage.setItem("time", 0);
    localStorage.setItem("livesLeft", 0);
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  return (
    <>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <div className={classes.loginModal}>
          <form
            className={classes.form}
            onSubmit={(e) => {
              let username = e.target.username.value;
              let password = e.target.password.value;
              if (username == "admin" && password == "admin") {
                localStorage.setItem("isLoggedIn", true);
              } else {
                alert("Incorrect Login");
                e.preventDefault();
              }
            }}
          >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              style={{ marginBottom: 20 }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              style={{ marginBottom: 20 }}
            />
            <Button variant="outlined" type="submit">
              Login
            </Button>
          </form>
        </div>
      </StyledModal>
      <div className={classes.container}>
        <div className={classes.loginContainer}>
          {!isLoggedIn ? (
            <button
              className={classes.loginButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              login
            </button>
          ) : (
            <button
              className={classes.loginButton}
              onClick={() => {
                localStorage.setItem("isLoggedIn", false);
                setIsLoggedIn(false);
              }}
            >
              logout
            </button>
          )}
        </div>
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
                  <Tab
                    label={<span className={classes.tabs}>Merge Sort</span>}
                  />
                  <Tab
                    label={<span className={classes.tabs}>Quick Sort</span>}
                  />
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
    </>
  );
}
