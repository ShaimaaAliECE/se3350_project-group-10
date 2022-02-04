import { store } from "@risingstack/react-easy-state";

const state = store({
  lives: 3,
  input: [0, 0, 0, 0, 0, 0, 0],
  ans: [],
  level: 1,
  algo: "merge",
  sheetMerge: [],
  sheetSplit: [],
  depth: 0,
  runnable: 1,
  step: 0,
  //Example of function
  stepInc: () => state.step++,
});

export default state;
