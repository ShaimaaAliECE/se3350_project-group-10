import React from "react";
import { Button } from "@material-ui/core";
import state from "../store/Store.js";
import { view } from "@risingstack/react-easy-state";
import { generateEmptyArr } from "../screens/Home";
import { playCorrectSound, playIncorrectSound } from "../assets/tones.js";
import Dialog from "@mui/material/Dialog";

const styles = {
  display: "flex",
  padding: 10,
};

function handleRestartClick() {
  //Set the store state back to empty
  let len = state.input.length;
  for (let i = 0; i < len; i++) {
    state.input[i] = 0;
  }
  state.step = 0;
}

function arrComp(arr1, arr2) {
  return arr1.every((val, index) => val === arr2[index]);
}

function handleSubmitClick(props) {
  state.stepInc();

  //Check the answer, if its right --> increment step, handle restart, state.sheet.push(state.input)
  if (arrComp(state.ans[state.step].array, state.input)) {
    state.appendSheet(
      state.ans[state.step].type,
      state.ans[state.step].array,
      state.ans[state.step].row
    );
    generateEmptyArr();
    handleRestartClick();
    playCorrectSound();
  } else {
    state.lives--;
    handleRestartClick();
    playIncorrectSound();
    props.handleClickOpen();
  }
}

// everytie piano click button, update state, click submit refer to store, compare input[] with ans[] at each step

// function onSubmit() {
//   let input = state.input;
//   let ans = state.ans;
//   let counter = 0;

//   // check if input is missing any values
//   if (input.length == ans.length) {
//     //iterate through input array
//     for (let i = 0; i < ans.length; i++) {
//       //check if input array is equal to answer array
//       if (input[i] === ans[i]) {
//         counter++;
//       } else {
//         //TODO highlight input box red
//         console.log("wrong");
//         handleRestartClick(); // clear input array
//         state.lives--; // lose a life
//         break;
//         // reset input field
//       }

//       if (counter == ans.length) {
//         // append to sheet []
//         state.stepInc();
//       }
//     }
//   } else {
//     //TODO highlight input container red
//     console.log("fill input array");
//     state.lives--;
//   }
// }

export default view(function InputContainerButtons() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles}>
      <Button
        variant="contained"
        onClick={() => {
          handleRestartClick();
        }}
      >
        RESET
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleSubmitClick(handleClickOpen());
        }}
      >
        SUBMIT
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: 300, height: 300 }}
      >
        You made a mistake!
      </Dialog>
    </div>
  );
});
