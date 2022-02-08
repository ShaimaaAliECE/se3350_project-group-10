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
    height: 400,
    width: 980,
    margin: "auto",
    marginTop: 20,
    overflow: "auto",
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
  const styles = useStyles();
  state.sheetSplit[0] = state.ans[0].array;
  let arr = [...state.sheetSplit, ...state.sheetMerge];
  console.log(arr);
  return (
    <div className={styles.container}>
      <div className={styles.stylesContainerInner}>
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

export default view(Sheet);
