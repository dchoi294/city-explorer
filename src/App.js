import React from 'react';
import axios from 'axios';
// import Weather from './component/Weather'
// import Movies from './component/Movies';
import WeatherDay from './component/WeatherDay';
import Movie from './component/Movie';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      // cityData: [],
      cityLocation: { lan: 0, lon: 0 },
      isError: false,
      isCity: false,
      isMovie: false,
      errorMessage: '',
      weatherData: [],
      movieData: [],
      singleWeather: [],
    }
  };

  handleSubmitInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault();

      let cityInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      let cityWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchedLat=${cityInfo.data[0].lat}&searchedLon=${cityInfo.data[0].lon}`);
      let cityMovie = await axios.get(`${process.env.REACT_APP_SERVER}/movie?searchedCity=${this.state.city}`);

      let day = 1;

      let oneWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchedLat=${cityInfo.data[0].lat}&searchedLon=${cityInfo.data[0].lon}&days=${day}`);
      

      this.setState({
        cityLocation: cityInfo.data[0],
        weatherData: cityWeather.data,
        movieData: cityMovie.data,
        singleWeather: oneWeather,
        isError: false,
        isCity: true
      })
    } catch (error) {
      this.setState({
        isError: true,
        isCity: false,
        isMovie: false,
        errorMessage: error + ', ' + error.message
      })
      console.log('error: ', error)
      console.log('error.message: ', error.message);
    }
  };


  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLocation.lat},${this.state.cityLocation.lon}&zoom=11`;

    let citygrid = <h2>lat: {this.state.cityLocation.lat}, lon: {this.state.cityLocation.lon}</h2>

    let map = this.state.isCity ? <img className="mapImg" src={mapURL} alt={this.state.city} /> : <></>

    return (
      <>
        <header><h1>City Explorer!!</h1></header>
        <main>
          <div>
            <form className="submitSection" onSubmit={this.handleSubmit}>
              <label>
                <input className="searchBar" name="city" type="text" onChange={this.handleSubmitInput} />
              </label>
              <button className="submitButton" type="submit">CITY!!!!</button>
            </form>
          </div>
          {
            this.state.isError
              ? <div className="alert alert-primary" role="alert">
                This is a primary alert—check it out! {this.state.errorMessage}
              </div>
              : <></>
          }
          {
            <div className="positions">
              {citygrid}
              {map}
              {/* <Weather
                cityName={this.state.city}
                weatherData={this.state.weatherData}
                />
              <Movies
                cityName={this.state.city}
                movies={this.state.movieData}
              /> */}
              {this.state.weatherData.length &&
              <WeatherDay
                cityName={this.state.city}
                weatherData={this.state.weatherData}
                />
              }
              <Movie
                cityName={this.state.city}
                movie={this.state.movieData}
                />
            </div>
          }

        </main>
        <footer>
          <p>
            Photo by <a href="https://unsplash.com/@fotowei?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Wei Zeng</a> on <a href="https://unsplash.com/s/photos/city-background?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </p>
          &copy; Don Choi, 2022
        </footer>
      </>
    );
  }
}

export default App;
