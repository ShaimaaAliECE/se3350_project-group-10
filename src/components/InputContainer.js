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
import Lives from "../components/Lives";

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
    display: "flex",
    flexDirection: "row",
  },
}));

function InputContainer() {
  const style = useStyles();

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
    state.step = 0;
    state.instruct = 0;
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
          <p
            style={{
              backgroundColor: "#f2f2f2",
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
      <div className={style.stylesMainOuter}>
        {state.level != 1 ? (
          <div className={style.container}>
            <SubmitBoxes />
            <div className={style.lives}>
              <Lives />
            </div>
          </div>
        ) : (
          <div className={style.fillerSpace}>
            <Button
              variant="contained"
              className={style.nextBtn}
              onClick={() => {
                if (state.ans[state.step].type == "merge") {
                  state.input = [
                    state.ans[state.step].array[state.mergePointer],
                  ];
                } else {
                  if (state.instruct < state.ans.length) {
                    state.instruct++;
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
