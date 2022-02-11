import { makeStyles, Button } from "@material-ui/core";
import React from "react";
import state from "../store/Store";
import InputContainerButtons from "./InputContainerButtons";
import InputBoxes from "./InputBoxes";
import { view } from "@risingstack/react-easy-state";
import levelone from "../assets/level-one.json";

// //importing level 1 instructions
// const levelOne = require("../assets/level-one.json");

const useStyles = makeStyles((theme) => ({
  stylesMainOuter: {
    fontFamily: "Raleway",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fillerSpace: {
    display: "flex",
    flexDirection: "row",
    height: "100px",
  },
  nextBtn: {
    margin: "23px",
    width: "100px",
    height: "50px",
    borderRadius: "15px",
  },
}));

function InputContainer() {
  const style = useStyles();

  return (
    <div className={style.stylesMainOuter}>
      {state.level != 1 ? (
        <InputBoxes />
      ) : (
        <div className={style.fillerSpace}>
          <Button
            variant="contained"
            className={style.nextBtn}
            onClick={() => {
              state.instruct = state.instruct + 1;
            }}
          >
            Next
          </Button>
        </div>
      )}
      {state.level != 1 ? <InputContainerButtons /> : null}
    </div>
  );
}

export default view(InputContainer);
