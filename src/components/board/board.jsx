import React, { Component } from "react";
import "./board.scss";
import Square from "../square/square";
import History from "../history/history";

class Board extends Component {
  state = {
    items: [
      { id: "0", value: "" },
      { id: "1", value: "" },
      { id: "2", value: "" },
      { id: "3", value: "" },
      { id: "4", value: "" },
      { id: "5", value: "" },
      { id: "6", value: "" },
      { id: "7", value: "" },
      { id: "8", value: "" },
    ],
    player: "x",
    winner: "",
    history: [],
  };

  checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]].value !== "" &&
          squares[pattern[0]].value === squares[pattern[1]].value &&
          squares[pattern[1]].value === squares[pattern[2]].value
        ) {
          this.setState({ winner: squares[pattern[0]].value });
        }
      });
    }
  };

  handleClick = (id) => {
    const { items, player, history } = this.state;
    let newItems = [...items];
    let newHistory = [...history];
    let itemIdx = newItems.findIndex((item) => item.id === id);
    if (itemIdx !== -1 && newItems[itemIdx].value === "") {
      if (this.state.winner !== "") {
        return;
      }
      newItems[itemIdx].value = player;
      let move = { items: newItems.map((item) => ({ ...item })) };
      newHistory.push(move);
      this.checkForWinner(newItems);
      this.setState({
        items: newItems,
        player: player === "x" ? "o" : "x",
        history: newHistory,
      });
    }
  };

  restart = () => {
    let newItems = [...this.state.items];
    newItems.forEach((item) => {
      item.value = "";
    });
    this.setState({ items: newItems, player: "x", winner: "", history: [] });
  };

  moveHistory = (moveIndex) => {
    const { history } = this.state;
    const move = history[moveIndex];
    const { items, player } = move;

    this.setState({
      items: items.map((cell) => ({ ...cell })),
      player,
    });
    console.log("history", history);
  };

  render() {
    return (
      <div className="app">
        <div>
          <h2>Turn : {this.state.player}</h2>
          <h2>Win : {this.state.winner}</h2>
          <div className="board">
            {this.state.items.map(({ id, value }) => (
              <Square id={id} value={value} key={id} click={this.handleClick} />
            ))}
          </div>
          <button className="btn btn-primary restart" onClick={this.restart}>
            restart
          </button>
        </div>
        <div className="history">
          {this.state.history.map((move, index) => (
            <History key={index} id={index} value={move.player} moveHistory={this.moveHistory} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
