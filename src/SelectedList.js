import React, { Component } from "react";
import SelectedCountry from "./SelectedCountry";

export default class SelectedList extends Component {
  render() {
    const selectedList = this.props.selectedList.map((selectedCountry, index) => <SelectedCountry selectedCountry={selectedCountry} key={index}/>)
    return (
      <div>
        <h3>Explore the Countries....</h3>
        <button>Clear Selected</button>
        <button onClick={this.props.clearSelected}>Clear All</button>
        <ul className='country-details-list'>
          {selectedList}
        </ul>
      </div>
    )
  }
}