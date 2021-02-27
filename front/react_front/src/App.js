import React from "react";
import Routing from "./Routing";
import Header from "./Components/Header";
import "./App.css";
import "./assets/style.css";
import "./assets/reset.css";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="App">
        <Routing />
      </div>
    </>
  );
};

export default App;
