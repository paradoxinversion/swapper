const fs = require("fs");
const Promise = require("bluebird");
const readFile = Promise.promisify(fs.readFile);
const dataPath = "./swap-lists/swap-list.json";
/**
* Returns anObject representing the swap list JSON.
* @returns {Object} The Swap List Object
* @throws {Error} Error if swap-list.json does not exist
*/
module.exports = async function(){

  try{
    const swapListData = await readFile(dataPath);
    return JSON.parse(swapListData);
  } catch (e){
    console.log(e)
  }
};
