import React, { Component } from "react";
import CountryRow from "./CountryRow";

export default class CountryList extends Component {
  
  render() {
    const allCountries = this.props.allCountries.map(
      (country, index) => <CountryRow country={country} 
                                      isSelected={this.props.selectedList.includes(country)} 
                                      key={index} 
                                      selectToggle={() => this.props.selectToggle(country)}/>)

      return (
        <>
          <ul className='search-list'>
            {allCountries}
          </ul>
        </>
        )
    }
}