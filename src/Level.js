import { makeStyles } from "@material-ui/core";
import Piano from "../components/Piano";
import InputContainer from "../components/InputContainer";
import state from "../store/Store";
import Sheet from "../components/Sheet";
import PopUp from "../components/InstructionPopup";
import { useParams, useNavigate } from "react-router-dom";
import LoseScreen from "../components/LoseScreen";
import { view } from "@risingstack/react-easy-state";
import { mergeSort } from "../algorithms/mergesort";
import { useEffect } from "react";
import { Lives } from "../components/Lives";
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
  title: {
    fontSize: 20,
  },
  musicSheet: {
    height: "50%",
    width: "100%",
    paddingTop: 20,
  },
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
    if (state.timeout > 300) {
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
                {state.level != 1 ? (
                  <div
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "70%",
                    }}
                  >
                    <Lives />
                  </div>
                ) : null}
                <Piano level={level} />
              </div>
            </div>
          );
        }
      })()}
    </>
  );
}

export default view(Level);
