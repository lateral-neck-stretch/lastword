const Sequelize = require('sequelize')
const db = require('../db')

const Prompt = db.define('prompt', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  language: {
    type: Sequelize.ENUM('spanish', 'french'),
    allowNull: false,
  },
  content: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
  },
  key: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
  },
  difficulty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 300
    },
    allowNull: false,
  },
  topic: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  vocabulary: {
    type: Sequelize.JSON,
  }
})

module.exports = Prompt
