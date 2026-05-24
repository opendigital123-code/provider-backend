const {
  PROVIDER_CATEGORIES,
  MIN_PROVIDER_CATEGORIES,
} = require("../constants/categories");

function isValidLatitude(value) {
  return (
    typeof value === "number" &&
    !Number.isNaN(value) &&
    value >= -90 &&
    value <= 90
  );
}

function isValidLongitude(value) {
  return (
    typeof value === "number" &&
    !Number.isNaN(value) &&
    value >= -180 &&
    value <= 180
  );
}

function isValidProviderId(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function normalizeCategories(
  categories,
  fallbackCategory
) {
  const normalized = Array.isArray(categories)
    ? categories.filter((item) =>
        PROVIDER_CATEGORIES.includes(item)
      )
    : [];

  if (
    fallbackCategory &&
    PROVIDER_CATEGORIES.includes(
      fallbackCategory
    ) &&
    !normalized.includes(fallbackCategory)
  ) {
    normalized.unshift(fallbackCategory);
  }

  return [...new Set(normalized)];
}

function providerMatchesCategory(
  provider,
  category
) {
  if (!category) {
    return true;
  }

  const categories =
    Array.isArray(provider.categories) &&
    provider.categories.length
      ? provider.categories
      : provider.category
        ? [provider.category]
        : [];

  return categories.includes(category);
}

function hasMinimumCategories(categories) {
  return (
    Array.isArray(categories) &&
    categories.length >= MIN_PROVIDER_CATEGORIES
  );
}

module.exports = {
  isValidLatitude,
  isValidLongitude,
  isValidProviderId,
  normalizeCategories,
  providerMatchesCategory,
  hasMinimumCategories,
  PROVIDER_CATEGORIES,
};
