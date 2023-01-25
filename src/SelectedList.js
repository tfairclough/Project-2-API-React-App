import React, { Component } from "react";
import SelectedCountry from "./SelectedCountry";

export default class SelectedList extends Component {
  render() {
    const selectedList = this.props.selectedList.map((selectedCountry, index) => <SelectedCountry selectedCountry={selectedCountry} key={index}/>)
    return (
      <>
        <h3>Favourite List</h3>
        <ul>
          {selectedList}
        </ul>
        <button>Clear Selected</button>
        <button onClick={this.props.clearSelected}>Clear All</button>
      </>
    )
  }
}