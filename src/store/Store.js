import { store } from "@risingstack/react-easy-state";

function firstZeroFinder(index, arr) {
  for (let i = 0; i < arr[index].length; i++) {
    if (arr[index][i] === 0) {
      return i;
    }
  }
}

function appendSheet(move, array, row) {
  //If move is merge
  if (move === "merge") {
    state.sheetMerge[row].splice(
      firstZeroFinder(row, state.sheetMerge),
      array.length,
      ...array
    );
  }

  //Otherwise move is split
  else {
    state.sheetSplit[row].splice(
      firstZeroFinder(row, state.sheetSplit),
      array.length,
      ...array
    );
  }
}

function fillGapsArr(firstZero) {
  let arr = [];

  for (let i = 0; i < state.zeroesEncountered - firstZero; i++) {
    arr.push("x");
  }

  return arr;
}

//fillTheGaps should first:
//> check the total number of 1-length arrays we have encountered
//> then make sure that the bottom row (this happens to be the only row that will encounter empty cells)
//  is filled with non-zero values until the length is the same as the zeroes encountered
// >> example: if zeroesEncountered == 4 and the length of the original array is 10
//              then bottom row will show 11xx000000
function fillTheGaps() {
  let firstZero = firstZeroFinder(state.depth, state.sheetSplit);
  console.log(state.zeroesEncountered);
  state.sheetSplit[state.depth].splice(
    firstZero,
    //Zeroes encoun tered is set to the length of the array on startup >> algorithm runs completely which sets the value to max
    //Need to like, store the value in the object per step. so it can be refferred to each step. This will prevent the overflow
    //This also causes the rest of the generation to bug out becuase the row is filled with x and not 0
    //Fixing this should just fix that error
    state.zeroesEncountered - firstZero,
    ...fillGapsArr(firstZero)
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
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (move, array, row) => appendSheet(move, array, row),
  fillTheGaps: () => fillTheGaps(),
  resetStates: () => resetStates(),
});

export default state;
