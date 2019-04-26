import React from 'react';
import PropTypes from 'prop-types';
import noImage from '../../../img/missing-image.png';
import './movie-item.scss';
import './movie-item-adaptive.scss';

const MovieItem = ({ movie }) => {
  const {
    poster_path: posterPath, title, vote_average: rating,
    original_language: language, overview, release_date: rYear,
  } = movie;
  const year = rYear.substr(0, 4);
  const posterURL = posterPath === null ? noImage : `https://image.tmdb.org/t/p/w200${posterPath}`;
  const editedOverview = overview === '' ? '< Description is missing >' : overview;
  return (
    <li className="movie-list__movie-item">
      <img className="movie-list__poster" src={posterURL} alt=" " />
      <div className="movie-list__text-container">
        <div className="movie-list__title-container">
          <div className="movie-list__title">{`${title}`}</div>
          <div className="movie-list__score">{`Rating: ${rating} | Language: ${language.toUpperCase()} | Year: ${year}`}</div>
        </div>
        <div className="movie-list__description">{editedOverview}</div>
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
