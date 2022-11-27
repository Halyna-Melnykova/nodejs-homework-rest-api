const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

// const Jimp = require("jimp");

// // open a file called "lenna.png"
// Jimp.read("../../temp/cat.jpg", (err, cat) => {
//   if (err) throw err;
//   cat
//     .resize(250, 250) // resize
//     .quality(75) // set JPEG quality
//     .greyscale() // set greyscale
//     .write("../../temp/avatar"); // save
// });

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
