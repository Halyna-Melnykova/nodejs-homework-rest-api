const Contact = require("../../models/contact");

const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  // const result = await books.removeById(id);
  // if (!result) {
  //     throw RequestError(404)
  // }
  // // res.status(204).send()
  // res.json({
  //     message: "Delete success"
  // })
};

module.exports = removeContact;
