import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import './main-window.scss';

class MainWindow extends Component {
  render() {
    const { movies } = this.props;
    const movieItems = movies.map((movie) => <MovieItem movie={movie} key={movie.id} />);
    return (
      <div className="main-container">
        <ul className="movie-list">
          {movieItems}
        </ul>
      </div>
    );
  }
}

MainWindow.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const MapStateToProps = state => ({
  movies: state.movies,
});

const MapDispatchToProps = dispatch => ({});

export default connect(MapStateToProps, MapDispatchToProps)(MainWindow);
