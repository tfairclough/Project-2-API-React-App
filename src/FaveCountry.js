import React from "react"

const FaveCountry = (props) => {
  return (   
    <h5>Country: {props.selectedCountry.name.common}</h5>
  )
}

export default FaveCountry