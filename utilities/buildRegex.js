const Promise = require("bluebird");
/**
* Returns a RegExp for matching identifiers matching Swap List Keys.
* if the JSON has the properties "A", "B", and "C" should this should return "A|B|C"
* @returns {Object} A new RegExp
*/
const buildRegex = function(swapList){
  return new Promise(function(resolve, reject){
    const regex = new RegExp("\\[(" + Object.keys(swapList).join("|") + ")\\d\\]", "gi");
    if (regex){
      resolve(regex);
    } else{
      reject(new Error("Somthing went wrong"));
    }

  }).catch(e => {
    const error = new Error;
    error.message = e.message;
    error.stack = e.stack;
    throw error;
  });
  // return new RegExp("\\[(" + Object.keys(swapList).join("|") + ")\\d\\]", "gi");
};
module.exports = buildRegex;
