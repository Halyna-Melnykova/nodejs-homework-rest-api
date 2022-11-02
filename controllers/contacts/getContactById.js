const Contact = require("../../models/contact");

const { RequestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await books.getById(id);
  // if(!result) {
  //     throw RequestError(404, "Not found")
  // }
  // res.json(result)
};

module.exports = getContactById;
