import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import './HomeHeader.scss';
import khamchuyenkhoa from '../../assets/images/kham-chuyen-khoa.png';
import khamtuxa from '../../assets/images/khamtuxa.png';
import khamtongquat from '../../assets/images/khamtongquat.png';
import xetnghiemyhoc from '../../assets/images/dichvuxetnghiem.png';
import suckhoetinhthan from '../../assets/images/suckhoetinhthan.png';
import khamnhakhoa from '../../assets/images/khamnhakhoa.png';
import goiphauthuat from '../../assets/images/phau-thuat.jpg';
import sanphamyte from '../../assets/images/khamtainha.png';
import suckhoedoanhnghiep from '../../assets/images/icon-lich-su.jpg';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);

    //fire redux event:actions
  };

  returnToHome = () => {
    this.props.history.push(`/home`);
  };
  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={() => this.returnToHome()}></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <FormattedMessage id="homeheader.speciality" />
                </div>
                <div className="child-content-text">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <FormattedMessage id="homeheader.health-facility" />
                </div>
                <div className="child-content-text">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <FormattedMessage id="homeheader.doctor" />{' '}
                </div>
                <div className="child-content-text">
                  {' '}
                  <FormattedMessage id="homeheader.seclect-doctor" />{' '}
                </div>
              </div>
              <div className="child-content">
                <div>
                  {' '}
                  <FormattedMessage id="homeheader.fee" />{' '}
                </div>
                <div className="child-content-text">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="content-support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="header-up">
              <div className="title1">
                {' '}
                <FormattedMessage id="banner.title1" />{' '}
              </div>
              <div className="title2">
                {' '}
                <b>
                  {' '}
                  <FormattedMessage id="banner.title2" />
                </b>
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm" />
              </div>
            </div>
            <div className="header-down ">
              <div className="options ">
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={khamchuyenkhoa} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={khamtuxa} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={khamtongquat} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={xetnghiemyhoc} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={suckhoetinhthan} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={khamnhakhoa} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={goiphauthuat} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child7" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={sanphamyte} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child8" />
                  </div>
                </div>
                <div className="option-child ">
                  <div className="icon-child">
                    <img src={suckhoedoanhnghiep} alt="logo" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child9" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
