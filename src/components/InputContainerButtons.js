import React from "react";
import { Button } from "@material-ui/core";
import state from "../store/Store.js";
import { view } from "@risingstack/react-easy-state";
import { generateEmptyArr } from "../screens/Home";
import { playCorrectSound, playIncorrectSound } from "../assets/tones.js";
import Dialog from "@mui/material/Dialog";

function handleRestartClick() {
  //Set the store state back to empty
  let len = state.input.length;
  for (let i = 0; i < len; i++) {
    state.input[i] = 0;
  }
}

function arrComp(arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
}

function handleSubmitClick(handleClickOpenFail, handleClickOpenWin) {
  //Check the answer, if its right --> increment step, handle restart, state.sheet.push(state.input)
  if (arrComp(state.ans[state.step].array, state.input)) {
    state.appendSheet(
      state.ans[state.step].type,
      state.input,
      state.ans[state.step].row
    );
    state.stepInc();
    generateEmptyArr();
    handleRestartClick();
    playCorrectSound();
    handleClickOpenWin();
  } else {
    state.lives--;
    handleRestartClick();
    playIncorrectSound();
    handleClickOpenFail();
  }
}

// everytie piano click button, update state, click submit refer to store, compare input[] with ans[] at each step

export default view(function InputContainerButtons() {
  const [openFail, setOpenFail] = React.useState(false);
  const [openWin, setOpenWin] = React.useState(false);

  const handleClickOpenFail = () => {
    setOpenFail(true);
  };
  const handleClickOpenWin = () => {
    setOpenWin(true);
  };

  const handleCloseFail = () => {
    setOpenFail(false);
  };
  const handleCloseWin = () => {
    setOpenWin(false);
  };

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
          handleSubmitClick(handleClickOpenFail, handleClickOpenWin);
        }}
      >
        SUBMIT
      </Button>
      <Dialog
        open={openFail}
        onClose={handleCloseFail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: 300, height: 300 }}
      >
        You made a mistake!
      </Dialog>
      <Dialog
        open={openWin}
        onClose={handleCloseWin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: 300, height: 300 }}
      >
        Correct!
      </Dialog>
    </div>
  );
});
