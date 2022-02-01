import { store } from "@risingstack/react-easy-state";

const state = store({
  lives: 3,
  input: ["1", "2", "3", "4", "5", "6", "7"],
  ans: [1, 2, 3, 4, 5, 6],
  level: 1,
  algo: "merge",
  step: 0,
  //Example of function
  stepInc: () => state.step++,
});

export default state;
