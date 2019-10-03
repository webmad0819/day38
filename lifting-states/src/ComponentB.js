import React, { Component } from "react";
import ComponentC from "./ComponentC";
import * as Utils from "./Utils";

export default class ComponentB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  changeState(newValue) {
    this.setState({
      ...this.state,
      value: Utils.toCurrency(newValue)
    });
  }

  changeStateOfApp(newValue) {
    this.props.changeState(newValue);

    this.setState({
      ...this.state,
      value: Utils.toCurrency(newValue)
    });
  }

  changeStateOfC(newValue) {
    this.setState({
      ...this.state,
      value3: Utils.toCurrency(newValue)
    });
  }

  render() {
    return (
      <div className="component component-b">
        <h1>Component B</h1>
        {this.props.value && this.props.value2 === undefined && (
          <span>{this.props.value}</span>
        )}
        {this.props.value2 && <span>{this.props.value2}</span>}

        <button onClick={() => this.changeStateOfApp(9999)}>
          Click to change all (ComponentB)
        </button>
        <button onClick={() => this.changeState(5000)}>
          Click to change children (ComponentB)
        </button>
        <ComponentC
          value={this.state.value}
          changeState={newValue => this.changeStateOfC(newValue)}
        ></ComponentC>
        <ComponentC value={this.state.value} value3={this.state.value3}>
        </ComponentC>
      </div>
    );
  }
}
