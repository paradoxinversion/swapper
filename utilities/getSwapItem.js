const fs = require("fs");
/**
* Function to return a random item from a given Category
* @param {String} swap_category the category to choose from
* @returns {String} the substition
*/
module.exports = function(swap_category){
  let swap_list_object = JSON.parse(fs.readFileSync("./swap-lists/swap-list.json"));
  let swap_value_index = Math.floor(Math.random() * swap_list_object[swap_category].length);
  return swap_list_object[swap_category][swap_value_index];
};
//Try concatenating the swap listss
