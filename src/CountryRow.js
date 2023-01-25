import React, { Component } from "react";
import CountrySearchDetail from "./CountrySearchDetails";
import FaveButton from "./FaveButton";

export default class CountryRow extends Component{
  render() {
    return (
      <div className='reduced-detail-country-div'>
        <CountrySearchDetail country={this.props.country}/>
        <FaveButton faveToggle={() => this.props.faveToggle(this.props.country)}/>
      </div >        
    )
  }
}