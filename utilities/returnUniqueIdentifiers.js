const NoIdentifierError = require("../error/NoIdentifierError.js");
/**
* Function to find and return only Unique Identifiers in an Array
* Identifiers should come into this function as IdentifierX
* @param {Array} arr an Array of Identifiers
* @returns {Array} an Array of Unique Identifiers
* @throws {NoIdentifierError} There must be an array Identifiers passed to the function
*/
module.exports = function(arr){

  let processedIdentifiers = [];
  try{
    if (arr == null){
      throw new NoIdentifierError();
    }else{
      arr.forEach(function(element){
        console.log("Processing Identifier: ", element);
        if (!processedIdentifiers.includes(element)){
          processedIdentifiers.push(element);
        }
      });
      return processedIdentifiers;
    }


  }catch (e){
    console.log(e.name, e.message);
    return e;
  }

};
