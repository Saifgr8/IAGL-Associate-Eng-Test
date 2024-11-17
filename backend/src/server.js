const express = require("express");
const cors = require("cors");
const repository = require("./repository/todo");
const todoService = require("./service/todo")(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  //GET
  server.get("/api/todo", async (req, res) => {
    res.json(await todoService.getTodos());
  });

  server.post("/api/todo", async (req, res) => {
    try {
      const { task } = req.body;
      if (!task) {
        return res.status(400).json({ error: "Task is required" });
      }

      const updatedTodos = await todoService.addTodo(task);
      res.status(201).json(updatedTodos);
    } catch (error) {
      if (error.message === "Item already exists") {
        res.status(409).json({ error: error.message }); 
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  return server;
};
module.exports = server;
