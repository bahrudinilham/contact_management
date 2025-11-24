import * as React from 'react';
import style from './style.module.css';

class Form extends React.Component {
  render() {
    const {className, ...props} = this.props;
    return (
      <form
        className={`${style.form} ${className ? className : ''}`}
        {...props}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
