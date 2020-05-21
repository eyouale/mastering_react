import React, { Component } from 'react';
import Like from './Like';
import Pagination from './Pagination';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePagination = num => {
    console.log('Pagination Clicked', num);
  };

  render() {
    if (this.state.movies.length !== 0)
      return (
        <div className='container'>
          <p style={{ margin: 10 }}>
            Showing {this.state.movies.length} in the database
          </p>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Genre</th>
                <th scope='col'>Stock</th>
                <th scope='col'>Rate</th>
                <th scope='col' />
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      likeStatus={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination handlePagination={this.handlePagination} />
        </div>
      );
    else
      return (
        <h2 className='container' style={{ margin: 10, textAlign: 'center' }}>
          No Movies Database
        </h2>
      );
  }
}

export default Movies;
