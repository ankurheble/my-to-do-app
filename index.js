// Required Packages
let express = require("express");
let path = require("path");
let methodOverride = require("method-override");

// App initiation
let app = express();

// Middleware initiation
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

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

// Root Route
app.get("/", function(req, res) {
  res.render("index", {
    message: "Hello, This is the To Do Application"
  });
});

// List To-Do's
app.get("/todos", function(req, res) {
  res.render("todos", {
    todos: todos
  });
});

app.post("/todos", function(req, res) {
  const todo = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    completed: false
  };
  todos.push(todo);
  res.redirect("todos");
});

app.delete("/todos/:id", function(req, res) {
  let id = req.params.id;
  todos = todos.filter(function(todo){
    return todo.id != id;
  });
  res.redirect('/todos');
});

app.put("/todos/:id", function(req, res) {
  let id = req.params.id;
  console.log(req.body);
  let updatedValue = req.body.checkboxValue;
  console.log(updatedValue);
  todos.forEach(function(todo) {
    if (todo.id == id && updatedValue) {
      todo.completed = true;
    } else if (todo.id == id && !updatedValue) {
      todo.completed = false;
    }
  });
  res.redirect("/todos");
});

app.listen(3000);
