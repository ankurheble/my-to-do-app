let todos = require("../model/todos");

/*
    Standard Methods for CRUD applications
    Get /todos : index
    Get /todos/create : create
    Post /todos : store
    Get /todos/:id/edit : edit
    Put /todos/:id : update
    Delete /todos/:id : delete
*/

module.exports = {
  getTodos: function(req, res) {
    res.render("todos", {
      todos: todos
    });
  },

  postTodos: function(req, res) {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      title: req.body.title,
      completed: false
    };
    todos.push(todo);
    res.redirect("todos");
  },

  deleteTodo: function(req, res) {
    let id = req.params.id;
    todos = todos.filter(function(todo) {
      return todo.id != id;
    });
    res.redirect("/todos");
  },

  putTodo: function(req, res) {
    let id = req.params.id;
    let updatedValue = req.body.checkboxValue;
    todos.forEach(function(todo) {
      if (todo.id == id && updatedValue) {
        todo.completed = true;
      } else if (todo.id == id && !updatedValue) {
        todo.completed = false;
      }
    });
    res.redirect("/todos");
  }
};
