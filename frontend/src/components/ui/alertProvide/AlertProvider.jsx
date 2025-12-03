import {Component} from 'react';

// Components
import Alert from '../alert/Alert';
import Alert2 from '../alert2/Alert2';

// Others
import {AlertContext} from '../../../libs/context/AlertContext';

class AlertProvider extends Component {
  constructor() {
    super();

    this.state = {
      message: null,
      type: 'info',
      status: 'show',
      action: null,
    };

    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.closeAction = this.closeAction.bind(this);
  }

  showAlert(message, infoType = 'info', action = null) {
    this.setState({
      message: message,
      type: infoType,
      action: action,
      status: '',
    });
  }

  hideAlert() {
    this.setState({status: 'hide'});

    setTimeout(() => {
      this.setState({message: null});
    }, 200);
  }

  closeAction() {
    if (this.state.action || this.state.action !== null) {
      this.state.action();
    }

    this.hideAlert();
  }

  cancelAction() {
    if (
      (this.state.action || this.state.action !== null) &&
      this.state.action.cancel
    ) {
      this.state.action.cancel();
    }
    this.hideAlert();
  }

  okAction() {
    if (
      (this.state.action || this.state.action !== null) &&
      this.state.action.ok
    ) {
      this.state.action.ok();
    }
    this.hideAlert();
  }

  render() {
    return (
      <AlertContext.Provider
        value={{
          showAlert: this.showAlert,
          hideAlert: this.hideAlert,
        }}>
        {this.props.children}

        {this.state.message || this.state.message !== null ? (
          this.state.type === 'confirm' ? (
            <Alert2
              isShow={this.state.status}
              type={this.state.type}
              message={this.state.message}
              cancelAlertHandler={() => this.cancelAction()}
              okAlertHandler={() => this.okAction()}
            />
          ) : (
            <Alert
              isShow={this.state.status}
              type={this.state.type}
              message={this.state.message}
              hideAlertHandler={() => this.closeAction()}
            />
          )
        ) : (
          ''
        )}
      </AlertContext.Provider>
    );
  }
}

export default AlertProvider;
