import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialtyService } from '../../../services/userService';
import './ManageSpecialty.scss';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkDown: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleChangeName = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkDown: text,
      descriptionHTML: html,
    });
  };
  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleClickSubmit = async () => {
    // this.checkValidateInput();
    //validate
    if (
      this.state.name === '' ||
      this.state.imageBase64 === '' ||
      this.state.descriptionHTML === '' ||
      this.state.descriptionMarkDown === ''
    ) {
      toast.error('Vui lòng điền các trường đầy đủ ');
    } else {
      let res = await createNewSpecialtyService(this.state);
      if (res && res.errCode === 0) {
        toast.success('Tạo chuyên khoa thành công !!');
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkDown: '',
        });
      } else {
        toast.error('Tạo chuyên khoa thất bại !!');
      }
      // console.log('checkk', this.state);
    }
  };
  render() {
    // console.log('check onchange :', this.state);
    return (
      <>
        <div className="manage-specialty-container">
          <div className="container">
            <div className="row">
              <div className="col-12 specialty-title text-center my-3">
                Quản lý chuyên khoa
              </div>
              <div className="specialty-body row">
                <div className="col-6 form-group ">
                  <label htmlFor="">Tên chuyên khoa</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleChangeName(e, 'name')}
                    placeholder=""
                  />
                </div>
                <div className="col-6 form-group ">
                  <label htmlFor="">Ảnh chuyên khoa</label>
                  <input
                    type="file"
                    // className="form-control"
                    className="form-control-file"
                    onChange={(e) => this.handleOnchangeImage(e)}
                  />
                </div>
                <div className="col-12">
                  <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkDown}
                  />
                </div>
                <div className="col-12 my-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleClickSubmit()}
                  >
                    Lưu
                  </button>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
