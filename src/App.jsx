import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import './App.css';
import FetchData from './util/FetchData';

class App extends Component {
  state = {
    movies: {},
  };

  componentDidMount() {
    FetchData.get();
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div> hey </div>
      </Fragment>
    );
  }
}

export default App;
// https://api.themoviedb.org/3/movie/76341?api_key={api_key}
// 5874acfd11651a28c55771624f7021f4

// for images use: https://image.tmdb.org/t/p/w200 + ${path} (w - width of image in pixels)

// seach functionality: https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
// with general movie info from 'results' field, we can query following to get full info: https://api.themoviedb.org/3/movie/343611?api_key={api_key}
