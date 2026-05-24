const {
  FieldValue,
} = require("firebase-admin/firestore");

const { db } =
  require("../firebase/admin");

const {
  isValidProviderId,
  normalizeCategories,
  hasMinimumCategories,
} = require("../utils/validate");

async function updatePushToken(
  req,
  res
) {
  try {
    const { userId } = req.params;
    const { pushToken } = req.body;

    if (
      !isValidProviderId(userId) ||
      typeof pushToken !== "string" ||
      !pushToken.trim()
    ) {
      return res.status(400).json({
        error: "Missing or invalid push token",
      });
    }

    await db
      .collection("users")
      .doc(userId)
      .set(
        {
          pushToken: pushToken.trim(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    return res.json({
      success: true,
      userId,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}

async function updateProviderCategories(
  req,
  res
) {
  try {
    const { userId } = req.params;
    const {
      categories,
      category,
    } = req.body;

    const normalized =
      normalizeCategories(
        categories,
        category
      );

    if (
      !isValidProviderId(userId) ||
      !hasMinimumCategories(normalized)
    ) {
      return res.status(400).json({
        error:
          "At least two valid categories are required",
      });
    }

    const primaryCategory =
      normalized[0];

    await db
      .collection("users")
      .doc(userId)
      .set(
        {
          category: primaryCategory,
          categories: normalized,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    await db
      .collection("providers")
      .doc(userId)
      .set(
        {
          category: primaryCategory,
          categories: normalized,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    return res.json({
      success: true,
      userId,
      category: primaryCategory,
      categories: normalized,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
}

module.exports = {
  updatePushToken,
  updateProviderCategories,
};
