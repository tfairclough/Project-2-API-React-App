import React, { Component } from 'react';

export default class StarButton extends Component{

  handleStarClick = (e) => {
    e.stopPropagation()
    this.props.starredToggle()
  }

  render() {
    const isStarred = (this.props.isStarred) ? 'selected' : 'not-selected'
    return (
      <div onClick={this.handleStarClick} className={'fave-button ' + isStarred} ></div>
    )
  }
}