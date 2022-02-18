import "./App.css";
import "./index.css";
import { makeStyles } from "@material-ui/core";
import Piano from "./components/Piano";
import InputContainer from "./components/InputContainer";
import Sheet from "./components/Sheet";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "grey",
  },
  navbar: {
    color: "white",
    textAlign: "center",
    padding: 10,
    fontSize: "30px",
    backgroundColor: "black",
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
  }
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
