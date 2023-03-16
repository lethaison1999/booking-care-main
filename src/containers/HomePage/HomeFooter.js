import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer ">
          <p>
            &copy; 2023 Thái Sơn Lê.
            <a target="blank" href="https://www.facebook.com/le.thaison.77">
              More infomation. Please visit My Facebook.&#8592; Click Here
              &#8594;
            </a>
          </p>
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
