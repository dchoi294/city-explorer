import React from 'react';
import axios from 'axios';
import Weather from './component/Weather'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      // cityData: [],
      cityLocation: {lan:0,lon:0},
      isError: false,
      isCity: false,
      errorMessage:'',
      weatherData:[]
    }
  };

  handleSubmitInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleWeather = async(event) => {
    try{
      let cityWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?cityName=$this.state.city}`);

    

      this.setState({
        weatherData:cityWeather.data,
        isError: false
      });
    } catch(error) {
      this.setState({
        isError: true,
        errorMessage: error +', '+ error.message
      })
      console.log('error: ', error)
      console.log('error.message: ', error.message);
    }
  }

  handleSubmit = async(event) => {
    try{
      event.preventDefault();

      let cityInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

      this.setState({
        cityLocation: cityInfo.data[0],
        isError: false
      })
      console.log(cityInfo.data[0]);
      console.log(this.state.cityLocation);

      this.handleWeather();
    } catch(error){
      this.setState({
        isError: true,
        errorMessage: error +', '+ error.message
      })
      console.log('error: ', error)
      console.log('error.message: ', error.message);
    }
  };


  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLocation.lat},${this.state.cityLocation.lon}&zoom=11`;

    let citygrid = <h2>lat: {this.state.cityLocation.lat}, lon: {this.state.cityLocation.lon}</h2>

    let map = this.state.isCity ? <img className="mapImg" src={mapURL} alt={this.state.city}/> : <></>

    return(
      <>
        <h1>City Explorer!!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className="searchBar" name="city" type="text" onChange={this.handleSubmitInput}/>
          </label>
          <button className="submitButton" type="submit">CITY!!!!</button>
        </form>
        {
          this.state.isError
            ? <div className="alert alert-primary" role="alert">
            This is a primary alert—check it out! {this.state.errorMessage}
          </div>
            : <></>
        }
          {
          <div>
            {map}
            {citygrid}
            <Weather cityName={this.state.city} weatherData={this.state.weatherData}/>
          </div>
          }
      </>
    );
  }
}

export default App;
