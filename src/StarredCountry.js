import React from "react"

const StarredCountry = (props) => {
  return (
    <div>  
      <div className='country-details-container'>
        <img className='flag' src={props.country.flags.png}/>
        <h2 className='country-title'>{props.country.name.common}</h2>
        <input onClick={props.selectedToggle} className='checkbox' type='checkbox'></input>
      </div>
      <div className='country-info'>
          <h5 className='detail-text-format'><span>Population:  </span> {props.country.population}</h5>
          <h5 className='detail-text-format'><span>Capital: </span>
                          {("capital" in props.country) ? props.country.capital[0] : 
                          ''}</h5>
          <h5 className='detail-text-format'><span>Subregion: </span> 
                          {("subregion" in props.country) ? 
                          props.country.subregion :
                          ''}</h5>
          <h5 className='detail-text-format'><span>Region: </span> 
                          {("region" in props.country) ? 
                          props.country.region :
                          ''}</h5>
        </div>
        <div className='country-info'>
          <h5 className='detail-text-format'><span>Borders: </span>
                          {("borders" in props.country) ? props.country.borders.join(" / ") : 
                          'Island'}</h5>
          <h5 className='detail-text-format'><span>Drives: </span>
                          {("car" in props.country) ? props.country.car.side : 
                          ''}</h5>
          <h5 className='detail-text-format'><span>Currencies: </span> 
                          {("currencies" in props.country) ? 
                          [...Object.keys(props.country.currencies).map(key => props.country.currencies[key].name)].join(" / ") :
                          ''}</h5>
          <h5 className='detail-text-format'><span>GoogleMaps: </span>  
                          {("maps" in props.country) ? 
                          <a href={props.country.maps.googleMaps}>{props.country.name.common}</a> :
                          ''}</h5>
        </div>
    </div>
  )
}

export default StarredCountry