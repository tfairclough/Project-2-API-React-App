import React, { Component } from "react";
import CountryDetails from "./CountryDetails";
import FaveButton from "./FaveButton";

export default class CountryRow extends Component{
  render() {
    return (
      <>
        <CountryDetails country={this.props.country}/>
        <FaveButton faveToggle={() => this.props.faveToggle(this.props.country)}/>
      </>        
    )
  }
}