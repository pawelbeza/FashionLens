import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {SpeedDial} from 'react-native-elements';

import colors from '../../assets/theme/color';
import predictor from '../../predictor/predictor';

class ClothesImagePicker extends React.Component {
  state = {
    open: false,
  };

  onChangeOpen = () => {
    this.setState(state => ({open: !state.open}));
  };

  onChooseImage = image => {
    this.props.setPredictionMap([]);
    this.props.setIsLoading(true);
    predictor.predict(
      image,
      this.props.setPredictionMap,
      this.props.setIsLoading,
    );
    this.props.setImage(image);
  };

  onCameraPress = () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(img => {
        this.onChooseImage(img);
      })
      .catch(() => {});
  };

  onGalleryPress = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(img => {
        this.onChooseImage(img);
      })
      .catch(() => {});
  };

  onRealTimeDetection = () => {
    this.props.navigation.push('VideoDetector');
  };

  render() {
    return (
      <SpeedDial
        isOpen={this.state.open}
        icon={{name: 'add', color: colors.white}}
        openIcon={{name: 'close', color: colors.white}}
        onOpen={this.onChangeOpen}
        onClose={this.onChangeOpen}>
        <SpeedDial.Action
          icon={{name: 'photo-camera', color: colors.white}}
          title="Take a photo"
          onPress={this.onCameraPress}
        />
        <SpeedDial.Action
          icon={{name: 'photo-library', color: colors.white}}
          title="Choose from gallery"
          onPress={this.onGalleryPress}
        />
        <SpeedDial.Action
          icon={{name: 'videocam', color: colors.white}}
          title="Real time detection"
          onPress={this.onRealTimeDetection}
        />
      </SpeedDial>
    );
  }
}

export default ClothesImagePicker;
