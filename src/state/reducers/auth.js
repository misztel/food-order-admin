import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userId: null,
  error: null,
  isLoggedIn: false,
  token: null,

  name: null,
  email: null,
  access: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, isLoading: true };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.data.userId,
        isLoggedIn: true,
        token: action.data.token,
        access: action.data.access,
        error: null
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case actionTypes.AUTH_LOGIN_CHECK:
      return {
        ...state,
        isLoggedIn: action.data.loggedIn,
        userId: action.data.userId,
        token: action.data.token,
        access: action.data.access
      }
    case actionTypes.LOGOUT_START:
      return { ...state, isLoading: true };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userId: null,
        access: null
      }
    case actionTypes.LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userId: null,
        access: null,
        error: action.error
      }
    case actionTypes.GET_USER_DATA_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        name: action.data.name,
        email: action.data.email,
        access: action.data.access,
      }
    case actionTypes.GET_USER_DATA_FAIL:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;
