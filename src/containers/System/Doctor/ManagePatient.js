import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import {
  getAllPatientForDoctorService,
  postSendRemedyService,
} from '../../../services/userService';
import './ManagePatient.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
      isShowModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctorService({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isShowModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isShowModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedyService({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success('Gửi thông tin thành công');
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error('Gửi thông tin thất bại ');
    }
  };

  render() {
    let { dataPatient, isShowModal, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay active={this.state.isShowLoading} spinner text="Đang gửi...">
          <div className="manage-patient">
            <div className="container">
              <div className="row">
                <div className="col-12 manage-title ">Quản lý bệnh nhân khám bệnh</div>
                <div className="col-6 form-group manage-form">
                  <label htmlFor="">Chọn ngày khám</label>
                  <DatePicker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={this.state.currentDate}
                    // minDate={yesterday}
                    // selected={this.state.currenDate}
                  />
                </div>
                <div className="col-12 manage-table">
                  <table className="table table-hover ">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>Giới tính</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPatient && dataPatient.length > 0 ? (
                        dataPatient.map((item, index) => {
                          let time =
                            language === LANGUAGES.VI
                              ? item.timeTypeDataPatient.valueVi
                              : item.timeTypeDataPatient.valueEn;
                          let gender =
                            language === LANGUAGES.VI
                              ? item.patientData.genderData.valueVi
                              : item.patientData.genderData.valueEn;
                          return (
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <td>{time}</td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.address}</td>
                              <td>{gender}</td>
                              <td>
                                <button
                                  className="btn btn-primary success"
                                  onClick={() => this.handleConfirm(item)}
                                >
                                  Xác nhận
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td>
                            <div className="data">Không có dữ liệu</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <RemedyModal
            isShowModal={isShowModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
