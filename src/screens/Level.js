import { makeStyles, Button, Grow } from "@material-ui/core";
import Piano from "../components/Piano";
import InputContainer from "../components/InputContainer";
import state from "../store/Store";
import Sheet from "../components/Sheet";
import PopUp from "../components/InstructionPopup";
import { useParams } from "react-router-dom";
import LoseScreen from "../components/LoseScreen";
import Timer from "../components/Timer";
import { view } from "@risingstack/react-easy-state";
import { Link } from "react-router-dom";
import backBtn from "../assets/back.svg";
import { mergeSort } from "../algorithms/mergesort";
import { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Raleway",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#111111",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    backgroundColor: "black",
    padding: "10px",
    paddingRight: 20,
    paddingLeft: 20,
  },
  navbarInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  musicSheet: {
    height: "50%",
    display: "flex",
    overflow: "auto",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 20,
  },
  inputContainer: {},
  piano: {
    backgroundColor: "black",
    flexGrow: 1,
    paddingBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Level() {
  const style = useStyles();
  let params = useParams();

  let level = parseInt(params.level);
  localStorage.setItem("level", level);
  localStorage.setItem("algo", "merge_sort");

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
          return (
            <div className={style.container}>
              {(state.level === 1 || state.level === 2) &&
              state.loseGame === false ? (
                <PopUp />
              ) : null}

              {/* Lose Screen Popup Section */}
              {state.loseGame === true ? <LoseScreen /> : null}

              <div className={style.navbar}>
                {
                  <div>
                    <a href="/">
                      <div className={style.navbarInner}>
                        <IconButton style={{ paddingRight: 0 }}>
                          <ArrowBackIosNewIcon style={{ color: "#38c6d9" }} />
                        </IconButton>
                        <img alt="back" style={{ width: 35 }} src={backBtn} />
                      </div>
                    </a>
                  </div>
                }
                <div className={style.title}>
                  Level {params.level} - Merge Sort
                </div>
                <Timer />
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
      })()}
    </>
  );
}

export default view(Level);
