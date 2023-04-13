import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import './DetailSpecialty.scss';
import { getDetailSpecialtyByIdService, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import HomeFooter from './../../HomePage/HomeFooter';

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isShow: false,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let response = await getDetailSpecialtyByIdService({
        id: id,
        location: 'ALL',
      });
      let resProvince = await getAllCodeService('PROVINCE');
      if (response && response.errCode === 0 && resProvince && resProvince.errCode === 0) {
        let data = response.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(response.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => arrDoctorId.push(item.doctorId));
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: 'ALL',
            type: 'PROVINCE',
            valueEn: 'ALL',
            valueVi: 'Toàn quốc',
          });
        }
        this.setState({
          dataDetailSpecialty: response.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  // '/api/get-detail-specialty-by-id'
  handleOnchangeSelect = async (e) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = e.target.value;
      let response = await getDetailSpecialtyByIdService({
        id: id,
        location: location,
      });
      if (response && response.errCode === 0) {
        let data = response.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(response.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => arrDoctorId.push(item.doctorId));
          }
        }

        this.setState({
          dataDetailSpecialty: response.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  handleShow = (status) => {
    this.setState({
      isShow: status,
    });
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince, isShow } = this.state;
    let { language } = this.props;

    return (
      <>
        <div className="detail-specialty-container ">
          <HomeHeader />
          <div className="specialty-body">
            <div className="desc-specialty">
              {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                <>
                  <div
                    className="desc-inner"
                    dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
                  ></div>
                </>
              )}
            </div>
            <div className="search-specialty">
              <select onChange={(e) => this.handleOnchangeSelect(e)}>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                      </option>
                    );
                  })}
              </select>
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
          <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
