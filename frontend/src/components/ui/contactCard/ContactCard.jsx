import {Component} from 'react';
import style from './style.module.css';
import {FaChevronLeft, FaInfoCircle, FaTrash, FaUser} from 'react-icons/fa';
import {Link} from 'react-router';
import ContactService from '../../../services/ContactService';

class ContactCard extends Component {
  constructor() {
    super();

    this.state = {
      isShowAction: false,
    };

    this.deleteContactHandler = this.deleteContactHandler.bind(this);
  }

  async deleteContactHandler() {
    const id = this.props.iddata;

    const isConfirm = confirm(
      `Are you sure to delete this (${this.props.firstname} ${this.props.lastname})?`
    );

    if (isConfirm) {
      try {
        const response = await ContactService.deleteContact(id);

        if (response.status === 200) {
          alert(
            `Delete contact (${this.props.firstname} ${this.props.lastname}) successfully`
          );

          this.props.reloadtoggle();
          return;
        }
        return;
      } catch (error) {
        console.log(error);
        alert(
          `Delete contact (${this.props.firstname} ${this.props.lastname}) failed. \nError: ${error.response.data.errors}`
        );
        return;
      }
    }

    return;
  }

  render() {
    const {firstname, lastname} = this.props;

    return (
      <div className={`${style.contact_card}`}>
        <main
          className={`${style.main} ${
            this.state.isShowAction ? style.active : ''
          }`}>
          <div
            onClick={() =>
              this.setState({isShowAction: !this.state.isShowAction})
            }
            className={`${style.profile_icon}`}>
            <FaUser />
          </div>
          <h4
            className={`${style.fullname} ${
              this.state.isShowAction ? style.active : ''
            } `}>
            {firstname} {lastname}
          </h4>
        </main>

        <aside
          className={`${style.action_bar} ${
            this.state.isShowAction ? style.active : ''
          }`}>
          <button
            className={`${style.trigger_btn}`}
            onClick={() =>
              this.setState({isShowAction: !this.state.isShowAction})
            }>
            <FaChevronLeft />
          </button>
          <div
            className={`${style.action_wrapper} ${
              this.state.isShowAction ? style.active : ''
            }`}>
            <Link
              className={`${style.action_button} ${style.action_info}`}
              to={`/dashboard/contacts/${this.props.iddata}`}>
              <FaInfoCircle />
            </Link>
            <button
              className={`${style.action_button} ${style.action_delete}`}
              type="button"
              onClick={() => this.deleteContactHandler()}>
              <FaTrash />
            </button>
          </div>
        </aside>
      </div>
    );
  }
}

export default ContactCard;
