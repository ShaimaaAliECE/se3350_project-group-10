import { makeStyles, Button, Grow } from "@material-ui/core";
import Piano from "../components/Piano";
import InputContainer from "../components/InputContainer";
import state from "../store/Store";
import Sheet from "../components/Sheet";
import PopUp from "../components/InstructionPopup";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import LoseScreen from "../components/LoseScreen";
import Timer from "../components/Timer";
import { view } from "@risingstack/react-easy-state";
import backBtn from "../assets/back.svg";
import { mergeSort } from "../algorithms/mergesort";
import { useEffect } from "react";
import { Lives } from "../components/Lives";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@material-ui/core";
import Navbar from "../components/NavBar";

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
  iconBtn: {
    color: "white",
    "&:hover": { color: "#38c6d9" },
    paddingRight: 0,
  },
  title: {
    fontSize: 20,
  },
  musicSheet: {
    height: "50%",
    width: "100%",
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

  let navigate = useNavigate();

  useEffect(() => {
    console.log("ping");
    if (state.timeout > 300) {
      console.log("GOING");
      navigate("/", { replace: true });
    }
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
  }, [state.restartGame, state.timeout]);

  if (level != 5) {
    style.innerHTML = `.html::-webkit-scrollbar {display: none;}`;
  }

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

              <Navbar />

              <div className={style.musicSheet}>
                <Sheet />
              </div>
              <div className={style.inputContainer}>
                <InputContainer />
              </div>
              <div className={style.piano}>
                <Piano level={level} />
                {/* <div style={{}}>
                  <Lives />
                </div> */}
              </div>
            </div>
          );
        }
      })()}
    </>
  );
}

export default view(Level);
