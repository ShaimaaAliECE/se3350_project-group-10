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
  stylesContainerOuter: {
    display: "flex",
    flexDirection: "row",
  },

  stylesContainerInner: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "black",
    margin: 15,
  },
}));

const stylesMainInner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function chunk(array, limit) {
  const chunks = Math.ceil(array.length / limit);
  return Array.from({ length: chunks }, (_, i) =>
    array.slice((i * array.length) / chunks, ((i + 1) * array.length) / chunks)
  );
}

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
  for (let i = 0; i < state.ans[state.step]?.array.length; i++) {
    state.input.push(0);
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
  //Check the answer, if its right --> increment step, handle restart, state.sheet.push(state.input)

  if (arrComp(state.ans[state.step].array, state.input)) {
    let row;
    if (state.ans[state.step].type == "merge") {
      row = state.ans[state.step].row + state.depth;
    } else {
      row = state.ans[state.step].row;
    }
    state.appendSheet(state.input, row);

    state.stepInc();
    if (state.level === 2) {
      state.instruct++;
    }
    setTimeout(navigateSheet, 1000);
    if (state.step >= state.ans.length) {
      //Win!
      handleGameOver();
    } else {
      state.reseting = true;
      state.fillTheGaps(
        state.ans[state.step - 1].zeroesEncountered,
        state.ans[state.step - 1].type
      );
      setTimeout(generateEmptyArr, 1000);
      setTimeout(handleRestartClick, 1000);
      playCorrectSound();
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
      let lostLife3 = document.getElementById("l3");
      lostLife3.style.display = "none";
      loseSound(); // play lose sound
      state.loseGame = true;
    }
  }
}

function CreateMap(arrOuter) {
  //Maps user entered array
  const style = useStyles();

  const submitBox = {
    display: "flex",
    width: 50,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    margin: 10,
    background: state.feedbackColor,
  };

  const handleFeedbackColor = () => {
    //if user input of array is correct
    if (arrComp(state.ans[state.step].array, state.input)) {
      //set state of background colour to green on submit
      state.feedbackColor = "rgba(0, 255, 0, 0.6)";
    } else {
      // set state of background colour to red on submit
      state.feedbackColor = "rgba(255, 0, 0, 0.6)";
    }
  };

  let [openModal, setOpenModal] = useState(false);

  const handleGameOver = () => {
    state.gameOver = true;
    setOpenModal(true);
    generateEmptyArr();
    state.step = 1;
    state.instruct = 0;
    winSound();
  };

  return (
    <>
      <div className={style.stylesContainerOuter}>
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
      </div>
    </>
  );
}

function SubmitBoxes() {
  let arr = state.input;

  return <div style={stylesMainInner}>{CreateMap(arr)}</div>;
}

export default view(SubmitBoxes);
