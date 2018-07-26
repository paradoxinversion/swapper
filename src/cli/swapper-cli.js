#!/usr/bin/env node
(async () => {
  const swapperController = require("../controller/swapperController");
  const inputStr = process.argv[2];
  const swapList = await swapperController.getSwapList();
  swapperController.doSwap(inputStr, swapList);
})();
