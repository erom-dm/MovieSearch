import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { discoverMovies } from '../../actions/movies/operations';
import './header.scss';

class Header extends Component {
  testQuery = () => {
    const { discover } = this.props;
    discover(2018);
  };

  render() {
    return (
      <div className="header">
        <div className="header__logo">My App</div>
        <div className="header__search-bar">
          <input />
          <button type="button" onClick={this.testQuery}>search</button>
        </div>
        <div className="header__search-menu" />
      </div>
    );
  }
}

Header.propTypes = {
  discover: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // movies: state.movies,
});

const mapDispatchToProps = dispatch => ({
  discover: () => dispatch(discoverMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
