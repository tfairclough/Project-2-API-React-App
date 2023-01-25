import React, { Component } from "react";
import CountrySearchDetail from "./CountrySearchDetails";
import SelectButton from "./SelectButton";

export default class CountryRow extends Component{
  render() {
    return (
      <div className='search-country-div'>
        <CountrySearchDetail country={this.props.country} />
        <SelectButton starredToggle={this.props.starredToggle} isStarred={this.props.isStarred}/>
      </div >        
    )
  }
}