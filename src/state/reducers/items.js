import * as actionTypes from '../actions/actionTypes';

const InitialState = {
  items: [],
  isAdding: false,
  isLoading: false,
  getError: null,
  addingError: null,
}

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MENU_ITEM_START:
      return {
        ...state,
        isAdding: true
      }
    case actionTypes.ADD_MENU_ITEM_SUCCESS:
      return {
        ...state,
        isAdding: false,
        items: [...state.items, action.data.item],
        addingError: null
      }
    case actionTypes.ADD_MENU_ITEM_FAIL:
      return {
        ...state,
        isAdding: false,
        addingError: action.error
      }
    case actionTypes.GET_MENU_ITEMS_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_MENU_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.data,
        getError: null
      }
    case actionTypes.GET_MENU_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false,
        getError: action.error
      }
    default:
      return state;
  }
}

export default reducer;
