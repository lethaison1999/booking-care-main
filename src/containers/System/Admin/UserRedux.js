import React, { Component } from 'react';
import { FormattedDisplayName, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserManage from './TableUserManage';
import { toast } from 'react-toastify';
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      rolesArr: [],
      positionArr: [],
      previewImgUrl: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
      action: '',
      userEditId: '',
    };
  }
  async componentDidMount() {
    this.props.fetchGenderStart();
    this.props.fetchRoleStart();
    this.props.fetchPositionStart();
    // try {
    //   let res = await getAllCodeService('gender');
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   } else {
    //     console.log('lỗi không có dữ liệu');
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        rolesArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
      });
    }
    if (prevProps.users !== this.props.users) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPosition = this.props.positionRedux;
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
        avatar: '',
        action: CRUD_ACTIONS.CREATE,
        previewImgUrl: '',
      });
    }
  }

  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    }
  };
  handlePreviewImage = () => {
    if (!this.state.previewImgUrl) {
      return;
    } else {
      this.setState({
        isOpen: true,
      });
    }
  };

  handleSaveUser = () => {
    let isValid = this.checkInputValidate();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    console.log('check state before on submit :', this.state);
  };
  checkInputValidate = () => {
    let arrInput = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
      'gender',
      'position',
      'role',
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error('Missing required parameter ???' + [arrInput[i]]);
      }
    }
    return isValid;
    // for (let arr of arrInput) {
    //   if (!this.state[arr]) {
    //     isValid = false;
    //     alert('Missing required parameter :' + [arr]);
    //     break;
    //   }
    // }
    // return isValid;
  };
  handleOnchangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUserParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }

    this.setState({
      email: user.email,
      password: 'hard code',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: '',
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.rolesArr;
    let positions = this.state.positionArr;

    let language = this.props.language;
    let isLoading = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Learn React-Redux Với Thái Sơn DEV</div>

        <div className="redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                {isLoading === true ? 'Loading Gender ...' : ''}
              </div>
              <div className="col-12  my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3 mb-3 ">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => this.handleOnchangeInput(e, 'email')}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => this.handleOnchangeInput(e, 'password')}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                />
              </div>
              <div className="col-9">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(e) => this.handleOnchangeInput(e, 'address')}
                />
              </div>
              <div className="col-3 mt-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item) => {
                      return (
                        <option key={item.id} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 mt-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.handleOnchangeInput(e, 'position')}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item) => {
                      return (
                        <option key={item.id} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 mt-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.handleOnchangeInput(e, 'role')}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item) => {
                      return (
                        <option key={item.id} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 mt-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-image-container">
                  <input
                    type="file"
                    id="previewImage"
                    hidden
                    onChange={(e) => this.handleOnchangeImage(e)}
                  />
                  <label htmlFor="previewImage" className="label-upload">
                    <FormattedMessage id="manage-user.upload-image" />
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    onClick={() => this.handlePreviewImage()}
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? 'btn btn-warning'
                      : 'btn btn-primary'
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableUserManage
                  handleEditUserParent={this.handleEditUserParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    users: state.admin.users,
    //reducer redux state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //action redux
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersrStart()),
    editUserRedux: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
