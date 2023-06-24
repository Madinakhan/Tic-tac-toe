import React, { Component } from "react";
import Board from "../board/board";
import "./app.scss";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="wrapper">
        <Board />
      </div>
    );
  }
}

export default App;
