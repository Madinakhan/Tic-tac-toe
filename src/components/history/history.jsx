import React, { Component } from "react";
import "./history.scss";

class History extends Component {
  state = {};
  render() {
    const { id, value, moveHistory } = this.props;
    return <button className="move" onClick={() => moveHistory(id, value)}>Go to move {id+1}</button>;
  }
}

export default History;
