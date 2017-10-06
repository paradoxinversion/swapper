#!/usr/bin/env node
/*
  NODE REQUIREMENTS
*/
const buildRegex = require("./utilities/buildRegex.js");
const returnUniqueIdentifiers = require("./utilities/returnUniqueIdentifiers.js");
const stripIdentifier = require("./utilities/stripIdentifier.js");
const getSwapItem = require("./utilities/getSwapItem.js");
/*
  CUSTOM ERROR TYPES
*/
const NoIdentifierError = require("./error/NoIdentifierError.js");

/*
  INPUT & ARGS
*/
const inputStr = process.argv[2];
/**
* Swaps out Unique Identifiers in a string for predefined (but random) entries from a list
* @param {String} swap_category the category to choose from
* @returns {String} the substition
*/
const doSwap = function(){
  let uniqueIdentifiers; 
  let swapKey = {};
  console.log("Got prompt:", inputStr);
  try{
    uniqueIdentifiers = returnUniqueIdentifiers(inputStr.match(buildRegex()));
    if (uniqueIdentifiers instanceof NoIdentifierError){
      throw uniqueIdentifiers;
    } else{
      uniqueIdentifiers.forEach(function(element){
        swapKey[element] = getSwapItem(stripIdentifier(element));
      });
      const finalString = inputStr.replace(buildRegex(), function(match){
        return swapKey[match];
      });
      console.log(finalString);
      return finalString;
    }

  } catch(e){
    console.log("Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer.");
  }
};
console.log(process.argv[2]);
// switch (process.argv[2]){
//
// case typeof string:
//   doSwap();
//   break;
// }
doSwap();
