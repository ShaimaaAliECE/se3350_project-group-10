import React, { useState } from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import levelone from "../assets/level-one.json";
import state from "../store/Store";
import { autoEffect, view } from "@risingstack/react-easy-state";
import backBtn from "../assets/back.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    bottom: "2%",
    left: "2%",
    borderRadius: 30,
    width: 375,
    // minHeight: 150,
    height: "100vh",
    backgroundColor: "rgba(242,242,242,0.9)",
    margin: "auto",
    zIndex: 6,
  },

  detailsContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  content: {
    textAlign: "justified",
    backgroundColor: "rgba(242,242,242,0.9)",
    fontFamily: "Raleway",
    fontSize: "19px",
    color: "#1a1a1a",
    width: "400px",
    // height: "400px",
    marginTop: "80%",
  },

  buttonDrawer: {
    position: "absolute",
    right: "1%",
    bottom: "23%",
  },

  showButton: {
    fontFamily: "Raleway",
    fontSize: "20px",
    borderRadius: 30,
  },

  Drawer: {
    backgroundColor: "rgba(0,0,0,0)",
  },
}));

function InstructionPopup() {
  const classes = useStyles();

  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <div className={classes.buttonDrawer}>
        <>
          <button
            className={classes.showButton}
            onClick={() => {
              setDrawer(!drawer);
            }}
          >
            {" "}
            {drawer ? "Hide Instructions" : "Show Instructions"}
          </button>
          <Drawer
            className={classes.Drawer}
            // style={{
            //   background: "black",
            // }}
            variant="persistent"
            anchor={"left"}
            open={drawer}
            onClose={() => {
              setDrawer(false);
            }}
          >
            {/* <div className={classes.container}>
              <div className={classes.detailsContainer}></div>
            </div> */}
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
          </Drawer>
          {/* </div> */}
        </>
      </div>
    </>
  );
}

export default view(InstructionPopup);
