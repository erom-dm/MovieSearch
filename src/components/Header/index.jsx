import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import { discoverMovies } from '../../actions/movies/operations';
import './header.scss';

class Header extends Component {
  testQuery = (year) => {
    const { discover } = this.props;
    discover(year);
  };

  render() {
    return (
      <div className="header">
        <div className="header__logo">My App</div>
        <div className="header__search-container">
          <SearchBar query={this.testQuery} />
          <Dropdown menuType="Search" items={['Title', 'Year', 'Genre', 'People']} />
          <Dropdown menuType="Sort" items={['Rating', 'Popularity', 'Release Date']} />
        </div>
        <div className="header__display-mode">
          <button className="header__switch" type="button">small</button>
          <button className="header__switch" type="button">large</button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  discover: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  discover: year => dispatch(discoverMovies(year)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
