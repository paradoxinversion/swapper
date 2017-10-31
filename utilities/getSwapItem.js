/**
* Function to return a random item from a given Category
* @param {String} swapCategory the category to choose from. It must exist in the JSON data.
* @returns {String} the substition
*/
module.exports = function(swapCategory, swapList){
  let swap_value_index = Math.floor(Math.random() * swapList[swapCategory].length);
  return swapList[swapCategory][swap_value_index];
};
//Try concatenating the swap listss
