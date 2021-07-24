import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calender from "./components/commons/Calender/Calender";

function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <Calender />
    </div>
  );
}

export default App;
