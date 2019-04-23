const apiKey = '5874acfd11651a28c55771624f7021f4';
const queryConst = 'https://api.themoviedb.org/3';

export const discover = year => `${queryConst}/discover
/movie?api_key=${apiKey}&language=en-US&sort_by=popularity
.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}`;

export const searchPerson = (name) => {
  const nameEdited = name.replace(' ', '%20');

  return `${queryConst}/search/person?
  api_key=<<api_key>>&language=en-US&query=${nameEdited}&page=1&include_adult=false`;
};

export const searchMovie = (movie) => {
  const movieEdited = movie.replace(' ', '%20');

  return `${queryConst}/search/movie?api_key=${apiKey}&
  language=en-US&query=${movieEdited}&page=1&include_adult=false`;
};
