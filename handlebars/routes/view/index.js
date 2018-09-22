var router = require("express").Router();

// This route renders the homepage
router.get("/", function(req, res) {
  res.render("problems");
});

// // This route renders the saved handledbars page
// router.get("/problems", function(req, res) {
//   res.render("problems");
// });

module.exports = router;
