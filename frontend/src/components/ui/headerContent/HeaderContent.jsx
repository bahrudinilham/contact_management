import * as React from 'react';
import style from './style.module.css';
import {Link} from 'react-router';
import {FaArrowLeft} from 'react-icons/fa';

class HeaderContent extends React.Component {
  render() {
    const {title, backTo} = this.props;

    return (
      <header
        className={`${style.header_content} ${
          backTo ? style.with_back_to : ''
        }`}>
        {backTo ? (
          <Link className={`${style.back_link}`} to={backTo}>
            <FaArrowLeft />
            <span className={`${style.link_typography}`}>Back</span>
          </Link>
        ) : (
          ''
        )}
        <h1 className={`${style.title_page}`}>{title}</h1>
      </header>
    );
  }
}

export default HeaderContent;
