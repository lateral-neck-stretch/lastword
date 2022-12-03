const Sequelize = require("sequelize");
const db = require("../db");

const UserResults = db.define("user", {
  overallScore: {
    type: Sequelize.JSON,
  },
  timerScore: {
    type: Sequelize.JSON,
  },
  topicScores: {
    type: Sequelize.JSON,
  },
  vocabScore: {
    type: Sequelize.JSON,
  },
});

module.exports = UserResults;
