import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import { getScheduleByDateService } from '../../../services/userService';
import './DoctorSchedule.scss';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    // console.log('moment vi:', moment(new Date()).format('dddd - DD/MM'));
    // console.log(
    //   'moment en:',
    //   moment(new Date()).locale('en').format('ddd - DD/MM')
    // );
    let allDays = this.getArrDays(language);
    if (this.props.currentDoctorIdFather) {
      let res = await getScheduleByDateService(this.props.currentDoctorIdFather, allDays[0].value);
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
    this.setState({
      allDays: allDays,
    });
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`;
          obj.label = today;
        } else {
          let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
          obj.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
        }
      }
      obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(obj);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.currentDoctorIdFather !== prevProps.currentDoctorIdFather) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleByDateService(this.props.currentDoctorIdFather, allDays[0].value);
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnchangeSelect = async (e) => {
    if (this.props.currentDoctorIdFather && this.props.currentDoctorIdFather !== -1) {
      let doctorId = this.props.currentDoctorIdFather;
      let date = e.target.value;
      let res = await getScheduleByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
    }
  };
  handleClickTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
    // console.log('check time', time);
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="container">
            <div className="row">
              <div className=" col-12 all-schedule ">
                <select
                  // className="form-control"
                  // id="exampleFormControlSelect2"
                  onChange={(e) => this.handleOnchangeSelect(e)}
                >
                  {allDays &&
                    allDays.length > 0 &&
                    allDays.map((item, index) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className=" col-12 all-available-time">
                <div className="text-calendar">
                  <i className="fas fa-calendar-alt">
                    {' '}
                    <span>
                      <FormattedMessage id="patient.detail-doctor.schedule" />
                    </span>{' '}
                  </i>
                </div>
                <div className="time-content ">
                  {allAvalableTime && allAvalableTime.length > 0 ? (
                    <>
                      {allAvalableTime.map((item, index) => {
                        let timeDisplay =
                          language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                        return (
                          <button
                            key={index}
                            className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                            onClick={() => this.handleClickTime(item)}
                          >
                            {timeDisplay}
                          </button>
                        );
                      })}
                      <div className="book-free col-12">
                        <span>
                          <FormattedMessage id="patient.detail-doctor.choose" />{' '}
                          <i className="far fa-hand-point-up"></i>{' '}
                          <FormattedMessage id="patient.detail-doctor.book-free" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="no-schedule">
                      <FormattedMessage id="patient.detail-doctor.no-schedule" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
