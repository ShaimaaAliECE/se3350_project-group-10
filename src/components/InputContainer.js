
import React from "react";
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
