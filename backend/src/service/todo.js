module.exports = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos();
    },

    addTodo: async (task) => {
      if (!task) {
        throw new Error("Task is required");
      }

      const exists = await repository.doesTodoExist(task);
      if (exists) {
        throw new Error("Item already exists");
      }

      const newTodo = { task };
      return await repository.addTodo(newTodo);
    },
  };
};
