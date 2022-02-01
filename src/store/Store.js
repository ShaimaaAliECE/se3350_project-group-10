import { store } from "@risingstack/react-easy-state";

const state = store({
  lives: 3,
  input: ["", "", "", "", "", ""],
  ans: [1, 2, 3, 4, 5, 6],
  level: 1,
  algo: "merge",
  //Example of function
  //Increment: () => counter.num++,
});

export default state;
