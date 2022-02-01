import { store } from "@risingstack/react-easy-state";

const state = store({
  lives: 3,
  input: ["1", "3", "4", "3", "2", "4", "6"],
  ans: [1, 2, 3, 4, 5, 6],
  level: 1,
  algo: "merge",
  step: 0,
  //Example of function
  //Increment: () => counter.num++,
});

export default state;
