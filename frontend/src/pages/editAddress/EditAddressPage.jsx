import {Component} from 'react';
import style from './style.module.css';

import HeaderContent from '../../components/ui/headerContent/HeaderContent';
import {FaBuilding, FaFlag, FaMap, FaRoad, FaSave} from 'react-icons/fa';
import {FaLocationPin} from 'react-icons/fa6';
import SubmitButton from '../../components/ui/submitButton/SubmitButton';
import InputField from '../../components/ui/inputField/InputField';
import Form from '../../components/ui/form/Form';
import ContactAddressService from '../../services/ContactAddressService';
import withHooks from '../../libs/hoc/withHooks';
import {editContactAddressHookMapper} from '../../libs/hooksMappers';

class EditAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      street: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.getAddressById = this.getAddressById.bind(this);
  }

  async componentDidMount() {
    const contactId = this.props.contactId;
    const addressId = this.props.addressId;

    if (contactId && addressId) {
      await this.getAddressById(contactId, addressId);
    }
  }

  async getAddressById(contactId, addressId) {
    try {
      const response = await ContactAddressService.getById(
        contactId,
        addressId
      );

      if (response.status === 200) {
        this.setState({
          street: response.data.data.street,
          city: response.data.data.city,
          province: response.data.data.province,
          country: response.data.data.country,
          postalCode: response.data.data.postal_code,
        });

        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
    }
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    const contactId = this.props.contactId;
    const addressId = this.props.addressId;

    if (!contactId || !addressId) {
      alert('Contact and Address id is needed!');
      return;
    }

    try {
      const response = await ContactAddressService.edit(contactId, addressId, {
        street: this.state.street,
        city: this.state.city,
        province: this.state.province,
        country: this.state.country,
        postalCode: this.state.postalCode,
      });

      if (response.status === 200) {
        this.setState({
          street: '',
          city: '',
          province: '',
          country: '',
          postalCode: '',
        });

        alert('Edit address sucessfully');

        this.props.navigate(
          `/dashboard/contacts/${contactId ? contactId : ''}`
        );
        return;
      }
    } catch (error) {
      alert(error.response.data.errors);
      return;
    }
  }
  render() {
    return (
      <div className={`${style.add_address_page}`}>
        <HeaderContent
          title={'Add Address'}
          backTo={`/dashboard/contacts/${
            this.props.contactId ? this.props.contactId : ''
          }`}
        />

        <Form
          className={`${style.page_form}`}
          autoComplete={'off'}
          onSubmit={(e) => this.onSubmitHandler(e)}>
          <InputField
            id={'street'}
            label={'Stree'}
            Icon={FaRoad}
            placeholder={'Enter street address'}
            value={this.state.street}
            onChange={(e) => this.setState({street: e.target.value})}
          />
          <div className={`${style.form_input_wrapper}`}>
            <InputField
              id={'city'}
              label={'City'}
              Icon={FaBuilding}
              placeholder={'Enter city name'}
              value={this.state.city}
              onChange={(e) => this.setState({city: e.target.value})}
            />
            <InputField
              id={'province'}
              label={'Province'}
              Icon={FaMap}
              placeholder={'Enter province name'}
              value={this.state.province}
              onChange={(e) => this.setState({province: e.target.value})}
            />
          </div>
          <div className={`${style.form_input_wrapper}`}>
            <InputField
              id={'country'}
              label={'Country'}
              Icon={FaFlag}
              placeholder={'Enter country name'}
              value={this.state.country}
              onChange={(e) => this.setState({country: e.target.value})}
            />
            <InputField
              id={'postal_code'}
              label={'Postcal Code'}
              Icon={FaLocationPin}
              placeholder={'Enter postal code'}
              value={this.state.postalCode}
              onChange={(e) => this.setState({postalCode: e.target.value})}
            />
          </div>

          <SubmitButton name={'add_address'} Icon={FaSave} text={'Save'} />
        </Form>
      </div>
    );
  }
}

const EditAddressPage = withHooks(editContactAddressHookMapper)(EditAddress);

export default EditAddressPage;
