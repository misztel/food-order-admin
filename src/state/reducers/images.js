import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  images: [],
  isUploading: false,

  getError: null,
  uploadError: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_IMAGES_START:
      return { ...state, isLoading: true };
    case actionTypes.GET_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        images: action.data,
        error: null
      };
    case actionTypes.GET_IMAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        getError: action.error
      };
    case actionTypes.ADD_IMAGE_START:
      return { ...state, isUploading: true };
    case actionTypes.ADD_IMAGE_SUCCESS:
      return {
        ...state,
        isUploading: false,
        uploadError: null,
        images: [...state.images, action.data.image]
      }
    case actionTypes.ADD_IMAGE_FAIL:
      return {
        ...state,
        isUploading: false,
        uploadError: action.error
      }
    case actionTypes.DELETE_IMAGE_START:
      return { ...state }
    case actionTypes.DELETE_IMAGE_SUCCESS:
      return {
        ...state,
        images: state.images.filter(image =>
          image._id !== action.data.id
        )
      }
    case actionTypes.DELETE_IMAGE_FAIL:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;
