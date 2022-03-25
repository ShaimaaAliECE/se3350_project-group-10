import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";

import {
  playCorrectSound,
  playIncorrectSound,
  winSound,
  loseSound,
} from "../assets/tones.js";

const useStyles = makeStyles((theme) => ({
  stylesContainerInner: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "black",
    margin: 15,
    width: "100%",
  },
}));

const stylesMainInner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function arrComp(arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
}

function handleRestartClick(handleGameOver) {
  //Set the store state back to empty
  let len = state.input.length;

  for (let i = 0; i < len; i++) {
    state.input[i] = 0;
  }
  state.feedbackColor = "rgba(220,220,220, .6)";
  state.reseting = false;
}

export function generateEmptyArr() {
  state.input = [];

  if (state.ans[state.step]?.type == "merge") {
    state.input.push(0);
  } else {
    for (let i = 0; i < state.ans[state.step]?.array.length; i++) {
      state.input.push(0);
    }
  }

  state.feedbackColor = "rgba(220,220,220, .6)";
  state.reseting = false;
}

function navigateSheet() {
  let row;
  if (state.ans[state.step].type == "merge") {
    let depth = state.depth;

    row = state.ans[state.step].row + depth;
  } else {
    row = state.ans[state.step].row;
    row--;
  }

  let el = document.getElementById(row);
  el?.scrollIntoView();
}

export function handleSubmitClick(handleGameOver) {
  state.userActive();
  let tempArr;
  let type = state.ans[state.step].type;
  let isCorrect = false;
  let row = state.ans[state.step].row + state.depth;

  if (type === "merge") {
    //MERGE INPUT
    let row = state.ans[state.step].row + state.depth;
    let ans = state.ans[state.step].array[state.mergePointer];
    tempArr = [
      ...state.sheet[0][row].array[
      state.firstZeroFinder2D([...state.sheet[0][row].array])
      ],
    ];
    //if their input is correct append it, set isCorrect = true

    if (ans === state.input[0]) {
      tempArr[state.mergePointer] = state.input[0];
      state.appendSheet([...tempArr], row, 1);
      state.mergePointer++;
      isCorrect = true;
    }
  } else {
    //SPLIT INPUT
    //Check the answer, if correct set isCorrect = true
    if (arrComp(state.ans[state.step].array, state.input)) {
      let row = state.ans[state.step].row;
      state.appendSheet(state.input, row);
      isCorrect = true;
    }
  }
  if (isCorrect) {
    if (
      (type === "merge" &&
        state.ans[state.step].array.length === state.mergePointer) ||
      type === "split"
    ) {
      //reset mergePointer when step is incremented
      state.mergePointer = 0;
      state.stepInc();
    }

    setTimeout(navigateSheet, 1000);
    //Win
    if (state.step >= state.ans.length) {
      handleGameOver();
      state.isActive = false;
    } else {
      //Reset
      state.reseting = true;

      //Fills in necessary x's
      state.fillTheGaps(
        state.ans[state.step - 1].zeroesEncountered,
        state.ans[state.step - 1].type
      );

      setTimeout(generateEmptyArr, 1000);
      setTimeout(handleRestartClick, 1000);
      playCorrectSound();
    }
    if (state.level == 2) {
      state.instruct++;
    }
  } else {
    // if incorrect, minus 1 life, play incorrect sound
    state.lives--;
    state.reseting = true;
    setTimeout(handleRestartClick, 1000);
    playIncorrectSound();
    // remove life visually
    if (state.lives === 2) {
      let lostLife1 = document.getElementById("l1");
      lostLife1.style.display = "none";
    } else if (state.lives === 1) {
      let lostLife2 = document.getElementById("l2");
      lostLife2.style.display = "none";
    } else if (state.lives === 0) {
      localStorage.setItem(
        "attempts",
        parseInt(localStorage.getItem("attempts")) + 1
      );
      let lostLife3 = document.getElementById("l3");
      lostLife3.style.display = "none";
      loseSound(); // play lose sound
      state.loseGame = true;
      state.isActive = false;
    }
  }
}

function CreateMap(arrOuter) {
  //Maps user entered array
  const style = useStyles();

  const submitBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    width: 50,
    height: 50,
    margin: 10,
    background: state.feedbackColor,
  };

  const handleFeedbackColor = () => {
    let ans = state.ans[state.step].array[state.mergePointer];
    //if user input of array is correct
    if (
      arrComp(state.ans[state.step].array, state.input) ||
      ans === state.input[0]
    ) {
      //set state of background colour to green on submit
      state.feedbackColor = "rgba(0, 255, 0, 0.6)";
    } else {
      // set state of background colour to red on submit
      state.feedbackColor = "rgba(255, 0, 0, 0.6)";
    }
  };


  let [openModal, setOpenModal] = useState(false);

  const handleGameOver = () => {
    localStorage.setItem("livesLeft", state.lives);
    //localStorage.setItem("time", state.getCurrentTimeStep())>>> FOR WHEN AL-113 is done
    // appendDatabase(
    //   localStorage.getItem("algo"),
    //   localStorage.getItem("level"),
    //   localStorage.getItem("attempts"),
    //   localStorage.getItem("time"),
    //   localStorage.getItem("livesLeft")
    // ); >>>> FOR WHEN AL-109 is done
    state.gameOver = true;
    setOpenModal(true);
    generateEmptyArr();
    state.step = 1;
    state.instruct = 0;
    state.isActive = false;
    winSound();
    state.userTime();
  };

  return (
    <>
      <div className={style.stylesContainerInner}>
        {arrOuter.map((arrInner) => (
          <div style={submitBox}>{arrInner === 0 ? "" : arrInner}</div>
        ))}
      </div>
      <div style={{ display: "flex", padding: 10, flexDirection: "column" }}>
        <Button
          variant="contained"
          onClick={() => {
            handleRestartClick();
          }}
          disabled={state.gameOver || state.reseting}
        >
          RESET
        </Button>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            handleFeedbackColor();
            handleSubmitClick(handleGameOver);
          }}
          disabled={state.gameOver || state.reseting}
        >
          SUBMIT
        </Button>
      </div>

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
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.93)",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "Raleway",
                fontSize: "70px",
                color: "white",
              }}
            >
              LEVEL {state.level} COMPLETED.
            </div>

            <div
              style={{
                fontFamily: "Raleway",
                fontSize: "30px",
                color: "white",
                marginTop: 15,
                marginBottom: 25,
              }}
            >
              Time to complete: {state.timeDisplay} s !
            </div>

            <div>
              <a
                href="/"
                style={{
                  backgroundColor: "rgba(208, 208, 208, 1)",
                  paddingLeft: 50,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 50,
                  borderRadius: 10,
                  textAlign: "center",
                  color: "black",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                HOME
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function SubmitBoxes() {
  let arr = state.input;

  return <div style={stylesMainInner}>{CreateMap(arr)}</div>;
}

export default view(SubmitBoxes);
