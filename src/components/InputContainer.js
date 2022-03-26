import { makeStyles, Button } from "@material-ui/core";
import React from "react";
import { view } from "@risingstack/react-easy-state";
import { handleSubmitClick } from "./SubmitBoxes";
import SubmitBoxes from "./SubmitBoxes";
import state from "../store/Store";
import { generateEmptyArr } from "./SubmitBoxes";
import { winSound } from "../assets/tones.js";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import { AppendDatabase } from "../firebase/functions";

const useStyles = makeStyles((theme) => ({
  stylesMainOuter: {
    fontFamily: "Raleway",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fillerSpace: {
    display: "flex",
    flexDirection: "row",
    height: "100px",
  },
  nextBtn: {
    margin: "23px",
    width: "100px",
    height: "50px",
    borderRadius: "15px",
    backgroundColor: "#f2f2f2",
  },
  lives: {
    position: "absolute",
    justifyContent: "flex-end",
    right: 10,
  },
  container: {
    display: "inline-block",
    justifyContent: "center",
    maxWidth: "90%",
  },
}));

function InputContainer() {
  const style = useStyles();

  let [openModal, setOpenModal] = useState(false);

  const handleGameOver = () => {
    localStorage.setItem("livesLeft", state.lives);
    localStorage.setItem("livesLeft", state.lives);
    localStorage.setItem("time", state.timer);

    AppendDatabase(
      localStorage.getItem("algo"),
      localStorage.getItem("level"),
      localStorage.getItem("attempts"),
      localStorage.getItem("time"),
      localStorage.getItem("livesLeft")
    );
    state.gameOver = true;
    setOpenModal(true);
    generateEmptyArr();
    state.step = 1;
    state.instruct = 0;
    state.isActive = false;
    winSound();
  };

  return (
    <>
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
              Time: {state.timer} s
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

      <div className={style.stylesMainOuter}>
        {state.level !== 1 ? (
          <div className={style.container}>
            <SubmitBoxes />
          </div>
        ) : (
          <div className={style.fillerSpace}>
            <Button
              variant="contained"
              className={style.nextBtn}
              onClick={() => {
                state.instruct++;
                if (state.ans[state.step].type == "merge") {
                  state.input = [
                    state.ans[state.step].array[state.mergePointer],
                  ];
                } else {
                  if (state.instruct < state.ans.length) {
                  }
                  state.input = state.ans[state.step].array;
                }
                handleSubmitClick(handleGameOver);
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default view(InputContainer);
