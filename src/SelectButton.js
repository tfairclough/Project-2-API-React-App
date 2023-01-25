import React, { Component } from "react";

export default class SelectButton extends Component{

  handleFaveClick = (e) => {
    e.stopPropagation()
    this.props.starredToggle()
  }

  render() {
    const isSelected = (this.props.isSelected) ? 'selected' : 'not-selected'
    return (
      <div onClick={this.handleFaveClick} className={"fave-button " + isSelected} ></div>
    )
  }
}