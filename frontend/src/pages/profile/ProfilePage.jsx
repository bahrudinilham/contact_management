import * as React from 'react';
import style from './profilePage.module.css';

// Components
import Header from '../../components/ui/headerContent/HeaderContent';
import ProfileForm from '../../components/ui/profileForm/ProfileForm';

// Icons
import {FaPencilAlt, FaTimes} from 'react-icons/fa';

// Others
import UserService from '../../services/UserService';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',

      isEditMode: false,
    };

    this.editModeSwitcher = this.editModeSwitcher.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async getCurrentUser() {
    try {
      const response = await UserService.userDetail();

      if (response.status === 200) {
        this.setState({
          username: response.data.data.username,
          fullname: response.data.data.name || '',
        });
        return;
      }
    } catch (error) {
      this.props.showAlert(error.response.data.errors, 'error');
      return;
    }
  }

  editModeSwitcher() {
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  }

  render() {
    return (
      <div className={`${style.profile_page}`}>
        <Header title={'Profile'} backTo={'/dashboard/contacts'} />

        <main className={`${style.container}`}>
          <div className={`${style.container_header}`}>
            <h2 className={`${style.header_title}`}>
              {this.state.isEditMode ? 'Edit' : 'Your'} Profile | @
              {this.state.username}
            </h2>
            <button
              className={`${style.header_button} ${style.button_edit}`}
              type="button"
              onClick={this.editModeSwitcher}>
              <div className={`${style.button_icon_wrapper}`}>
                {this.state.isEditMode ? <FaTimes /> : <FaPencilAlt />}
              </div>
              <div className={`${style.button_text}`}>
                {this.state.isEditMode ? 'Cancel' : 'Edit'}
              </div>
            </button>
          </div>

          <ProfileForm
            isEdit={this.state.isEditMode}
            fullname={this.state.fullname}
            reloadHandler={async () => await this.getCurrentUser()}
            modeSwitcher={() => this.editModeSwitcher()}
          />
        </main>
      </div>
    );
  }
}

export default ProfilePage;
