import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllSpecialtyService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './Specialty.scss';
import { toast } from 'react-toastify';

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialtyService();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  handleSectionBtn = () => {
    toast.warn('Chức năng này đang được phát triển ...');
  };
  render() {
    let { dataSpecialty } = this.state;
    return (
      <>
        <div className="section-share section-specialty ">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                <FormattedMessage id="homePage.specialty-title" />
              </h2>
              <button className="section-btn" onClick={() => this.handleSectionBtn()}>
                <FormattedMessage id="homePage.more-infor" />
              </button>
            </div>
            <div className="section-body ">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="section-customize "
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div
                          className="bg-image section-specialty "
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="section-text">{item.name}</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
