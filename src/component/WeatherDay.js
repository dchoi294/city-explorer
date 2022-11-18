import React from 'react';

class WeatherDay extends React.Component {
  
  render() {
    let weather = this.props.weatherData;

    return (
      <>
        <h2>{this.props.cityName} weather</h2>
        <ul>
          {weather}
        </ul>
      </>
    );
  }
}

export default WeatherDay;
