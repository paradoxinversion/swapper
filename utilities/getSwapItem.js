const fs = require("fs");
/**
* Function to return a random item from a given Category
* @param {String} swap_category the category to choose from
* @returns {String} the substition
*/
module.exports = function(swap_category){
  let swap_list_object = JSON.parse(fs.readFileSync("./swap-lists/swap-list.json"));
  if (!swap_list_object.hasOwnProperty(swap_category)){
    console.log("Invalid Category");
    return "(T_T)";
  }
  let swap_value_index = Math.floor(Math.random() * swap_list_object[swap_category].length);
  return swap_list_object[swap_category][swap_value_index];
};
