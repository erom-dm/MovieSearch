import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import MovieItemSmall from './MovieItemSmall';
import PaginationHandler from './PaginationHandler';
import './main-window.scss';
import './main-window-tablet.scss';

const MainWindow = (props) => {
  const { totalPages, movies, minimizedView } = props;
  const movieItems = minimizedView
    ? movies.map(movie => <MovieItemSmall movie={movie} key={movie.id} />)
    : movies.map(movie => <MovieItem movie={movie} key={movie.id} />);
  return (
    <Fragment>
      <div className="main">
        <ul className="movie-list">
          {movieItems}
        </ul>
        {
            totalPages > 1 && movies.length > 0
              ? <PaginationHandler totalPages={totalPages} />
              : null
        }
      </div>
    </Fragment>
  );
};

MainWindow.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPages: PropTypes.number.isRequired,
  minimizedView: PropTypes.bool.isRequired,
};

const MapStateToProps = state => ({
  movies: state.movies,
  totalPages: state.util.totalPages,
  minimizedView: state.util.minimizedView,
});

export default connect(MapStateToProps)(MainWindow);
