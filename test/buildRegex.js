const expect = require("chai").expect;
const buildRegex = require("../utilities/buildRegex");
describe("buildRegex", function(){
  it ("should return a regex string based on the keys found in json data", function(){
    //Let's make sure our regex is the same by coercing the test case and actual results to str
    let regex = buildRegex();
    expect(regex.toString()).to.equal((/\[(person|place|thing)\]\d/gi).toString());
  });
});
