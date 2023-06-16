import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Questionaire from "./Components/Questionaire";

function App() {
  const [start, setStart] = React.useState(false);
  const [displayMain, setDisplayMain] = React.useState(true);

  function getStarted() {
    setStart(true);
    setDisplayMain(false);
  }
  return (
    <div className="App">
      <Header />
      <Main startFunc={getStarted} display={displayMain} />

      {start && (
        <div className="body">
          <Questionaire />
        </div>
      )}
    </div>
  );
}

export default App;
