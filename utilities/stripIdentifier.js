/**
* Returns a given identifier without brackets or variables
* @param {String} identifier The identifier string
* @returns {String} The stripped identifier (lower case)
*/
module.exports = function(identifier, swapList){
  const swap_categories = Object.keys(swapList).join("|");
  const regExp = new RegExp(swap_categories, "gi");
  return identifier.match(regExp)[0].toLowerCase();
};
