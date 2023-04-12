import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import { getDeitailInforDoctors } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { Link } from 'react-router-dom';
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let response = await getDeitailInforDoctors(id);
      if (response && response.errCode === 0) {
        this.setState({
          detailDoctor: response.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    // console.log('check state thai son dev', this.state);
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = '';
    let nameEn = '';
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.lastName} ${detailDoctor.firstName} `;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-deltail-container">
          <div className="intro-doctor">
            <div
              className="content__left"
              style={{
                backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : 'image error'})`,
              }}
            ></div>
            <div className="content__right">
              <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="down">
                {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.description && (
                  <span>{detailDoctor.MarkDown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule currentDoctorIdFather={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor currentDoctorIdFather={this.state.currentDoctorId} />
            </div>
          </div>
          <div className="deitail-info-doctor">
            {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.MarkDown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
