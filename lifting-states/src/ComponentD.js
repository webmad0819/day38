import React, { Component } from "react";

export default class ComponentD extends Component {
  changeState(newValue) {
    this.props.changeState(newValue);
  }

  changeStateFromB(newValue) {
    this.props.changeStateFromB(newValue);
  }
  
  render() {
    return (
      <div className="component component-d">
        <h1>Component D</h1>
        <span>{this.props.value}</span>

        <button onClick={() => this.changeState(13000)}>
          Click to change all (ComponentD)
        </button>

        <button onClick={() => this.changeStateFromB(80000)}>
          Click to change B (ComponentD)
        </button>
      </div>
    );
  }
}
