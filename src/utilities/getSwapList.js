const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const readFile = Promise.promisify(fs.readFile); // ? Consider 86'ing bluebird...
const dataPath = path.resolve(__dirname, "..", "swap-lists/swap-list.json");
/**
 * Returns an Object representing the swap list JSON.
 * @returns {Object} The Swap List Object
 * @throws {Error} Error if swap-list.json does not exist
 * @async
 */
module.exports = async () => {
  try {
    const swapListData = await readFile(dataPath);
    return JSON.parse(swapListData);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
