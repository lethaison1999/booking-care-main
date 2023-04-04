import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

import { getExtraInforDoctorByIdService } from '../../../services/userService';
import './DoctorExtraInfor.scss';

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.currentDoctorIdFather) {
      let res = await getExtraInforDoctorByIdService(this.props.currentDoctorIdFather);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.currentDoctorIdFather !== prevProps.currentDoctorIdFather) {
      let res = await getExtraInforDoctorByIdService(this.props.currentDoctorIdFather);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
      // console.log('check data', res);
    }
  }
  handleShowDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
    console.log('status', status);
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    // console.log('extraInfor: ', extraInfor);
    let { language } = this.props;
    return (
      <>
        <div className="doctor-extra-infor-container">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content-up">
                  <div className="text-address">
                    <FormattedMessage id="patient.extra-doctorInfo.text-address" />
                  </div>
                  <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                  <div className="detail-address">
                    {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                  </div>
                </div>
                <div className="content-dow">
                  {isShowDetailInfor === false ? (
                    <>
                      <div>
                        <span style={{ color: '#666', fontWeight: '600' }}>
                          <FormattedMessage id="patient.extra-doctorInfo.price" />
                        </span>
                        <span
                          style={{
                            color: '#000',
                            fontSize: '14px',
                            marginLeft: '3px',
                            marginRight: '3px',
                          }}
                        >
                          {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                            <NumberFormat
                              value={extraInfor.priceTypeData.valueVi}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={'VNĐ'}
                            />
                          )}
                          {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                            <NumberFormat
                              value={extraInfor.priceTypeData.valueEn}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={'$'}
                            />
                          )}
                        </span>
                        <span className="show" onClick={() => this.handleShowDetailInfor(true)}>
                          <FormattedMessage id="patient.extra-doctorInfo.xem-chi-tiet" />
                        </span>{' '}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="content-price">
                        {' '}
                        <FormattedMessage id="patient.extra-doctorInfo.price" />
                      </div>
                      <div className="content-text">
                        <span className="left">
                          {' '}
                          <FormattedMessage id="patient.extra-doctorInfo.price" />
                        </span>
                        <span className="right">
                          {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                            <NumberFormat
                              value={extraInfor.priceTypeData.valueVi}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={'VNĐ'}
                            />
                          )}
                          {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                            <NumberFormat
                              value={extraInfor.priceTypeData.valueEn}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={'$'}
                            />
                          )}
                        </span>
                        <p className="text-p">{extraInfor && extraInfor.note ? extraInfor.note : ''}</p>
                      </div>
                      <div className="content-payment">
                        <FormattedMessage id="patient.extra-doctorInfo.content-payment" />

                        {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                          ? extraInfor.paymentTypeData.valueVi
                          : ''}
                        {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                          ? extraInfor.paymentTypeData.valueEn
                          : ''}
                      </div>
                      <div className="none-price">
                        <span className="show an-bang-gia" onClick={() => this.handleShowDetailInfor(false)}>
                          <FormattedMessage id="patient.extra-doctorInfo.an-bang-gia" />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
