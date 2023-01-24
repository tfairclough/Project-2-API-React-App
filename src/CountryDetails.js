import React from "react";

const CountryDetails = (props) => {
  return (
    <div>
      <img src={props.country.flags.png}/>
      <p>{props.country.name.common}</p>
    </div>
  )
}

export default CountryDetails