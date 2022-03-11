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
import { Link } from "react-router-dom";
import backBtn from "../assets/back.svg";

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
      <div className={style.container}>
        {/* Instruction Section */}
        {(state.level === 1 || state.level === 2) &&
        state.loseGame === false ? (
          <PopUp />
        ) : null}

        {/* Lose Screen Popup Section */}
        {state.loseGame === true ? <LoseScreen /> : null}

        {/* Navbar Secition*/}
        <div className={style.navbar}>
          {/* TEMPORARY COMMENTS! DONT DELETE */}
          {
            <div className={style.navbarBackBtn}>
              <Link to="/">
                <img src={backBtn} />
              </Link>
            </div>
          }
          <div className={style.title}>Level {params.level} - Merge Sort</div>
        </div>

        {/* Music Sheet Section*/}
        <div className={style.musicSheet}>
          <Sheet />
        </div>

        {/* Input Container Section */}
        <div className={style.inputContainer}>
          <InputContainer />
        </div>

        {/* Piano Section */}
        <div className={style.piano}>
          <Piano />
        </div>
      </div>
    </>
  );
}

export default view(Level);
