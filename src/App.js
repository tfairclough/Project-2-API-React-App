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
      region: '',
      fileName: '',
      borders: '',
      currency: '',
      maplink: ''
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
    this.updateState('inputVisibility', true)
  }

  addNewCountrySubmit = (e) => {
    this.toggleInputFieldOff();
    const newCountry = {
      name: {common: this.state.name},
      population: this.state.pop,
      subregion: this.state.subregion,
      capital: [this.state.capital],
      region: this.state.region,
      maps:{googleMaps: this.state.maplink},
      borders: [this.state.borders],
      currencies: {currency: this.state.currency},
      flags: {png: URL.createObjectURL(this.state.file)}
    }
    this.state.starredList.push(newCountry)
    this.clearNewCountryState(newCountry)
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
    this.updateState('inputVisibility', false);
  }

  editCountryDetails = (country) => {
    console.log('test')
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

  clearNewCountryState(newCountry) {
    [...Object.keys(newCountry)].forEach((key) => this.updateState(key, ''))
    this.setState({
      fileName: ''
    })
  }
  
  render() {

    const inputVisibility = this.state.inputVisibility ? "visibile" : "invisible";
    const newCountry ={
        name: this.state.name,
        capital: this.state.capital,
        pop: this.state.pop,
        subregion: this.state.subregion,
        region: this.state.region,
        fileName: this.state.fileName,
        borders: this.state.borders,
        currency: this.state.currency,
        maplink: this.state.maplink
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
        {this.state.inputVisibility && <AddNewCountryPopUp  newCountry={newCountry}
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
