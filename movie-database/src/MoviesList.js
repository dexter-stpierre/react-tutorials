import React, { Component } from 'react';
import Movie from './Movie';

class MoviesList extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=62631e3c1b75684c3f9f4e85d7c99664&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
      );
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

export default MoviesList;
