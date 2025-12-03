import * as React from 'react';
import style from './style.module.css';

// Components
import Header from '../../components/ui/headerContent/HeaderContent';
import CreateContactForm from "../../components/ui/createContactForm/CreateContactForm"

class CreateContactPage extends React.Component {
  render() {
    return (
      <div className={`${style.create_contact_page}`}>
        <Header title={'Create Contact'} backTo={'/dashboard/contacts'} />

        <CreateContactForm />
      </div>
    );
  }
}

export default CreateContactPage;
