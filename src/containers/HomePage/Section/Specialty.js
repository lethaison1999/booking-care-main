import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class Specialty extends Component {
  render() {
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Chuyên khoa phổ biến</h2>
              <button className="section-btn">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <div className="section-text">Cơ xương khớp 1</div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <div className="section-text">Cơ xương khớp 2</div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <div className="section-text">Cơ xương khớp 3</div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <div className="section-text">Cơ xương khớp 4</div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-specialty" />
                  <div className="section-text">Cơ xương khớp 5</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
