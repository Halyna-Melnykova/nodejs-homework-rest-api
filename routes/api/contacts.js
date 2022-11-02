const express = require("express");
const Joi = require("joi");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(contactAddSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(ctrl.updateContactById)
);

// router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
