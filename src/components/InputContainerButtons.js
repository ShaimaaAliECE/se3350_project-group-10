import React from "react";
import { Button } from "@material-ui/core";
import state from "../store/Store.js";
import { view } from "@risingstack/react-easy-state";
import { generateEmptyArr } from "../screens/Home";
import { playCorrectSound, playIncorrectSound } from "../assets/tones.js";

function handleRestartClick() {
  //Set the store state back to empty
  let len = state.input.length;
  for (let i = 0; i < len; i++) {
    state.input[i] = 0;
  }
  state.step = 0;
}

function arrComp(arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
}

function handleSubmitClick() {
  state.stepInc();
  //Check the answer, if its right --> increment step, handle restart, state.sheet.push(state.input)
  if (arrComp(state.ans[state.step].array, state.input)) {
    state.appendSheet(
      state.ans[state.step].type,
      state.ans[state.step].array,
      state.ans[state.step].row
    );
    generateEmptyArr();
    handleRestartClick();
    playCorrectSound();
  } else {
    state.lives--;
    handleRestartClick();
    playIncorrectSound();
  }
}

// everytie piano click button, update state, click submit refer to store, compare input[] with ans[] at each step

export default view(function InputContainerButtons() {
  return (
    <div style={{ display: "flex", padding: 10, flexDirection: "column" }}>
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
