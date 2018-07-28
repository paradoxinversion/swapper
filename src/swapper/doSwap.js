const buildRegex = require("./buildRegex.js");
const returnUniqueIdentifiers = require("./returnUniqueIdentifiers.js");
const stripIdentifier = require("./stripIdentifier.js");
const getSwapItem = require("./getSwapItem.js");
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
    return finalString;
  } catch (e) {
    const error = new Error(
      "Something went wrong getting unique identifiers. Make sure you have at least one [IdentifierNameX] where IdentifierName is a key in swap-list.json and X is an integer."
    );
    error.message = e.message;
    error.stack = e.stack;
    throw error;
  }
};

module.exports = doSwap;
