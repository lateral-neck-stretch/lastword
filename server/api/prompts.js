const router = require('express').Router();
const {
  models: { User, Prompt, UserResult },
} = require('../db');
module.exports = router;

// GET /api/prompts/leaderboard
router.get('/leaderboard/:id', async (req, res, next) => {
  try {
    const allResults = await UserResult.findAll({
      attributes: ['promptId', 'overallScore', 'userId'],
      include: [{ model: User, attributes: ['id', 'username'] }],
      raw: true,
    });
    const leaderboard = allResults.filter(
      (elem) => elem.promptId == req.params.id
    );
    const sortedLeaderboard = leaderboard.sort(
      (a, b) => b['overallScore'] - a['overallScore']
    );
    res.json(sortedLeaderboard);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const prompt = await Prompt.findByPk(req.params.id);
    res.send(prompt);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll({
      attributes: ['id', 'title', 'topic', 'difficulty'],
    });
    res.json(prompts);
  } catch (err) {
    next(err);
  }
});

// Currently hooked up to Watson/OutputContainer. Uses fetch to post here. Can move as necessary
router.post('/', async (req, res, next) => {
  try {
    console.log('Printing req.body: ', req.body);
    const { text } = await req.body;
    console.log(text);
  } catch (err) {
    next(err);
  }
});
