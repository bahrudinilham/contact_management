import * as React from 'react';
import style from './submitButton.module.css';

class SubmitButton extends React.Component {
  render() {
    const {name, Icon, text} = this.props;
    return (
      <button className={`${style.button_submit}`} type="submit" name={name}>
        <Icon />
        <span className={`${style.button_typography}`}>{text}</span>
      </button>
    );
  }
}

export default SubmitButton;
