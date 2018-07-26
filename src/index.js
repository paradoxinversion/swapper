import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./reset.css";
const swapList = {
  person: ["Andrew", "Sarah", "Bruce", "Lisa"],
  place: ["City Hall", "Junior College", "Grocery Store", "Post Office"],
  thing: ["Letter", "Book", "Key", "Bag"],
  "sg:noun": ["person", "place", "thing"],
  "sg:notperson": ["place", "thing"]
};

var mountNode = document.getElementById("app");
ReactDOM.render(<App swapList={swapList} />, mountNode);
