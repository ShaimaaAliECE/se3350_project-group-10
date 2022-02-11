import React from "react";
import { Button } from "@material-ui/core";
import state from "../store/Store.js";
import { view } from "@risingstack/react-easy-state";
import { generateEmptyArr } from "../screens/Home";
import { Modal } from "@material-ui/core";
import { useState } from "react";

import {
  playCorrectSound,
  playIncorrectSound,
  winSound,
} from "../assets/tones.js";
import Dialog from "@mui/material/Dialog";

function handleRestartClick(handleGameOver) {
  //Set the store state back to empty
  let len = state.input.length;
  for (let i = 0; i < len; i++) {
    state.input[i] = 0;
  }
}

function arrComp(arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
}

function handleSubmitClick(
  handleClickOpenFail,
  handleClickOpenWin,
  handleGameOver
) {
  //Check the answer, if its right --> increment step, handle restart, state.sheet.push(state.input)
  if (arrComp(state.ans[state.step].array, state.input)) {
    state.appendSheet(
      state.ans[state.step].type,
      state.input,
      state.ans[state.step].row
    );

    state.stepInc();
    if (state.step >= state.ans.length) {
      //Win!
      handleGameOver();
    } else {
      generateEmptyArr();
      state.fillTheGaps(state.ans[state.step - 1].zeroesEncountered);
      handleRestartClick();
      playCorrectSound();
      handleClickOpenWin();
    }
  } else {
    state.lives--;
    handleRestartClick();
    playIncorrectSound();
    handleClickOpenFail();
  }
  state.indexReset = 1;
}

// everytie piano click button, update state, click submit refer to store, compare input[] with ans[] at each step

export default view(function InputContainerButtons() {
  const [openFail, setOpenFail] = React.useState(false);
  const [openWin, setOpenWin] = React.useState(false);
  let [openModal, setOpenModal] = useState(false);
  const handleGameOver = () => {
    state.gameOver = true;
    setOpenModal(true);
    generateEmptyArr();
    state.step = 0;
    winSound();
  };

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
    <>
      <div style={{ display: "flex", padding: 10, flexDirection: "column" }}>
        <Button
          variant="contained"
          onClick={() => {
            handleRestartClick();
          }}
          disabled={state.gameOver}
        >
          RESET
        </Button>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            handleSubmitClick(
              handleClickOpenFail,
              handleClickOpenWin,
              handleGameOver
            );
          }}
          disabled={state.gameOver}
        >
          SUBMIT
        </Button>
      </div>
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
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              backgroundColor: "white",
              width: "25%",
              height: "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            You have Completed Level {state.level}!
          </p>
          <a
            href="/"
            style={{
              backgroundColor: "black",
              paddingLeft: 30,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 30,
              borderRadius: 20,
              textAlign: "center",
              color: "white",
              fontFamily: "Raleway",
              textDecoration: "none",
            }}
          >
            Home
          </a>
        </div>
      </Modal>
    </>
  );
});
