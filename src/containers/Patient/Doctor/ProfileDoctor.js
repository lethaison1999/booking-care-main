import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getProfileInforDoctorByIdService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import './ProfileDoctor.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({ dataProfile: data });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileInforDoctorByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }
  //viet hoa chu dau
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTimeBooking = (dataTime) => {
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
      return (
        <>
          <div>
            {time} - {formatDate}
          </div>
          <div>
            <FormattedMessage id="patient.booking-model.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { dataProfile } = this.state;
    let { language, isshowDesc, dataTime, isShowPrice, isShowXemThem, doctorId } = this.props;

    let nameVi = '';
    let nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn},${dataProfile.lastName} ${dataProfile.firstName} `;
    }

    return (
      <>
        <div className="profile-doctor__container">
          <div className="intro-doctor">
            <div
              className="content__left"
              style={{
                backgroundImage: `url(${dataProfile.image ? dataProfile.image : 'image error'})`,
              }}
            ></div>
            <div className="content__right">
              <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="down">
                {isshowDesc === true ? (
                  <>
                    {dataProfile && dataProfile.MarkDown && dataProfile.MarkDown.description && (
                      <span>{dataProfile.MarkDown.description}</span>
                    )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime)}</>
                )}
              </div>
            </div>
          </div>
          {isShowXemThem === true && (
            <div className="xem-them">
              <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
            </div>
          )}
          {isShowPrice === true && (
            <div className="price">
              <span className="price-text">
                {' '}
                <FormattedMessage id="patient.booking-model.gia-kham" />{' '}
              </span>
              {dataProfile &&
              dataProfile.Doctor_Infor &&
              dataProfile.Doctor_Infor.priceTypeData &&
              language === LANGUAGES.VI ? (
                <NumberFormat
                  value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'VNĐ'}
                />
              ) : (
                ''
              )}
              {dataProfile &&
              dataProfile.Doctor_Infor &&
              dataProfile.Doctor_Infor.priceTypeData &&
              language === LANGUAGES.EN ? (
                <NumberFormat
                  value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'$'}
                />
              ) : (
                ''
              )}
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
