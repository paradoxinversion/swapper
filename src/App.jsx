import React from "react";
import ReactDOM from "react-dom";
import SwapListInput from "./Components/SwapListInput/SwapListInput";
import "./App.css";
const doSwap = require("./commands/doSwap");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swapListInputCount: Object.keys(props.swapList).length,
      swapList: props.swapList,
      swapArray: [],
      "user-prompt": "",
      output: ""
    };
  }

  updateSwapListItems(swapArrayIndex, newItems) {
    const originalSwapArray = this.state.swapArray;
    originalSwapArray[swapArrayIndex].items = newItems;
    this.setState({
      swapArray: originalSwapArray
    });
  }

  createSwapArray() {
    const swapArray = [];
    Object.keys(this.props.swapList).map((key, index) => {
      swapArray.push({
        category: key,
        items: this.props.swapList[key]
      });
    });
    this.setState({
      swapArray
    });
  }

  componentDidMount() {
    this.createSwapArray();
  }

  renderSwapListInputs() {
    return (
      <React.Fragment>
        {this.state.swapArray.map((category, index, array) => {
          return (
            <SwapListInput
              category={category.category}
              items={category.items}
              key={index}
              swapArrayIndex={index}
              updateSwapListItems={this.updateSwapListItems.bind(this)}
            />
          );
        })}
      </React.Fragment>
    );
  }
  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  async createFinalSwapList() {
    console.log(this.state.swapArray);
    const swapList = {};

    this.state.swapArray.forEach(category => {
      swapList[category.category] = category.items;
    });
    console.log(swapList);
    this.setState({
      output: await doSwap(this.state["user-prompt"], swapList)
    });
  }

  render() {
    return (
      <main>
        <h1>Swapper</h1>
        <p>Make your story prompts more personal</p>
        <p>{this.state.output}</p>
        <textarea
          name="user-prompt"
          value={this.state["user-prompt"]}
          onChange={this.handleChange.bind(this)}
        />
        <button onClick={this.createFinalSwapList.bind(this)}>Run</button>

        <div>{this.renderSwapListInputs()}</div>
      </main>
    );
  }
}

export default App;
