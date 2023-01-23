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
      faveList: []
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

  handleSubmitClick = (e) => {
    e.preventDefault()
    
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



  render() {
    return (
      <>
      <h1>Countries Dictionary</h1>
        <form> 
          <input 
            type='text' 
            placeholder='Country Name....'  
            value={this.state.input} 
            onChange={this.inputHandler}></input>
          <button onClick={this.handleSubmitClick}>Submit</button>
        </form>
        {this.state.allCountries.length===0 ? <h1>Fetching.....</h1> 
          : <>
            <CountryList allCountries={this.state.countriesToDisplay} faveToggle={this.faveToggle}/>
            <FaveList faveList={this.state.faveList}/>
          </>}
        
      </>
    )
  }
}

export default App;
