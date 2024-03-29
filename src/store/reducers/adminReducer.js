import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfor: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      state.isLoadingGender = false;
      state.genders = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.roles = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      state.positions = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILDED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_FAILDED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_SCHEDULE_HOUR_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_SCHEDULE_HOUR_FAILDED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };
    // GET_ALLCODE_SCHEDULE_HOUR_SUCCESS
    default:
      return state;
  }
};

export default appReducer;
