import { makeStyles } from "@material-ui/core";
import React from "react";
import state from "../store/Store";
import InputContainerButtons from "./InputContainerButtons";
import InputBoxes from "./InputBoxes";
import { view } from "@risingstack/react-easy-state";
import SubmitBoxes from './SubmitBoxes';

const stylesMainOuter = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};
function InputContainer() {
  return (
    <div style={stylesMainOuter}>
      <SubmitBoxes />
    </div>
  );
}

export default view(InputContainer);
