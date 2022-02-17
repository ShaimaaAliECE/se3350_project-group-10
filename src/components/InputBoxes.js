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

function chunk(array, limit) {
  const chunks = Math.ceil(array.length / limit);
  return Array.from({ length: chunks }, (_, i) =>
    array.slice(
      Math.ceil((i * array.length) / chunks),
      Math.ceil(((i + 1) * array.length) / chunks)
    )
  );
}

function CreateMap(arrOuter, row) {
  //Maps user entered array
  let index;

  for (let i in arrOuter) {
    if (
      state.ans[state.step].row === row ||
      state.ans[state.step].row + state.depth + 1 === row
    ) {
      //length of desired array
      let length = state.ans[state.step].array.length;
      //If the length of the array is equal to the desired step array and a 0 exists in the array, set the index to this array
      // console.log(
      //   "currentArray:" + arrOuter[i],
      //   "currentLength: " + arrOuter[i].length,
      //   "desiredLength: " + length,
      //   "firstZeroIndex: " + state.firstZeroFinder1D(arrOuter[i])
      // );
      if (
        Math.abs(length - arrOuter[i].length) <= 1 &&
        state.firstZeroFinder1D(arrOuter[i]) > -1
      ) {
        index = i;
        break;
      }
    }
  }
  const style = useStyles();
  //If the current step answer row is equal to current row
  let i = -1;
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
  let arr = props.arrObj.array;
  let row = props.arrObj.row;
  let indRef = props.indRef;
  let divisor;
  if (state.step !== 0 && state.splits[indRef] !== 0) {
    divisor = Math.round(
      state.ans[0].array.length / (2 * state.splits[indRef])
    );
  } else {
    divisor = state.ans[0].array.length;
  }
  return (
    <div id={row} style={stylesMainInner}>
      {CreateMap(chunk(arr, divisor), row)}
    </div>
  );
}

export default view(InputBoxes);
