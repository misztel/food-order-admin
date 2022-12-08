import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userId: null,
  error: null,

  name: null,
  email: null,
  avatarUrl: null,
  access: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_START:
      return { ...state, isLoading: true };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.data.userId,
        name: action.data.name,
        email: action.data.email,
        avatarUrl: action.data.avatarUrl,
        access: action.data.access,
        error: null
      }
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state;
  }
};

export default reducer;
