import React, { Component } from "react";
import CountrySearchDetail from "./CountrySearchDetails";
import StarButton from "./StarButton";

export default class CountryRow extends Component{
  render() {
    return (
      <div className='search-country-div'>
        <CountrySearchDetail country={this.props.country} />
        <StarButton starredToggle={this.props.starredToggle} isStarred={this.props.isStarred}/>
      </div >        
    )
  }
}