const Sequelize = require('sequelize');
const router = require('express').Router();
const {
  models: { User, UserResult },
} = require('../db');
// const UserResults = require("../db/models/UserResults");
module.exports = router;

const requireUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.body.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
    // if (user.accessRights === "admin") {
    //   req.user = user;
    //   next();
    // } else {
    //   throw new Error(
    //     "Oops! Looks like you don't have permission to view this information"
    //   );
    // }
  } catch (error) {
    next(error);
  }
};

const requireAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.accessRights === 'admin') {
      req.user = user;
      next();
    } else {
      throw new Error(
        "Oops! Looks like you don't have permission to view this information"
      );
    }
  } catch (error) {
    next(error);
  }
};

//GET /api/users
router.get('/', requireAdminToken, async (req, res, next) => {
  //when would we want to be able to get all users?
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/user
router.get('/user', requireUserToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (e) {
    next(e);
  }
});

// GET /api/users/user/results
router.get('/user/results', requireUserToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const userResults = await user.getUserResults();
    res.json(userResults);
  } catch (err) {
    next(err);
  }
});

router.post('/user/results', requireUserToken, async (req, res, next) => {
  try {
    const userResult = await UserResult.create({
      userId: req.user.id,
      promptId: req.body.id,
      overallScore: req.body.overallScore,
      vocabScore: req.body.vocabScore,
      similarityScore: req.body.similarityScore,
      timerScore: 1,
    });
    res.send(userResult);
  } catch (err) {
    next(err);
  }
});

router.put('/user', requireUserToken, async (req, res, next) => {
  const userResults = await UserResult.findAll({
    where: {
      userId: req.user.id,
    },
  });
  let promptIds = [];
  userResults.forEach((result) => {
    promptIds.push(result.promptId);
  });
  let finalScores = [];
  let promptSet = [...new Set(promptIds)];
  promptSet.forEach((id) => {
    let idScores = userResults.filter((result) => result.promptId == id);
    idScores.sort((a, b) => a.overallScore - b.overallScore);
    finalScores.push(idScores[idScores.length - 1].overallScore);
  });
  let finalScore =
    finalScores.reduce((previous, current) => {
      return parseInt(previous + current);
    }, 0) / finalScores.length;
  let selectedUser = await User.findByPk(req.user.id);
  selectedUser.proficiency = finalScore;
  await selectedUser.save();
  res.send(selectedUser);
});
