import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SwapListInput.scss";
class SwapListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      ["stringified-items"]: props.items.join("\n"),
      rawItems: props.items
    };
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
  }
  async handleBlur(event) {
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
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
        <textarea
          className="swap-list-input__content"
          name="stringified-items"
          value={this.state["stringified-items"]}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
        <button
          className="icon-button"
          onClick={() => {
            if (
              window.confirm(
                `You're about to delete the "${
                  this.state.category
                }" category. Are you sure you want to do this?`
              )
            ) {
              this.props.removeCategory(this.props.swapArrayIndex);
            }
          }}>
          {" "}
          <FontAwesomeIcon icon="minus-circle" />
          <p className="icon-button__label">Remove Category</p>
        </button>
      </div>
    );
  }
}

export default SwapListInput;
