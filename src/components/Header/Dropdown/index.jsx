import React, { Component } from 'react';
import './dropdown.scss';

class Dropdown extends Component {
  state = {
    displayMenu: false,
    searchType: 'Title',
  };

  showDropdownMenu = (e) => {
    e.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  };

  render() {
    const { displayMenu, searchType } = this.state;
    return (
      <div className="dropdown">
        <div className="dropdown__button" onClick={this.showDropdownMenu}>
          {`By: ${searchType}`}
        </div>
        {displayMenu ? (
          <ul className="dropdown__list">
            <li className="dropdown__item">Title</li>
            <li className="dropdown__item">Year</li>
            <li className="dropdown__item">Genre</li>
            <li className="dropdown__item">Cast</li>
            <li className="dropdown__item">Director</li>
          </ul>
        ) : (null)}
      </div>
    );
  }
}

export default Dropdown;
