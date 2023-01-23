import React, { Component } from "react";
import CountryRow from "./CountryRow";

export default class CountryList extends Component {
  
  render() {
    const allCountries = this.props.allCountries.map((country, index) => <CountryRow country={country} key={index}/>)

      return (
        <>
          <h1>Countries</h1>
          <ul>
            {allCountries}
          </ul>
        </>
        )
    }
}