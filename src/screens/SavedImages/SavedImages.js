import React from 'react';

import ClothesImagePicker from '../../components/ImagePicker/ImagePicker';
import ImageMapper from '../../components/ImageMapper/ImageMapper';

class SavedImages extends React.Component {
  state = {
    image: null,
    predictionMap: [],
  };

  setImage = img => {
    this.setState({image: img});
  };

  setPredictionMap = prediction => {
    this.setState({predictionMap: prediction});
  };

  render() {
    return (
      <>
        {this.state.image && (
          <ImageMapper
            height="100%"
            width="100%"
            source={{uri: this.state.image.path}}
            imgMap={this.state.predictionMap}
          />
        )}
        <ClothesImagePicker
          setImage={this.setImage}
          setPredictionMap={this.setPredictionMap}
        />
      </>
    );
  }
}

export default SavedImages;
