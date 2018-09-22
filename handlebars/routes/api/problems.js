var router = require("express").Router();
var problemController = require("../../controllers/problem");

router.get("/", problemController.findAll);
router.delete("/:id", problemController.delete);
router.put("/:id", problemController.update);

module.exports = router;
