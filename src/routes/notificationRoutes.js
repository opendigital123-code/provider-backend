const express = require("express");

const router = express.Router();

const {
  notifyBooking,
  notifyMessage,
} = require("../controllers/notificationController");

router.post("/booking", notifyBooking);
router.post("/message", notifyMessage);

module.exports = router;
