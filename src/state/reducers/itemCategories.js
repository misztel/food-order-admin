import * as actionTypes from '../actions/actionTypes';

const InitialState = {
  isLoading: false,
  itemCategories: [],
  error: null,

  itemCategory: {},
  getItemCategoryIsLoading: false,
  getItemCategoryError: null
}

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEM_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.GET_ITEM_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemCategories: action.data,
        error: null
      }
    case actionTypes.GET_ITEM_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case actionTypes.GET_ITEM_CATEGORY_START:
      return {
        ...state,
        getItemCategoryIsLoading: true
      };
    case actionTypes.GET_ITEM_CATEGORY_SUCCESS:
      return {
        ...state,
        getItemCategoryIsLoading: false,
        itemCategory: action.data,
        getItemCategoryError: null
      }
    case actionTypes.GET_ITEM_CATEGORY_FAIL:
      return {
        ...state,
        getItemCategoryIsLoading: false,
        getItemCategoryError: action.error
      }
    case actionTypes.ADD_ITEM_CATEGORY_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.ADD_ITEM_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemCategories: [...state.itemCategories, action.data.itemCategory]
      }
    case actionTypes.ADD_ITEM_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case actionTypes.UPDATE_ITEM_CATEGORY_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.UPDATE_ITEM_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemCategories: state.itemCategories.map(itemCategory =>
          itemCategory._id === action.data._id ? action.data : itemCategory
        )
      }
    case actionTypes.UPDATE_ITEM_CATEGORY_FAIL:
      return {

      }
    case actionTypes.DELETE_ITEM_CATEGORY_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.DELETE_ITEM_CATEGORY_SUCCESS:
      return {
        ...state,
        itemCategories: state.itemCategories.filter(itemCategory =>
          itemCategory._id !== action.data
        )
      }
    case actionTypes.DELETE_ITEM_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducer;
