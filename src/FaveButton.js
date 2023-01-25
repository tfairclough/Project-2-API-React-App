import React, { Component } from "react";

export default class FaveButton extends Component{

  handleFaveClick = (e) => {
    e.stopPropagation()
    this.props.faveToggle()
  }

  render() {
    return (
      <div className='fave-button-off' onClick={this.handleFaveClick}></div>
    )
  }
}