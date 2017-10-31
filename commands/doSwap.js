
const buildRegex = require("../utilities/buildRegex.js");
const returnUniqueIdentifiers = require("../utilities/returnUniqueIdentifiers.js");
const stripIdentifier = require("../utilities/stripIdentifier.js");
const getSwapItem = require("../utilities/getSwapItem.js");
const NoIdentifierError = require("../error/NoIdentifierError.js");

// const doSwap = function doSwap(input, swapList){
//   // console.log("SWAP LIST", swapList)
//   let uniqueIdentifiers;
//   let swapKey = {};
//   console.log("Got prompt:", input);
//   try{
//     uniqueIdentifiers = returnUniqueIdentifiers(input.match(buildRegex(swapList)));
//     if (uniqueIdentifiers instanceof NoIdentifierError){
//       throw uniqueIdentifiers;
//     } else{
//       uniqueIdentifiers.forEach(function(element){
//         swapKey[element] = getSwapItem(stripIdentifier(element, swapList), swapList);
//       });
//       const finalString = input.replace(buildRegex(swapList), function(match){
//         return swapKey[match];
//       });
//       console.log(finalString);
//       return finalString;
//     }
//
//   } catch(e){
//     console.log("Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer.");
//     throw e;
//   }
// };
const doSwap = function doSwap(input, swapList){
  swapList.then(swapListData => {
    return buildRegex(swapListData)
      .then(swapRegex => {
        const swapHandler = {
          "swapList": swapListData,
          "regex": swapRegex
        };
        return swapHandler;
      });

  })
    .then(swapHandler => {
      swapHandler.identifiers = returnUniqueIdentifiers(input.match(swapHandler.regex));
      return swapHandler;
    })
    .then(swapHandler => {
      if (swapHandler.identifiers instanceof NoIdentifierError){
        throw swapHandler.identifiers;
      }else{
        swapHandler.swapKey = {};
        swapHandler.identifiers.forEach(element =>{
          swapHandler.swapKey[element] = getSwapItem(stripIdentifier(element, swapHandler.swapList), swapHandler.swapList);
        });
        return swapHandler;
      }
    })
    .then(swapHandler =>{
      const finalString = input.replace(swapHandler.regex, function(match){
        return swapHandler.swapKey[match];
      });
      console.log(finalString);
    })
    .catch(e => {
      console.log("Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer.");
      const error = new Error;
      error.message = e.message;
      error.stack = e.stack;
      throw error;
    });


  //     const finalString = input.replace(buildRegex(swapList), function(match){
  //       return swapKey[match];
  //     });
  //     console.log(finalString);
  //     return finalString;
  //   }
  //
  // } catch(e){
  //   console.log("Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer.");
  //   throw e;
  // }
};
module.exports = doSwap;
