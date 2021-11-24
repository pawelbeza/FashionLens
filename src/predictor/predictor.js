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
    .then(response => response.json())
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
      probability: prediction.scores[i].toFixed(3),
      x1: box[0] * XScale,
      y1: box[1] * YScale,
      x2: box[2] * XScale,
      y2: box[3] * YScale,
      onPress: async (src, setIsLoading) => {
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
            'https://images.google.com/searchbyimage?image_url=' + downloadUrl,
          );
        } catch (e) {
          console.log("couldn't load page: ", e);
        }

        setIsLoading(false);
      },
    };

    predictionMap.push(transformedBox);
  }

  return predictionMap;
};

export default predict;
