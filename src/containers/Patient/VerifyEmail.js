import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyPatientBookingAppointmentService } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');

      let res = await postVerifyPatientBookingAppointmentService({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="container">
          <div className="row">
            <div
              className="col-12 text-center"
              style={{
                fontSize: '20px',
                textTransform: 'uppercase',
                color: 'red',
                marginTop: '30px',
              }}
            >
              {statusVerify === false && +errCode === -1 ? (
                <div>Đang tải dữ liệu...</div>
              ) : (
                <div>
                  {+errCode === 0 && statusVerify === true ? (
                    <div>Xác nhận lịch hẹn thành công </div>
                  ) : (
                    <div>Lịch hẹn đã tồn tại hoặc đã được xác nhận!!!</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
