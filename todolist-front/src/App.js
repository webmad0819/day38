import React, { Component } from "react";
import TaskItemComponent from "./TaskItemComponent";
import * as Utils from "./Utils";
import "./App.css";

class Task {
  constructor(name, done) {
    this.id = Utils.randomInt(100, 10000000);
    this.timestamp = new Date();
    this.name = name;
    this.done = done;
  }
}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        new Task("Ir a la peluquería", true),
        new Task("Estudiar", false),
        new Task("Comprar el pan", true),
        new Task("Recoger al niño en el cole", false)
      ],
      newTask: ""
    };
  }

  addNewTask() {
    if (this.state.newTask === "") return;

    let tasks = [...this.state.tasks];

    tasks.unshift(new Task(this.state.newTask, false));

    this.setState({
      ...this.state,
      tasks: tasks,
      newTask: ""
    });
  }

  setNewTaskValue(e) {
    this.setState({
      ...this.state,
      newTask: e.target.value
    });
  }

  updateTaskValue(taskToUpdate) {
    // this clones the tasks from the state
    let tasks = [...this.state.tasks];

    // this finds the selected task to be modified
    let taskToUpdateFromState = tasks.find(task => task.id === taskToUpdate.id);

    // this inverts the done state of the object inside of the chosen task
    taskToUpdateFromState.done = !taskToUpdateFromState.done;

    // this re-updates the state with updated object, hence updating the checkbox
    this.setState({
      ...this.state,
      tasks: tasks
    });
  }

  render() {
    return (
      <div className="App">
        <div className="tasks">
          <header>
            <input
              type="text"
              value={this.state.newTask}
              onChange={e => this.setNewTaskValue(e)}
              placeholder="Please specify your new task"
            ></input>
            <button onClick={() => this.addNewTask()}>Add new task</button>
          </header>
          {this.state.tasks.filter(task => !task.done).length > 0 && (
            <div>
              <h1>
                Total tasks to do -{" "}
                {this.state.tasks.filter(task => !task.done).length}
              </h1>
              <section>
                {this.state.tasks
                  .filter(task => !task.done)
                  .map(task => {
                    return (
                      <TaskItemComponent
                        key={task.id}
                        task={task}
                        updateTaskValue={task => this.updateTaskValue(task)}
                      ></TaskItemComponent>
                    );
                  })}
              </section>
            </div>
          )}

          {this.state.tasks.filter(task => task.done).length > 0 && (
            <div>
              <h1>
                Total tasks done -{" "}
                {this.state.tasks.filter(task => task.done).length}
              </h1>
              <section>
                {this.state.tasks
                  .filter(task => task.done)
                  .map(task => {
                    return (
                      <TaskItemComponent
                        key={task.id}
                        task={task}
                        updateTaskValue={task => this.updateTaskValue(task)}
                      ></TaskItemComponent>
                    );
                  })}
              </section>
            </div>
          )}

          {this.state.tasks.filter(task => task.done).length === 0 && (
            <h1>
              All task are to be done
           
            </h1>
          )}
        </div>
      </div>
    );
  }
}
