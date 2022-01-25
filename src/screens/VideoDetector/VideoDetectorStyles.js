import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignSelf: 'stretch',
  },
  boundingBoxText: {
    width: '100%',
    backgroundColor: 'rgb(254,132,132)',
    color: 'white',
  },
  boundingBoxRegion: {
    justifyContent: 'flex-end',
    position: 'absolute',
    borderWidth: 4,
    borderColor: 'rgb(254,132,132)',
  },
});

export default styles;
