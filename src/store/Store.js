import { store } from "@risingstack/react-easy-state";

function firstZeroFinder(index, arr) {
  for (let i = 0; i < arr[index].array.length; i++) {
    if (arr[index].array[i] === 0) {
      return i;
    }
  }
}

function appendSheet(move, array, row) {
  //If move is merge
  if (move === "merge") {
    state.sheetMerge[row].array.splice(
      firstZeroFinder(row, state.sheetMerge),
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

function fillGapsArr(firstZero, zeroesEncountered) {
  let arr = [];

  for (let i = 0; i < zeroesEncountered - firstZero; i++) {
    arr.push("x");
  }

  return arr;
}

function fillTheGaps(zeroesEncountered) {
  let firstZero = firstZeroFinder(state.depth - 1, state.sheetSplit);

  state.sheetSplit[state.depth - 1].array.splice(
    firstZero,
    zeroesEncountered - firstZero,
    ...fillGapsArr(firstZero, zeroesEncountered)
  );
}

function resetStates() {
  state.lives = 3;
  state.input = [];
  state.ans = [];
  state.level = 1;
  state.sheetMerge = [];
  state.sheetSplit = [];
  state.depth = 1;
  state.runnable = 1;
  state.step = 1;
  state.gameOver = false;
}

const state = store({
  lives: 3,
  input: [],
  ans: [],
  level: 1,
  algo: "merge",
  sheetMerge: [],
  sheetSplit: [],
  depth: 1,
  runnable: 1,
  step: 1,
  gameOver: false,
  splits: [0],
  zeroesEncountered: 0,
  indexReset: 0,
  reseting: false,
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (move, array, row) => appendSheet(move, array, row),
  fillTheGaps: (zeroesEncountered) => fillTheGaps(zeroesEncountered),
  resetStates: () => resetStates(),
});

export default state;
