const Contact = require("../../models/contact");

const { RequestError } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await books.updateById(id, req.body);
  // if(!result) {
  //     throw RequestError(404);
  // }

  // res.json(result)
};

module.exports = updateContactById;
