//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Prompt = require("./models/Prompt");
const UserResults = require("./models/UserResults");

//associations could go here!
User.hasMany(UserResults);
UserResults.belongsTo(User);
Prompt.hasMany(UserResults);
UserResults.belongsTo(Prompt);

module.exports = {
  db,
  models: {
    User,
    Prompt,
    UserResults,
  },
};
