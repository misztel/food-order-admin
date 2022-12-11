import axios from 'axios';
import * as actionTypes from './actionTypes';

// get ItemCategories
export const getItemCategoriesStart = () => ({
  type: actionTypes.GET_ITEM_CATEGORIES_START
});

export const getItemCategoriesSuccess = (data) => ({
  type: actionTypes.GET_ITEM_CATEGORIES_SUCCESS,
  data: data
});

export const getItemCategoriesFail = (error) => ({
  type: actionTypes.GET_ITEM_CATEGORIES_FAIL,
  error: error
});

export const getItemCategories = (restaurantId) => dispatch => {
  dispatch(getItemCategoriesStart());

  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8080/admin/itemCategories/${restaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch(getItemCategoriesSuccess(res.data.data));
    })
    .catch(err => {
      dispatch(getItemCategoriesFail(err.response.data.message));
    })
};

// get single ItemCategory
export const getItemCategoryStart = () => ({
  type: actionTypes.GET_ITEM_CATEGORY_START
});

export const getItemCategorySuccess = (data) => ({
  type: actionTypes.GET_ITEM_CATEGORY_SUCCESS,
  data: data.data
});

export const getItemCategoryFail = (error) => ({
  type: actionTypes.GET_ITEM_CATEGORY_FAIL,
  error: error
});

export const getItemCategory = (itemCategoryId) => dispatch => {
  dispatch(getItemCategoryStart());

  console.log(itemCategoryId);
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8080/admin/itemCategory/${itemCategoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(getItemCategorySuccess(res.data));
    })
    .catch(err => {
      dispatch(getItemCategoryFail(err.response.data.message));
    })
};

// add ItemCategory
export const addItemCategoryStart = () => ({
  type: actionTypes.ADD_ITEM_CATEGORY_START
});

export const addItemCategorySuccess = (data) => ({
  type: actionTypes.ADD_ITEM_CATEGORY_SUCCESS,
  data: data
});

export const addItemCategoryFail = (error) => ({
  type: actionTypes.ADD_ITEM_CATEGORY_FAIL,
  error: error
});

export const addItemCategory = (name, image, restaurant) => dispatch => {
  dispatch(addItemCategoryStart());
  const token = localStorage.getItem('token');
  axios.post(`http://localhost:8080/admin/itemCategory`, {
    name: name,
    image: image,
    restaurant: restaurant
  },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(addItemCategorySuccess(res.data));
    })
    .catch(err => {
      dispatch(addItemCategoryFail(err.response.data.message));
    })
}

// edit ItemCategory
export const updateItemCategoryStart = () => ({
  type: actionTypes.UPDATE_ITEM_CATEGORY_START
});

export const updateItemCategorySuccess = (data) => ({
  type: actionTypes.UPDATE_ITEM_CATEGORY_SUCCESS,
  data: data
});

export const updateItemCategoryFail = (error) => ({
  type: actionTypes.UPDATE_ITEM_CATEGORY_FAIL,
  error: error
});

export const updateItemCategory = (id, name, image) => dispatch => {
  dispatch(updateItemCategoryStart());

  const token = localStorage.getItem('token');
  axios.put(`http://localhost:8080/admin/itemCategory/${id}`, {
    name: name,
    image: image
  },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(updateItemCategorySuccess(res.data.itemCategory));
    })
    .catch(err => {
      dispatch(updateItemCategoryFail(err.response.data.message));
    })
}

// delete ItemCategory
export const deleteItemCategoryStart = () => ({
  type: actionTypes.DELETE_ITEM_CATEGORY_START
});

export const deleteItemCategorySuccess = (data) => ({
  type: actionTypes.DELETE_ITEM_CATEGORY_SUCCESS,
  data: data
});

export const deleteItemCategoryFail = (error) => ({
  type: actionTypes.DELETE_ITEM_CATEGORY_FAIL,
  error: error
});

export const deleteItemCategory = (id) => dispatch => {
  dispatch(deleteItemCategoryStart());

  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:8080/admin/itemCategory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(deleteItemCategorySuccess(res.data.itemCategoryId));
    })
    .catch(err => {
      dispatch(deleteItemCategoryFail(err.response.data.message));
    })
}
