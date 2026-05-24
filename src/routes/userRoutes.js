const express = require("express");

const router = express.Router();

const {
  updatePushToken,
  updateProviderCategories,
} = require("../controllers/userController");

router.put(
  "/:userId/push-token",
  updatePushToken
);

router.put(
  "/:userId/categories",
  updateProviderCategories
);

module.exports = router;
