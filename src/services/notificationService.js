const BOOKING_NOTIFICATION_CHANNEL_ID =
  "booking-updates";

/**
 * Send Expo push notification
 */
async function sendPushNotification({

  expoPushToken,

  title,

  body,

  data = {},
}) {

  try {

    const message = {

      to:
        expoPushToken,

      sound:
        "default",

      title,

      body,

      priority:
        "high",

      channelId:
        BOOKING_NOTIFICATION_CHANNEL_ID,

      data,
    };

    const response =
      await fetch(

        "https://exp.host/--/api/v2/push/send",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(message),
        }
      );

    const result =
      await response.json();

    console.log(
      "Push sent:",
      result
    );

    return result;

  } catch (err) {

    console.log(
      "Push error:",
      err
    );
  }
}

module.exports = {
  sendPushNotification,
};
