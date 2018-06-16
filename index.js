let express = require("express");
let path = require("path");

let app = express();

app.use(express.json());
app.set('view engine','pug');
app.set("views", path.join(__dirname,"views"));

const users = [
  { name: "ankur" },
  { name: "vijay" },
  { name: "banu" },
  { name: "arun" },
  { name: "abhi" },
  { name: "suhas" }
];

app.get("/", function(req, res) {
  res.render("index", {
      message : req.query.message || 'Hello World'
  });
});

app.get("/users", function(req, res) {
  res.json(users);
});

app.post("/users", function(req, res) {
  users.push({
      name : req.body.name
  });
  res.send(users);
});

app.listen(3000);
