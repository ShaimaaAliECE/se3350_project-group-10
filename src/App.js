import "./App.css";
import "./index.css";
import { makeStyles } from "@material-ui/core";
import Piano from "./components/Piano";
import InputContainer from "./components/InputContainer";
import Sheet from "./components/Sheet";
import state from "./store/Store";
import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "grey",
    overflow: "hidden",
  },
  navbar: {
    color: "white",
    textAlign: "center",
    fontSize: "30px",
    height: "5%",
    backgroundColor: "black",
  },
  musicSheet: {
    height: "60%",
    backgroundColor: "grey",
    display: "flex",
  },
  inputContainer: {
    height: "10%",
    backgroundColor: "grey",
  },
  piano: {
    height: "25%",
    backgroundColor: "black",
  },
}));

function App() {
  const style = useStyles();

  return (
    <div className={style.container}>
      <div className={style.navbar}>Level 1 - Merge Sort</div>
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

export default App;
