import React, { Component } from 'react'
import CountryList from './CountryList';

class App extends Component{
  constructor(props) {
    super(props)
    this.state ={
      input: '',
      allCountries: ['A','B', 'C']
    }
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
        <CountryList allCountries ={this.state.allCountries}/>
      </>
    )
  }
}

export default App;
