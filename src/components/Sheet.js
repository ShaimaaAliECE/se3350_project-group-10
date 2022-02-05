import React from "react";

import { Button, makeStyles } from "@material-ui/core";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

import InputBoxes from "./InputBoxes";

// add scroll css to container (filled with multiple  groups of lines)
const useStyles = makeStyles(() => ({
  container: {
    flex: "auto",
    justifyContent: "space-between",
    background: "white",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.3)",
    color: "white",
    height: 500,
    width: 980,
    marginTop: 80,
    marginLeft: 150,
    overflow: "scroll",
    position: "relative",
  },
  lines: {
    borderBottom: 15,
    color: "black",
  },
  lineRow: {
    flex: "auto",
    marginTop: 50,
  },
  square: {
    display: "flex",
    width: 50,
    height: 50,
    flexDirection: "row",
    margin: 10,
    background: "rgba(220,220,220, .6)",
    textAlign: "center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  stylesContainerInner: {
    display: "flex",
    flexDirection: "column",
  },
}));

//creating function component sheet
//include Lines as component

function Sheet() {
  const style = useStyles();
  return (
    <>
      <div className={style.container}>
        <MainArray />
      </div>
    </>
  );
}

//creating function component lines
function Lines() {
  const style = useStyles();

  return (
    <div className={style.lineRow}>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
      <hr className={style.lines}></hr>
    </div>
  );
}

// function component to display input array and appended chunks of array
function MainArray() {
  const style = useStyles();

  state.sheetSplit[0] = state.ans[0].array;
  let arr = [...state.sheetSplit, ...state.sheetMerge];

  return (
    <div>
      <div className={style.stylesContainerInner}>
        {arr.map((arrObj) => (
          <div>
            <Lines />
            <InputBoxes array={arrObj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default view(Sheet);
