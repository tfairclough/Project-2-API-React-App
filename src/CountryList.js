import React, { Component } from "react";
import CountryDetails from "./CountryDetails";

export default class CountryList extends Component {
    render() {
        const allCountries = this.props.allCountries.map((country, index) => <CountryDetails country={country} key={index}/>)
        return (
            <>
                {allCountries}
            </>
        )
    }
}