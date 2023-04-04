import axios from '../axios';

const handleLoginApi = (email, password) => {
  return axios.post('/api/login', { email, password });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};
const createNewUserService = (data) => {
  console.log('check data', data);
  return axios.post(`/api/create-new-user`, data);
};
const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put(`/api/edit-user`, inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  // console.log('check data', data);
  return axios.post(`/api/save-infor-doctors`, data);
};
const getDeitailInforDoctors = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctorService = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-infor-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyPatientBookingAppointmentService = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialtyService = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialtyService = () => {
  return axios.get(`/api/get-all-specialty`);
};
export {
  getAllUsers,
  getAllSpecialtyService,
  handleLoginApi,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveDetailDoctorService,
  createNewUserService,
  getDeitailInforDoctors,
  saveBulkScheduleDoctorService,
  getScheduleByDateService,
  getExtraInforDoctorByIdService,
  getProfileInforDoctorByIdService,
  postPatientBookingAppointmentService,
  postVerifyPatientBookingAppointmentService,
  createNewSpecialtyService,
};
