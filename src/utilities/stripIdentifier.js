/**
 * Returns a given identifier without brackets or variables
 * @param {String} identifier The identifier string
 * @returns {String} The stripped identifier (lower case)
 */
module.exports = (identifier, swapCategories) => {
  const regExp = new RegExp(swapCategories, "gi");
  return identifier.match(regExp)[0].toLowerCase();
};
