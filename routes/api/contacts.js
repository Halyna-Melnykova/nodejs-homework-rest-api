const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  validateStatusBody,
  isValidId,
} = require("../../middlewares");

const {
  contactAddSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(contactAddSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateStatusBody(updateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
