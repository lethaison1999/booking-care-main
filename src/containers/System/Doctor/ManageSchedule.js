import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { saveBulkScheduleDoctorService } from '../../../services/userService';

// import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import './ManageSchedule.scss';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      selectedDoctor: {},
      currentDate: '',
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getAllCodeScheduleHourRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      let dataSelect = this.handleSelectInPutDoctor(this.props.doctorsRedux);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSeclected: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleSelectInPutDoctor = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let nameVi = `${item.firstName} ${item.lastName} `;
        let nameEn = ` ${item.lastName} ${item.firstName} `;

        obj.label = language === LANGUAGES.VI ? nameVi : nameEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSeclected = !item.isSeclected;
        }
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, currentDate, selectedDoctor } = this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error('Invalid Choose Doctor');
      return;
    }
    if (!currentDate) {
      toast.error('Invalid Choose date');
      return;
    }

    // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formatDate = moment(currentDate).unix();
    let formatDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSeclected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatDate;
          obj.timeType = time.keyMap;
          result.push(obj);
        });
      } else {
        toast.error('Invalid seclected time ...');
        return;
      }
    }
    let res = await saveBulkScheduleDoctorService({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatDate: formatDate,
    });
    if (res && res.errCode === 0) {
      toast.success('Save Schedule Success ...');
    } else {
      toast.error('Save Schedule Faild ...');
    }
    // console.log('handle save schedule', result);
    // console.log('handle save res', res);
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // console.log('check state', this.state.rangeTime);
    return (
      <div className="manage-schedule-container">
        <div className="container">
          <div className="row">
            <div className="col-12 my-3 schedule-title">
              <FormattedMessage id="manage-schedule.schedule-title" />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.allDoctors}
              />
            </div>
            <div className="col-6">
              <label htmlFor="">
                {' '}
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
                // selected={this.state.currenDate}
              />
            </div>
            <div className="col-12 my-3 pick-hour-container ">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        item.isSeclected === true
                          ? 'btn btn-secondary mx-2 my-2'
                          : 'btn btn-outline-secondary mx-2 my-2'
                      }
                      onClick={() => this.handleClickTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>

            <button className=" btn btn-primary" onClick={() => this.handleSaveSchedule()}>
              <FormattedMessage id="manage-schedule.save-doctor" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    doctorsRedux: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
    getAllCodeScheduleHourRedux: () => dispatch(actions.getAllCodeScheduleHour()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
