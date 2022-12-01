const { User } = require("../../models/user");

const { RequestError, sendMail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404);
  }

  if (!user.email) {
    throw RequestError(404, "missing required field email");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verificate registration",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Press for verification</a>`,
  };

  await sendMail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
