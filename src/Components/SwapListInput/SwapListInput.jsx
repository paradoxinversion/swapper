import React, { Component } from "react";
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

  handleChange(event) {
    // when something is modified, we should set the changes to an array if there is a newline
    const target = event.target;
    this.setState({
      [target.name]: target.value,
      rawItems: target.value.split("\n")
    });
    this.props.updateSwapListItems(
      this.props.swapArrayIndex,
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
      </div>
    );
  }
}

export default SwapListInput;
