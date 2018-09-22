var router = require("express").Router();

var noteRoutes = require("./notes");
var problemRoutes = require("./problems");


router.use("/notes", noteRoutes);
router.use("/problems", problemRoutes);

module.exports = router;
