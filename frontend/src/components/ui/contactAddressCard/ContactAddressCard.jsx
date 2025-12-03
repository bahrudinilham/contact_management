import {Component} from 'react';
import style from './style.module.css';

// Components
import {Link} from 'react-router';

// Icons
import {
  FaBuilding,
  FaFlag,
  FaHome,
  FaMap,
  FaPen,
  FaRoad,
  FaTrash,
} from 'react-icons/fa';

// Others
import ContactAddressService from '../../../services/ContactAddressService';
import withHooks from '../../../libs/hoc/withHooks';
import {alertContextHookMapper} from '../../../libs/hooksMappers';

class ContactAddressCard extends Component {
  constructor(props) {
    super(props);

    this.deleteAddressHandler = this.deleteAddressHandler.bind(this);
  }

  async deleteAddressHandler(contactId, addressId) {
    this.props.showAlert(
      `Are you sure to delete this (${this.props.street}, ${this.props.city}, ${this.props.province}, ${this.props.country}, ${this.props.postalCode})?`,
      'confirm',
      {
        ok: async () => {
          try {
            const response = await ContactAddressService.delete(
              contactId,
              addressId
            );

            if (response.status === 200) {
              console.log('Delete address sucessfully');
              this.props.reloadtoggle();
              return;
            }
          } catch (error) {
            console.log(error.response.data.errors);
            return;
          }
        },
      }
    );
  }

  render() {
    const {
      title,
      contactId,
      addressId,
      street,
      city,
      province,
      country,
      postelCode,
    } = this.props;
    return (
      <div className={`${style.address_card}`}>
        <section className={`${style.card_header}`}>
          <div className={`${style.header_icon}`}>
            <FaHome />
          </div>
          <span className={`${style.header_title}`}>{title}</span>
        </section>

        <table className={`${style.card_body}`}>
          <tbody>
            <tr className={`${style.data_wrapper} ${style.data_street}`}>
              <td className={`${style.data_icon}`}>
                <FaRoad />
              </td>
              <td className={`${style.data_title}`}>Street</td>
              <td>:</td>
              <td>
                {street ? street : 'Jl. Melati Indah No.27 jhwv whjvv wyff'}
              </td>
            </tr>
            <tr className={`${style.data_wrapper} ${style.data_city}`}>
              <td className={`${style.data_icon}`}>
                <FaBuilding />
              </td>
              <td className={`${style.data_title}`}>City</td>
              <td>:</td>
              <td>{city ? city : 'Bandung'}</td>
            </tr>
            <tr className={`${style.data_wrapper} ${style.data_province}`}>
              <td className={`${style.data_icon}`}>
                <FaMap />
              </td>
              <td className={`${style.data_title}`}>Province</td>
              <td>:</td>
              <td>{province ? province : 'Jawa Barat'}</td>
            </tr>
            <tr className={`${style.data_wrapper} ${style.data_country}`}>
              <td className={`${style.data_icon}`}>
                <FaFlag />
              </td>
              <td className={`${style.data_title}`}>Country</td>
              <td>:</td>
              <td>{country ? country : 'Indonesia'}</td>
            </tr>
            <tr className={`${style.data_wrapper} ${style.data_postal_code}`}>
              <td className={`${style.data_icon}`}></td>
              <td className={`${style.data_title}`}>
                Postal
                <br />
                Code
              </td>
              <td>:</td>
              <td>{postelCode ? postelCode : '40291'}</td>
            </tr>
          </tbody>
        </table>

        <section className={`${style.card_action}`}>
          <Link
            className={`${style.action_button} ${style.action_edit}`}
            to={`address/edit/${addressId}`}>
            <FaPen /> Edit
          </Link>
          <button
            className={`${style.action_button} ${style.action_delete}`}
            type="button"
            onClick={() => this.deleteAddressHandler(contactId, addressId)}>
            <FaTrash /> Delete
          </button>
        </section>
      </div>
    );
  }
}

const ContactAddressCardWithAlert = withHooks(alertContextHookMapper)(
  ContactAddressCard
);
export default ContactAddressCardWithAlert;
