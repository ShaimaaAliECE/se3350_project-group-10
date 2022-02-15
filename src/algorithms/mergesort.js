import state from "../store/Store";

let rowSplit = 0;
let rowMerge = -1;
let prevSizeSplit = 0;
let prevSizeMerge = 0;
let tripleEqual = 0;
let reachedDepth = 0;

let x;

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

  //If the array has grown in size while merging
  if ([...arr, ...left, ...right].length > prevSizeMerge) {
    //If we increase, for sure increase
    rowMerge++;

    //If the merged array is smaller than the previous array
  } else if (
    [...arr, ...left, ...right].length === prevSizeMerge ||
    [...arr, ...left, ...right].length + 1 === prevSizeMerge
  ) {
  } else {
    let y = Math.floor(
      Math.log([...arr, ...left, ...right].length) / Math.log(2)
    );

    rowMerge = rowMerge - y - 1;
  }

  let rowObj = {
    array: [...arr, ...left, ...right],
    row: rowMerge,
    type: "merge",
    zeroesEncountered: state.zeroesEncountered,
  };

  state.ans.push(rowObj);

  state.runnable = 0;
  prevSizeMerge = [...arr, ...left, ...right].length;

  return [...arr, ...left, ...right];
}

//SPLIT
export function mergeSort(array) {
  //If the length of the array has shrunk since last check
  if (array.length < prevSizeSplit) {
    rowSplit++;
    tripleEqual = 0;
    //If the array has grown and has split more than once (is not the original)
  } else if (array.length > prevSizeSplit && rowSplit > 0) {
    //Should return 2 if given 4
    x = Math.floor(Math.log(array.length) / Math.log(2));
    if (rowSplit === state.depth && !state.runnable) {
      x++;
      reachedDepth = true;
    }

    rowSplit = rowSplit - x;

    if (reachedDepth) {
      x--;
    }

    tripleEqual = 0;
    //If the array has been the same length 3 times >> Do this after even arrays work
  } else {
    if (array.length === prevSizeSplit && !tripleEqual) {
      tripleEqual = 1;
    } else if (tripleEqual === array.length && array.length === prevSizeSplit) {
      //Special case >>apend to current index and prev index at nearest 0
      rowSplit--;
      //Append to row previous
      tripleEqual = 0;
    }
  }

  if (array.length === 1) {
    state.runnable = 0;
    state.zeroesEncountered++;
  }

  if (state.runnable === 1) {
    state.depth++;
  }

  let rowObj = {
    array: [...array],
    row: rowSplit,
    type: "split",
    zeroesEncountered: state.zeroesEncountered,
  };

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
