
const buildRegex = require("../utilities/buildRegex.js");
const returnUniqueIdentifiers = require("../utilities/returnUniqueIdentifiers.js");
const stripIdentifier = require("../utilities/stripIdentifier.js");
const getSwapItem = require("../utilities/getSwapItem.js");
const NoIdentifierError = require("../error/NoIdentifierError.js");

const doSwap = async function doSwap(input, swapList){
  try{
    const swapListData = await swapList;
    const swapRegex = buildRegex(swapListData);
    const swapHandler = {
      "identifiers": null,
      "swapList": swapListData,
      "regex": swapRegex,
      "swapKey": {}
    };
    swapHandler.identifiers = returnUniqueIdentifiers(input.match(swapHandler.regex));
    if (swapHandler.identifiers instanceof NoIdentifierError){
      throw swapHandler.identifiers;
    }else{
      swapHandler.identifiers.forEach(element =>{
        swapHandler.swapKey[element] = getSwapItem(stripIdentifier(element, swapHandler.swapList), swapHandler.swapList);
      });
    }
    const finalString = input.replace(swapHandler.regex, function(match){
      return swapHandler.swapKey[match];
    });
    console.log(finalString);
  } catch (e){
    console.log("Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer.");
    const error = new Error;
    error.message = e.message;
    error.stack = e.stack;
    throw error;
  }
};
module.exports = doSwap;
