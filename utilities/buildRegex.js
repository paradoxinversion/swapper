const Promise = require("bluebird");
/**
* Returns a RegExp for matching identifiers matching Swap List Keys.
* if the JSON has the properties "A", "B", and "C" should this should return "A|B|C"
* @returns {Object} A new RegExp
*/
const buildRegex = function(swapList){
  try{
    const regex = new RegExp("\\[(" + Object.keys(swapList).join("|") + ")\\d\\]", "gi");
    if (regex){
      return regex;
    } else{
      const error = new Error("Error building regex");
      throw error;
    }
  } catch (e){
    console.log(e);
  }
};
module.exports = buildRegex;
