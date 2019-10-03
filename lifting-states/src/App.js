import React, { Component } from "react";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import ComponentD from "./ComponentD";
import * as Utils from "./Utils";
// import {toCurrency} from "./Utils";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      value: Utils.toCurrency(500)
    };
  }

  changeState(newValue) {
    this.setState({
      ...this.state,
      value: Utils.toCurrency(newValue),
      valueForB: undefined
    });
  }

  changeStateFromB(newValue) {
    this.setState({
      ...this.state,
      valueForB: Utils.toCurrency(newValue)
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.changeState(4300)}>
          Click to change value (App)
        </button>

        <ComponentA
          changeState={newValue => this.changeState(newValue)}
          value={this.state.value}
        >
          <ComponentB
            changeState={newValue => this.changeState(newValue)}
            value={this.state.value}
            value2={this.state.valueForB}
          ></ComponentB>
          <ComponentD
            changeStateFromB={newValue => this.changeStateFromB(newValue)}
            changeState={newValue => this.changeState(newValue)}
            value={this.state.value}
          ></ComponentD>
        </ComponentA>
      </div>
    );
  }
}
