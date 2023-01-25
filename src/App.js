import React, { Component } from 'react'
import CountryList from './CountryList';
import StarredList from './StarredList';
import axios, { all } from 'axios';

class App extends Component{
  constructor(props) {
    super(props)
    this.state ={
      input: '',
      allCountries: [],
      countriesToDisplay: [],
      starredList: [],
      removalList:[]
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

  clearAll = () => {
    this.updateStateList('starredList', [])
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
                      />
          </div>
        </main>
        <footer>
          Designed by Tom Fairclough
        </footer>
      </>
    )
  }
}

export default App;
