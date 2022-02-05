import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import state from "../store/Store";

let rowSplit = 0;
let rowMerge = 0;

let prevSizeSplit = 0;
let prevSizeMerge = 0;

let tripleEqual = 0;

export function generateEmptyArr() {
  state.input = [];
  for (let i = 0; i < state.ans[state.step + 1].array.length; i++) {
    state.input.push(0);
  }
}
const random = (min, max) => {
  let num = [];
  for (let i = 0; i < 10; i++) {
    num.push(Math.floor(Math.random() * (max - min) + min));
  }
  return num;
};
function initializeSheets() {
  let depth = state.depth;

  //Fill sheetSplit
  let temp = [];
  for (let i = 0; i < depth; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetSplit.push(temp);
  }

  //Fill sheetMerge
  for (let i = 0; i < depth - 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].length; j++) {
      temp.push(0);
    }
    state.sheetMerge.push(temp);
  }
}

function handleClick(level) {
  switch (level) {
    case 1:
      console.log("level 1");
      break;
    case 2:
      console.log("level 2");
      break;
    case 3:
      mergeSort([...random(1, 10)]);
      generateEmptyArr();
      initializeSheets();
      break;
    default:
  }
}

function merge(left, right) {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  if (arr.length < prevSizeMerge) {
    rowMerge++;
  } else if (arr.length > prevSizeMerge) {
    //Should return 2 if given 4
    let x = parseInt(Math.log(arr.length) / Math.log(2));
    rowMerge = rowMerge - x;
  }

  let rowObj = {
    array: [...arr, ...left, ...right],
    row: rowMerge,
    type: "merge",
  };

  state.ans.push(rowObj);
  state.runnable = 0;

  prevSizeSplit = arr.length;
  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
}

//SPLIT
function mergeSort(array) {
  if (array.length < prevSizeSplit) {
    rowSplit++;
  } else if (array.length > prevSizeSplit && rowSplit > 0) {
    //Should return 2 if given 4
    let x = parseInt(Math.log(array.length) / Math.log(2));
    rowSplit = rowSplit - x;
  } else {
    if (array.length === 1 && !tripleEqual) {
      tripleEqual = 1;
    }
    if (tripleEqual === array.length) {
      //Special case >>apend to current index and prev index at nearest 0
      tripleEqual = 0;
    }
  }

  if (state.runnable) {
    state.depth++;
  }

  let rowObj = { array: [...array], row: rowSplit, type: "split" };

  const half = Math.ceil(array.length / 2);

  state.ans.push(rowObj);
  // Base case or terminating case
  prevSizeSplit = array.length;
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}
export default function Home() {
  return (
    <div>
      HOME SCREEN
      <div>
        <Link to="/app">
          <Button
            variant="contained"
            onClick={() => {
              handleClick(3);
            }}
            sx={{
              backgroundColor: "#3D3D3D",
              height: "50px",
              width: "250px",
            }}
          >
            This goes to App.js
          </Button>
        </Link>
      </div>
    </div>
  );
}
