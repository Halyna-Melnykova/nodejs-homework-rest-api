const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeContact;
