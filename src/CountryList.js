import React, { Component } from "react";
import CountryDetails from "./CountryDetails";

export default class CountryList extends Component {
    render() {
        return (
            <>
                <CountryDetails/>
                <CountryDetails/>
                <CountryDetails/>
            </>
        )
    }
}