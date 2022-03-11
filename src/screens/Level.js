import { makeStyles, Button, Grow } from "@material-ui/core";
import Piano from "../components/Piano";
import InputContainer from "../components/InputContainer";
import state from "../store/Store";
import Sheet from "../components/Sheet";
import PopUp from "../components/InstructionPopup";
import { useParams } from "react-router-dom";
import LoseScreen from "../components/LoseScreen";
import { view } from "@risingstack/react-easy-state";
import Lives from "../components/Lives";

import backBtn from "../assets/back.svg";
import { mergeSort } from "../algorithms/mergesort";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Raleway",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "grey",
    zindex: 10,
  },
  // not complete yet
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    fontSize: "30px",
    backgroundColor: "black",
    padding: "10px",
  },
  title: {
    flex: "2",
    flexGrow: "15",
  },
  navbarBackBtn: {
    image: backBtn,
    flex: "1",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: "8px",
    marginRight: "20px",
    flexDirection: "row",
    flexGrow: "1",
  },

  lives: {
    marginRight: "20px",
  },
  thirdBox: {
    flex: "3",
    flexGrow: "1",
  },
  musicSheet: {
    height: "50%",
    backgroundColor: "grey",
    display: "flex",
    overflow: "auto",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 20,
  },
  inputContainer: {
    backgroundColor: "grey",
  },
  piano: {
    backgroundColor: "black",
    flexGrow: 1,
    paddingBottom: 20,
  },
}));

function Level() {
  const style = useStyles();
  let params = useParams();
  let level = parseInt(params.level);

  state.level = level;

  useEffect(() => {
    if (state.restartGame) {
      state.resetStates();
      state.handleLevel(level);
      mergeSort([
        ...state.random(state.levelMin, state.levelMax, state.levelLength),
      ]);
      state.generateEmptyArr();
      state.initializeSplit();
      state.initializeSheets();
      state.restartGame = false;
    }
  }, [state.restartGame]);

  return (
    <>
      {(() => {
        if (!state.restartGame) {
          if (state.loseGame) {
            return <LoseScreen />;
          } else {
            return (
              <div className={style.container}>
                {(state.level === 1 || state.level === 2) &&
                state.loseGame === false ? (
                  <PopUp />
                ) : null}
                <div className={style.navbar}>
                  {/* TEMPORARY COMMENTS! DONT DELETE */}
                  {
                    <div className={style.navbarBackBtn}>
                      <a href="/">
                        <img src={backBtn} />
                      </a>
                    </div>
                  }
                  <div className={style.title}>
                    Level {params.level} - Merge Sort
                  </div>
                  {/* <div className={style.lives}>
            <Lives />
          </div> */}
                  <div className={style.thirdBox}></div>
                </div>
                <div className={style.musicSheet}>
                  <Sheet />
                </div>
                <div className={style.inputContainer}>
                  <InputContainer />
                </div>
                <div className={style.piano}>
                  <Piano />
                </div>
              </div>
            );
          }
        } else if (!state.loseGame) {
          return <div>Loading</div>;
        }
      })()}
    </>
  );
}

export default view(Level);
