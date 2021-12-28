import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Camera} from 'react-native-pytorch-core';
import {NativeModules} from 'react-native';
import {Image, ImageUtil} from 'react-native-pytorch-core';
import {Text} from 'react-native-elements';
import predictor from '../../predictor/predictor';
import LottieView from 'lottie-react-native';

const {RealTimeDetectionModule} = NativeModules;

class VideoDetector extends React.Component {
  boxes = [];

  constructor() {
    super();
    this.cameraRef = React.createRef();
    this.state = {
      predictionMap: [],
      imageWidth: 1,
      imageHeight: 1,
      isLoading: false,
    };
  }

  buildStyle(item) {
    const {left, bottom, right, top} = item;
    let XScale = Dimensions.get('window').width / 640;
    let YScale = Dimensions.get('window').height / 640;

    const style = {
      left: left * XScale,
      top: top * YScale,
    };

    style.width = (right - left) * XScale;
    style.height = (bottom - top) * YScale;

    return style;
  }

  setIsLoading = () => {
    this.setState({isLoading: false});
  };

  handleCapture = async (image: Image) => {
    let XScale = image.getWidth() / 640;
    let YScale = image.getHeight() / 640;

    this.boxes[0] *= XScale;
    this.boxes[2] *= XScale;
    this.boxes[1] *= YScale;
    this.boxes[3] *= YScale;

    const src = await ImageUtil.toFile(image);

    if (this.boxes) {
      await predictor.searchVisuallySimilar(
        'file://' + src,
        this.boxes,
        this.setIsLoading,
      );
    }

    image.release();
  };

  render() {
    return (
      <>
        <Camera
          ref={this.cameraRef}
          style={styles.camera}
          onFrame={async (image: Image) => {
            const predictions =
              await RealTimeDetectionModule.createCalendarEvent(image);

            this.setState({
              predictionMap: predictions,
              imageWidth: image.getWidth(),
              imageHeight: image.getHeight(),
            });

            image.release();
          }}
          onCapture={this.handleCapture}
          hideCaptureButton={true}
        />
        {!this.state.isLoading &&
          this.state.predictionMap.map(item => {
            const borderColor = 'rgb(254,132,132)';
            return (
              <TouchableOpacity
                key={item.id}
                onPress={async () => {
                  this.boxes = [item.left, item.top, item.right, item.bottom];
                  const camera = this.cameraRef.current;
                  if (camera != null) {
                    camera.takePicture();
                  }
                }}
                style={[
                  {
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    borderWidth: 4,
                    borderColor: borderColor,
                  },
                  this.buildStyle(item),
                ]}>
                <Text
                  style={{
                    width: '100%',
                    backgroundColor: borderColor,
                    color: 'white',
                  }}>
                  {item.name + ': ' + item.confidence}
                </Text>
              </TouchableOpacity>
            );
          })}
        {this.state.isLoading && (
          <LottieView
            source={require('../../assets/animations/loading.json')}
            autoPlay
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default VideoDetector;
