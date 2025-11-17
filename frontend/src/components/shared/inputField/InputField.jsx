import {Component} from 'react';
import style from './inputField.module.css';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id || 'id_unnamed';
    this.iconLabel = this.props.iconLabel || 'X';
    this.textLabel = this.props.textLabel || 'Text Label';
    this.type = this.props.type || 'text';
    this.placeholder = this.props.placeholder || 'Placeholder here....';

    this.state = {
      isShowPassword: false,
    };

    this.showPasswordToggle = this.showPasswordToggle.bind(this);
  }

  showPasswordToggle() {
    this.setState({isShowPassword: !this.state.isShowPassword});
  }

  render() {
    if (this.type === 'password') {
      return (
        <div className={`${style.input_field} ${style.last_field}`}>
          <label htmlFor={this.id} className={`${style.label}`}>
            {this.iconLabel}{' '}
            <span className={`${style.label_content}`}>{this.textLabel}</span>
          </label>
          <div className={`${style.input_wrapper}`}>
            <input
              className={`${style.input}`}
              type={this.state.isShowPassword ? 'text' : 'password'}
              id={this.id}
              name={this.id}
              placeholder={this.placeholder}
            />
            <button
              onClick={() => this.showPasswordToggle()}
              type="button"
              className={`${style.show_button}`}>
              {this.state.isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`${style.input_field}`}>
        <label htmlFor={this.id} className={`${style.label}`}>
          {this.iconLabel}{' '}
          <span className={`${style.label_content}`}>{this.textLabel}</span>
        </label>
        <input
          className={`${style.input}`}
          type={this.type}
          id={this.id}
          name={this.id}
          placeholder={this.placeholder}
        />
      </div>
    );
  }
}

export default InputField;
