const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;
const buildRegex = require("../utilities/buildRegex");
const getSwapList = require("../utilities/getSwapList");
const getSwapitem = require("../utilities/getSwapItem");
describe("Swapper", function(){
  const testData = {
    "person": [
      "Andrew",
      "Sarah",
      "Bruce",
      "Lisa"
    ],

    "place": [
      "City Hall",
      "Junior College",
      "Grocery Store",
      "Post Office"
    ],

    "thing": [
      "Letter",
      "Book",
      "Key",
      "Bag"
    ]
  };
  describe("buildRegex()", function(){
    it ("should return a regex string based on the keys found in json data", function(){
      return expect(buildRegex(testData).then(regexResult => regexResult.toString())).to.eventually.eql((/\[(person|place|thing)\d\]/gi).toString());
    });
  });

  describe("getSwapList", function(){
    it("should return person for index 0", function(){
      return expect(getSwapList().then(swapListData => Object.getOwnPropertyNames(swapListData)[0])).to.eventually.eql("person");
    });
    it("should return Andrew for index [0][0]", function(){
      return expect(getSwapList().then(swapListData => swapListData["person"][0])).to.eventually.eql("Andrew");

    });
  });

  describe("getSwapitem()", function(){
    it ("", function(){
      return expect(buildRegex(testData).then(regexResult => regexResult.toString())).to.eventually.eql((/\[(person|place|thing)\d\]/gi).toString());
    });
  });
});
