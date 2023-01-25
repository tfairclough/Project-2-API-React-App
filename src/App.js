import React, { Component } from 'react'
import CountryList from './CountryList';
import StarredList from './StarredList';
import axios, { all } from 'axios';

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
      pop: 0,
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
    this.updateState('inputVisibility', false)
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
    console.log(newCountry)
    this.state.starredList.push(newCountry)
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

  
  render() {

    const inputVisibility = this.state.inputVisibility ? "visibile" : "invisible";
    
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
                :<CountryList allCountries={this.state.countriesToDisplay.slice(0, 10)} 
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
                      />
          </div>
        </main>
        <div className={"pop-out-input " + inputVisibility}>
            <fieldset>
              
              <div className='pop-out-fields'>
                <label><p className='pop-out-header'>New Country:</p> <input type="text" 
                            name='name' 
                            value={this.state.name} 
                            className="text name"
                            onChange={this.handleNewCountryInput}></input></label>
                <label>Population: <input type="number" 
                            name='pop' 
                            value={this.state.pop} 
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
                <label>Subregion: <input type="text" 
                            name= 'subregion' 
                            value={this.state.subregion} 
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
                <label>Region: <input type="text" 
                            name='region' 
                            value={this.state.region} 
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
                <label>Capital: <input type="text" 
                            name='capital' 
                            value={this.state.capital} 
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
              </div>
              <div className='pop-out-fields'>
                <label>Upload Flag: <input type="file" 
                            name='fileName' 
                            value={this.state.fileName} 
                            className="text"
                            onChange={this.handleFileUpload}></input> </label>
                <label>Borders: <input type="text" 
                            name='borders' 
                            value={this.state.borders}  
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
                <label>Currencies: <input type="text" 
                            name='currency' 
                            value={this.state.currency} 
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
                <label>GoogleMap Link: <input type="text" 
                            name='maplink' 
                            value={this.state.maplink} 
                            className="text"
                            onChange={this.handleNewCountryInput}></input></label>
              </div>
            </fieldset>
          <button onClick={this.addNewCountrySubmit}>Add New Country</button>
        </div>
        <footer>
          Designed by Tom Fairclough
        </footer>
      </>
    )
  }
}

export default App;
