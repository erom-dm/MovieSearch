import React from 'react';
import './movie-item.scss';
import PropTypes from 'prop-types';

const MovieItem = (props) => {
  const {poster_path, title, vote_average, original_language, overview} = props.movie;
  const posterURL = `https://image.tmdb.org/t/p/w150${poster_path}`;
  return (
    <li className="movie-list__movie-item">
      <img src={posterURL} alt=" " />
      <div className="movie-list__title">{title}</div>
      <div className="movie-list__score">{vote_average}</div>
      <div className="movie-list__language">{original_language}</div>
      <div className="movie-list__description">{overview}</div>
    </li>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    original_language: PropTypes.string,
    overview: PropTypes.string,
  }).isRequired,
};

export default MovieItem;
