import React, { Component } from "react";
import FaveCountry from "./FaveCountry";

export default class FaveList extends Component {
  render() {
    const faveList = this.props.faveList.map((faveCountry, index) => <FaveCountry faveCountry={faveCountry} key={index}/>)
    return (
      <>
        <h3>Favourite List</h3>
        <ul>
          {faveList}
        </ul>
      </>
    )
  }
}