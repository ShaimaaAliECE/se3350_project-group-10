import React from "react";
import { Button } from "@material-ui/core";
import state from "../store/Store.js";
import { view } from "@risingstack/react-easy-state";

const styles = {
  display: "flex",
  padding: 10,
};

function handleRestartClick() {
  //Set the store state back to empty
}

function handleSubmitClick() {
  //Comapre store state with ans state
  //state.ans == state.input
  state.stepInc();
  //   console.log(state.step); << Not changing
}

export default view(function InputContainerButtons() {
  return (
    <div style={styles}>
      <Button
        variant="contained"
        onClick={() => {
          handleRestartClick();
        }}
      >
        RESET
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleSubmitClick();
        }}
      >
        SUBMIT
      </Button>
    </div>
  );
});
