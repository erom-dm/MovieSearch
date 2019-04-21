import React from 'react';
import FetchData from '../../util/FetchData';
import { discover } from '../../util/api';
import './header.scss';

const Header = () => {
  const testQuery = () => {
    FetchData.get(discover).then(data => console.log(data));
  };
  return (
    <div className="header">
      <div className="header__logo">My App</div>
      <div className="header__search-bar">
        <input />
        <button type="button" onClick={testQuery}>search</button>
      </div>
      <div className="header__search-menu" />
    </div>
  );
};

export default Header;
