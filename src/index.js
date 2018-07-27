import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
const swapList = {
  person: ["Andrew", "Sarah", "Bruce", "Lisa"],
  place: ["City Hall", "Junior College", "Grocery Store", "Post Office"],
  thing: ["Letter", "Book", "Key", "Bag"],
  persontype: [
    "boss",
    "flirt",
    "businessman",
    "mentor",
    "authority figure",
    "mentor",
    "professor",
    "schemer",
    "thug"
  ],
  adjective: [
    "adventurous",
    "bull-headed",
    "boring",
    "charming",
    "deceitful",
    "energetic"
  ],
  "sg:noun": ["person", "place", "thing"],
  "sg:notperson": ["place", "thing"]
};

var mountNode = document.getElementById("app");
ReactDOM.render(<App swapList={swapList} />, mountNode);
