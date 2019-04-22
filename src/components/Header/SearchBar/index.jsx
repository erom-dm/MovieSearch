import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <input type="text" value={value} onChange={this.handleChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  query: PropTypes.func.isRequired,
};


export default SearchBar;
