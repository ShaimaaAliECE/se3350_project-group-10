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

function chunk(array, row, indRef) {
  let divisor;
  let temp = [];
  if (state.splits[indRef] !== 0) {
    divisor = Math.round(
      state.ans[0].array.length / (2 * state.splits[indRef])
    );
  } else {
    divisor = state.ans[0].array.length;
  }
  const chunks = Math.ceil(array.length / divisor);
  let arr = Array.from({ length: chunks }, (_, i) =>
    array.slice(
      Math.ceil((i * array.length) / chunks),
      Math.ceil(((i + 1) * array.length) / chunks)
    )
  );

  if (divisor === 3) {
    state.flags = [];
    for (let i in arr) {
      if (arr[i].length === 3) {
        state.flags.push(1);
      } else {
        state.flags.push(0);
      }
    }
  } else if (divisor === 2) {
    for (let i in state.flags) {
      //Store last chunk from split, refer to it instead of state.sheet.. index like below still
      if (state.flags[i] === 1) {
        temp.push([state.lastChunk[i][0], state.lastChunk[i][1]]);
        temp.push([state.lastChunk[i][2]]);
      } else {
        //push next array of arrays
        temp.push([state.lastChunk[i][0], state.lastChunk[i][1]]);
      }
    }
  }
  if (temp.length) {
    return [...temp];
  } else {
    return [...arr];
  }
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

  console.log(arr);

  let chunked = chunk(arr, row, indRef);
  state.lastChunk = chunked;

  return (
    <div id={row} style={stylesMainInner}>
      {CreateMap(chunked, row)}
    </div>
  );
}

export default view(InputBoxes);
