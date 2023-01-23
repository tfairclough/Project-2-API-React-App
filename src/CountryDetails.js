import React from "react";

const CountryDetails = (props) => {
  return (
    <>
      <h5>Country: {props.country.name.common}</h5>
      <p>Region: {props.country.region}</p>
      <img src={props.country.flags.png}/>
    </>
  )
}

export default CountryDetails