const fs = require("fs");
const dataPath = "./swap-lists/swap-list.json";
/**
* Returns anObject representing the swap list JSON.
* @returns {Object} The Swap List Object
* @throws {Error} Error if swap-list.json does not exist
*/
module.exports = function(){
  let jsonData;
  try{
    if(!fs.existsSync(dataPath)){
      throw new Error("swap-list.json does not exist.");
    }else{
      jsonData = fs.readFileSync(dataPath);
      return JSON.parse(jsonData);
    }
  }
  catch(e){
    console.log(e.name, e.message);
  }
  return null;
};
