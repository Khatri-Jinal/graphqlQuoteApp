import "./App.css";
import React from "react";
import Routes from "./Routes";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes />
      </div>
    </>
  );
}

export default App;
