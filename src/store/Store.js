import { store } from "@risingstack/react-easy-state";

function firstZeroFinder(index, arr, type = "split") {
  for (let i = 0; i < arr[index].array.length; i++) {
    if (arr[index].array[i] === 0) {
      if (type === "merge" && state.maxMergLen < i) {
        state.maxMergLen = i;
      }
      return i;
    }
  }
}
function firstZeroFinder1D(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      return i;
    }
  }
  return -1;
}

function appendSheet(move, array, row) {
  //If move is merge
  if (move === "merge") {
    state.sheetMerge[row].array.splice(
      firstZeroFinder(row, state.sheetMerge, "merge"),
      array.length,
      ...array
    );
  }

  //Otherwise move is split
  else {
    state.sheetSplit[row].array.splice(
      firstZeroFinder(row, state.sheetSplit),
      array.length,
      ...array
    );
  }
}

function fillGapsArr(start, end) {
  let arr = [];

  for (let i = 0; i < end - start; i++) {
    arr.push("x");
  }

  return arr;
}

function fillTheGaps(zeroesEncountered, type) {
  if (type === "merge") {
    for (let i = 0; i < state.depth - 2; i++) {
      firstZeroFinder(i, state.sheetMerge, "merge");
    }

    let firstZero = firstZeroFinder(0, state.sheetMerge, "merge");
    state.sheetMerge[0].array.splice(
      firstZero,
      state.maxMergLen - firstZero,
      ...fillGapsArr(firstZero, state.maxMergLen)
    );
  } else {
    let firstZero = firstZeroFinder(state.depth - 1, state.sheetSplit);

    state.sheetSplit[state.depth - 1].array.splice(
      firstZero,
      zeroesEncountered - firstZero,
      ...fillGapsArr(firstZero, zeroesEncountered)
    );
  }
}

function chunk(array) {
  let divisor;
  let temp = [];
  state.indRef++;
  if (state.splits[state.indRef] !== 0) {
    divisor = Math.round(
      state.ans[0].array.length / (2 * state.splits[state.indRef])
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

  console.log("flags", state.flags);
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
      if (state.flags[i]) {
        temp.push(...[[0, 0], [0]]);
      } else {
        //push next array of arrays
        temp.push([0, 0]);
      }
    }
  }
  console.log("Temp", temp);
  if (temp.length) {
    return temp;
  } else {
    return arr;
  }
}
function initializeSplit() {
  for (let i = 1; i < state.depth; i++) {
    state.splits.push(i);
  }
  //Switch to -2 for 0,1,2,3,4,3,2,1,0 instead of 0,1,2,3,4,4,3,2,1,0
  for (let i = state.depth - 2; i > 0; i--) {
    state.splits.push(i);
  }
  state.splits.push(0);
}

function initializeSheets() {
  let depth = state.depth;
  //Fill sheetSplit
  let temp = [];
  for (let i = 0; i < depth; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    console.log("TEMP", temp);

    state.sheetSplit.push({ array: chunk([...temp]), row: i });
  }
  console.log(state.sheetSplit);
  //Fill sheetMerge
  for (let i = 0; i < state.sheetSplit.length; i++) {
    let temp = state.sheetSplit[state.sheetSplit.length - 1 - i];
    temp.row = i;
    state.sheetMerge.push(temp);
  }
}

function resetStates() {
  state.lives = 3;
  state.input = [];
  state.ans = [];
  state.level = 0;
  state.sheetMerge = [];
  state.sheetSplit = [];
  state.depth = 1;
  state.runnable = 1;
  state.step = 1;
  state.gameOver = false;
  state.instruct = 0;
}

const state = store({
  lives: 3,
  input: [],
  ans: [],
  level: 0,
  instruct: 0,
  algo: "merge",
  sheetMerge: [],
  sheetSplit: [],
  flags: [],
  depth: 1,
  runnable: 1,
  step: 1,
  gameOver: false,
  splits: [0],
  zeroesEncountered: 0,
  maxMergLen: 0,
  reseting: false,
  indRef: -1,
  feedbackColor: "rgba(220,220,220, .6)",
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (move, array, row) => appendSheet(move, array, row),
  fillTheGaps: (zeroesEncountered, type) =>
    fillTheGaps(zeroesEncountered, type),
  resetStates: () => resetStates(),
  firstZeroFinder1D: (arr) => firstZeroFinder1D(arr),
  initializeSheets: () => initializeSheets(),
  initializeSplit: () => initializeSplit(),
});

export default state;
