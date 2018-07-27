import React from "react";
import ReactDOM from "react-dom";
import SwapListInput from "./Components/SwapListInput/SwapListInput";
import "./reset.css";

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
      output: "",
      showAdvancedSettings: false
    };
  }

  updateSwapListItems(swapArrayIndex, category, newItems) {
    const originalSwapArray = this.state.swapArray;
    originalSwapArray[swapArrayIndex].category = category;
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
              removeCategory={this.removeCategory.bind(this)}
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

  /**
   * Adds a category to the swap array
   */
  addCategory() {
    const originalSwapArray = this.state.swapArray;
    originalSwapArray.push({ category: "", items: [] });
    this.setState({
      swapArray: originalSwapArray
    });
    console.log(originalSwapArray);
  }

  /**
   * Removes a category from the swap array
   */
  removeCategory(swapArrayIndex) {
    const originalSwapArray = this.state.swapArray;
    const remove = originalSwapArray.splice(swapArrayIndex, 1);
    console.log(remove);
    this.setState({
      swapArray: originalSwapArray
    });
    console.log(originalSwapArray);
  }

  render() {
    return (
      <main>
        <h1 className="title">Swapper</h1>
        <p>Make your story prompts more personal</p>
        <p>
          Swapper is tool to help you generate unique fictional scenarios and
          writing prompts using reqular text with some special markup.
        </p>
        <p>
          Prompts require at least one <strong>Identifier</strong>. That's just
          the name of the Category you want to swap in, followed by a number,
          wrapped in square brackets (eg, [Person1]). For a quick example, click
          the sentence below to copy in into the text area and then click "Get
          your Prompt".
        </p>
        <p
          className="example"
          onClick={() => {
            this.setState({
              "user-prompt":
                "[person1] went to a concert with [person2] and they found a [thing1]. [person1] congratulated [person2] for their keen eye!"
            });
          }}>
          [person1] went to a concert with [person2] and they found a [thing1].
          [person1] congratulated [person2] for their keen eye!
        </p>
        <div className="example">
          <p>
            There are some guidelines you can follow to make sure you have the
            best experience:
          </p>
          <ul>
            <li>Make sure you spell the name of the categories correctly</li>
            <li>
              Capitalization is important if you want consistency. [Person1] and
              [person1] both work and can be used in the same text, but will
              give you different results
            </li>
            <li>Do not include spaces in your Identifiers</li>
            <li>Only use Categories shown below the text area</li>
          </ul>
        </div>
        <textarea
          name="user-prompt"
          value={this.state["user-prompt"]}
          onChange={this.handleChange.bind(this)}
        />
        <p>
          You can use any of the following available categories:{" "}
          {this.state.swapArray
            .map(category => {
              return category.category.startsWith("sg:", 0)
                ? category.category.slice(3)
                : category.category;
            })
            .join(", ")}
        </p>
        <button onClick={this.createFinalSwapList.bind(this)}>
          Get your Prompt
        </button>
        {this.state.output !== "" ? (
          <p id="output">{this.state.output}</p>
        ) : null}
        <div className="checkbox-container">
          <input
            name="advanced-settings"
            className="checkbox"
            id="advanced-settings"
            type="checkbox"
            onClick={async () => {
              await this.setState(prevState => ({
                showAdvancedSettings: !prevState.showAdvancedSettings
              }));
              console.log(this.state.showAdvancedSettings);
              if (this.state.showAdvancedSettings === true) {
                document
                  .getElementById("swap-list-area")
                  .classList.remove("swap-list-area--hidden");
              } else {
                document
                  .getElementById("swap-list-area")
                  .classList.add("swap-list-area--hidden");
              }
            }}
          />{" "}
          <label htmlFor="advanced-settings"> Show Advanced Settings </label>
        </div>

        <div
          id="swap-list-area"
          className="swap-list-area swap-list-area--hidden">
          <div className="example">
            <p>
              This is where you can set your own categories and lists to swap
              values from.{" "}
            </p>
            <p>
              The top section of each box is the name of the Swap Swap Category
              is represents and the larger text box contains all of the possible
              replacements. Make sure each item is on a different line. Your
              changes will last until you relead the page.{" "}
            </p>
            <p>
              Don't worry if something breaks! You can always reload the page
              and start fresh.{" "}
            </p>
            <p>
              There are some guidelines you can follow to make sure you have the
              best experience:
            </p>
            <ul>
              <li>Don't use numbers (ie, 5awesomethings, c00lstuff)</li>
              <li>
                Don't use spaces, dashes, or underscores in category names
              </li>
            </ul>
          </div>
          <button onClick={this.addCategory.bind(this)}>Add Category</button>
          {this.renderSwapListInputs()}
        </div>
      </main>
    );
  }
}

export default App;
