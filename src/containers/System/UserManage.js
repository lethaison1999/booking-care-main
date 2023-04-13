import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalUserEdit from './ModalUserEdit';
import './UserManage.scss';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUsers: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersReact();
  }
  getAllUsersReact = async () => {
    let response = await getAllUsers('ALL');

    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleCreateUser = () => {
    this.setState({
      isOpenModalUsers: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUsers: !this.state.isOpenModalUsers,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersReact();
        this.setState({
          isOpenModalUsers: false,
        });
        emitter.emit('ENVENT_CLEAR_MODAL_DATA', { id: 'your id' });
      }
    } catch (e) {
      console.log(e);
    }
  };
  /*
  life cycle
  run component 
  1.run constructor -> init state
  2.didmout ->set state
  3.render (re-render)
  */
  handleDeleteUser = async (item) => {
    try {
      let response = await deleteUserService(item.id);
      if (response && response.errCode === 0) {
        await this.getAllUsersReact();
      } else {
        alert(response.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleUserEdit = (item) => {
    // console.log('checl edit user :', item);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: item,
    });
  };
  doEditUser = async (item) => {
    try {
      let response = await editUserService(item);
      if (response && response.errCode === 0) {
        await this.getAllUsersReact();
        this.setState({
          isOpenModalEditUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;

    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUsers}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalUserEdit
            isOpen={this.state.isOpenModalEditUser}
            toggleUserModal={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage users with thaisondev</div>
        <div className="mx-1 ">
          <button className="btn btn-primary px-3 mx-2" onClick={() => this.handleCreateUser()}>
            <i className="fas fa-plus"></i> Add new User
          </button>
        </div>
        <div className="users-table mt-4 mx-3">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            {arrUsers &&
              arrUsers.map((item, id) => {
                return (
                  <tbody key={id}>
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit" onClick={() => this.handleUserEdit(item)}>
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
