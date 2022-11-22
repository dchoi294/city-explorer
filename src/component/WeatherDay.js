import React from 'react';

class WeatherDay extends React.Component {
  
  render() {
    let weather = this.props.weatherData;

    return (
      <>
        <ul>
          {weather.date} will be {weather.description}
        </ul>
      </>
    );
  }
}

export default WeatherDay;
