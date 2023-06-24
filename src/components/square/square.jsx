import React, { Component } from "react";
import "./square.scss";

class Square extends Component {
  render() {
    const { id, value, click } = this.props;
    return (
      <button className="square" onClick={() => click(id)}>
        {value}
      </button>
    );
  }
}

export default Square;
