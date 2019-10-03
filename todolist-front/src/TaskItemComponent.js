import React, { Component } from "react";
import moment from "moment";
import "./TaskItemComponent.css";

export default class TaskItemComponent extends Component {
  render() {
    return (
      <div className="taskItemComponent">
        <input
          type="checkbox"
          checked={this.props.task.done}
          onChange={() => this.props.updateTaskValue(this.props.task)}
        ></input>
        <span style={{textDecoration: this.props.task.done ? "line-through" : ""}}>{moment(this.props.task.timestamp).format("DD/MM hh:mm")}</span>
        <span style={{textDecoration: this.props.task.done ? "line-through" : ""}}>{this.props.task.name}</span>
      </div>
    );
  }
}
