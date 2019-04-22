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

  handleListItemClick = (value) => {
    this.setState({ searchType: value });
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
            <li className="dropdown__item">
              <button type="button" onClick={this.handleListItemClick.bind(this, 'Title')}>Title</button>
            </li>
            <li className="dropdown__item">
              <button type="button" onClick={this.handleListItemClick.bind(this, 'Year')}>Year</button>
            </li>
            <li className="dropdown__item">
              <button type="button" onClick={this.handleListItemClick.bind(this, 'Genre')}>Genre</button>
            </li>
            <li className="dropdown__item">
              <button type="button" onClick={this.handleListItemClick.bind(this, 'Cast')}>Cast</button>
            </li>
            <li className="dropdown__item">
              <button type="button" onClick={this.handleListItemClick.bind(this, 'Director')}>Director</button>
            </li>
          </ul>
        ) : (null)}
      </div>
    );
  }
}

export default Dropdown;
