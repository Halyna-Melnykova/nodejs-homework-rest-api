const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    subscription,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
};

module.exports = register;
