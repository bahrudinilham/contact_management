import * as React from 'react';
import style from './passwordField.module.css';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

class PasswordField extends React.Component {
  constructor() {
    super();

    this.state = {
      showPassword: false,
    };

    this.changeShowPassword = this.changeShowPassword.bind(this);
  }

  changeShowPassword() {
    this.setState({showPassword: !this.state.showPassword});
  }
  render() {
    const {id, label, Icon, placeholder, value, onChangeFn, isRequired} =
      this.props;

    return (
      <div className={`${style.input_field} ${style.password_field}`}>
        <label className={`${style.label}`} htmlFor={id}>
          {label}
        </label>
        <div className={`${style.input_wrapper}`}>
          <div className={`${style.input_icon}`}>
            <Icon />
          </div>
          <input
            className={`${style.input}`}
            id={id}
            name={id}
            type={this.state.showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            required={isRequired !== undefined ? isRequired : true}
            value={value}
            onChange={(e) => onChangeFn(e)}
          />
          <button
            className={`${style.input_icon} ${style.showpass_icon}`}
            type="button"
            onClick={this.changeShowPassword}>
            {this.state.showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>
    );
  }
}

export default PasswordField;
