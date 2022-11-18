import React from 'react';

class Movie extends React.Component {

  render() {
    let oneMovie = [];
    
    let cityMovies = this.props.movie.map((movie,index) => (
      <li key={index}>{movie.title} ({`${movie.year}`})</li>
    ));
    
    oneMovie = cityMovies[0];

    return(
      <>
        <h2>{this.props.cityName} movies</h2>
        <ul>
          {oneMovie}
        </ul>
      </>
    )
  }

}

export default Movie;
