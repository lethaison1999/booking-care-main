import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class MedicalFacility extends Component {
  render() {
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Cơ sở y tế nổi bật</h2>
              <button className="section-btn">TÌM KIẾM</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="bg-image section-medical-facility" />
                  <div className="section-text">
                    Bệnh viện Hữu nghị Việt Đức 1
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-medical-facility" />
                  <div className="section-text">
                    Bệnh viện Hữu nghị Việt Đức 2
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-medical-facility" />
                  <div className="section-text">
                    Bệnh viện Hữu nghị Việt Đức 3
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-medical-facility" />
                  <div className="section-text">
                    Bệnh viện Hữu nghị Việt Đức 4
                  </div>
                </div>
                <div className="section-customize">
                  <div className="bg-image section-medical-facility" />
                  <div className="section-text">
                    Bệnh viện Hữu nghị Việt Đức 5
                  </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
