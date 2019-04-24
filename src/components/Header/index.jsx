import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import searchMovies from '../../actions/movies/operations';
import './header.scss';

class Header extends Component {
  state = {
    sortOrder: 'desc',
  };

  searchQuery = (value) => {
    const { discover, sortBy, searchBy } = this.props;
    const { sortOrder } = this.state;
    discover(value, sortBy, searchBy, sortOrder);
  };

  handleSortOrderSwitch = () => {
    const { sortOrder } = this.state;
    this.setState({ sortOrder: sortOrder === 'desc' ? 'asc' : 'desc' });
  };

  render() {
    const { sortOrder } = this.state;
    return (
      <div className="header">
        <div className="header__logo">My App</div>
        <div className="header__search-container">
          <SearchBar query={this.searchQuery} />
          <Dropdown menuType="Search" items={['Title', 'Year', 'Genre', 'Actor']} />
          <Dropdown menuType="Sort" items={['Rating', 'Popularity', 'Release year']} />
          <button className="header__sort-order-switch" type="button" onClick={this.handleSortOrderSwitch}>
            {sortOrder}
          </button>
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
  sortBy: PropTypes.string.isRequired,
  searchBy: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  sortBy: state.search.sortBy,
  searchBy: state.search.searchBy,
});

const mapDispatchToProps = dispatch => ({
  discover: (value, sortBy, searchBy, order) => {
    dispatch(searchMovies(value, sortBy, searchBy, order));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
