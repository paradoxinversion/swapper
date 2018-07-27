const buildRegex = require("../utilities/buildRegex.js");
const returnUniqueIdentifiers = require("../utilities/returnUniqueIdentifiers.js");
const stripIdentifier = require("../utilities/stripIdentifier.js");
const getSwapItem = require("../utilities/getSwapItem.js");
const NoIdentifierError = require("../error/NoIdentifierError.js");

const doSwap = (inputStr, swapList) => {
  try {
    const swapCategoryRegex = buildRegex(swapList);
    let swapIdentifiers = returnUniqueIdentifiers(
      inputStr.match(swapCategoryRegex.regex)
    );
    const swapKey = {};
    if (swapIdentifiers instanceof NoIdentifierError) {
      throw swapIdentifiers;
    } else {
      swapIdentifiers.forEach(fullIdentifier => {
        const strippedIdentifier = stripIdentifier(
          fullIdentifier,
          swapCategoryRegex.swapCategories
        );
        console.log("fully stripped", strippedIdentifier);
        if (swapCategoryRegex.swapGroups.includes(strippedIdentifier)) {
          let randomSwapCategoryIndex = Math.floor(
            Math.random() * swapList[`sg:${strippedIdentifier}`].length
          );
          const category =
            swapList[`sg:${strippedIdentifier}`][randomSwapCategoryIndex];
          swapKey[fullIdentifier] = getSwapItem(category, swapList);
        } else {
          swapKey[fullIdentifier] = getSwapItem(strippedIdentifier, swapList);
        }
      });
    }
    const finalString = inputStr.replace(swapCategoryRegex.regex, function(
      match
    ) {
      return swapKey[match];
    });
    console.log(finalString);
    return finalString;
  } catch (e) {
    console.log(
      "Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer."
    );
    const error = new Error();
    error.message = e.message;
    error.stack = e.stack;
    throw error;
  }
};

module.exports = doSwap;
