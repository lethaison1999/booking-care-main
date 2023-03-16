import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {
  render() {
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Bác sĩ nổi bật tuần qua</h2>
              <button className="section-btn">TÌM KIẾM</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor" />
                    </div>
                    <div className="position text-center">
                      <div className="section-text">
                        Giáo Sư, Tiến Sĩ Thái Sơn Dev
                      </div>
                      <div style={{ color: '#55555', fontSize: '12px' }}>
                        Cơ Xương Khớp
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor" />
                    </div>
                    <div className="position text-center">
                      <div className="section-text">
                        Giáo Sư, Tiến Sĩ Thái Sơn Dev
                      </div>
                      <div style={{ color: '#55555', fontSize: '12px' }}>
                        Cơ Xương Khớp
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor" />
                    </div>
                    <div className="position text-center">
                      <div className="section-text">
                        Giáo Sư, Tiến Sĩ Thái Sơn Dev
                      </div>
                      <div style={{ color: '#55555', fontSize: '12px' }}>
                        Cơ Xương Khớp
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor" />
                    </div>
                    <div className="position text-center">
                      <div className="section-text">
                        Giáo Sư, Tiến Sĩ Thái Sơn Dev
                      </div>
                      <div style={{ color: '#55555', fontSize: '12px' }}>
                        Cơ Xương Khớp
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor" />
                    </div>
                    <div className="position text-center">
                      <div className="section-text">
                        Giáo Sư, Tiến Sĩ Thái Sơn Dev
                      </div>
                      <div style={{ color: '#55555', fontSize: '12px' }}>
                        Cơ Xương Khớp
                      </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
