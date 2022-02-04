import { store } from "@risingstack/react-easy-state";

const state = store({
  lives: 3,
  input: ["1", "3", "4", "3", "2", "4", "6"],
  ans: [1, 2, 3, 4, 5, 6],
  level: 1,
  algo: "merge",
  sheet: [["1", "3", "4", "3", "2", "4", "6"], [1,2], [1,2,3]],
  //Example of function
  stepInc: () => state.step++,
});

export default state;