import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import storeActivePage from '../../../actions/search/operations';
import './pagination.scss';

class PaginationHandler extends Component {
  state = {
    paging: {
      offset: 0,
      limit: 10,
    },
  };

  pageHandler = (offset) => {
    this.setState(({ paging }) => ({
      paging: { ...paging, offset },
    }));
  };

  pagingHandler = (event) => {
    const { setActivePage, lastQuery } = this.props;
    const offset = parseInt(event.target.id, 10);
    setActivePage(offset, lastQuery);
    this.pageHandler(event.target.id - 1);
  };

  nextHandler = () => {
    const { setActivePage, lastQuery } = this.props;
    const { active } = this.props;
    setActivePage(active + 1, lastQuery);
    this.pageHandler(active + 1);
  };

  backHandler = () => {
    const { setActivePage, lastQuery } = this.props;
    const { active } = this.props;
    setActivePage(active - 1, lastQuery);
    this.pageHandler(active - 1);
  };

  renderPageNumbers = (pageNumbers, totalPages) => {
    const { active } = this.props;
    // array with numbers | number of pages | currently active page
    return (
      <Pagination className="pagination-container">
        <Pagination.Prev
          disabled={active === 1}
          onClick={active > 0 ? this.backHandler : undefined}
        />
        {
          pageNumbers.map((number) => {
            if (
              (number >= active - 1 && number <= active + 1)
              || (active === 1 && number <= 3)
              || (active === totalPages && number >= totalPages - 2)
            ) {
              return (
                <Pagination.Item
                  id={number}
                  key={number}
                  active={number === active}
                  onClick={this.pagingHandler}
                >
                  {number}
                </Pagination.Item>
              );
            }
            return null;
          })
        }
        <Pagination.Next onClick={active < totalPages ? this.nextHandler : undefined} />
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
  setActivePage: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
  lastQuery: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  lastQuery: state.util.lastQuery,
  active: state.util.activePage,
});

const mapDispatchToProps = dispatch => ({
  setActivePage: (pageNum, lastQuery) => dispatch(storeActivePage(pageNum, lastQuery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationHandler);
