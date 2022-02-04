import { makeStyles } from "@material-ui/core";
import React from "react";
import state from "../store/Store";
import InputContainerButtons from "./InputContainerButtons";
import { view } from "@risingstack/react-easy-state";

const useStyles = makeStyles((theme) => ({
  styles: {
    display: "flex",
    width: 50,
    height: 50,
    flexDirection: "row",
    margin: 10,
    background: "rgba(220,220,220, .6)",
  },

  stylesContainerOuter: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },

  stylesContainerInner: { display: "flex" },
}));

const stylesMainInner = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const stylesMainOuter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor:  "transparent",
  zIndex: 3,
};

function chunk(array, limit) {
  const chunks = Math.ceil(array.length / limit);
  return Array.from({ length: chunks }, (_, i) =>
    array.slice((i * array.length) / chunks, ((i + 1) * array.length) / chunks)
  );
}

function CreateMap(arrOuter) {
  //Maps user entered array

  const style = useStyles();

  return (
    <div className={style.stylesContainerOuter}>
      {arrOuter.map((arrInner) => (
        <div className={style.stylesContainerInner}>
          {arrInner.map((arrObj) => (
            <div className={style.styles} key={arrObj}>
              {arrObj}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function InputContainer(props) {
  const arr = props.array;
function InputContainer() {
  let arr = state.input;
  let divisor;

  if (!state.step == 0) {
    divisor = state.input.length / (2 * state.step);
  } else {
    divisor = state.input.length;
  }

  return (
    <div style={stylesMainOuter}>
      {/* chunk(arr, #) should run with a value from store. 3 is the max width of length of the mini array. so this will be based off of the step */}
      <div style={stylesMainInner}>{CreateMap(chunk(arr, divisor))}</div>
      <InputContainerButtons />
    </div>
  );
}

export default view(InputContainer);
