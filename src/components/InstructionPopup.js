import React, { useState } from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import levelone from "../assets/level-one.json";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

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
    display: "flex",
    flexDirection: "column",
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
    left: "1%",
    bottom: "23%",
  },

  showButton: {
    fontFamily: "Raleway",
    fontSize: "20px",
    borderRadius: 30,
  },

  Drawer: {
    backgroundColor: "transparent",
    borderStyle: "none",
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
            className={classes.showButton} // show or hide button text
            onClick={() => {
              setDrawer(!drawer);
            }}
          >
            {" "}
            {drawer ? "Hide Instructions" : "Show Instructions"}
          </button>
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
