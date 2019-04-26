import React from 'react';
import PropTypes from 'prop-types';
import noImage from '../../../img/missing-image.png';
import './movie-item-small.scss';
import './movie-item-small-adaptive.scss';

const MovieItem = ({ movie }) => {
  const {
    poster_path: posterPath, title, vote_average: rating,
    original_language: language, overview, release_date: rYear,
  } = movie;
  const year = rYear.substr(0, 4);
  const posterURL = posterPath === null ? noImage : `https://image.tmdb.org/t/p/w500${posterPath}`;
  const editedOverview = overview === '' ? '< Description is missing >' : `${overview.slice(0, 130)}...`;
  return (
    <li className="movie-list-s__movie-item-small">
      <div className="movie-list-s__img-container">
        <img className="movie-list-s__poster" src={posterURL} alt=" " />
      </div>
      <div className="movie-list-s__text-container">
        <div className="movie-list-s__title-container">
          <div className="movie-list-s__title">
            {`${title}`}
            <span className="movie-list-s__info">{`Rating: ${rating} | Language: ${language.toUpperCase()} | Year: ${year}`}</span>
          </div>
        </div>
        <div className="movie-list-s__description">{editedOverview}</div>
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
