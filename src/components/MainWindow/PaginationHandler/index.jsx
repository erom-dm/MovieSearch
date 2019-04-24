import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import './pagination.scss';

class PaginationHandler extends Component {
  state = {
    paging: {
      offset: 0,
      limit: 10,
    },
    active: 0,
  };

  pageHandler = (offset) => {
    this.setState(({ paging }) => ({
      paging: { ...paging, offset: offset },
    }));
  };

  pagingHandler = (event) => {
    const offset = parseInt(event.target.id, 10);
    this.setState({
      active: offset,
    });
    this.pageHandler(event.target.id - 1);
  };

  nextHandler = () => {
    const { active } = this.state;
    this.setState({
      active: active + 1,
    });
    this.pageHandler(active + 1);
  };

  backHandler = () => {
    const { active } = this.state;
    this.setState({
      active: active - 1,
    });
    this.pageHandler(active - 1);
  };

  renderPageNumbers = (pageNumbers, totalPages) => {
    const { active } = this.state;
    // array with numbers | number of pages | currently active page
    return (
      <Pagination className="pagination-container">
        <Pagination.Prev disabled={active < 5} onClick={active > 5 && this.backHandler} />

        {
          pageNumbers.map((number) => {
            if (
              number >= parseInt(active, 10) - 3
              && number <= parseInt(active, 10) + 3
            ) {
              return (
                <Pagination.Item
                  id={number}
                  active={number === active}
                  onClick={this.pagingHandler}
                >
                  {number}
                </Pagination.Item>
              );
            }
            return null;
          })}
        <Pagination.Next onClick={active <= totalPages - 4 && this.nextHandler} />
      </Pagination>
    );
  };

  render() {
    const { totalPages } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }
    return (
      <div className="pull-right">
        {this.renderPageNumbers(pageNumbers, totalPages)}
      </div>
    );
  }
}

PaginationHandler.propTypes = {
  totalPages: PropTypes.number.isRequired,
};

export default PaginationHandler;
