import { store } from "@risingstack/react-easy-state";

function firstZeroFinder(arr, type = "split") {
  let temp = [];
  for (let i in arr.array) {
    if (arr.array[i][0] === 0) {
      if (type === "merge" && state.maxMergLen < getLengths(temp)) {
        state.maxMergLen = getLengths(temp);
      }
      return i;
    }
    temp.push(arr.array[i]);
  }

  return;
}

function firstZeroFinder2D(row) {
  let zeroIndex = -1;
  let temp = [];
  let ind;

  for (let i = 0; i < state.sheet[0][row].array.length; i++) {
    zeroIndex = state.sheet[0][row].array[i].indexOf(0);
    if (state.maxMergLen < getLengths(temp)) {
      state.maxMergLen = getLengths(temp);
    }
    if (zeroIndex != -1) {
      ind = i;
      break;
    }
    temp.push(state.sheet[0][row].array.array[i]);
  }

  return { zeroIndex, ind };
}

function appendSheet(array, row, flag = 0) {
  if (flag != 0) {
    let pos;
    pos = firstZeroFinder2D(row);
    console.log(pos, array);
    state.sheet[0][row].array[pos.ind].splice(pos.zeroIndex, 1, [...array]);
  } else {
    let zeroIndex = firstZeroFinder(state.sheet[0][row]);
    state.sheet[0][row].array.splice(zeroIndex, 1, [...array]); //ISSUE: replaces whole subarray [[], [], []]
  }
}

function getLengths(array) {
  //where array is 2d
  let count = -1;
  for (let i in array) {
    for (let j in array[i]) {
      count++;
    }
  }
  return count;
}

function fillGapsArr(start, end) {
  let arr = [];

  for (let i = 0; i < end - start; i++) {
    arr.push(["x"]);
  }

  return arr;
}

function fillTheGaps(zeroesEncountered, type) {
  if (type === "merge") {
    for (let i = 0; i < state.depth - 2; i++) {
      firstZeroFinder2D(i + state.depth);
    }

    let firstZero = firstZeroFinder2D(state.depth);

    state.sheet[0][state.depth].array.splice(
      firstZero,
      state.maxMergLen - firstZero,
      ...fillGapsArr(firstZero, state.maxMergLen)
    );
  } else {
    let firstZero = firstZeroFinder(state.sheet[0][state.depth - 1]);

    state.sheet[0][state.depth - 1].array.splice(
      firstZero,
      zeroesEncountered - firstZero,
      ...fillGapsArr(firstZero, zeroesEncountered)
    );
  }
}

function chunk(array) {
  let divisor;
  let temp = [];
  state.indRef++;
  if (state.splits[state.indRef] !== 0) {
    divisor = Math.round(
      state.ans[0].array.length / (2 * state.splits[state.indRef])
    );
  } else {
    divisor = state.ans[0].array.length;
  }

  const chunks = Math.ceil(array.length / divisor);
  let arr = Array.from({ length: chunks }, (_, i) =>
    array.slice(
      Math.ceil((i * array.length) / chunks),
      Math.ceil(((i + 1) * array.length) / chunks)
    )
  );

  if (divisor === 3) {
    state.flags = [];
    for (let i in arr) {
      if (arr[i].length === 3) {
        state.flags.push(1);
      } else {
        state.flags.push(0);
      }
    }
  } else if (divisor === 2) {
    for (let i in state.flags) {
      if (state.flags[i]) {
        temp.push(...[[0, 0], [0]]);
      } else {
        //push next array of arrays
        temp.push(...[[0], [0]]);
      }
    }
  }
  if (temp.length) {
    return temp;
  } else {
    return arr;
  }
}
function initializeSplit() {
  for (let i = 1; i < state.depth; i++) {
    state.splits.push(i);
  }
  //Switch to -2 for 0,1,2,3,4,3,2,1,0 instead of 0,1,2,3,4,4,3,2,1,0
  for (let i = state.depth - 2; i > 0; i--) {
    state.splits.push(i);
  }
  state.splits.push(0);
}

//Changed ther row to i + depth
function initializeSheets() {
  let depth = state.depth;
  let sheetSplit = [];
  let sheetMerge = [];

  //Fill sheetSplit
  let temp;
  for (let i = 0; i < depth; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    sheetSplit.push({ array: chunk([...temp]), row: i });
  }
  //Fill sheetMerge
  for (let i = 1; i < depth; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    sheetMerge.push({ array: chunk([...temp]), row: i + depth - 1 });
  }

  state.sheet.push([...sheetSplit, ...sheetMerge]);

  state.appendSheet(state.ans[0].array, 0);
}

function resetStates() {
  state.lives = 3;
  state.input = [];
  state.ans = [];
  state.level = 0;
  state.instruct = 0;
  state.algo = "merge";
  state.sheet = [];
  state.flags = [];
  state.depth = 1;
  state.runnable = 1;
  state.step = 1;
  state.gameOver = false;
  state.splits = [0];
  state.zeroesEncountered = 0;
  state.maxMergLen = 0;
  state.reseting = false;
  state.indRef = -1;
  state.feedbackColor = "rgba(220,220,220, .6)";
  state.loseGame = false;
  state.mergePointer = 0;
}

const state = store({
  lives: 3,
  input: [],
  ans: [],
  level: 0,
  instruct: 0,
  algo: "merge",
  sheet: [],
  flags: [],
  depth: 1,
  runnable: 1,
  step: 1,
  gameOver: false,
  splits: [0],
  zeroesEncountered: 0,
  maxMergLen: 0,
  reseting: false,
  indRef: -1,
  feedbackColor: "rgba(220,220,220, .6)",
  loseGame: false,
  mergePointer: 0,
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (array, row, flag) => appendSheet(array, row, flag),
  resetStates: () => resetStates(),
  firstZeroFinder: (arr) => firstZeroFinder(arr),
  initializeSheets: () => initializeSheets(),
  initializeSplit: () => initializeSplit(),
  fillTheGaps: (zeroesEncountered, type) =>
    fillTheGaps(zeroesEncountered, type),
});

export default state;
