import React, { Component } from "react";

export default class SelectButton extends Component{

  handleFaveClick = (e) => {
    e.stopPropagation()
    this.props.selectToggle()
  }

  render() {
    const isSelected = (this.props.isSelected) ? 'selected' : 'not-selected'
    console.log(isSelected)
    return (
      <div onClick={this.handleFaveClick} className={"fave-button " + isSelected} ></div>
    )
  }
}