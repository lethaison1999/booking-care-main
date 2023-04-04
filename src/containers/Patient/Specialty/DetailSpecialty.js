import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import './DetailSpecialty.scss';
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [40, 30, 29],
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="specialty-body">
          <div className="desc-specialty">kasjhdsjakhdajksdhakjdhjaksdhjkas</div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="row specialty-app" key={index}>
                  <div className="each-doctor">
                    <div className="content-left col-6 p-3">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isshowDesc={true}
                          // dataTime={dataTime}
                        />
                        <span>Xem them</span>
                      </div>
                    </div>
                    <div className="content-right col-6 p-3">
                      <div className="doctor-schedule">
                        <DoctorSchedule currentDoctorIdFather={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor currentDoctorIdFather={item} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
