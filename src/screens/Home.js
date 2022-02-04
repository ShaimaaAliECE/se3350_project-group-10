import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import state from "../store/Store";

const random = (min, max) => {
  // for (let i = 0; i < 10; i++) {

  //   // let num = Math.floor(Math.random() * (max - min) + min);
  //   state.input[i] = 0;
  //   state.sheet[0].push(num);
  // }
  let num = [2, 8, 3, 6, 4, 1, 12, 2, 6, 3];
  state.sheet[0] = num;
};

function handleClick(level) {
  switch (level) {
    case 1:
      console.log("level 1");
      break;
    case 2:
      console.log("level 2");
      break;
    case 3:
      random(1, 20);
      mergeSort(state.sheet[0]);
      break;
    default:
  }
}
function merge(left, right) {
  let sortedArr = []; // the sorted elements will go here

  while (left.length && right.length) {
    // insert the smallest element to the sortedArr
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

function mergeSort(arr) {
  const half = arr.length / 2;
  // the base case is array length <=1
  if (arr.length <= 1) {
    return arr;
  }

  const left = arr.splice(0, half); // the first half of the array
  const right = arr;
  return merge(mergeSort(left), mergeSort(right));
}
export default function Home() {
  return (
    <div>
      HOME SCREEN
      <div>
        <Link to="/app">
          <Button
            variant="contained"
            onClick={() => handleClick(3)}
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
