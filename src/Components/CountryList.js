import React, { Component } from 'react';
import CountryRow from './CountryRow';

export default class CountryList extends Component {
  
  render() {
    const allCountries = this.props.allCountries.map(
      (country, index) => <CountryRow country={country} 
                                      isStarred={this.props.starredList.includes(country)} 
                                      key={country.name.common} 
                                      starredToggle={() => this.props.starredToggle(country)}/>)

      return (
        <>
          <ul className='search-list'>
            {allCountries}
          </ul>
        </>
        )
    }
}