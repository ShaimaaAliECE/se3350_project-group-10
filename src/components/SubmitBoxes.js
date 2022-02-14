import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";

import {
  playCorrectSound,
  playIncorrectSound,
  winSound,
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




function CreateMap(arrOuter) {
  //Maps user entered array

  const style = useStyles();
  const [feedback, setFeedback] = useState('rgba(220,220,220, .6');

  function handleRestartClick(handleGameOver) {
    //Set the store state back to empty
    let len = state.input.length;

    for (let i = 0; i < len; i++) {
      state.input[i] = 0;
    }
    setFeedback("rgba(220,220,220, .6)");
  }

  function generateEmptyArr() {
    state.input = [];
    for (let i = 0; i < state.ans[state.step]?.array.length; i++) {
      state.input.push(0);
    }
    setFeedback("rgba(220,220,220, .6)");
  }


  function handleSubmitClick(
    handleClickOpenFail,
    handleClickOpenWin,
    handleGameOver,

  ) {
    //Check the answer, if its right --> increment step, handle restart, state.sheet.push(state.input)
    if (arrComp(state.ans[state.step].array, state.input)) {
      state.appendSheet(
        state.ans[state.step].type,
        state.input,
        state.ans[state.step].row,

      );

      state.stepInc();
      if (state.step >= state.ans.length) {
        //Win!
        handleGameOver();
      } else {
        setTimeout(generateEmptyArr, 2000);
        setTimeout(handleRestartClick, 2000);
        playCorrectSound();
        setTimeout(handleClickOpenWin, 2000)
        handleClickOpenWin();
      }

    } else {
      state.lives--;

      // handleRestartClick();
      setTimeout(handleRestartClick, 2000);
      playIncorrectSound();
      handleClickOpenFail();

    }
  }



  const submitBox = {

    display: "flex",
    width: 50,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    margin: 10,
    background: feedback,
  };


  const handleFeedbackColor = () => {
    //if user input of array is correct
    if (arrComp(state.ans[state.step].array, state.input)) {

      //set state of background colour to green on submit 
      setFeedback('rgba(0, 255, 0, 0.6)');

    } else {
      // set state of background colour to red on submit
      setFeedback('rgba(255, 0, 0, 0.6)');
      console.log("one or more inputs are incorrect!");
    }


  }


  const [openFail, setOpenFail] = useState(false);
  const [openWin, setOpenWin] = useState(false);
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
      <div className={style.stylesContainerOuter}>
        {arrOuter.map((arrInner) => (
          <div className={style.stylesContainerInner}>
            {arrInner.map((arrObj) => (
              <div
                style={submitBox}
              >
                {arrObj === 0 ? "" : arrObj}
              </div>
            ))}
          </div>
        ))
        }
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
              handleFeedbackColor();
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
        </div >
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
      </div>
    </>
  );
}

let ind = 0;

function SubmitBoxes(props) {
  let arr = props.array ? props.array : state.input;

  let divisor;

  if (ind + 1 === state.splits.length) {
    ind = 0;
  }

  if (state.step !== 0 && props.array && state.splits[ind] != 0) {
    divisor = Math.round(state.ans[0].array.length / (2 * state.splits[ind]));
  } else {
    divisor = state.ans[0].array.length;
  }

  ind++;

  return <div style={stylesMainInner}>{CreateMap(chunk(arr, divisor))}</div>;
}

export default view(SubmitBoxes);