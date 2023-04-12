import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinicService } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinicService();
    if (res && res.errCode === 0) {
      this.setState({ dataClinics: res.data });
    }
    // console.log('check res clinics :', res);
  }
  handleViewDetailClinic = (item) => {
    // console.log('check : ' + item);
    this.props.history.push(`/detail-clinic/${item.id}`);
  };
  render() {
    let { dataClinics } = this.state;
    // console.log('check data clinic :', this.state);
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
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div className="section-customize" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                        <div
                          className="bg-image section-medical-facility"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
