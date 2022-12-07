const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const requireUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
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
    if (user.accessRights === "admin") {
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
router.get("/", requireAdminToken, async (req, res, next) => {
  //when would we want to be able to get all users?
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/
router.get("/user", requireUserToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (e) {
    next(e);
  }
});
