import React from "react"

const SelectedCountry = (props) => {
  return (   
    <h5>Country: {props.selectedCountry.name.common}</h5>
  )
}

export default SelectedCountry