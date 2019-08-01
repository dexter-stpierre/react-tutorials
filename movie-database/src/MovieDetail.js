import React, { Component } from 'react';
import { RouteProps } from 'react-router-dom';

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MoviesDetail extends Component {
  static propTypes = RouteProps;

  state = {
    movie: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          match.params.id
        }?api_key=62631e3c1b75684c3f9f4e85d7c99664&language=en-US`,
      );
      const movie = await res.json();
      this.setState({
        movie,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <img src={`${BACKDROP_PATH}${movie.backdrop_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <h3>{movie.release_date}</h3>
        <p>{movie.overview}</p>
      </div>
    );
  }
}

export default MoviesDetail;
