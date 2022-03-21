import { store } from "@risingstack/react-easy-state";

// Finds the first zero in an array
// Also sets the maxMergeLen based on the largest indexOf(0)
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

// returns an array of random numbers between min and max of given length
function random(min, max, length) {
  let num = [];
  for (let i = 0; i < length; i++) {
    num.push(Math.floor(Math.random() * (max - min) + min));
  }
  return num;
}

function generateEmptyArr() {
  state.input = [];
  for (let i = 0; i < state.ans[state.step]?.array.length; i++) {
    state.input.push(0);
  }
}

// Not exactly needed but fine for now, finds the first zero in a 2d array
function firstZeroFinder2D(array) {
  let zeroIndex = -1;
  let ind = 0;
  for (let i of array) {
    zeroIndex = i.indexOf(0);
    if (zeroIndex >= 0) {
      return ind;
    }
    ind++;
  }
  //If no zeros
  return -1;
}

// Splices in arrays into the sheet
function appendSheet(array, row, flag = 0) {
  let zeroIndex;

  // Flag corresponds to a merge step
  // Needed to splice merge elements 1 by 1
  if (flag != 0) {
    zeroIndex = firstZeroFinder2D(
      [...state.sheet[0][row].array],
      state.sheet[0][row]
    );
  } else {
    zeroIndex = firstZeroFinder(state.sheet[0][row]);
  }
  state.sheet[0][row].array.splice(zeroIndex, 1, [...array]);
}

// Returns the total number of elements in a 2d array
function getLengths(array) {
  let count = -1;
  for (let i in array) {
    for (let j in array[i]) {
      count++;
    }
  }
  return count;
}

// Generates an array of x's to be spliced
function fillGapsArr(start, end) {
  let arr = [];

  for (let i = 0; i < end - start; i++) {
    arr.push(["x"]);
  }

  return arr;
}

// Fills the necessary spaces with x's
function fillTheGaps(zeroesEncountered, type) {
  if (type === "merge") {
    //Checks each row in 'merge' for the longest occurence >> this sets the maxMergeLength
    for (let i = 0; i < state.depth - 2; i++) {
      firstZeroFinder(state.sheet[0][i + state.depth].array, "merge");
    }

    let firstZero = firstZeroFinder(state.sheet[0][state.depth + 1], "merge");

    //Splices the x's in based so the length of the first row of 'merge' is the same as the longest filled in row in 'merge'
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

function handleLevel(lvl) {
  switch (lvl) {
    case 1: // Level 1
      state.levelMax = 21; //1 --> 21 non inclusive upper bound
      state.levelLength = 10;
      break;
    case 2: // Level 2, Includes instructions only
      state.levelMax = 21;
      state.levelLength = 10;
      break;
    case 3: // Level 3
      state.levelMax = 21;
      state.levelLength = 10;
      break;
    case 4: // Level 4
      state.levelMax = 51;
      state.levelLength = 20;
      break;
    case 5: // Level 5
      state.levelMax = 101;
      state.levelLength = 50;
      break;
    default:
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
  state.level = 0;
  state.instruct = 0;
  state.levelMin = 1;
  state.levelMax = 0;
  state.depth = 1;
  state.runnable = 1;
  state.step = 1;
  state.zeroesEncountered = 0;
  state.maxMergLen = 0;
  state.indRef = -1;
  state.input = [];
  state.ans = [];
  state.algo = "merge";
  state.sheet = [];
  state.flags = [];
  state.gameOver = false;
  state.reseting = false;
  state.loseGame = false;
  state.mergePointer = 0;
  state.restartGame = true;
  state.splits = [0];
  state.feedbackColor = "rgba(220,220,220, .6)";
}

const state = store({
  lives: 3,
  level: 0,
  instruct: 0,
  levelMin: 1,
  levelMax: 0,
  depth: 1,
  runnable: 1,
  step: 1,
  zeroesEncountered: 0,
  maxMergLen: 0,
  indRef: -1,
  input: [],
  ans: [],
  algo: "merge",
  sheet: [],
  flags: [],
  splits: [0],
  gameOver: false,
  reseting: false,
  loseGame: false,
  mergePointer: 0,
  restartGame: true,
  feedbackColor: "rgba(220,220,220, .6)",
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (array, row, flag) => appendSheet(array, row, flag),
  resetStates: () => resetStates(),
  firstZeroFinder: (arr) => firstZeroFinder(arr),
  firstZeroFinder2D: (arr) => firstZeroFinder2D(arr),
  initializeSheets: () => initializeSheets(),
  initializeSplit: () => initializeSplit(),
  fillTheGaps: (zeroesEncountered, type) =>
    fillTheGaps(zeroesEncountered, type),
  random: (min, max, length) => random(min, max, length),
  generateEmptyArr: () => generateEmptyArr(),
  handleLevel: (lvl) => handleLevel(lvl),
});

export default state;
