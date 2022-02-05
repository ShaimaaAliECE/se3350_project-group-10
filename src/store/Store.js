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
  step: 0,
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (move, array, row) => appendSheet(move, array, row),
});

export default state;
