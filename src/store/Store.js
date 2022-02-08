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
      array
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
function resetStates() {
  state.lives = 3;
  state.input = [];
  state.ans = [];
  state.level = 1;
  state.sheetMerge = [];
  state.sheetSplit = [];
  state.depth = 0;
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
  depth: 0,
  runnable: 1,
  step: 1,
  gameOver: false,
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (move, array, row) => appendSheet(move, array, row),
  resetStates: () => resetStates(),
});

export default state;
