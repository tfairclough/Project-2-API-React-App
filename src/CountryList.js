import React, { Component } from "react";
import CountryRow from "./CountryRow";

export default class CountryList extends Component {
  
  render() {
    const allCountries = this.props.allCountries.map(
      (country, index) => <CountryRow country={country} key={index} faveToggle={this.props.faveToggle}/>)

      return (
        <>
          <ul>
            {allCountries}
          </ul>
        </>
        )
    }
}