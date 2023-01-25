import React from "react"

const SelectedCountry = (props) => {
  return (   
    <div className='country-details-container'>
      <img className='flag' src={props.selectedCountry.flags.png}/>
      <h2 className='country-title'>{props.selectedCountry.name.common}</h2>
      <div>
        
      </div>
    </div>
  )
}

export default SelectedCountry