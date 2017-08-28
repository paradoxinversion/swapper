const getSwapList = require("./getSwapList.js");
/**
* Returns a given identifier without brackets or variables
* @param {String} identifier The identifier string
* @returns {String} The stripped identifier (lower case)
*/
module.exports = function(identifier){
  const swap_list_object = getSwapList();
  const swap_categories = Object.keys(swap_list_object).join("|");
  const regExp = new RegExp(swap_categories, "gi");
  return identifier.match(regExp)[0].toLowerCase();
};
