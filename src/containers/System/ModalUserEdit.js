import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalUserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
  }

  componentDidMount() {
    let user = this.props.currentUser; //user obj
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'hartcode',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleUserModal();
  };
  handleOnchangeInput = (e, id) => {
    let copyState = this.state;
    copyState[id] = e.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('Missing required parameter :' + [arrInput[i]]);
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state); //truyen state len cha usermangage
    }
  };
  render() {
    // console.log('check props', this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={'modal-user-container'}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, 'email')}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => this.handleOnchangeInput(e, 'password')}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container address">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save Change
          </Button>{' '}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserEdit);
