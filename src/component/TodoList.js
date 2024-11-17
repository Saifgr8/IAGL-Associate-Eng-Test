import React, { Component } from "react";
import axios from "axios";
import '../../src/styles.css'

class TodoList extends Component {
  state = {
    todos: [], // Holds the list of todos
    newTask: "", // Holds the new task input
    isLoading: false, // Indicates loading state
    error: null, // Holds any error message
    duplicateError: false, // Tracks if the item is a duplicate
  };

  // Fetch todos when the component mounts
  componentDidMount() {
    this.fetchTodos();
  }

  // Fetch todos from the backend
  fetchTodos = async () => {
    this.setState({ isLoading: true, duplicateError: false, error: null }); // Reset errors
    try {
      const response = await axios.get("http://localhost:9091/api/todo");
      this.setState({ todos: response.data.todos, isLoading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch todos", isLoading: false });
    }
  };

  // Add a new task
  handleAddTask = async () => {
    const { newTask } = this.state;
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:9091/api/todo", { task: newTask });
      this.setState({ newTask: "", duplicateError: false }); // Clear input and reset duplicate error
      this.fetchTodos(); // Fetch updated todos
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Backend returned a conflict
        this.setState({ duplicateError: true });
      } else {
        this.setState({ error: "Failed to add task" });
      }
    }
  };

  // Handle input change
  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  render() {
    const { todos, newTask, isLoading, error, duplicateError } = this.state;

    return (
      <div className="todo-container">
        <h1>Todo App</h1>

        {/* Input and Add Task Button */}
        <div className="todo-input">
          <input
            type="text"
            value={newTask}
            onChange={this.handleInputChange}
            placeholder="Enter a new task"
          />
          <button onClick={this.handleAddTask}>Add Task</button>
        </div>

        {/* Show error if item already exists */}
        {duplicateError && <div className="duplicate-error">Item already exists!</div>}

        {/* Show loading indicator */}
        {isLoading && <div>Loading...</div>}

        {/* Show other errors */}
        {error && <div className="error">{error}</div>}

        {/* Render todos */}
        <ul className="todo-list">
          {todos.length ? (
            todos.map((todo, index) => (
              <li key={index} className="todo-item">
                {todo.task}
              </li>
            ))
          ) : (
            <li>No todos yet!</li>
          )}
        </ul>
      </div>
    );
  }
}

export default TodoList;
