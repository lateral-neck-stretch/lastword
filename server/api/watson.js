const router = require("express").Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    // const analysis = 'test'
    const analysis = {
      "result_index": 0,
      "results": [
        {
          "alternatives": [
            {
              "confidence": 0.96,
              "transcript": "Some music is an important part of any festival." /*I mean, who doesn’t want to hear a good tune? But most importantly, music is an important part of any festival experience. Music is not the soundtrack to the festival. If you get this part wrong, you will be missing out on a big part of the fun. So, what are the things you need to consider when choosing a festival song? Here are the three things to consider."*/
            }
          ],
          "final": true
        }
      ]
    };
    res.send(analysis);
  } catch (err) {
    next(err);
  }
});
