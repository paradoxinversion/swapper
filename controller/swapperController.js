const doSwap = require("../commands/doSwap");
const addCategory = require("../commands/addCategory");
const getSwapList = require("../utilities/getSwapList");
const swapperController = {
  "doSwap": doSwap,
  "addCategory": addCategory,
  "getSwapList": getSwapList
};

module.exports = swapperController;
