import { makeStyles } from "@material-ui/core";
import React from "react";
import l1 from "../assets/life1.svg";
import l2 from "../assets/life2.svg";
import l3 from "../assets/life3.svg";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  livesContainer: {
    display: "flex",
    flexDirection: "row",
    rowGap: "50px",
    margin: "10px",
    height: "10px",
    width: "50%",
  },

  life: {
    order: 1,
    margin: "5px",
  },

}));

export function handleSubmitClick(handleGameOver) {}

export function Lives() {
  const classes = useStyles();
  return (
    <div className={classes.livesContainer}>
      <div id="l1" className={classes.life} style={{order:1}}>
        {" "}
        <img src={l1} alt="life 1"></img>
      </div>
      <div id="l2" className={classes.life} style={{order:2}}>
        {" "}
        <img src={l2} alt="life 2"></img>
      </div>
      <div id="l3" className={classes.life} style={{order:3}}>
        {" "}
        <img src={l3} alt="life 3"></img>
      </div>
    </div>
  );
}

export default view(Lives);
