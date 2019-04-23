const apiKey = '5874acfd11651a28c55771624f7021f4';
const queryConst = 'https://api.themoviedb.org/3';

export const discover = (query, sortBy, searchBy) => {
  let sort;
  let search;
  switch (sortBy) {
    case 'Popularity':
      sort = 'popularity.desc';
      break;
    case 'Rating':
      sort = 'vote_average.desc';
      break;
    case 'Release year':
      sort = 'release_date.desc';
      break;
    default:
      sort = 'vote_average.desc';
  }

  switch (searchBy) {
    case 'Title':
      search = '&with_keywords=';
      break;
    case 'Year':
      search = '&primary_release_year=';
      break;
    case 'Genre':
      search = '&with_genres=';
      break;
    case 'People':
      search = '&with_people=';
      break;
    default:
      search = '&with_keywords=';
  }
  const byTitleQuery = `${queryConst}/search/movie?
api_key=${apiKey}
&language=en-US
&query=${query}
&page=1
&include_adult=false`;
  const discoverQuery = `${queryConst}/discover/movie?
api_key=${apiKey}
&language=en-US
&sort_by=${sort}
&include_adult=false
&include_video=false
&page=1
${search}${query}
&vote_count.gte=1000`;


  return searchBy === 'Title' ? byTitleQuery : discoverQuery;
};

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
