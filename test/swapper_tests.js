const chai = require("chai");

const expect = chai.expect;
const buildRegex = require("../src/swapper/buildRegex");
const getSwapitem = require("../src/swapper/getSwapItem");
const returnUniqueIdentifiers = require("../src/swapper/returnUniqueIdentifiers");
const stripIdentifier = require("../src/swapper/stripIdentifier");
const doSwap = require("../src/swapper/doSwap");
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

  describe("returnUniqueIdentifiers()", function() {
    it("removes an array of identifiers with duplicates removed", function() {
      expect(returnUniqueIdentifiers(["person1", "person2", "person1"])).to.eql(
        ["person1", "person2"]
      );
    });
  });

  describe("stripIdentifier()", function() {
    const swapCategories = "person|place|thing|noun";

    it("removes the number from a given identifier, returning only the category", function() {
      expect(stripIdentifier("person1", swapCategories)).to.eql("person");
      expect(stripIdentifier("thing1", swapCategories)).to.eql("thing");
    });
  });

  describe("doSwap()", function() {
    it("replaces identifiers with items from a swap list", function() {
      expect(doSwap("[person1] is happy", { person: ["Bob"] })).to.eql(
        "Bob is happy"
      );
    });
  });
});
