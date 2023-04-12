import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { getDeitailInforDoctors } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown
      contentMarkDown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      allDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      selectedClinic: '',
      selectedSpecialty: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
      clinicId: '',
      specialtyId: '',
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      let dataSelect = this.handleSelectInPutDoctor(this.props.doctorsRedux, 'USERS');
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

      let dataSelect = this.handleSelectInPutDoctor(this.props.doctorsRedux, 'USERS');

      let dataSelectPrice = this.handleSelectInPutDoctor(resPrice, 'PRICE');

      let dataSelectPayment = this.handleSelectInPutDoctor(resPayment, 'PAYMENT');

      let dataSelectProvince = this.handleSelectInPutDoctor(resProvince, 'PROVINCE');

      this.setState({
        allDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.handleSelectInPutDoctor(resPrice, 'PRICE');
      let dataSelectPayment = this.handleSelectInPutDoctor(resPayment, 'PAYMENT');
      let dataSelectProvince = this.handleSelectInPutDoctor(resProvince, 'PROVINCE');
      let dataSelectSpecialty = this.handleSelectInPutDoctor(resSpecialty, 'SPECIALTY');
      let dataSelectClinic = this.handleSelectInPutDoctor(resClinic, 'CLINIC');
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkDown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkDown: this.state.contentMarkDown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
    let res = await getDeitailInforDoctors(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
      let markDown = res.data.MarkDown;
      let addressClinic = '',
        nameClinic = '',
        note = '',
        paymentId = '',
        priceId = '',
        provinceId = '',
        selectedPrice = '',
        selectedPayment = '',
        selectedSpecialty = '',
        specialtyId = '',
        selectedProvince = '',
        clinicId = '',
        selectedClinic = '';
      if (res.data.Doctor_Infor) {
        clinicId = res.data.Doctor_Infor.clinicId;
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkDown: markDown.contentMarkDown,
        description: markDown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkDown: '',
        description: '',
        hasOldData: false,
        addressClinic: '',
        nameClinic: '',
        note: '',
        selectedPayment: '',
        selectedPrice: '',
        selectedProvince: '',
        selectedSpecialty: '',
        selectedClinic: '',
      });
    }
  };
  handleChangSelectDoctorInfor = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSelectInPutDoctor = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, index) => {
          let obj = {};
          let nameVi = `${item.firstName} ${item.lastName} `;

          let nameEn = ` ${item.lastName} ${item.firstName} `;

          obj.label = language === LANGUAGES.VI ? nameVi : nameEn;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === 'PRICE') {
        inputData.map((item, index) => {
          let obj = {};
          let nameVi = `${item.valueVi} `;

          let nameEn = ` ${item.valueEn} USD `;

          obj.label = language === LANGUAGES.VI ? nameVi : nameEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        inputData.map((item, index) => {
          let obj = {};
          let nameVi = `${item.valueVi} `;

          let nameEn = ` ${item.valueEn} `;

          obj.label = language === LANGUAGES.VI ? nameVi : nameEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === 'SPECIALTY') {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === 'CLINIC') {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
    }
    return result;
  };
  render() {
    let { hasOldData } = this.state;
    // console.log('check state', listSpecialty);
    return (
      <div className="manage-doctor-container container">
        <div className="manage-doctor__title">
          <FormattedMessage id="admin.manage-doctor.title" />{' '}
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.allDoctors}
              placeholder={'Chọn bác sĩ ...'}
            />
          </div>
          <div className="content-right ">
            <label>
              <FormattedMessage id="admin.manage-doctor.doctor-infor" />
            </label>
            <textarea
              className="form-control"
              // rows="4"
              onChange={(e) => this.handleChangText(e, 'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra">
          <div className="row">
            <div className="col-4 form-group">
              <label htmlFor="">
                {' '}
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangSelectDoctorInfor}
                options={this.state.listPrice}
                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangSelectDoctorInfor}
                options={this.state.listPayment}
                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangSelectDoctorInfor}
                options={this.state.listProvince}
                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                name="selectedProvince"
              />
            </div>
            {/* <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin.manage-doctor.chuyen-khoa" />
              </label>

              <input
                className="form-control"
                onChange={(e) => this.handleChangText(e, 'nameClinic')}
                value={this.state.nameClinic}
              />
            </div> */}
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin.manage-doctor.clinic-address" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleChangText(e, 'addressClinic')}
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleChangText(e, 'note')}
                value={this.state.note}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.chuyen-khoa" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangSelectDoctorInfor}
              options={this.state.listSpecialty}
              name="selectedSpecialty"
              placeholder={<FormattedMessage id="admin.manage-doctor.chuyen-khoa" />}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.phong-kham" />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangSelectDoctorInfor}
              options={this.state.listClinic}
              name="selectedClinic"
              placeholder={<FormattedMessage id="admin.manage-doctor.phong-kham" />}
            />
          </div>
        </div>
        <div className="manage-doctor__editor">
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkDown}
          />
        </div>

        <button
          className={hasOldData === true ? 'btn btn-warning save-doctor' : 'btn btn-primary create-doctor'}
          onClick={() => this.handleSaveContentMarkDown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save-doctor" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.create-doctor" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorsRedux: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctor()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
