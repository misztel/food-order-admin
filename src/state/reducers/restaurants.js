import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  restaurants: [],

  isArchiving: false,
  archivedError: null,

  isLoadingActiveRestaurant: false,
  activeRestaurant: '',

  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESTAURANTS_START:
      return { ...state, isLoading: true };
    case actionTypes.GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants: action.data,
        error: null
      }
    case actionTypes.GET_RESTAURANTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case actionTypes.ARCHIVE_RESTAURANT_START:
      return { ...state, isArchiving: true };
    case actionTypes.ARCHIVE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isArchiving: false,
        archivedError: null,
        restaurants: state.restaurants.map(
          (restaurant) => restaurant._id === action.data._id ? { ...restaurant, archived: action.data.archived } : restaurant
        )
      }
    case actionTypes.ARCHIVE_RESTAURANT_FAIL:
      return {
        ...state,
        isArchiving: false,
        archivedError: action.error
      }
    case actionTypes.ADD_RESTAURANT_START:
      return { ...state, isArchiving: true };
    case actionTypes.ADD_RESTAURANT_SUCCESS:
      return {
        ...state,
        isArchiving: false,
        archivedError: null,
        restaurants: [...state.restaurants, action.data.restaurant]
      }
    case actionTypes.ADD_RESTAURANT_FAIL:
      return {
        ...state,
        isArchiving: false,
        archivedError: action.error
      }
    case actionTypes.GET_ACTIVE_RESTAURANT_START:
      return {
        ...state,
        isLoadingActiveRestaurant: true
      };
    case actionTypes.GET_ACTIVE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoadingActiveRestaurant: false,
        activeRestaurant: action.data._id
      };
    case actionTypes.GET_ACTIVE_RESTAURANT_FAIL:
      return {
        ...state,
        isLoadingActiveRestaurant: false,
        error: action.error
      }
    case actionTypes.CHANGE_ACTIVE_RESTAURANT_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.CHANGE_ACTIVE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activeRestaurant: action.data._id
      };
    case actionTypes.CHANGE_ACTIVE_RESTAURANT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
