const BOOKING_NOTIFICATION_CHANNEL_ID =
  "booking-updates";

const MESSAGE_NOTIFICATION_CHANNEL_ID =
  "messages";

async function sendPushNotification({
  expoPushToken,
  title,
  body,
  data = {},
  channelId = BOOKING_NOTIFICATION_CHANNEL_ID,
}) {
  try {
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      priority: "high",
      channelId,
      data,
    };

    const response = await fetch(
      "https://exp.host/--/api/v2/push/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.log(
        "Push send failed:",
        result
      );
    }

    return result;
  } catch (error) {
    console.log("Push error:", error);
    return null;
  }
}

module.exports = {
  BOOKING_NOTIFICATION_CHANNEL_ID,
  MESSAGE_NOTIFICATION_CHANNEL_ID,
  sendPushNotification,
};
