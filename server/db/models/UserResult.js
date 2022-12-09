const Sequelize = require("sequelize");
const db = require("../db");

const UserResult = db.define("userResult", {
  overallScore: {
    type: Sequelize.INTEGER,
  },
  timerScore: {
    type: Sequelize.INTEGER,
  },
  vocabScore: {
    type: Sequelize.INTEGER,
  },
  similarityScore: {
    type: Sequelize.INTEGER,
  }
});

module.exports = UserResult;
