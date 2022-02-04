import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import state from "../store/Store";

const random = (min, max) => {
  for (let i = 0; i < 10; i++) {
    let num = Math.floor(Math.random() * (max - min) + min);
    state.sheet[0].push(num);
  }
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
      mergeSort(state.sheet[0], 0, state.sheet[0].length - 1);
      break;
    default:
  }
}
let step = 1;
function merge(arr, start, mid, end) {
  let start2 = mid + 1;
  console.log("INCREMENT STEP");
  step++;
  // If the direct merge is already sorted
  if (arr[mid] <= arr[start2]) {
    return;
  }

  // Two pointers to maintain start
  // of both arrays to merge
  while (start <= mid && start2 <= end) {
    // If element 1 is in right place
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let value = arr[start2];
      let index = start2;

      // Shift all the elements between element 1
      // element 2, right by 1.
      while (index != start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;

      // Update all the pointers
      start++;
      mid++;
      start2++;
    }
  }
}

function mergeSort(arr, l, r) {
  console.log(
    "step",
    step,
    arr.slice(0, arr.length / step),
    arr.slice(arr.length / step, arr.length)
  );
  if (l < r) {
    // Same as (l + r) / 2, but avoids overflow
    // for large l and r
    let m = l + Math.floor((r - l) / 2);

    // Sort first and second halves
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);

    merge(arr, l, m, r);
  }
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
