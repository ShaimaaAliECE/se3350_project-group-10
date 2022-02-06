import state from "../store/Store";

let rowSplit = 0;
let rowMerge = 0;
let prevSizeSplit = 0;
let prevSizeMerge = 0;
let tripleEqual = 0;

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

  return [...arr, ...left, ...right];
}

//SPLIT
export function mergeSort(array) {
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
