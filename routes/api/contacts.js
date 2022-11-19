const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  validateStatusBody,
  isValidId,
  authenticate,
} = require("../../middlewares");

const {
  contactAddSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validateBody(contactAddSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateStatusBody(updateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
