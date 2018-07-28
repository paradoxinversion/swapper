const NoIdentifierError = require("../error/NoIdentifierError.js");
/**
 * Function to find and return only Unique Identifiers in an Array
 * Identifiers should come into this function as IdentifierX
 * @param {Array} uniqueIdentifierArray an Array of Identifiers
 * @returns {Array} an Array of Unique Identifiers
 * @throws {NoIdentifierError} There must be an array of Identifiers passed to the function
 */
const returnUniqueIdentifiers = uniqueIdentifierArray => {
  let processedIdentifiers = [];
  try {
    if (uniqueIdentifierArray === null || uniqueIdentifierArray === []) {
      throw new NoIdentifierError();
    } else {
      // ? Change to filter?
      uniqueIdentifierArray.forEach(function(element) {
        if (!processedIdentifiers.includes(element)) {
          processedIdentifiers.push(element);
        }
      });
      return processedIdentifiers;
    }
  } catch (e) {
    console.log(e.name, e.message);
    throw e;
  }
};

module.exports = returnUniqueIdentifiers;
