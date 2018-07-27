const chai = require("chai");

const expect = chai.expect;
const buildRegex = require("../src/utilities/buildRegex");
const getSwapitem = require("../src/utilities/getSwapItem");
describe("Swapper", function() {
  const testData = {
    person: ["Andrew", "Sarah", "Bruce", "Lisa"],

    place: ["City Hall", "Junior College", "Grocery Store", "Post Office"],

    thing: ["Letter", "Book", "Key", "Bag"],

    "sg:noun": ["person", "place", "thing"]
  };
  describe("buildRegex()", function() {
    const regexResult = buildRegex(testData);
    it("should return a regex string based on the keys found in json data", function() {
      expect(regexResult.regex.toString()).to.eql(
        /\[(person|place|thing|noun)\d\]/gi.toString()
      );
    });
    it("should return an array with each category", function() {
      expect(regexResult.swapCategories).to.include("person");
      expect(regexResult.swapCategories).to.include("place");
      expect(regexResult.swapCategories).to.include("thing");
    });
    it("should add swap groups (started with 'sg:' to their ownn property", function() {
      expect(regexResult.swapGroups).to.include("noun");
    });
  });

  describe("getSwapitem()", function() {
    it("returns a random swap item given a specific category", function() {
      expect(getSwapitem("person", testData)).to.be.oneOf([
        "Andrew",
        "Sarah",
        "Bruce",
        "Lisa"
      ]);
    });
  });
});
