import React, { Component } from "react";
import CountryDetails from "./CountryDetails";

export default class CountryRow extends Component{
  render() {
    return (
      <CountryDetails country={this.props.country}/>
      // <Fave>

        
    )
  }
}