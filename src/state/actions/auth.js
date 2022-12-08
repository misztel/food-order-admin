import axios from 'axios';
import * as actionTypes from './actionTypes';
// import store from '../store';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (data) => ({
  type: actionTypes.AUTH_SUCCESS,
  data: data
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});
export const logoutStart = () => ({
  type: actionTypes.LOGOUT_START
});

export const logoutSuccess = (data) => ({
  type: actionTypes.LOGOUT_SUCCESS,
  data: data
});

export const logoutFail = (error) => ({
  type: actionTypes.LOGOUT_FAIL,
  error: error
});
export const authLogin = (data) => ({
  type: actionTypes.AUTH_LOGIN_CHECK,
  data: data
});

export const auth = (email, password) => dispatch => {
  dispatch(authStart());
  axios.post('http://localhost:8080/auth/login', {
    email: email,
    password: password
  },
    { withCredentials: true })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      dispatch(authSuccess(res.data));
      dispatch(getUserData(res.data));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.message));
    })
}

export const logout = () => dispatch => {
  dispatch(logoutStart());
  axios.get('http://localhost:8080/auth/logout', {
    withCredentials: true
  })
    .then(res => {

      dispatch(logoutSuccess(res.data));
    })
    .catch(err => {
      dispatch(logoutFail(err.response.data.message));
    })
}

export const authCheckLogIn = () => dispatch => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.get('http://localhost:8080/auth/refreshtoken', {
      withCredentials: true
    })
      .then(res => {
        dispatch(authLogin({ loggedIn: true, ...res.data }));
        dispatch(getUserData());
      }).catch(err => {
        dispatch(logout(err));
      })
  }
}

export const getUserDataStart = () => ({
  type: actionTypes.GET_USER_DATA_START
});

export const getUserDataSuccess = (data) => ({
  type: actionTypes.GET_USER_DATA_SUCCESS,
  data: data
});

export const getUserDataFail = (error) => ({
  type: actionTypes.GET_USER_DATA_FAIL,
  error: error
});

export const getUserData = () => (dispatch) => {
  dispatch(getUserDataStart());
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  axios.get(`http://localhost:8080/api/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(getUserDataSuccess(res.data.user));
    })
    .catch(err => {
      dispatch(getUserDataFail(err.response.data.message));
    })

  // console.log('state Auth', getState().auth);

  // if (!getState().auth.userId) {
  //   console.log('err: no authentication', getState().auth.userId);
  // }
  // else {
  //   console.log('Do backend request with Auth headers');
  // }
  // axios.post('http://localhost:8080/auth/login', {
  //   email:
  // })
  //   .then(res => {
  //     localStorage.setItem('token', res.data.token);
  //     localStorage.setItem('userId', res.data.userId);
  //     localStorage.setItem('expires', res.data.expirationTime);
  //     localStorage.setItem('access', res.data.access);

  //     dispatch(authSuccess(res.data));
  //   })
  //   .catch(err => {
  //     dispatch(authFail(err.response.data.message));
  //   })
}

// Verify !!!
export const isAuth = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
