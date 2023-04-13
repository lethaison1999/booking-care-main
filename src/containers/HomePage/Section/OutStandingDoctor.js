import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions/';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctorRedux();
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  handleSectionBtn = () => {
    toast.warn('Chức năng này đang được phát triển ...');
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                <FormattedMessage id="homePage.outstanding-doctor" />
              </h2>
              <button className="section-btn" onClick={() => this.handleSectionBtn()}>
                {' '}
                <FormattedMessage id="homePage.more-infor" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = '';
                    if (item.image) {
                      imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                    }
                    let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn},${item.lastName} ${item.firstName} `;
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-outstanding-doctor"
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            />
                          </div>
                          <div className="position text-center">
                            <div className="section-text">
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div style={{ color: '#55555', fontSize: '12px' }}>Cơ Xương Khớp</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctorRedux: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
