/**
 * Takes a swap list JSON object and returns a regex that will match categories in the string to swap.
 * if the JSON has the properties "A", "B", and "C" should this should return "A|B|C"
 * @returns {Object} A new RegExp
 */
const buildRegex = swapList => {
  try {
    const swapGroups = [];
    const swapCategories = Object.keys(swapList)
      .map(swapCategory => {
        if (swapCategory.startsWith("sg:", 0)) {
          swapGroups.push(swapCategory.slice(3, swapCategory.length));
          return swapCategory.slice(3, swapCategory.length);
        }
        return swapCategory;
      })
      .join("|");
    const regex = new RegExp("\\[(" + swapCategories + ")\\d\\]", "gi");
    console.log(regex, swapCategories, swapGroups);
    if (regex) {
      return { regex, swapCategories, swapGroups };
    } else {
      const error = new Error("Error building regex");
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
module.exports = buildRegex;
