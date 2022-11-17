import React from 'react';

class Moive extends React.Component {

  render() {
    let movies = this.props.movies.map(movie => {
      return <li>{movie.title} ({movie.release_date})</li>
    })

    return (
      <>
        <h2>{this.props.cityName} movies</h2>
        <ul>
          {movies}
        </ul>
      </>
    );
  }
}

export default Moive;
