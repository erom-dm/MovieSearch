import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import PaginationHandler from './PaginationHandler';
import './main-window.scss';

class MainWindow extends Component {
  render() {
    const { totalPages } = this.props;
    const { movies } = this.props;
    const movieItems = movies.map(movie => <MovieItem movie={movie} key={movie.id} />);
    return (
      <div className="main">
        {
          totalPages > 0
            ? <PaginationHandler totalPages={totalPages} />
            : null
        }
        <ul className="movie-list">
          {movieItems}
        </ul>
      </div>
    );
  }
}

MainWindow.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPages: PropTypes.number.isRequired,
};

const MapStateToProps = state => ({
  movies: state.movies,
  totalPages: state.search.totalPages,
});

const MapDispatchToProps = dispatch => ({});

export default connect(MapStateToProps, MapDispatchToProps)(MainWindow);
