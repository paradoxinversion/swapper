/**
* Returns a RegExp for matching identifiers matching Swap List Keys.
* if the JSON has the properties "A", "B", and "C" should this should return "A|B|C"
* @returns {Object} A new RegExp
*/
const getSwapList = require("./getSwapList.js");
module.exports = function(){
  const swap_list_object = getSwapList();
  return new RegExp("\\[(" + Object.keys(swap_list_object).join("|") + ")\\d\\]", "gi");
};
