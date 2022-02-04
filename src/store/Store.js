import { store } from "@risingstack/react-easy-state";

function appendSheet(move, array) {}

const state = store({
  lives: 3,
  input: [0, 0, 0, 0, 0, 0, 0],
  ans: [1, 2, 3, 4, 5, 6],
  level: 1,
  algo: "merge",
  sheet: [[]],

  sheetSplit: [[], [], [], []],
  sheetMerge: [[], [], [], []],

  step: 0,
  //Example of function
  stepInc: () => state.step++,

  appendSheet: (move, array) => appendSheet(move, array),
});

export default state;
