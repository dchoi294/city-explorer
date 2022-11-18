import React from 'react';

class WeatherDay extends React.Component {
  
  render() {
    let weather = [];

    let weathers =this.props.weatherData.map((event, index) => {
      return<h3 key={index}>{event.date}: {event.description}</h3>;
    });

    weather = weathers[0];

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
