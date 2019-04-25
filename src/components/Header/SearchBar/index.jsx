import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search-bar.scss';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    const { query } = this.props;
    const { value } = this.state;
    query(value);
    e.preventDefault();
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="wrap">
          <div className="search-bar">
            <input className="search-bar__input" value={value} onChange={this.handleChange} />
            <button className="search-bar__submit-btn" type="submit">Search</button>
          </div>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  query: PropTypes.func.isRequired,
};


export default SearchBar;
