import React from 'react';
import './movie-item-small.scss';
import PropTypes from 'prop-types';
import noImage from '../../../img/missing-image.png';

const MovieItem = ({ movie }) => {
  const {
    poster_path: posterPath, title, vote_average: rating,
    original_language: language, overview, release_date: rYear,
  } = movie;
  const year = rYear.substr(0, 4);
  const posterURL = posterPath === null ? noImage : `https://image.tmdb.org/t/p/w500${posterPath}`;
  const editedOverview = overview === '' ? '< Description is missing >' : `${overview.slice(0, 130)}...`;
  return (
    <li className="movie-list__movie-item-small">
      <img className="movie-list__poster" src={posterURL} alt=" " />
      <div className="movie-list__text-container">
        <div className="movie-list__title-container">
          <div className="movie-list__title">
            {`${title}`}
            <span className="movie-list__info">{`Rating: ${rating} | Language: ${language.toUpperCase()} | Year: ${year}`}</span>
          </div>
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
