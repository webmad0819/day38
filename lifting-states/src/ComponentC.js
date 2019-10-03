import React, { Component } from "react";

export default class ComponentC extends Component {
  changeState(newState) {
      this.props.changeState(newState)
  }
  render() {
    return (
      <div className="component component-c">
        <h1>Component C</h1>
        {this.props.value && this.props.value3 === undefined && (
          <span>{this.props.value}</span>
        )}
        {this.props.value3 && <span>{this.props.value3}</span>}

        <button onClick={() => this.changeState(98989898)}>
          Click to change sibling (ComponentC)
        </button>
      </div>
    );
  }
}
