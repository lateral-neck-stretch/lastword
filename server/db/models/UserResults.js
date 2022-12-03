const Sequelize = require("sequelize");
const db = require("../db");

const UserResults = db.define("userResults", {
  Date: {
    type: Sequelize.DATE,
  },
  overallScore: {
    type: Sequelize.JSON,
  },
  timerScore: {
    type: Sequelize.JSON,
  },
  vocabScore: {
    type: Sequelize.JSON,
  },
});

module.exports = UserResults;
