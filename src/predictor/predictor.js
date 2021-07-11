import {Platform} from 'react-native';

const predict = img => {
  fetch('http://localhost:8080/detect', {
    method: 'POST',
    body: createFormData(img),
  })
    .then(response => response.json())
    .then(response => {
      console.log('upload succes', response);
    })
    .catch(error => {
      console.log('upload error', error);
    });
};

const createFormData = photo => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  return data;
};
