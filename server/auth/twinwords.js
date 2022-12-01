const router = require("express").Router();
require("dotenv").config({ silent: true });

router.get("/", async (req, res, next) => {
  try {
    res.send({
      "X-RapidAPI-Key": process.env.TWIN_WORDS_APIKEY,
      "X-RapidAPI-Host": process.env.TWIN_WORDS_TEXT_URL,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
