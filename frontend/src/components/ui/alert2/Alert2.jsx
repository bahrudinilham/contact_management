import {Component} from 'react';
import style from './style.module.css';

// Icons
import {FaCircle, FaTimes} from 'react-icons/fa';

class Alert2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isShow, type, message, cancelAlertHandler, okAlertHandler} =
      this.props;

    return (
      <div
        className={`${style.alert} ${
          isShow === 'show' ? style.show : style.hide
        }`}>
        <div className={`${style.alert_container} `}>
          <header className={`${style.container_header}`}>
            <div
              className={`${style.header_icon} ${
                type === 'error' ? style.error_mode : ''
              }`}>
              ?
            </div>
            <div className={`${style.header_typography}`}>Confirm</div>
          </header>
          <main className={`${style.container_body}`}>{message}</main>
          <footer className={`${style.container_footer}`}>
            <button
              className={`${style.footer_button} ${style.button_cancel} ${
                type === 'error' ? style.error_mode : ''
              }`}
              onClick={() => cancelAlertHandler()}>
              <FaTimes /> Cancel
            </button>
            <button
              className={`${style.footer_button} ${style.button_ok} ${
                type === 'error' ? style.error_mode : ''
              }`}
              onClick={() => okAlertHandler()}>
              <FaCircle /> OK
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Alert2;
