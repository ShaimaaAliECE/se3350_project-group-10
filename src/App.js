import "./App.css";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import Piano from "./components/Piano";
import LoseScreen from "./components/LoseScreen.js";
import { Link } from "react-router-dom";
import InputContainer from "./components/InputContainer";
import state from "./store/Store";

function App() {
  console.log(state.sheet);
  return (
    <div>
      <InputContainer />
      <Piano />
    </div>
  );
}

export default App;
