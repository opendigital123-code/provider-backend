const { db } =
  require("../firebase/admin");

const {
  sendPushNotification,
  BOOKING_NOTIFICATION_CHANNEL_ID,
  MESSAGE_NOTIFICATION_CHANNEL_ID,
} = require("../services/notificationService");

async function getUserPushToken(userId) {
  const snapshot =
    await db.collection("users").doc(userId).get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data()?.pushToken || null;
}

async function notifyBooking(req, res) {
  try {
    const {
      recipientId,
      title,
      body,
      data = {},
    } = req.body;

    if (
      !recipientId ||
      !title ||
      !body
    ) {
      return res.status(400).json({
        error: "recipientId, title and body are required",
      });
    }

    const pushToken =
      await getUserPushToken(recipientId);

    if (!pushToken) {
      return res.status(404).json({
        error: "Recipient push token not found",
      });
    }

    const result =
      await sendPushNotification({
        expoPushToken: pushToken,
        title,
        body,
        channelId:
          BOOKING_NOTIFICATION_CHANNEL_ID,
        data: {
          type: "booking_created",
          ...data,
        },
      });

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}

async function notifyMessage(req, res) {
  try {
    const {
      recipientId,
      title,
      body,
      data = {},
    } = req.body;

    if (
      !recipientId ||
      !title ||
      !body
    ) {
      return res.status(400).json({
        error: "recipientId, title and body are required",
      });
    }

    const pushToken =
      await getUserPushToken(recipientId);

    if (!pushToken) {
      return res.status(404).json({
        error: "Recipient push token not found",
      });
    }

    const result =
      await sendPushNotification({
        expoPushToken: pushToken,
        title,
        body,
        channelId:
          MESSAGE_NOTIFICATION_CHANNEL_ID,
        data: {
          type: "message",
          ...data,
        },
      });

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}

module.exports = {
  notifyBooking,
  notifyMessage,
};
