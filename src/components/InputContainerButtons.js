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
  let len = state.input.length;
  for (let i = 0; i < len; i++) {
    state.input[i] = "";
  }
  state.step = 0;
}

function handleSubmitClick() {
  //Comapre store state with ans state
  //state.ans == state.input
  state.stepInc();
  //   console.log(state.step); << Not changing
}

// everytie piano click button, update state, click submit refer to store, compare input[] with ans[] at each step

function onSubmit() {
  // if input lenght not = to ans []
  let input = state.input;
  let ans = state.ans;
  let counter = 0;
  if (input.length == ans.length) {
    for(let i =0; i< ans.length; i++) {

      if(input[i] === ans[i]) {
        counter++;
      } else {
        console.log('wrong');
        // clears input array
        handleRestartClick();
        break;
        // reset imput field
      }

      if (counter == ans.length) {
        // append to sheet []
        state.stepInc();
      }
    }
  } else {
    console.log("fill input array");
  }


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
