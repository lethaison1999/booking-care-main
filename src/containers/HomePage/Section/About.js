import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">
            <h2> Câu nói ý nghĩa thay đổi cuộc sống của bạn MÃI MÃI</h2>
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/qfoq8IX43vE"
                title="50 Câu nói ý nghĩa thay đổi cuộc sống của bạn MÃI MÃI - Triết Lý và Bài Học Cuộc Sống"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Đừng bao giờ nói bạn đã thất bại cho đến khi đó là nỗ lực cuối
                cùng của bạn. Và đừng bao giờ nói rằng đó là nỗ lực cuối cùng
                của bạn cho đến khi bạn đã thành công.
              </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
