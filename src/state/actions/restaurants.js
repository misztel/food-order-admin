/* eslint-disable no-undef */
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getRestaurantsStart = () => ({
  type: actionTypes.GET_RESTAURANTS_START
});

export const getRestaurantsSuccess = (data) => ({
  type: actionTypes.GET_RESTAURANTS_SUCCESS,
  data: data
});

export const getRestaurantsFail = (error) => ({
  type: actionTypes.GET_RESTAURANTS_FAIL,
  error: error
});

export const getRestaurants = () => dispatch => {
  dispatch(getRestaurantsStart());

  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8080/admin/restaurants`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(getRestaurantsSuccess(res.data.restaurants));
    })
    .catch(err => {
      dispatch(getRestaurantsFail(err.response.data.message));
    })
}

export const archiveRestaurantStart = () => ({
  type: actionTypes.ARCHIVE_RESTAURANT_START
})

export const archiveRestaurantSuccess = (data) => ({
  type: actionTypes.ARCHIVE_RESTAURANT_SUCCESS,
  data: data
});

export const archiveRestaurantFail = (error) => ({
  type: actionTypes.ARCHIVE_RESTAURANT_FAIL,
  error: error
});

export const archiveRestaurant = (id, archived) => dispatch => {
  dispatch(archiveRestaurantStart());

  const token = localStorage.getItem('token');
  axios.put(`http://localhost:8080/admin/restaurant/${id}`, {
    archived: archived
  },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(archiveRestaurantSuccess(res.data.restaurant));
    })
    .catch(err => {
      dispatch(archiveRestaurantFail(err.response.data.message));
    })
};

export const addRestaurantStart = () => ({
  type: actionTypes.ADD_RESTAURANT_START
})

export const addRestaurantSuccess = (data) => ({
  type: actionTypes.ADD_RESTAURANT_SUCCESS,
  data: data
});

export const addRestaurantFail = (error) => ({
  type: actionTypes.ADD_RESTAURANT_FAIL,
  error: error
});

export const addRestaurant = (name, address, placeId) => dispatch => {
  dispatch(addRestaurantStart());
  const token = localStorage.getItem('token');
  axios.post(`http://localhost:8080/admin/restaurant`, {
    name: name,
    address: address,
    placeId: placeId
  },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch(addRestaurantSuccess(res.data));
    })
    .catch(err => {
      dispatch(addRestaurantFail(err.response.data.message));
    })
};

export const getActiveRestaurantStart = () => ({
  type: actionTypes.GET_ACTIVE_RESTAURANT_START
});

export const getActiveRestaurantSuccess = (data) => ({
  type: actionTypes.GET_ACTIVE_RESTAURANT_SUCCESS,
  data: data
});

export const getActiveRestaurantFail = (error) => ({
  type: actionTypes.GET_ACTIVE_RESTAURANT_FAIL,
  error: error
});

export const getActiveRestaurant = (id) => dispatch => {
  dispatch(getActiveRestaurantStart());

  let restaurantId;
  const token = localStorage.getItem('token');

  if (id) {
    restaurantId = id;
  } else {
    restaurantId = localStorage.getItem('activeRestaurant');
  }

  if (restaurantId) {
    axios.get(`http://localhost:8080/admin/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(getActiveRestaurantSuccess(res.data.restaurant));
        localStorage.setItem('activeRestaurant', res.data.restaurant._id);
      })
      .catch(err => {
        dispatch(getActiveRestaurantFail(err.response.data.message));
      })
  } else {
    axios.get(`http://localhost:8080/admin/restaurants`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(getActiveRestaurantSuccess(res.data.restaurants[0]));
        localStorage.setItem('activeRestaurant', res.data.restaurant[0]._id);
      })
      .catch(err => {
        dispatch(getActiveRestaurantFail(err.response.data.message));
      })
  }
};

export const changeActiveRestaurantStart = () => ({
  type: actionTypes.CHANGE_ACTIVE_RESTAURANT_START
});

export const changeActiveRestaurantSuccess = (data) => ({
  type: actionTypes.CHANGE_ACTIVE_RESTAURANT_SUCCESS,
  data: data
});

export const changeActiveRestaurantFail = (error) => ({
  type: actionTypes.CHANGE_ACTIVE_RESTAURANT_FAIL,
  error: error
});

export const changeActiveRestaurant = (restaurantId) => dispatch => {
  dispatch(changeActiveRestaurantStart());

  const token = localStorage.getItem('token');

  axios.get(`http://localhost:8080/admin/restaurant/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(changeActiveRestaurantSuccess(res.data.restaurant));
      localStorage.setItem('activeRestaurant', res.data.restaurant._id);
    })
    .catch(err => {
      dispatch(changeActiveRestaurantFail(err.response.data.message));
    })
}
