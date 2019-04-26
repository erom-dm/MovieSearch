import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import searchMovies from '../../actions/movies/operations';
import { changeSortMode, changeViewMode } from '../../actions/search/actions';
import logo from '../../img/logo.jpg';
import './header.scss';
import './header-adaptive.scss';

class Header extends Component {
  state = {
    width: 0,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  searchQuery = (value) => {
    const {
      discover, sortBy, searchBy, sortMode,
    } = this.props;
    discover(value, sortBy, searchBy, sortMode);
  };

  handleSortOrderSwitch = () => {
    const { sortMode, switchSortMode } = this.props;
    const newMode = sortMode === 'desc' ? 'asc' : 'desc';
    switchSortMode({ sortMode: newMode });
  };

  handleChangeViewMode = (e) => {
    const { changeView } = this.props;
    const isTrue = (e.target.value === 'true');
    changeView({ minimizedView: isTrue });
  };

  render() {
    const { width } = this.state;
    const { sortMode } = this.props;
    return (
      <div className="header">
        <img className="header__logo" src={logo} alt=" " />
        <div className="header__search-container">
          <Dropdown width={width} menuType="Search" items={['Title', 'Year', 'Genre', 'Actor']} />
          <SearchBar query={this.searchQuery} />
          <Dropdown width={width} menuType="Sort" items={['Rating', 'Popularity', 'Year']} />
          <button className={`header__sort-order-switch ${sortMode}`} type="button" onClick={this.handleSortOrderSwitch} />
        </div>
        <div className="header__display-mode">
          <button className="header__switch row" type="button" value onClick={this.handleChangeViewMode} />
          <button className="header__switch tile" type="button" value={false} onClick={this.handleChangeViewMode} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  discover: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  searchBy: PropTypes.string.isRequired,
  switchSortMode: PropTypes.func.isRequired,
  sortMode: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sortBy: state.util.sortBy,
  searchBy: state.util.searchBy,
  sortMode: state.util.sortMode,
});

const mapDispatchToProps = dispatch => ({
  discover: (value, sortBy, searchBy, order) => {
    dispatch(searchMovies(value, sortBy, searchBy, order));
  },
  switchSortMode: mode => dispatch(changeSortMode(mode)),
  changeView: mode => dispatch(changeViewMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
