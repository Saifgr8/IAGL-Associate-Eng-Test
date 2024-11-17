import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./component/TodoList";

const TodoApp = () => (
  <Provider store={store}>
    <div className="app-container">
      <TodoList />
    </div>
  </Provider>
);

export default TodoApp;
