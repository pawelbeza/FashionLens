import React from 'react';

import ClothesImagePicker from '../../components/ImagePicker/ImagePicker';
import ImageMapper from '../../components/ImageMapper/ImageMapper';
import LottieView from 'lottie-react-native';

class ClothesDetector extends React.Component {
  state = {
    image: null,
    predictionMap: [],
    isLoading: false,
  };

  setImage = img => {
    this.setState({image: img});
  };

  setPredictionMap = prediction => {
    this.setState({predictionMap: prediction});
  };

  setIsLoading = isLoading => {
    this.setState({isLoading: isLoading});
  };

  render() {
    return (
      <>
        {this.state.isLoading && (
          <LottieView
            source={require('../../assets/animations/loading.json')}
            autoPlay
          />
        )}

        {this.state.image && !this.state.isLoading && (
          <ImageMapper
            source={{uri: this.state.image.path}}
            imgMap={this.state.predictionMap}
            setIsLoading={this.setIsLoading}
          />
        )}
        {!this.state.isLoading && (
          <ClothesImagePicker
            setImage={this.setImage}
            setPredictionMap={this.setPredictionMap}
            setIsLoading={this.setIsLoading}
            navigation={this.props.navigation}
          />
        )}
      </>
    );
  }
}

export default ClothesDetector;
