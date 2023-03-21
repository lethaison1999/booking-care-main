import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  users: [],
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
    default:
      return state;
  }
};

export default appReducer;
