import React, { Component } from 'react'
import CountryList from './CountryList';
import StarredList from './StarredList';
import axios, { all } from 'axios';
import AddNewCountryPopUp from './AddNewCountryPopUp';
import EarthLogo from './../Images/earth_logo.png'

class App extends Component{
  constructor(props) {
    super(props)
    this.state ={
      searchInput: '',
      allCountries: [],
      countriesToDisplay: [],
      starredList: [],
      removalList:[],
      inputVisibility: false,
      name: '',
      capital: '',
      pop: '',
      subregion: '',
      drives: '',
      region: '',
      fileName: '',
      mapLink: '',
      borders: '',
      currency: '',
      file: '',
      editMode: false
      }
    }

  // Retrieve allcountries from the API
  componentDidMount = () => {
    const countryURL = 'https://restcountries.com/v3.1/all'
    axios.get(countryURL).then(response => (this.setState({allCountries: response.data, countriesToDisplay: response.data})))
  }

  // Handles the search input text and filters the list accordingly
  searchInputHandler = (e) => {
    const textValue = e.target.value
    const filteredCountries = this.state.allCountries.filter((country) => this.checkAllCountryNamesBool(country, textValue))
    this.setState({
      searchInput: textValue,
      countriesToDisplay: filteredCountries
    })
  }
  
  // Handles the new page input feilds 
  handleNewCountryInput = (e) => {
    this.updateState(e.target.name, e.target.value)
  }

  // Handles the file upload retrieve
  handleFileUpload = (e) => {
    this.updateState(e.target.name, e.target.value)
    this.updateState('file', e.target.files[0])
  }

  // Check search input matches country name or alternative spellings  
  checkAllCountryNamesBool = (country, textValue) => {
    const allNames = [country.name.common, ...country.altSpellings]
    return allNames.some(name => name.toLowerCase().includes(textValue.toLowerCase())) ? true : false
  }

  // Handles the Star Button click
  starredToggleClick = (country) => {
    this.toggleObJFromSpecifiedStateList(country, this.state.starredList, 'starredList')
  }

  // Handles the CheckBox click
  selectedToggleClick = (country) => {
    this.toggleObJFromSpecifiedStateList(country, this.state.removalList, 'removalList');

  }

  // Handles the addNewCountry button click toglling the input page
  addNewCountryClick = (e) => {
    this.setState({
      editMode: false
    })
    this.toggleInputScreenOn();
  }

  // Generates a new country or updates and exisitng country on Submit
  inputPageSubmitClick = () => {
    if (!this.state.editMode) {
      const newCountry = {
        name: {common: this.state.name},
        altSpellings: [],
        population: this.state.pop,
        subregion: this.state.subregion,
        capital: [this.state.capital],
        region: this.state.region,
        maps: {googleMaps: this.state.mapLink},
        borders: [this.state.borders],
        car: {side: this.state.drives},
        currencies: {currency: {name: this.state.currency}},
        flags: {png: URL.createObjectURL(this.state.file)}
      }
      this.state.allCountries.push(newCountry)
      this.state.starredList.push(newCountry)
    } else {
      const countryToUpdate = this.state.allCountries.filter(obj => obj.flags.png === this.state.file)[0]
      this.editExistingCountryData(countryToUpdate);
    }
    this.toggleInputFieldOff();
    this.clearNewCountryState()
  }

  // Empties the starred and removal list
  clearAllClick = () => {
    this.updateState('starredList', [])
    this.updateState('removalList', [])
  }

  // Handles the clear selected click, removing selected countries
  clearSelectedClick = (e) => {
    e.stopPropagation();
    const remainingCountries = this.state.starredList.filter( country => !this.state.removalList.includes(country))
    this.updateState('removalList', [])
    this.updateState('starredList', remainingCountries)
  }
  
  // 
  editCountryDetailsClick = (country) => {
    this.updateState('editMode', true)
    this.populateStateWithCountryData(country)
  }

  // Closes the input field and empties required state
  toggleInputFieldOff = () => {
    this.updateState('inputVisibility', false)
    this.clearNewCountryState()
  }

  // Updates existing country data with new inputs
  editExistingCountryData(countryToUpdate) {
    countryToUpdate.altSpellings = []
    countryToUpdate.name = {common: this.state.name};
    countryToUpdate.population = this.state.pop;
    countryToUpdate.subregion = this.state.subregion;
    countryToUpdate.region = this.state.region;
    countryToUpdate.capital = [this.state.capital];
    countryToUpdate.car.side = this.state.drives;
    countryToUpdate.currencies = {currency: {name: this.state.currency}};
    countryToUpdate.borders = [this.state.borders];
    countryToUpdate.maps.googleMaps = this.state.mapLink;
  }

  // Opens input screen
  toggleInputScreenOn() {
    this.updateState('inputVisibility', true);
  }

  // On editing an exisitng country, pre-populates the input fields for the user to amend
  populateStateWithCountryData(country) {
    this.setState({
      name: country.name.common,
      capital: country.capital,
      pop: country.population,
      subregion: country.subregion,
      region: country.region,
      fileName: '',
      drives: country.car.side,
      borders: ('borders' in country) ? country.borders.join(' / ') : 'Island',
      currency: ('currencies' in country) ? [...Object.keys(country.currencies).map(key => country.currencies[key].name)].join(' / '): '',
      mapLink: country.maps.googleMaps,
      file: country.flags.png
    })
    this.toggleInputScreenOn()
  }

  // Adds or removes item from a specficed state list
  toggleObJFromSpecifiedStateList(country, list, state) {
    const currentList = [...list];
    const countryIndex = currentList.indexOf(country);
    countryIndex >= 0 ? currentList.splice(countryIndex, 1) : currentList.push(country);
        this.updateState(state, currentList);
  }

  // Updates a specified state with given value
  updateState(key, selected) {
    this.setState({
      [key]: selected
    });
  }

  // Clears all the states linked to the Adding/Editing a new Country
  clearNewCountryState() {
    const resetStates = ['name', 'capital', 'pop', 'subregion', 'drives', 'region', 'fileName', 'borders', 'currency', 'mapLink', 'file']
    resetStates.forEach(state => this.updateState(state, ''))
  }
  
  render() {
    // Checks if the input page is visible or not
    const inputVisibility = this.state.inputVisibility ? 'visibile' : 'invisible';

    // Updates object to pre-populate input page
    const prepopulateInput ={
        name: this.state.name,
        capital: this.state.capital,
        pop: this.state.pop,
        subregion: this.state.subregion,
        region: this.state.region,
        fileName: this.state.fileName,
        borders: this.state.borders,
        currency: this.state.currency,
        mapLink: this.state.mapLink,
        drives: this.state.drives
      }
    
    return (
      <>
        <header>
          <img src={EarthLogo} height='80px'/>
          <h1 className='page-title'>Countries Dictionary</h1>
        </header>
        <main>
          <div className='country-search' >
            <h3>Search...</h3>
            <form> 
              <div className='mag-img'></div>
              <input className='search-input'
                type='search' 
                placeholder='Search Country....'  
                value={this.state.searchInput} 
                onChange={this.searchInputHandler}></input>
              </form>
              {this.state.allCountries.length===0 ? <h1>Fetching.....</h1> 
                :<CountryList allCountries={this.state.countriesToDisplay} 
                              starredList={this.state.starredList} 
                              starredToggle={this.starredToggleClick}/>
                              }
          </div>
          <div className='country-info'>
            <StarredList starredList={this.state.starredList} 
                      clearAll={this.clearAllClick} 
                      clearSelected={this.clearSelectedClick}
                      selectedToggle={this.selectedToggleClick}
                      addNewCountry={this.addNewCountryClick}
                      editCountryDetails={this.editCountryDetailsClick}
                      />
          </div>
        </main>
        {this.state.inputVisibility && <AddNewCountryPopUp  newCountry={prepopulateInput}
                                                            editMode={this.state.editMode}
                                                            handleNewCountryInput={this.handleNewCountryInput}
                                                            addNewCountrySubmit={this.inputPageSubmitClick}
                                                            handleFileUpload={this.handleFileUpload}
                                                            toggleInputFieldOff={this.toggleInputFieldOff}/>}
        <footer>
          Designed by Tom Fairclough
        </footer>
      </>
    )
  }
}

export default App;
