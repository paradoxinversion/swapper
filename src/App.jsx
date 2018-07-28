import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faPencilAlt,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import swapList from "./swapper/swap-lists/standard";
import SwapListInput from "./Components/SwapListInput/SwapListInput";

// import "./reset.css";
// import "./App.css";

library.add(
  faMinusCircle,
  faPlusCircle,
  faPencilAlt,
  faGithub,
  faTwitter,
  faLightbulb
);

const doSwap = require("./swapper/doSwap");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swapListInputCount: Object.keys(swapList).length,
      swapList: swapList,
      swapArray: [],
      "user-prompt": "",
      output: "",
      showAdvancedSettings: false
    };
  }

  async updateSwapListItems(swapArrayIndex, category, newItems) {
    const originalSwapArray = this.state.swapArray;
    originalSwapArray[swapArrayIndex].category = category;
    originalSwapArray[swapArrayIndex].items = newItems;

    await this.setState({
      swapArray: originalSwapArray
    });
  }

  createSwapArray() {
    const swapArray = [];
    Object.keys(swapList).map((key, index) => {
      swapArray.push({
        category: key,
        items: swapList[key]
      });
    });
    this.setState({
      swapArray
    });
  }

  componentDidMount() {
    this.createSwapArray();
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  async createFinalSwapList() {
    const swapList = {};

    this.state.swapArray.forEach(category => {
      swapList[category.category] = category.items;
    });

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
  }

  /**
   * Removes a category from the swap array
   */
  async removeCategory(swapArrayIndex) {
    console.log("Removing array index", swapArrayIndex);
    const originalSwapArray = this.state.swapArray;
    const remove = originalSwapArray.splice(swapArrayIndex, 1);
    console.log(originalSwapArray);
    this.setState({
      swapArray: originalSwapArray
    });
  }

  render() {
    return (
      <React.Fragment>
        <header id="main-header">
          <h1 className="title">Swapper</h1>
          <p className="subtitle margin-16-left-md">
            Make your story prompts more personal
          </p>
        </header>
        <main>
          <h2>What is Swapper?</h2>
          <p>
            Swapper is a tool to help you generate unique fictional scenarios
            and writing prompts. With it, you can easily randomize characters,
            archetypes, magical treasure (loot), places, events, and more. Your
            imagination is the limit!
          </p>
          <h2>Using Swapper</h2>
          <p>
            Making a prompt requires one thing: At least one placeholder in your
            text. <br /> Placeholders look like this: [person1].
          </p>
          <p>
            A placeholder is just the category you want to switch words with,
            followed by a unique number (they don't have to be consecutive),
            between square brackets. You can reuse placeholders for consistency.
          </p>
          <p>
            Click the example below to copy it to the text area, then click the
            button below to see Swapper in action!
          </p>
          <p
            className="example"
            onClick={() => {
              this.setState({
                "user-prompt": `[person1], a [adjective1] [persontype1] felt [feelings1] looking at the [thing1] in their hands, just given to them by their friend [person2]. [person1] decided they would go to the [placedescription1] [place1] to figure out what to do with it.`
              });
            }}>
            [person1], a [adjective1] [persontype1] felt [feelings1], looking at
            the [thing1] in their hands, given to them by their friend
            [person2]. [person1] decided they would go to the
            [placedescription1] [place1] to figure out what to do with it.
          </p>

          <textarea
            className="margin-16-bottom"
            name="user-prompt"
            value={this.state["user-prompt"]}
            onChange={this.handleChange.bind(this)}
          />
          <p>You can use any of the following available categories: </p>
          <p>
            {this.state.swapArray
              .map(category => {
                return category.category.startsWith("sg:", 0)
                  ? category.category.slice(3)
                  : category.category;
              })
              .join(", ")}
          </p>
          <button
            className="icon-button"
            onClick={() => {
              this.createFinalSwapList();
            }}>
            <FontAwesomeIcon icon="pencil-alt" />
            <p className="icon-button__label">Get your Prompt</p>
          </button>
          {this.state.output !== "" ? (
            <p id="output">{this.state.output}</p>
          ) : null}
          <div className="example margin-16-bottom">
            <p>
              You might get some of the same results more than once-- the
              default lists are small, so that's expected.
            </p>
            <p className="no-margin">
              There are some guidelines you can follow to make sure you have the
              best experience:
            </p>
            <ul>
              <li>Make sure you spell the name of the categories correctly</li>
              <li>
                Capitalization is important if you want consistency. [Person1]
                and [person1] both work and can be used in the same text, but
                will give you different results
              </li>
              <li>Do not include spaces in your Placeholders</li>
              <li>Only use Categories shown below the text area</li>
            </ul>
          </div>
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
                if (this.state.showAdvancedSettings === true) {
                  document
                    .getElementById("swap-list-area")
                    .classList.remove("hidden");
                } else {
                  document
                    .getElementById("swap-list-area")
                    .classList.add("hidden");
                }
              }}
            />{" "}
            <label htmlFor="advanced-settings"> Show Advanced Settings </label>
          </div>

          <div id="swap-list-area" className="swap-list-area hidden">
            <div>
              <div className="example">
                <p>
                  This is where you can set your own categories and lists to
                  swap values from.{" "}
                </p>
                <p>
                  The top section of each box is the name of the Swap Swap
                  Category is represents and the larger text box contains all of
                  the possible replacements. Make sure each item is on a
                  different line. Your changes will last until you relead the
                  page.{" "}
                </p>
                <p>
                  Don't worry if something breaks! You can always reload the
                  page and start fresh.{" "}
                </p>
                <p>
                  There are some guidelines you can follow to make sure you have
                  the best experience:
                </p>
                <ul>
                  <li>Don't end category names with numbers</li>
                  <li>
                    Don't use symbols or special characters (eg, "?, *, $") in
                    category names
                  </li>
                  <li>
                    If you want a category to refer to multiple other categories
                    (like Noun referring to Person, Place, and Thing), add "sg:"
                    before the category name.
                  </li>
                </ul>
              </div>
              <button
                className="icon-button"
                onClick={this.addCategory.bind(this)}>
                <FontAwesomeIcon icon="plus-circle" />{" "}
                <p className="icon-button__label">Add Category</p>
              </button>
            </div>

            {this.state.swapArray.map((category, index, array) => {
              return (
                <SwapListInput
                  category={category.category}
                  items={category.items}
                  key={category.category}
                  swapArrayIndex={index}
                  updateSwapListItems={this.updateSwapListItems.bind(this)}
                  removeCategory={this.removeCategory.bind(this)}
                />
              );
            })}
          </div>
        </main>
        <footer>
          <a
            className="icon-link"
            href="https://github.com/paradoxinversion/swapper"
            target="_blank">
            <FontAwesomeIcon
              className="margin-16-left"
              icon={["fab", "github"]}
            />{" "}
            <p className="margin-16-left">Fork me on Github</p>
          </a>
          <p className="no-margin">Created by Jedai Saboteur, 2018</p>
          <a
            className="icon-link"
            href="https://twitter.com/jedaisaboteur"
            target="_blank">
            <p className="no-margin">Follow Jedai on Twitter</p>
            <FontAwesomeIcon
              className="margin-16-left"
              icon={["fab", "twitter"]}
            />{" "}
          </a>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
