import React, { useState } from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import levelone from "../assets/level-one.json";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";
import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    bottom: "2%",
    left: "2%",
    borderRadius: 30,
    width: 375,
    height: "100vh",
    backgroundColor: "rgba(242,242,242,0.9)",
    margin: "auto",
    zIndex: 6,
  },

  detailsContainer: {
    padding: 20,
    paddingLeft: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(242,242,242,0.9)",
    margin: "auto",
  },

  content: {
    textAlign: "justified",
    fontFamily: "Raleway",
    fontSize: "19px",
    color: "#1a1a1a",
    width: "400px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  buttonDrawer: {
    position: "absolute",
    right: "0%",
    top: "50%",
  },

  showButton: {
    fontFamily: "Raleway",
    fontSize: "20px",
    borderRadius: 30,
    "&:hover": { color: "#38c6d9" },
  },

  Drawer: {
    backgroundColor: "transparent",
    borderStyle: "none",
  },
}));

function InstructionPopup() {
  const classes = useStyles();

  const [drawer, setDrawer] = useState(true);

  return (
    <>
      <div className={classes.buttonDrawer}>
        <>
          <IconButton
            className={classes.showButton}
            onClick={() => {
              setDrawer(!drawer);
            }}
            style={drawer ? { color: "black" } : { color: "white" }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Drawer //drawer component
            variant="persistent"
            anchor={"right"}
            classes={{ paper: classes.Drawer }}
            open={drawer}
            onClose={() => {
              setDrawer(false);
            }}
          >
            <div className={classes.detailsContainer}>
              <IconButton
                onClick={() => {
                  setDrawer(!drawer);
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              <div className={classes.content}>
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="//fonts.googleapis.com/css?family=Raleway"
                />
                {state.instruct === 0
                  ? "Split the array in half as evenly as possible. Take the floor function of the length/2 to correctly divide the array. Start by entering the values of the left sub-array."
                  : levelone.map((levelone) => levelone[state.instruct])}
              </div>
            </div>
          </Drawer>
        </>
      </div>
    </>
  );
}

export default view(InstructionPopup);
