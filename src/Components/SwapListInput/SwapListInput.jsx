import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SwapListInput.css";
class SwapListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      ["stringified-items"]: props.items.join("\n"),
      rawItems: props.items
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const target = event.target;
    if (target.name === "category") {
      await this.setState({
        [target.name]: target.value
      });
    } else if (target.name === "stringified-items") {
      await this.setState({
        [target.name]: target.value,
        rawItems: target.value.split("\n")
      });
    }

    this.props.updateSwapListItems(
      this.props.swapArrayIndex,
      this.state.category,
      this.state.rawItems
    );
  }

  render() {
    return (
      <div className="swap-list-input">
        <input
          className="swap-list-input__category"
          name="category"
          type="text"
          value={this.state.category}
          onChange={this.handleChange}
        />
        <textarea
          className="swap-list-input__content"
          name="stringified-items"
          value={this.state["stringified-items"]}
          onChange={this.handleChange}
        />
        <button
          className="swap-list__button"
          onClick={() => {
            this.props.removeCategory(this.props.swapArrayIndex);
          }}>
          {" "}
          <FontAwesomeIcon className="icon" icon="minus-circle" />
          <p className="button__icon-label">Remove Category</p>
        </button>
      </div>
    );
  }
}

export default SwapListInput;
