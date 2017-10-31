#!/usr/bin/env node
const swapperController = require("./controller/swapperController");
const inputStr = process.argv[2];
swapperController.doSwap(inputStr, swapperController.getSwapList());
