import React from 'react';

class Weather extends React.Component {
  render() {
    let weathers = [];

    this.props.weatherData.forEach((event, index) => {
      weathers.push(<h3 key={index}>{event.date}: {event.description}</h3>);
    });

    return (
      <>
        <h2>{this.props.cityName} weathers</h2>
        <ul>
          {weathers}
        </ul>
      </>
    );
  }
}

export default Weather;
