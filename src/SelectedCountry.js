import React from "react"

const SelectedCountry = (props) => {
  return (
    <div>  
      <div className='country-details-container'>
        <img className='flag' src={props.selectedCountry.flags.png}/>
        <h2 className='country-title'>{props.selectedCountry.name.common}</h2>
      </div>
      <div className='country-info'>
          <h5 className='detail-text-format'><span>Population:  </span> {props.selectedCountry.population}</h5>
          <h5 className='detail-text-format'><span>Capital: </span>
                          {("capital" in props.selectedCountry) ? props.selectedCountry.capital[0] : 
                          ''}</h5>
          <h5 className='detail-text-format'><span>Currencies: </span> 
                          {("currencies" in props.selectedCountry) ? 
                          [...Object.keys(props.selectedCountry.currencies).map(key => props.selectedCountry.currencies[key].name)].join(" / ") :
                          ''}</h5>
          <h5 className='detail-text-format'><span>Languages: </span>  
                          {("languages" in props.selectedCountry) ? 
                          [...Object.keys(props.selectedCountry.languages).map(key => props.selectedCountry.languages[key])].join(" / ") :
                          ''}</h5>
        </div>
        <div className='country-info'>
          <h5 className='detail-text-format'><span>Population:  </span> {props.selectedCountry.population}</h5>
          <h5 className='detail-text-format'><span>Capital: </span>
                          {("capital" in props.selectedCountry) ? props.selectedCountry.capital[0] : 
                          ''}</h5>
          <h5 className='detail-text-format'><span>Currencies: </span> 
                          {("currencies" in props.selectedCountry) ? 
                          [...Object.keys(props.selectedCountry.currencies).map(key => props.selectedCountry.currencies[key].name)].join(" / ") :
                          ''}</h5>
          <h5 className='detail-text-format'><span>Languages: </span>  
                          {("languages" in props.selectedCountry) ? 
                          [...Object.keys(props.selectedCountry.languages).map(key => props.selectedCountry.languages[key])].join(" / ") :
                          ''}</h5>
        </div>
    </div>
  )
}

export default SelectedCountry