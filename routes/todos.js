let express = require('express');
let router = express.Router();
let todoController = require("../controllers/todoController");

router.get("/",todoController.index);

router.post("/",todoController.store);

router.put("/:id",todoController.update);

router.delete("/:id",todoController.destroy);

module.exports = router;