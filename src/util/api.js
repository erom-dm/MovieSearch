export const discover = year => `https://api.themoviedb.org/3/discover
/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity
.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}`;
