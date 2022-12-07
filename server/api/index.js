const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/prompts", require("./prompts"));
router.use("/watson", require("./watson"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
