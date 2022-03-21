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
    minHeight: 150,
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
    backgroundColor: "transparent",
    fontFamily: "Raleway",
    fontSize: "19px",
    color: "#1a1a1a",
  },

  buttonDrawer: {
    position: "absolute",
    left: "5%",
    bottom: "25%",
  },

  showButton: {
    fontFamily: "Raleway",
    fontSize: "15px",
    borderRadius: 30,
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
              setDrawer(true);
            }}
          >
            Instruction Hide
          </button>

          <Drawer
            variant="temporary"
            anchor={"left"}
            open={drawer}
            onClose={() => {
              setDrawer(false);
            }}
            ModalProps={{keepMounted: true}}
          >
            {
              <div className={classes.container}>
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
              </div>
            }
          </Drawer>
        </>
      </div>
    </>
  );
}

export default view(InstructionPopup);
