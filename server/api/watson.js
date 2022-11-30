const router = require("express").Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const analysis = "This is a response to the submitted answer";
    res.json(analysis);
  } catch (err) {
    next(err);
  }
});
