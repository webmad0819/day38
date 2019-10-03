import React, { Component } from "react";

export default class ComponentA extends Component {
  changeValue() {
    // this function comes from App and allows me to communicate them both
    // please note it comes via this.props!
    this.props.changeState(100)
  }

  render() {
    return (
      <div className="component component-a">
        <h1>Component A</h1>
        <span>{this.props.value}</span>

        <button onClick={() => this.changeValue()}>
          Click to change value
        </button>
        {this.props.children}
      </div>
    );
  }
}
