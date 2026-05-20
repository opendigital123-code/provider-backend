const { db } =
  require("../firebase/admin");

async function updateProviderLocation(
  req,
  res
) {

  try {

    const {
      providerId,
      latitude,
      longitude,
    } = req.body;

    if (
      !providerId ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {

      return res.status(400).json({
        error: "Missing fields",
      });
    }

    await db
      .collection("provider_locations")
      .doc(providerId)
      .set({

        latitude,
        longitude,

        updatedAt:
          new Date(),
      });

    res.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error",
    });
  }
}

module.exports = {
  updateProviderLocation,
};
