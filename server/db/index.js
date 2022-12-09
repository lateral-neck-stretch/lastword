//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Prompt = require("./models/Prompt");
const UserResult = require("./models/UserResult");

//associations could go here!
User.hasMany(UserResult);
UserResult.belongsTo(User);
Prompt.hasMany(UserResult);
UserResult.belongsTo(Prompt);

module.exports = {
  db,
  models: {
    User,
    Prompt,
    UserResult,
  },
};
