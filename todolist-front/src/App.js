import React, { Component } from "react";
import TaskItemComponent from "./TaskItemComponent";
import * as Utils from "./Utils";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      newTask: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/tasks").then(tasksFromBackend => {
      this.setState({
        ...this.state,
        tasks: tasksFromBackend.data
      });
    });
  }

  addNewTask() {
    if (this.state.newTask === "") return;

    axios
      .post("http://localhost:3000/newTask", { name: this.state.newTask })
      .then(tasksFromBackend => {
        this.setState({
          ...this.state,
          tasks: tasksFromBackend.data,
          newTask: ""
        });
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
    let taskToUpdateFromState = tasks.find(task => task._id === taskToUpdate._id);
    let newDoneState = !taskToUpdateFromState.done

    let URL = `http://localhost:3000/task/${taskToUpdate._id}/done/${newDoneState}`

    console.log(URL)

    axios
      .get(
        URL
      )
      .then(allTasks => {
        // this re-updates the state with updated object, hence updating the checkbox
        this.setState({
          ...this.state,
          tasks: allTasks.data
        });
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
                        key={task._id}
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
                        key={task._id}
                        task={task}
                        updateTaskValue={task => this.updateTaskValue(task)}
                      ></TaskItemComponent>
                    );
                  })}
              </section>
            </div>
          )}

          {this.state.tasks.filter(task => task.done).length === 0 && (
            <h1>All task are to be done</h1>
          )}
        </div>
      </div>
    );
  }
}
