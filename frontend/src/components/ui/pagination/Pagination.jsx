import {Component} from 'react';
import style from './style.module.css';

// Icons
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

class Pagination extends Component {
  constructor() {
    super();

    this.generatePages = this.generatePages.bind(this);
  }

  generatePages() {
    const {currentPage, totalPage} = this.props;

    if (totalPage <= 5) {
      return [...Array(totalPage)].map((_, index) => index + 1);
    }

    let pages = [];

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPage, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (pages[0] > 1) {
      pages.unshift('...');
      pages.unshift(1);
    }

    if (pages[pages.length - 1] < totalPage) {
      pages.push('...');
      pages.push(totalPage);
    }

    return pages;
  }

  render() {
    const {currentPage, onChangePage} = this.props;

    const pages = this.generatePages();

    return (
      <section className={`${style.pagination}`}>
        <button
          className={`${style.pagination_button}`}
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}>
          <FaChevronLeft />
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <button
                key={index}
                className={`${style.pagination_button}`}
                disabled>
                ...
              </button>
            );
          }

          return (
            <button
              key={index}
              className={`${style.pagination_button} ${
                currentPage === page ? style.active : ''
              }`}
              onClick={() => onChangePage(page)}>
              {page}
            </button>
          );
        })}

        <button
          className={`${style.pagination_button}`}
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === this.props.totalPage}>
          <FaChevronRight />
        </button>
      </section>
    );
  }
}

export default Pagination;
