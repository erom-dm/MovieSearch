import React from 'react';
import './movie-item.scss';
import PropTypes from 'prop-types';

const MovieItem = ({ movie }) => {
  const {
    poster_path: posterPath, title, vote_average: rating,
    original_language: language, overview, release_date: rYear,
  } = movie;
  const year = rYear.substr(0, 4);
  const posterURL = `https://image.tmdb.org/t/p/w200${posterPath}`;
  return (
    <li className="movie-list__movie-item">
      <img className="movie-list__poster" src={posterURL} alt=" " />
      <div className="movie-list__text-container">
        <div className="movie-list__title-container">
          <div className="movie-list__title">{`${title}`}</div>
          <div className="movie-list__score">{`Rating: ${rating} | Language: ${language.toUpperCase()} | Year: ${year}`}</div>
        </div>
        <div className="movie-list__description">{overview}</div>
      </div>
    </li>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    original_language: PropTypes.string,
    overview: PropTypes.string,
  }).isRequired,
};

export default MovieItem;
