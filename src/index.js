import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./reset.css";
import "./App.css";
const root = document.getElementById("app");
ReactDOM.render(<App />, root);
