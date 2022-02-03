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
  width: "100%",
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

function InputBoxes() {
  let arr = state.input;
  let divisor;

  if (!state.step == 0) {
    divisor = state.input.length / (2 * state.step);
  } else {
    divisor = state.input.length;
  }

  return <div style={stylesMainInner}>{CreateMap(chunk(arr, divisor))}</div>;
}

export default view(InputBoxes);
