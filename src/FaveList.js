import React, { Component } from "react";
import FaveCountry from "./FaveCountry";

export default class FaveList extends Component {
  render() {
    const faveList = this.props.selectedList.map((selectedCountry, index) => <FaveCountry selectedCountry={selectedCountry} key={index}/>)
    return (
      <>
        <h3>Favourite List</h3>
        <ul>
          {faveList}
        </ul>
        <button>Clear Selected</button>
        <button onClick={this.props.clearFaves}>Clear All</button>
      </>
    )
  }
}