const User = require("./../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/auth.config");

const signup = async (req, res) => {
  const body = req.body;

  try {
    const { userType, password } = body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      ...body,
      userStatus: userType !== "ADMIN" ? "APPROVED" : "PENDING",
      password: hashedPassword,
    });

    res.status(201).send(createdUser);
  } catch (ex) {
    res.status(400).send(ex);
  }
};

const signin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({
      userId: userId,
    });

    if (!user) {
      return res.status(401).send("Invalid userId");
    }

    if (user.userStatus === "PENDING") {
      return res
        .status(401)
        .send("User is not approved. Please ask an admin to approve!");
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        SECRET_KEY
      );
      return res.send(token);
    } else {
      return res.status(401).send("Incorrect password!");
    }
  } catch (ex) {
    return res.status(500).send(ex);
  }
};

module.exports = {
  signin,
  signup,
};
