import {Dimensions, Platform} from 'react-native';

import '../constants/api';
import {API_URL} from '../constants/api';

const predict = (img, setPredictionMap) => {
  fetch(API_URL, {
    method: 'POST',
    body: createFormData(img),
  })
    .then(response => response.json())
    .then(response => {
      const predictionMap = getPredictionMap(img, response);
      setPredictionMap(predictionMap);
    })
    .catch(error => {
      console.log('prediction failed', error);
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

const getPredictionMap = (img, prediction) => {
  if (
    !prediction.hasOwnProperty('boxes') ||
    !prediction.hasOwnProperty('classes') ||
    !prediction.hasOwnProperty('scores')
  ) {
    return [];
  }

  if (
    prediction.boxes.length !== prediction.classes.length ||
    prediction.classes.length !== prediction.scores.length
  ) {
    return [];
  }

  // scaling is needed since ImageMapper doesn't support dynamic scaling
  let XScale = Dimensions.get('window').width / img.width;
  let YScale = Dimensions.get('window').height / img.height;

  let predictionMap = [];
  for (let i = 0; i < prediction.boxes.length; i++) {
    const box = prediction.boxes[i];
    if (box.length !== 4) {
      continue;
    }

    const transformedBox = {
      id: i.toString(),
      name: prediction.classes[i],
      x1: box[0] * XScale,
      y1: box[1] * YScale,
      x2: box[2] * XScale,
      y2: box[3] * YScale,
    };

    predictionMap.push(transformedBox);
  }

  return predictionMap;
};

export default predict;
