import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllSpecialtyService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './Specialty.scss';
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
    // console.log('check item ', item);
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  render() {
    let { dataSpecialty } = this.state;
    // console.log('check state :', dataSpecialty);
    return (
      <>
        <div className="section-share section-specialty ">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                <FormattedMessage id="homePage.specialty-title" />
              </h2>
              <button className="section-btn">
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
