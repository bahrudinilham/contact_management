import {Component} from 'react';
import style from './style.module.css';

// Components
import Form from '../form/Form';

// Icons
import {FaSearch, FaTimes} from 'react-icons/fa';

class SearchBar extends Component {
  render() {
    const {query, setQuery, handleSubmit, handleClearQuery, className} =
      this.props;

    return (
      <Form
        className={`${style.searchbar} ${className ? className : ''}`}
        onSubmit={(e) => handleSubmit(e)}>
        <div className={`${style.icon_wrapper} ${style.search_icon}`}>
          <FaSearch />
        </div>
        <input
          className={`${style.search_field}`}
          type="text"
          placeholder={'Search by name'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`${style.icon_wrapper} ${style.clear_icon} ${
            query && query.length > 0 ? style.active : ''
          }`}
          type="button"
          onClick={async () => {
            await handleClearQuery();
          }}>
          <FaTimes />
        </button>
      </Form>
    );
  }
}

export default SearchBar;
