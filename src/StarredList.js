import React, { Component } from "react";
import StarredCountry from "./StarredCountry";

export default class StarredList extends Component {
  render() {
    const selectedList = this.props.starredList.map((country, index) => <StarredCountry 
                                                                                country={country} 
                                                                                key={country.name.common}
                                                                                selectedToggle={(e) => this.props.selectedToggle(country)}/>)
    return (
      <div className='country-detail'>
        <h3>Explore the Countries....</h3>
        <button onClick={this.props.clearSelected}>Clear Selected</button>
        <button onClick={this.props.clearAll}>Clear All</button>
        <ul className='country-details-list'>
          {selectedList}
        </ul>
      </div>
    )
  }
}