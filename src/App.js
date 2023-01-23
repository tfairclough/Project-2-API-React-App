import React, { Component } from 'react'
import CountryList from './CountryList';
import FaveList from './FaveList';
import axios

class App extends Component{
  constructor(props) {
    super(props)
    this.state ={
      input: '',
      allCountries: ['A','B', 'C'],
      faveList: ['A']
    }
  }

  componentDidMount = () => {
    const countryURL = 'https://restcountries.com/v3.1/all'
    axios.get(countryURL).then(response => (this.setState({allCountries: response.data})))
  }

  inputHandler = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleSubmitClick = (e) => {
    e.preventDefault()
    console.log('Test')
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
        <CountryList allCountries={this.state.allCountries}/>
        <FaveList faveList={this.state.faveList}/>
      </>
    )
  }
}

export default App;
