import * as React from 'react';
import style from './textField.module.css';

class TextField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, label, Icon, placeholder, value, onChangeFn, isDisabled} =
      this.props;

    return (
      <div className={`${style.input_field} ${style.text_field}`}>
        <label className={`${style.label}`} htmlFor={id}>
          {label ? label : 'Title'}
        </label>
        <div className={`${style.input_wrapper}`}>
          <div className={`${style.input_icon}`}>
            <Icon />
          </div>
          <input
            className={`${style.input}`}
            id={id}
            name={id}
            type="text"
            placeholder={placeholder}
            required
            value={value}
            onChange={(e) => onChangeFn(e)}
            disabled={isDisabled ? isDisabled : false}
          />
        </div>
      </div>
    );
  }
}

export default TextField;
