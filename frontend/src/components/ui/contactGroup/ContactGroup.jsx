import { Component } from "react";
import style from "./style.module.css"

class ContactGroup extends Component {
  render() {
    const {title, className} = this.props;
    return (
      <div className={`${style.contact_group} ${className}`}>
        <h3 className={`${style.group_title}`}>{title}</h3>
        <div className={`${style.group_body}`}>{this.props.children}</div>
      </div>
    );
  }
}

export default ContactGroup