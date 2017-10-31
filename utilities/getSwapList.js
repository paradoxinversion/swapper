const fs = require("fs");
const Promise = require("bluebird");
const readFile = Promise.promisify(fs.readFile);
const dataPath = "./swap-lists/swap-list.json";
/**
* Returns anObject representing the swap list JSON.
* @returns {Object} The Swap List Object
* @throws {Error} Error if swap-list.json does not exist
*/
module.exports = function(){
  return readFile(dataPath)
    .then(swapListData => {
      return JSON.parse(swapListData);
    })
    .catch( (e) => {
      const error = new Error;
      error.message = e.message;
      error.stack = e.stack;
      throw error;
    });
};
// module.exports = function(){
//   let jsonData;
//   try{
//     if(!fs.existsSync(dataPath)){
//       throw new Error("swap-list.json does not exist.");
//     }else{
//       jsonData = fs.readFileSync(dataPath);
//       return JSON.parse(jsonData);
//     }
//   }
//   catch(e){
//     console.log(e.name, e.message);
//     throw e;
//   }
// };
