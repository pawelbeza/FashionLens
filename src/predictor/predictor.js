import {Platform} from 'react-native';

import '../constants/api';
import {API_URL} from '../constants/api';

const predict = img => {
  fetch(API_URL, {
    method: 'POST',
    body: createFormData(img),
  })
    .then(response => response.json())
    .then(response => {
      console.log('success', response);
    })
    .catch(error => {
      console.log('error', error);
    });
};

const createFormData = photo => {
  const data = new FormData();
  data.append('image', {
    name: 'img',
    type: photo.mime,
    uri:
      Platform.OS === 'android'
        ? photo.path
        : photo.path.replace('file://', ''),
  });

  return data;
};

export default predict;
