import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getImagesStart = () => ({
  type: actionTypes.GET_IMAGES_START
});

export const getImagesSuccess = (data) => ({
  type: actionTypes.GET_IMAGES_SUCCESS,
  data: data
});

export const getImagesFail = (error) => ({
  type: actionTypes.GET_IMAGES_FAIL,
  error: error
});

export const getImages = () => dispatch => {
  dispatch(getImagesStart());
  console.log('get images');
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:8080/api/images`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(getImagesSuccess(res.data.images));
    })
    .catch(err => {
      dispatch(getImagesFail(err.response.data.message));
    })
};

export const addImageStart = () => ({
  type: actionTypes.ADD_IMAGE_START
});

export const addImageSuccess = (data) => ({
  type: actionTypes.ADD_IMAGE_SUCCESS,
  data: data
});

export const addImageFail = (error) => ({
  type: actionTypes.ADD_IMAGE_FAIL,
  error: error
});

export const addImage = (image) => dispatch => {
  dispatch(addImageStart);

  const token = localStorage.getItem('token');
  const imageFormObj = new FormData();

  imageFormObj.append("imageName", Date.now() + image.name);
  imageFormObj.append("imageData", image);

  axios.post(`http://localhost:8080/api/image`, imageFormObj,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      dispatch(addImageSuccess(res.data));
    })
    .catch(err => {
      dispatch(addImageFail(err.response.data.message));
    });

};

export const deleteImageStart = () => ({
  type: actionTypes.DELETE_IMAGE_START
});

export const deleteImageSuccess = (data) => ({
  type: actionTypes.DELETE_IMAGE_SUCCESS,
  data: data
});

export const deleteImageFail = (error) => ({
  type: actionTypes.DELETE_IMAGE_FAIL,
  error: error
});

export const deleteImage = (id) => dispatch => {
  dispatch(deleteImageStart());

  const token = localStorage.getItem('token');
  axios.delete(`http://localhost:8080/api/image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch(deleteImageSuccess(res.data));
    })
    .catch(err => {
      dispatch(deleteImageFail(err.response.data.message));
    })
}
