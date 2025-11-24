import * as React from 'react';
import style from './style.module.css';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

class InputField extends React.Component {
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
    const {id, label, Icon, isRequired, type, ...rest} = this.props;

    if (type === 'password') {
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
              required={isRequired !== undefined ? isRequired : true}
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

    return (
      <div className={`${style.input_field} ${style.text_field}`}>
        <label className={`${style.label}`} htmlFor={id}>
          {label ? label : 'Title'}
        </label>
        <div className={`${style.input_wrapper}`}>
          <div className={`${style.input_icon}`}>{Icon ? <Icon /> : ''}</div>
          <input
            className={`${style.input}`}
            id={id}
            name={id}
            type={type}
            required={isRequired !== undefined ? isRequired : true}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default InputField;
