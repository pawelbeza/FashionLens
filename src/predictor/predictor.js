import {Dimensions, Linking, Platform} from 'react-native';

import '../constants/api';
import {API_KEY, API_URL} from '../constants/api';
import PhotoManipulator from 'react-native-photo-manipulator';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid';

const predict = (img, setPredictionMap, setIsLoading) => {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
    body: createFormData(img),
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      const predictionMap = getPredictionMap(img, response);
      setPredictionMap(predictionMap);
      setIsLoading(false);
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

const searchVisuallySimilar = async (src, box, setIsLoading) => {
  setIsLoading(true);

  let uri;
  try {
    uri = await PhotoManipulator.crop(src, {
      x: box[0],
      y: box[1],
      height: box[3] - box[1],
      width: box[2] - box[0],
    });
  } catch (e) {
    console.log("couldn't crop file: ", e);
  }

  const id = uuid.v4() + '.jpg';
  const reference = storage().ref(id);

  try {
    await reference.putFile(uri);
  } catch (e) {
    console.log("couldn't put file: ", e);
  }

  let downloadUrl;
  try {
    downloadUrl = await reference.getDownloadURL();
  } catch (e) {
    console.log("couldn't get downloadURL: ", e);
  }

  try {
    await Linking.openURL(
      'https://images.google.com/searchbyimage?image_url=' +
        downloadUrl +
        '&q=shop',
    );
  } catch (e) {
    console.log("couldn't load page: ", e);
  }

  setIsLoading(false);
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
  let scale = Dimensions.get('window').width / img.width;
  const padding = (Dimensions.get('window').height - img.height * scale) / 2;

  let predictionMap = [];
  for (let i = 0; i < prediction.boxes.length; i++) {
    const box = prediction.boxes[i];
    if (box.length !== 4) {
      continue;
    }

    const transformedBox = {
      id: i.toString(),
      name: prediction.classes[i],
      probability: prediction.scores[i].toFixed(3),
      x1: box[0] * scale,
      y1: box[1] * scale + padding,
      x2: box[2] * scale,
      y2: box[3] * scale + padding,
      onPress: async (src, setIsLoading) => {
        await searchVisuallySimilar(src, box, setIsLoading);
      },
    };

    predictionMap.push(transformedBox);
  }

  return predictionMap;
};

export default {predict, searchVisuallySimilar};
