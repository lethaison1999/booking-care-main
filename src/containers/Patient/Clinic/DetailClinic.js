import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import './DetailClinic.scss';
import { getDetailClinicByIdService, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let response = await getDetailClinicByIdService({
        id: id,
      });
      if (response && response.errCode === 0) {
        let data = response.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(response.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => arrDoctorId.push(item.doctorId));
          }
        }

        this.setState({
          dataDetailClinic: response.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="specialty-body">
          <div className="desc-specialty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div className="font-weight-bold mb-2 mt-2">{dataDetailClinic.name}</div>
                <div
                  className="desc-inner"
                  dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}
                ></div>
              </>
            )}
          </div>

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
                          isShowPrice={false}
                          isShowXemThem={true}
                          // dataTime={dataTime}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
