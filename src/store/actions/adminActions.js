import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
} from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_SUCCESS,
      });
      let res = await getAllCodeService('gender');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log('fetchGenderStart error !', e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});
export const fetchPositionSuccess = (positinData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positinData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('role');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log('fetchRoleFail error !', e);
    }
  };
};
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log('fetchPositionFail error !', e);
    }
  };
};
// CREATE USER REDUX

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_SUCCESS,
      });
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersrStart());
        toast.success('Create new User successfully!!!');
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log('saveUserFailed error !', e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});

//GET ALL USERS

export const fetchAllUsersrStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
      });
      let res = await getAllUsers('ALL');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error('Fetch all users failed');

        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error('Fetch all users failed', e);
      dispatch(fetchGenderFail());
      console.log('fetchAllUsersFailed error !', e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});
//delete user
export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.DELETE_USER_SUCCESS,
      });
      let res = await deleteUserService(userId);

      if (res && res.errCode === 0) {
        toast.success('Delete User successfully...');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersrStart());
      } else {
        dispatch(deleteUserFailed());
        toast.error('Delete User error...');
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      toast.error('Delete User error...');
      console.log('deleteUserFailed error !', e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});
//edit user
export const editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      // console.log('check data action', data);
      // dispatch({
      //   type: actionTypes.EDIT_USER_SUCCESS,
      // });
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Update a User successfully!');
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersrStart());
      } else {
        toast.error('Edit User failed');
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error('Edit user failed', e);
      dispatch(editUserFailed());
      console.log('editUserFailed error !', e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

//doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('20');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILDED });
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTOR_FAILDED', e);
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILDED });
    }
  };
};
