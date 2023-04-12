import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Modal } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

import './RemedyModal.scss';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      imgBase64: '',
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedyModal = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isShowModal, dataModal, closeRemedyModal, sendRemedy } = this.props;

    return (
      <>
        <Modal isOpen={isShowModal} className={'booking-modal-container'} size="md" centered>
          <div className="modal-header">
            <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
            <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="">Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  onChange={(e) => this.handleChangeEmail(e)}
                  value={this.state.email}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">Chọn file đơn thuốc</label>
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(e) => this.handleOnchangeImage(e)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedyModal()}>
              Xác nhận
            </Button>{' '}
            <Button color="secondary" onClick={closeRemedyModal}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
