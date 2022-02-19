import React from "react";
import { makeStyles } from "@material-ui/core";
import levelone from "../assets/level-one.json";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    bottom: "4%",
    left: "2%",
    borderRadius: 30,
    width: 300,
    height: 200,
    backgroundColor: "rgba(131,130,130,0.9)",
    margin: "auto",
    zIndex: 6,
  },

  detailsContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  content: {
    padding: 0,
    textAlign: "left",
    backgroundColor: "transparent",
    fontFamily: "Raleway",
    fontSize: "19px",
    color: "white",
  },
}));

function PopUp() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.detailsContainer}>
        <div className={classes.content}>
          <link
            rel="stylesheet"
            type="text/css"
            href="//fonts.googleapis.com/css?family=Raleway"
          />
          {/* kinda hard coded for now, but will fix later :) */}
          {state.instruct === 0
            ? "Split the array in half as evenly as possible. Take the floor function of the length/2 to correctly divide the array. Start by entering the values of the left sub-array."
            : levelone.map((levelone) => levelone[state.instruct])}
        </div>
      </div>
    </div>
  );
}

export default view(PopUp);
