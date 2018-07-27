/**
 * Returns a given identifier without brackets or variables
 * @param {String} identifier The identifier string
 * @returns {String} The stripped identifier (lower case)
 */
module.exports = (identifier, swapCategories) => {
  console.log(swapCategories);
  const arr = swapCategories
    .split("|")
    .map(category => {
      return category + "\\d";
    })
    .join("|");
  console.log("arr", arr);
  const regExp = new RegExp(arr, "gi");

  const stripped = identifier.match(regExp)[0].toLowerCase();
  return stripped.slice(0, stripped.length - 1);
};
