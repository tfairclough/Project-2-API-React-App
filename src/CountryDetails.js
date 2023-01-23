import React from "react";

const CountryDetails = (props) => {
  return (
    <>
      <h3>Country: {props.country.name.common}</h3>
      <p>Region: {props.country.region}</p>
      <img src={props.country.flags.png}/>
    </>
  )
}

export default CountryDetails