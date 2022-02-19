import { makeStyles, Button } from "@material-ui/core";
import Piano from "../components/Piano";
import InputContainer from "../components/InputContainer";
import state from "../store/Store";
import Sheet from "../components/Sheet";
import PopUp from "../components/InstructionPopup";
import { useParams } from "react-router-dom";
import LoseScreen from "../components/LoseScreen";
import { view } from "@risingstack/react-easy-state";
import Lives from "../components/Lives";
import { Link } from "react-router-dom";

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
  title: {},
  navbarBackBtn: {
    backgroundColor: "white",
    marginLeft: "20px",
  },
  lives: {
    marginRight: "20px",
  },
  // ^^^
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
  return (
    <>
      {state.loseGame ? (
        <LoseScreen />
      ) : (
        <div className={style.container}>
          {(state.level === 1 || state.level === 2) &&
          state.loseGame === false ? (
            <PopUp />
          ) : null}
          <div className={style.navbar}>
            {/* TEMPORARY COMMENTS! DONT DELETE */}
            {/* <div className={style.navbarBackBtn}>
              <Link to="/">
                <Button>back</Button>
              </Link>
            </div> */}
            <div className={style.title}>Level {params.level} - Merge Sort</div>
            {/* <div className={style.lives}>
              <Lives />
            </div> */}
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
      )}
    </>
  );
}

export default view(Level);
