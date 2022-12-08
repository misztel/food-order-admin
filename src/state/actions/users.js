/* eslint-disable no-undef */
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getUserStart = () => ({
  type: actionTypes.GET_USER_START
});

export const getUserSuccess = (data) => ({
  type: actionTypes.GET_USER_SUCCESS,
  data: data
});

export const getUserFail = (error) => ({
  type: actionTypes.GET_USER_FAIL,
  error: error
});

export const getUser = (id) => dispatch => {
  dispatch(getUserStart());

  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8080/api/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(getUserSuccess(res.data.user));
    })
    .catch(err => {
      dispatch(getUserFail(err.response.data.message));
    })
}
