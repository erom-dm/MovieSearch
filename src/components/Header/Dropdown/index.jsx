import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeSearchType, changeSortType } from '../../../actions/search/actions';
import './dropdown.scss';
import './dropdown-adaptive.scss';

class Dropdown extends Component {
  state = {
    displayMenu: false,
  };

  handleListItemClick = (e) => {
    const { action, payloadKey } = this.handleMenuType();
    return action({ [payloadKey]: e.target.value });
  };

  handleMenuType = () => {
    const {
      menuType, changeSort, changeSearch, searchType, sortType,
    } = this.props;
    let action;
    let selectedItem;
    let payloadKey;
    if (menuType === 'Search') {
      action = changeSearch;
      payloadKey = 'searchBy';
      selectedItem = searchType;
    } else if (menuType === 'Sort') {
      action = changeSort;
      payloadKey = 'sortBy';
      selectedItem = sortType;
    }

    return {
      action,
      payloadKey,
      actionLabel: menuType,
      selectedItem,
    };
  };

  hideDropDownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropDownMenu);
    });
  };

  showDropDownMenu = (e) => {
    e.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropDownMenu);
    });
  };

  adjustDropDownText = (text, selectedItem) => {
    const { width } = this.props;
    if (width >= 720 && width < 1200) {
      return text;
    }
    if (width < 720) {
      return null;
    }
    return `${text} By: ${selectedItem}`;
  };

  render() {
    const { items } = this.props;
    const { displayMenu } = this.state;
    const { actionLabel, selectedItem } = this.handleMenuType();
    const dropDownText = this.adjustDropDownText(actionLabel, selectedItem);
    const listItems = items.map((item, index) => (
      <li className="dropdown__item" key={index}>
        <button type="button" value={item} onClick={this.handleListItemClick}>{item}</button>
      </li>
    ));

    return (
      <div className="dropdown">
        <button type="button" className="dropdown__button" onClick={this.showDropDownMenu}>
          {dropDownText}
        </button>
        {displayMenu ? (
          <ul className="dropdown__list">
            {listItems}
          </ul>
        ) : (null)}
      </div>
    );
  }
}

Dropdown.propTypes = {
  menuType: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  searchType: state.util.searchBy,
  sortType: state.util.sortBy,
});

const mapDispatchToProps = dispatch => ({
  changeSort: value => dispatch(changeSortType(value)),
  changeSearch: value => dispatch(changeSearchType(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
