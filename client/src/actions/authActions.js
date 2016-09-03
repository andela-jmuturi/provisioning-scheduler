import Axios from 'axios';

import * as actionTypes from '../constants/authActionTypes';

export const register = data => dispatch => {
  dispatch({
    type: actionTypes.REGISTER_USER_REQUEST
  });

  return Axios.post('/api/users', data)
    .then(
      response => {
        dispatch({
          type: actionTypes.REGISTER_USER_SUCCESS,
          user: response.data
        });
        return Promise.resolve();
      },
      error => {
        dispatch({
          type: actionTypes.REGISTER_USER_FAILURE,
          error: error.response.data || error.message
        });
        return Promise.reject(error);
      }
    );
};

export function clearAuthErrors() {
  return {
    type: actionTypes.CLEAR_AUTH_ERRORS
  };
}

export const verifyToken = token => dispatch => {
  dispatch({
    type: actionTypes.VERIFY_ACCOUNT_REQUEST
  });

  return Axios.get(`/api/users/verify-email/${token}/verify`)
    .then(
      response => {
        dispatch({
          type: actionTypes.VERIFY_ACCOUNT_SUCCESS,
          user: response.data
        });
        return Promise.resolve();
      },
      error => {
        dispatch({
          type: actionTypes.VERIFY_ACCOUNT_FAILURE,
          error: error.response.data || error.message
        });
        return Promise.reject(error);
      }
    );
};