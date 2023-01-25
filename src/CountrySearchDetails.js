import React from "react";

const CountrySearchDetail = (props) => {
  return (
    <div>
      <img className='search-flag'src={props.country.flags.png}/>
      <p className='country-search-name'>{props.country.name.common}</p>
    </div>
  )
}

export default CountrySearchDetail