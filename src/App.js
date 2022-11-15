import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      isError: false
    }
  };

  handleSubmitInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleSubmit = async(event) => {
    try{
      event.preventDefault();

      let cityInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

      console.log(cityInfo.data[0]);

      this.setState({
        cityData: cityInfo.data[0],
        isError: false
      })
    } catch(error){
      this.setState({
        isError: true
      })
      console.log('error: ', error)
      console.log('error.message: ', error.message);
    }
  };


  render() {
    return(
      <>
        <h1>City Explorer!!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input name="city" type="text" onChange={this.handleSubmitInput}/>
          </label>
          <button type="submit">CITY!!!!</button>
        </form>
      </>
    );
  }
}

export default App;
