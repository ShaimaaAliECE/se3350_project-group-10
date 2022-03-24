import { makeStyles } from "@material-ui/core";
import React from "react";
import state from "../store/Store";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  stylesContainerOuter: {
    display: "flex",
    flexDirection: "row",
    // flexShrink: 1,
    overflow: "hidden",
  },

  stylesContainerInner: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "black",
    margin: 15,
    // flexShrink: 1,
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
  let mergeInd;
  let i = -1;
  let j = -1;
  let type = state.ans[state.step].type;

  if (type === "merge") {
    stepRow = state.ans[state.step].row + state.depth;
  } else {
    stepRow = state.ans[state.step].row;
  }

  if (stepRow === row) {
    if (type === "merge") {
      index = state.firstZeroFinder2D([...state.sheet[0][row].array]);
      mergeInd = state.sheet[0][row].array[index].indexOf(0);
    } else {
      index = state.firstZeroFinder({ array: [...arrOuter] });
    }
  }

  return (
    <div className={style.stylesContainerOuter}>
      {arrOuter.map(function (arrInner) {
        i++;
        j = -1;
        return (
          <div className={style.stylesContainerInner}>
            {arrInner.map(function (arrObj) {
              j++;
              return (
                <div
                  className={style.box}
                  style={
                    (i == index && j === mergeInd) ||
                    (i == index && type == "split")
                      ? {
                          borderColor: "black",
                          backgroundColor: "rgba(0,0,0,0.5)",
                        }
                      : null
                  }
                >
                  {arrObj === 0 ? "" : arrObj}
                </div>
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
