import "./App.css";
import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import Piano from "./components/Piano";
import LoseScreen from "./components/LoseScreen.js";
import { Link } from "react-router-dom";
import InputContainer from "./components/InputContainer";

function App() {
  return (
    <div>
      <InputContainer />
      <Piano />
    </div>
  );
}

export default App;
