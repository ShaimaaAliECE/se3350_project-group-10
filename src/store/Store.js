import { store } from "@risingstack/react-easy-state";

const state = store({
  lives: 3,
  input: [0, 0, 0, 0, 0, 0, 0],
  ans: [],
  level: 1,
  algo: "merge",
  sheetMerge: [[]],
  sheetSplit: [[]],
  step: 0,
  //Example of function
  stepInc: () => state.step++,
});

export default state;
