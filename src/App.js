import React, { Component } from 'react'
import CountryList from './CountryList';
import StarredList from './StarredList';
import axios, { all } from 'axios';
import { useState } from 'react';

class App extends Component{
  constructor(props) {
    super(props)
    this.state ={
      input: '',
      allCountries: [],
      countriesToDisplay: [],
      starredList: [],
      removalList:[],
      inputVisibility: false,
      addNewCountry: {}
    }
    const [state, setState] = React.useState({
      firstName: "",
      lastName: ""
    })
  }


  componentDidMount = () => {
    const countryURL = 'https://restcountries.com/v3.1/all'
    axios.get(countryURL).then(response => (this.setState({allCountries: response.data, countriesToDisplay: response.data})))
  }

  inputHandler = (e) => {
    const textValue = e.target.value
    const filteredCountries = this.state.allCountries.filter((country) => this.checkAllCountryNamesBool(country, textValue))
    this.setState({
      input: textValue,
      countriesToDisplay: filteredCountries
    })
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
    this.updateStateList('inputVisibility', true)
  }

  addNewCountrySubmit = (e) => {
    this.updateStateList('inputVisibility', false)
  }

  clearAll = () => {
    this.updateStateList('starredList', [])
    this.updateStateList('removalList', [])
  }

  clearSelected = (e) => {
    e.stopPropagation();
    const remainingCountries = this.state.starredList.filter( country => !this.state.removalList.includes(country))
    this.updateStateList('removalList', [])
    this.updateStateList('starredList', remainingCountries)
  }


  toggleMethod(country, list, state) {
    const currentList = [...list];
    const countryIndex = currentList.indexOf(country);
    countryIndex >= 0 ? currentList.splice(countryIndex, 1) : currentList.push(country);
        this.updateStateList(state, currentList);
  }

  updateStateList(key, selected) {
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
                value={this.state.input} 
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
              <p className='pop-out-header'>New Country:</p>
              <div className='pop-out-fields'>
                <label>Name: <input type="text" name="name" id="name" className="text"></input></label>
                <label>Population: <input type="number" name="name" id="name" className="text"></input></label>
                <label>Subregion: <input type="text" name="name" id="name" className="text"></input></label>
                <label>Region: <input type="text" name="name" id="name" className="text"></input></label>
              </div>
              <div className='pop-out-fields'>
                <label>Upload Flag: <input type="file" className="text" name="filename"></input> </label>
                <label>Borders: <input type="text" name="name" id="name" className="text"></input></label>
                <label>Currencies: <input type="text" name="name" id="name" className="text"></input></label>
                <label>GoogleMap Link: <input type="text" name="name" id="name" className="text"></input></label>
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
