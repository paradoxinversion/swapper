const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const readFile = Promise.promisify(fs.readFile); // ? Consider 86'ing bluebird...
/**
 * Reads a (swap list) JSON file at the datapath and returns the parsed JS object.
 * @returns {Object} The Swap List Object
 * @throws {Error} Error if swap-list.json does not exist
 * @async
 */
module.exports = async dataPath => {
  try {
    const swapListData = await readFile(dataPath);
    return JSON.parse(swapListData);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
