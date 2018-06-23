let express = require('express');
let router = express.Router();
let todoController = require("../controllers/todoController");

router.get("/",todoController.getTodos);

router.post("/",todoController.postTodos);

router.put("/:id",todoController.putTodo);

router.delete("/:id",todoController.deleteTodo);

module.exports = router;