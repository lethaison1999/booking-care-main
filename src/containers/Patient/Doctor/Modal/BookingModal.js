import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { postPatientBookingAppointmentService } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../../store/actions';
import _ from 'lodash';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from './../../../../components/Input/DatePicker';
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
import moment from 'moment';
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthday: '',
      genders: '',
      doctorId: '',
      setlectedGender: '',
      timeType: '',
    };
  }

  async componentDidMount() {
    this.props.fetchGenderStart();
  }
  buidDataGender = (data) => {
    let resulft = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        resulft.push(obj);
      });
    }
    return resulft;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buidDataGender(this.props.genderRedux),
        // gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genders: this.buidDataGender(this.props.genderRedux),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        this.setState({
          doctorId: doctorId,
          timeType: this.props.dataTime.timeType,
        });
      }
    }
  }
  handleChangeInput = (e, id) => {
    let copyState = { ...this.state };
    let valueInput = e.target.value;
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      setlectedGender: selectedOption,
    });
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI && dataTime.timeTypeData
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('ddd - MM/DD/YYYY');

      let formatDate = this.capitalizeFirstLetter(date);
      return `
      ${time} - ${formatDate}
      
      `;
    }
    return <></>;
  };
  buidDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? ` ${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `
          : ` ${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} `;

      return name;
    }
    return <></>;
  };
  // checkInputValidate = () => {
  //   let arrBooking = [
  //     'fullName',
  //     'phoneNumber',
  //     'email',
  //     'address',
  //     'reason',
  //     'birthday',
  //     'genders',
  //   ];
  //   let isValid = true;
  //   for (let i = 0; i < arrBooking.length; i++) {
  //     if (!this.state[arrBooking[i]]) {
  //       isValid = false;
  //       toast.error('Missing required Parameter : ' + arrBooking[i]);
  //     }
  //     return isValid;
  //   }
  // };
  handleConfirmBooking = async () => {
    if (
      !this.state.fullName ||
      !this.state.phoneNumber ||
      !this.state.email ||
      !this.state.address ||
      !this.state.reason ||
      !this.state.birthday ||
      !this.state.genders
    ) {
      toast.error('Vui lòng nhập các trường đầy đủ ...');
    } else {
      let timeString = this.buildTimeBooking(this.props.dataTime);
      let doctorName = this.buidDoctorName(this.props.dataTime);
      let date = new Date(this.state.birthday).getTime(); //conver string dang timetamps
      let res = await postPatientBookingAppointmentService({
        fullName: this.state.fullName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        reason: this.state.reason,
        date: date,
        genders: this.state.genders,
        doctorId: this.state.doctorId,
        setlectedGender: this.state.setlectedGender.value,
        timeType: this.state.timeType,
        language: this.props.language,
        timeString: timeString,
        doctorName: doctorName,
      });
      if (res && res.errCode === 0) {
        toast.success('Tạo lịch khám bệnh thành công ...');
        this.props.closeBookingModal();
      } else {
        toast.error('Tạo lịch khám bệnh thất bại ...');
      }
      // console.log('check :', this.state);
    }
  };
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal__container"
          size="lg"
          centered
        >
          <div className="booking-modal__content">
            <div className="booking-modal__header">
              <span className="left">
                <FormattedMessage id="patient.booking-model.left" />
              </span>
              <span className="right" onClick={closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal__body container">
              {/* {JSON.stringify(dataTime)} */}
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isshowDesc={false}
                  dataTime={dataTime}
                />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // placeholder="vui lòng nhập họ và tên"
                    value={this.state.fullName}
                    onChange={(e) => this.handleChangeInput(e, 'fullName')}
                    required={true}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.phoneNumber" />
                  </label>
                  <input
                    // pattern="^-?[0-9]\d*\.?\d*$"
                    type="text"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(e) => this.handleChangeInput(e, 'phoneNumber')}
                    // placeholder="vui lòng nhập số điện thoại"
                    required={true}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => this.handleChangeInput(e, 'email')}
                    // placeholder="vui lòng nhập email"
                    required={true}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => this.handleChangeInput(e, 'address')}
                    // placeholder="vui lòng nhập địa chỉ"
                    required={true}
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.li-do" />
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.reason}
                    onChange={(e) => this.handleChangeInput(e, 'reason')}
                    required={true}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.date" />
                  </label>
                  <DatePicker
                    value={this.state.birthday}
                    className="form-control"
                    onChange={this.handleChangeDatePicker}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    <FormattedMessage id="patient.booking-model.gender" />
                  </label>
                  <Select
                    value={this.state.setlectedGender}
                    options={this.state.genders}
                    onChange={this.handleChangeSelect}
                    placeholder={
                      <FormattedMessage id="patient.booking-model.chon-gt" />
                    }
                    name="setlectedGender"
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal__footer">
              <button
                className="btn btn-primary"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-model.save" />
              </button>
              <button className="btn btn-warning" onClick={closeBookingModal}>
                <FormattedMessage id="patient.booking-model.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
