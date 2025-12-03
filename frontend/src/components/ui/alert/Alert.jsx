import {Component} from 'react';
import style from './style.module.css';

// Icons
import {FaTimes} from 'react-icons/fa';

class Alert extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {isShow, type, message, hideAlertHandler} = this.props;

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
              {type === 'info' ? '!' : '!!'}
            </div>
            <div className={`${style.header_typography}`}>
              {type === 'info' ? 'Information' : 'Error!'}
            </div>
          </header>
          <main className={`${style.container_body}`}>{message}</main>
          <footer className={`${style.container_footer}`}>
            <button
              className={`${style.footer_button} ${style.button_close} ${
                type === 'error' ? style.error_mode : ''
              }`}
              onClick={() => hideAlertHandler()}>
              <FaTimes /> Close
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Alert;
