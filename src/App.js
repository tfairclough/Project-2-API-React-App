import React, { Component } from 'react'
import CountryList from './CountryList';
import StarredList from './StarredList';
import axios, { all } from 'axios';
import AddNewCountryPopUp from './AddNewCountryPopUp';

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


  componentDidMount = () => {
    const countryURL = 'https://restcountries.com/v3.1/all'
    axios.get(countryURL).then(response => (this.setState({allCountries: response.data, countriesToDisplay: response.data})))
  }

  inputHandler = (e) => {
    const textValue = e.target.value
    const filteredCountries = this.state.allCountries.filter((country) => this.checkAllCountryNamesBool(country, textValue))
    this.setState({
      searchInput: textValue,
      countriesToDisplay: filteredCountries
    })
  }
  
  handleNewCountryInput = (e) => {
    this.updateState(e.target.name, e.target.value)
  }
  handleFileUpload = (e) => {
    this.updateState(e.target.name, e.target.value)
    this.updateState('file', e.target.files[0])
  }

  checkAllCountryNamesBool = (country, textValue) => {
    const allNames = [country.name.common, country.name.official, ...country.altSpellings]
    return allNames.some(name => name.toLowerCase().includes(textValue.toLowerCase())) ? true : false
  }

  starredToggle = (country) => {
    this.toggleMethod(country, this.state.starredList, 'starredList')
  }


  selectedToggle = (country) => {
    this.toggleMethod(country, this.state.removalList, 'removalList');

  }

  addNewCountry = (e) => {
    this.setState({
      editMode: false
    })
    this.toggleInputScreenOn();
  }

  addNewCountrySubmit = () => {
    if (!this.state.editMode) {
      const newCountry = {
        name: {common: this.state.name},
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
      this.state.starredList.push(newCountry)
    } else {
      const countryToUpdate = this.state.allCountries.filter(obj => obj.flags.png === this.state.file)[0]
      countryToUpdate.name.common = this.state.name
      countryToUpdate.population = this.state.pop
      countryToUpdate.subregion =this.state.subregion
      countryToUpdate.region =this.state.region
      countryToUpdate.capital = [this.state.capital]
      countryToUpdate.car.side = this.state.drives
      countryToUpdate.currencies = {currency: this.state.currency}
      countryToUpdate.borders = [this.state.borders]
      countryToUpdate.maps.googleMaps = this.state.mapLink
    }
    this.toggleInputFieldOff();
    this.clearNewCountryState()
  }

  clearAll = () => {
    this.updateState('starredList', [])
    this.updateState('removalList', [])
  }

  clearSelected = (e) => {
    e.stopPropagation();
    const remainingCountries = this.state.starredList.filter( country => !this.state.removalList.includes(country))
    this.updateState('removalList', [])
    this.updateState('starredList', remainingCountries)
  }


  toggleInputFieldOff = () => {
    this.updateState('inputVisibility', false)
    this.clearNewCountryState()
  }

  editCountryDetails = (country) => {
    this.setState({
      editMode: true
    })
    this.populateStateWithCountryData(country)
  }

  toggleInputScreenOn() {
    this.updateState('inputVisibility', true);
  }

  populateStateWithCountryData(country) {
    this.setState({
      name: country.name.common,
      capital: country.capital,
      pop: country.population,
      subregion: country.subregion,
      region: country.region,
      fileName: '',
      drives: country.car.side,
      borders: ("borders" in country) ? country.borders.join(" / ") : 'Island',
      currency: ("currencies" in country) ? [...Object.keys(country.currencies).map(key => country.currencies[key].name)].join(" / "): '',
      mapLink: country.maps.googleMaps,
      file: country.flags.png
    })
    this.toggleInputScreenOn()
  }


  toggleMethod(country, list, state) {
    const currentList = [...list];
    const countryIndex = currentList.indexOf(country);
    countryIndex >= 0 ? currentList.splice(countryIndex, 1) : currentList.push(country);
        this.updateState(state, currentList);
  }

  updateState(key, selected) {
    this.setState({
      [key]: selected
    });
  }

  clearNewCountryState() {
    const resetStates = ['name', 'capital', 'pop', 'subregion', 'drives', 'region', 'fileName', 'borders', 'currency', 'mapLink', 'fileName']
    resetStates.forEach(state => this.updateState(state, ''))
  }
  
  render() {

    const inputVisibility = this.state.inputVisibility ? "visibile" : "invisible";
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
          <img src={require('./earth_logo.png')} height='80px'/>
          <h1 className='page-title'>Countries Dictionary</h1>
        </header>
        <main>
          <div className='country-search' >
            <h3>Search</h3>
            <form> 
              <div className='mag-img'></div>
              <input className='search-input'
                type='search' 
                placeholder='Search Country....'  
                value={this.state.searchInput} 
                onChange={this.inputHandler}></input>
              </form>
              {this.state.allCountries.length===0 ? <h1>Fetching.....</h1> 
                :<CountryList allCountries={this.state.countriesToDisplay} 
                              starredList={this.state.starredList} 
                              starredToggle={this.starredToggle}/>
                              }
          </div>
          <div className='country-info'>
            <StarredList starredList={this.state.starredList} 
                      clearAll={this.clearAll} 
                      clearSelected={this.clearSelected}
                      selectedToggle={this.selectedToggle}
                      addNewCountry={this.addNewCountry}
                      editCountryDetails={this.editCountryDetails}
                      />
          </div>
        </main>
        {this.state.inputVisibility && <AddNewCountryPopUp  newCountry={prepopulateInput}
                                                            editMode={this.state.editMode}
                                                            handleNewCountryInput={this.handleNewCountryInput}                                                            
                                                            addNewCountrySubmit={this.addNewCountrySubmit}
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
