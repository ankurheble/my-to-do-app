// Required Packages
let express = require("express");
let path = require("path");
let methodOverride = require("method-override");
let todoRouter = require("./routes/todos");
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todos-db");

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

// Root Route
app.get("/", function(req, res) {
  res.render("index", {
    message: "Hello, This is the To Do Application"
  });
});

app.use("/todos",todoRouter);

app.listen(3000);
