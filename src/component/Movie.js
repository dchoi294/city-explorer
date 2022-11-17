import React from 'react';

class Moive extends React.Component {
  render() {

    let cityMovies = this.props.movies.map((movie,index) => (
      cityMovies.push(<li key={index}>{movie.title} ({movie.release_date})</li>)
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

export default Moive;
