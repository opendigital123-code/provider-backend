const express = require("express");

const router = express.Router();

const {
  updateProviderLocation,
} = require("../controllers/providerController");

router.post(
  "/location",
  updateProviderLocation
);

module.exports = router;
