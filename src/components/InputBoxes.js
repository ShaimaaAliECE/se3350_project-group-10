import { makeStyles } from "@material-ui/core";
import React from "react";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  stylesContainerOuter: {
    display: "flex",
    flexDirection: "row",
  },

  stylesContainerInner: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "black",
    margin: 15,
  },
  box: {
    display: "flex",
    width: 50,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    margin: 10,
    background: "rgba(220,220,220, 1)",
  },
}));

const stylesMainInner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export function CreateMap(arrOuter, row) {
  const style = useStyles();

  //Set an index if the row should be highlighted
  let index;
  let stepRow;
  let i = -1;
  if (state.ans[state.step].type === "merge") {
    stepRow = state.ans[state.step].row + state.depth;
  } else {
    stepRow = state.ans[state.step].row;
  }
  if (stepRow === row) {
    index = state.firstZeroFinder({ array: [...arrOuter] });
  }

  return (
    <div className={style.stylesContainerOuter}>
      {arrOuter.map(function (arrInner) {
        i++;
        return (
          <div
            className={style.stylesContainerInner}
            style={
              i == index ? { backgroundColor: "grey", borderRadius: 10 } : null
            }
          >
            {arrInner.map(function (arrObj) {
              return (
                <div className={style.box}>{arrObj === 0 ? "" : arrObj}</div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function InputBoxes(props) {
  let arr = props.arrInnerObj.array;
  let row = props.arrInnerObj.row;

  //no more chunk, change to arr
  return (
    <div id={row} style={stylesMainInner}>
      {CreateMap(arr, row)}
    </div>
  );
}

export default view(InputBoxes);
