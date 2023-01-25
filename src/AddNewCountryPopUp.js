const AddNewCountryPopUp = (props) => {
  return (
    <div className={"pop-out-input " + props.inputVisibility}>
    <fieldset>
      <div className='pop-out-fields'>
        <label><p className='pop-out-header'>New Country:</p> <input type="text" 
                    name='name' 
                    value={props.newCountry.name} 
                    className="text name"
                    onChange={props.handleNewCountryInput}
                    required></input></label>
        <label>Population: <input type="number" 
                    name='pop' 
                    value={props.newCountry.pop} 
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
        <label>Subregion: <input type="text" 
                    name= 'subregion' 
                    value={props.newCountry.subregion} 
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
        <label>Region: <input type="text" 
                    name='region' 
                    value={props.newCountry.region} 
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
        <label>Capital: <input type="text" 
                    name='capital' 
                    value={props.newCountry.capital} 
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
      </div>
      <div className='pop-out-fields'>
        <label>Upload Flag: <input type="file" 
                    name='fileName' 
                    value={props.newCountry.fileName} 
                    className="text"
                    onChange={props.handleFileUpload}
                    required></input> </label>
        <label>Borders: <input type="text" 
                    name='borders' 
                    value={props.newCountry.borders}  
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
        <label>Currencies: <input type="text" 
                    name='currency' 
                    value={props.newCountry.currency} 
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
        <label>GoogleMap Link: <input type="text" 
                    name='maplink' 
                    value={props.newCountry.maplink} 
                    className="text"
                    onChange={props.handleNewCountryInput}></input></label>
      </div>
    </fieldset>
  <button onClick={props.addNewCountrySubmit}>Add New Country</button>
  <button onClick={props.toggleInputFieldOff}>Cancel</button>
</div>
  )
}

export default AddNewCountryPopUp