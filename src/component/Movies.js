import React from 'react';

class Movies extends React.Component {
  render() {
    let cityMovies = this.props.movies.map((movie,index) => (
      <li key={index}>{movie.title} ({`${movie.year}`})</li>
    ));

    // let cityMovies = this.props.movies.map(movie => {
    //   <li>{movie.title} ({movie.release_date})</li>
    // })

    return (
      <>
        <h2>{this.props.cityName} movies</h2>
        <ul>
          {cityMovies}
        </ul>
      </>
    );
  }
}

export default Movies;
