import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="footer-main  ">
          <div className="">
            <div className="footer-top  mb-3">
              <div className="row top-body">
                <div className="top-left col-md-6 ">
                  <img src={logo} alt="" className="top-left__logo" />
                  <div className="font-weight-bold mb-2">Công ty Cổ phần Công nghệ BookingCare</div>
                  <div className="top-left-main mb-1">
                    <i className="fas fa-map-marker-alt "></i>
                    <span>
                      Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội
                    </span>
                  </div>
                  <div className="top-left-main">
                    <i className="fas fa-check"></i>
                    <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                  </div>
                </div>
                <div className="top-center col-md-3">
                  <ul className="">
                    <li>
                      <Link to="#">Liên hệ hợp tác</Link>
                    </li>
                    <li>
                      <Link to="#">Gói chuyển đổi số doanh nghiệp</Link>
                    </li>
                    <li>
                      <Link to="#">Tuyển dụng</Link>
                    </li>
                    <li>
                      <Link to="#">Câu hỏi thường gặp</Link>
                    </li>
                    <li>
                      <Link to="#">Điều khoản sử dụng</Link>
                    </li>
                    <li>
                      <Link to="#">Chính sách Bảo mật</Link>
                    </li>
                    <li>
                      <Link to="#">Quy trình hỗ trợ giải quyết khiếu nại</Link>
                    </li>
                    <li>
                      <Link to="#">Quy chế hoạt động</Link>
                    </li>
                  </ul>
                </div>
                <div className="top-right col-md-3">
                  <div>
                    <b>Trụ sở tại Hà Nội</b>
                    <div className="mb-3">
                      Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội
                    </div>
                  </div>
                  <div>
                    <b className="">Văn phòng tại TP Hồ Chí Minh</b>
                    <div className="mb-3">Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
                  </div>
                  <div>
                    <b>Hỗ trợ khách hàng</b>
                    <div className="mb-3">support@bookingcare.vn (7h - 18h)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom mb-3">
              <div className="bottom-body row">
                <div className="copy-right col-md-6 ">© 2023 ThaiSonDev.</div>
                <div className="bottom-icons gap-3">
                  <i className="fab fa-facebook-square facebook"></i>
                  <i className="fab fa-youtube youtube"></i>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
