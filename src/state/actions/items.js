import axios from 'axios';
import * as actionTypes from './actionTypes';

// add menu item
export const addMenuItemStart = () => ({
  type: actionTypes.ADD_MENU_ITEM_START
});

export const addMenuItemSuccess = (data) => ({
  type: actionTypes.ADD_MENU_ITEM_SUCCESS,
  data: data
});

export const addMenuItemFail = (error) => ({
  type: actionTypes.ADD_MENU_ITEM_FAIL,
  error: error
});

export const addMenuItem = (name, desc, image, price, active, wrapping, itemCategoryId, restaurantId) => dispatch => {
  dispatch(addMenuItemStart());
  const token = localStorage.getItem('token');
  axios.post(`http://localhost:8080/admin/item`, {
    name,
    image,
    desc,
    price,
    itemCategoryId,
    active,
    wrapping,
    restaurantId
  },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res);
      dispatch(addMenuItemSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(addMenuItemFail(err.response.data.message));
    })
}

// get menu items
export const getMenuItemsStart = () => ({
  type: actionTypes.GET_MENU_ITEMS_START
});

export const getMenuItemsSuccess = (data) => ({
  type: actionTypes.GET_MENU_ITEMS_SUCCESS,
  data: data
});

export const getMenuItemsFail = (error) => ({
  type: actionTypes.GET_MENU_ITEMS_FAIL,
  error: error
});

export const getMenuItems = (restaurantId) => dispatch => {
  dispatch(getMenuItemsStart());

  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8080/admin/items/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(getMenuItemsSuccess(res.data.data));
    })
    .catch(err => {
      dispatch(getMenuItemsFail(err.response.data.message));
    })
};

// delete menu item

// update menu item
