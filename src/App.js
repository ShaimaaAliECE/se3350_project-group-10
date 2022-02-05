import "./App.css";
import Piano from "./components/Piano";
import InputContainer from "./components/InputContainer";
import Sheet from "./components/Sheet";
import state from "./store/Store";

function App() {
  console.log(state.ans);
  return (
    <div>
      <Sheet />
      <InputContainer />
      <Piano />
    </div>
  );
}

export default App;
