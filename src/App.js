import React, { Component } from 'react'
import CountryList from './CountryList';
import FaveList from './FaveList';
import axios, { all } from 'axios';

class App extends Component{
  constructor(props) {
    super(props)
    this.state ={
      input: '',
      allCountries: [],
      countriesToDisplay: [],
      faveList: [],
      faveSelection:[]
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

  faveToggle = (country) => {
    const faves = [...this.state.faveList]
    const countryIndex = faves.indexOf(country)

    countryIndex >= 0 ? faves.splice(countryIndex,1) : faves.push(country)

    this.setState({
      faveList: faves
    })
  }

  clearFaves = () => {
    this.setState({
      faveList: []
    })
  }

  removeSelectedFaves =() => {
    console.log('test')
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
                :<CountryList allCountries={this.state.countriesToDisplay} faveToggle={this.faveToggle}/>}
          </div>
          <div className='country-info'>
            <FaveList faveList={this.state.faveList} 
                      clearFaves={this.clearFaves} 
                      removeSelectedFaves={this.removeSelectedFaves}
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
