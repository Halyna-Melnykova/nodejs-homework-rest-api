const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { RequestError, sendMail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { subscription, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verificate registration",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Press for verification</a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = register;
