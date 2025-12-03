import {Component} from 'react';
import style from './style.module.css';

// Components
import Header from '../../components/ui/headerContent/HeaderContent';
import Form from '../../components/ui/form/Form';
import InputField from '../../components/ui/inputField/InputField';
import SubmitButton from '../../components/ui/submitButton/SubmitButton';

// Icons
import {FaBuilding, FaFlag, FaMap, FaRoad, FaSave} from 'react-icons/fa';
import {FaLocationPin} from 'react-icons/fa6';

// Others
import ContactAddressService from '../../services/ContactAddressService';
import withHooks from '../../libs/hoc/withHooks';
import {
  addContactAddressHookMapper,
  alertContextHookMapper,
} from '../../libs/hooksMappers';

class AddAddress extends Component {
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
  }

  async onSubmitHandler(e) {
    e.preventDefault();

    const detailId = this.props.contactId;

    if (!detailId) {
      this.props.showAlert('Detail Id Needed', 'error');
      return;
    }

    try {
      const response = await ContactAddressService.add(detailId, {
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

        this.props.showAlert('Add address sucessfully', 'info', () => {
          this.props.navigate(
            `/dashboard/contacts/${detailId ? detailId : ''}`
          );
        });

        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors, 'error');
      return;
    }
  }
  render() {
    return (
      <div className={`${style.add_address_page}`}>
        <Header
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

const AddAddressWithAlert = withHooks(alertContextHookMapper)(AddAddress);
const AddAddressPage = withHooks(addContactAddressHookMapper)(
  AddAddressWithAlert
);

export default AddAddressPage;
