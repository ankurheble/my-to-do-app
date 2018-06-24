/* 
Previous Implementation
// In-Memory DB
let todos = [
  {
    id: Math.floor(Math.random() * 1000),
    title: "Pick up milk.",
    completed: false
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: "Pick up egg.",
    completed: false
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: "Pick up bread.",
    completed: false
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: "Pick up juice.",
    completed: false
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: "Pick up oil.",
    completed: false
  }
];

/*
    Standard Methods for CRUD applications
    Get /todos : index
    Get /todos/create : create
    Post /todos : store
    Get /todos/:id/edit : edit
    Put /todos/:id : update
    Delete /todos/:id : destroy
*/

/*
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
 */

let Todo = require("../models/Todo");

module.exports = {
  index: function(req, res) {
    // Todo.find({ conditions }, function(err,allTodos){});
    Todo.find({}, function(err, todos) {
      if (err) {
        res.send("Something went wrong");
      }
      res.render("todos", {
        todos: todos
      });
    });
  },
  store: function(req, res) {
    Todo.create({ title: req.body.title, completed: false }, function(
      err,
      todo
    ) {
      console.log(todo);
      res.redirect("/todos");
    });
  },
  create: function(req, res) {},
  edit: function(req, res) {},
  update: function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
      todo.completed = req.body.checkboxValue === "on";
      todo.save(function(err, todo) {
        res.redirect("/todos");
      });
    });
  },
  destroy: function(req, res) {
    Todo.remove({ _id : req.params.id},function(err){
      res.redirect("/todos");
    });
  }
};
