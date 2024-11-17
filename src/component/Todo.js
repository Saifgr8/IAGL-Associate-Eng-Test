import React from "react";

const Todo = ({ todo }) => (
  <li className="todo-item">
    <span
      className="todo-item__text"
    >
      {todo}
    </span>
  </li>
);

// export default Todo;
export default connect(
  null
)(Todo);