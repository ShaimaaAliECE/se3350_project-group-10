import "./App.css";
import Key from "./components/Key.js";

function App() {
  return (
    <div style = {{flexDirection: "row", display: "flex"}}>
      
      <Key index = {1}/>
      <Key index = {2}/>
      
    </div>
  );
}

export default App;