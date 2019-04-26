const apiKey = '5874acfd11651a28c55771624f7021f4';
const queryConst = 'https://api.themoviedb.org/3';

export const discover = (value, sortBy, searchBy, order) => {
  let sort;
  let search;

  switch (sortBy) {
    case 'Popularity':
      sort = `popularity.${order}`;
      break;
    case 'Rating':
      sort = `vote_average.${order}`;
      break;
    case 'Release year':
      sort = `release_date.${order}`;
      break;
    default:
      sort = `vote_average.${order}`;
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
    case 'Actor':
      search = '&with_cast=';
      break;
    default:
      search = '&with_keywords=';
  }
  const byTitleQuery = `${queryConst}/search/movie?
api_key=${apiKey}
&language=en-US
&query=${value}
&page=1
&include_adult=false`;
  const discoverQuery = `${queryConst}/discover/movie?
api_key=${apiKey}
&language=en-US
&sort_by=${sort}
&include_adult=false
&include_video=false
&page=1
${search}${value}
&vote_count.gte=500`;


  return searchBy === 'Title' ? byTitleQuery : discoverQuery;
};

export const modifyOldQuery = (pageNum, oldQuery) => {
  const index = oldQuery.search('&page=') + 6;
  if (index - 6 < 0) {
    return oldQuery;
  }
  let counter = index;
  while (counter < oldQuery.length) {
    const curChar = parseInt(oldQuery.charAt(counter), 10);
    if (!Number.isNaN(curChar)) {
      counter += 1;
    } else {
      break;
    }
  }
  return oldQuery.replace(oldQuery.slice(index - 6, counter), `&page=${pageNum}`);
};

export const searchPerson = (name) => {
  const nameEdited = name.replace(' ', '%20');

  return `${queryConst}/search/person?
api_key=${apiKey}
&language=en-US
&query=${nameEdited}
&page=1
&include_adult=false`;
};

export const searchGenres = () => `${queryConst}/genre/movie/list?api_key=${apiKey}&language=en-US`;

/* export const searchMovie = (movie) => {
  const movieEdited = movie.replace(' ', '%20');

  return `${queryConst}/search/movie?api_key=${apiKey}&
language=en-US&query=${movieEdited}&page=1&include_adult=false`;
}; */
