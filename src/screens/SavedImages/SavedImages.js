import React from 'react';
import {Button, View} from 'react-native';

import ClothesImagePicker from '../../components/ImagePicker/ImagePicker';
import predict from '../../predictor/predictor';

class SavedImages extends React.Component {
  state = {
    image: null,
  };

  setImage = img => {
    this.setState({image: img});
  };

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            title={'Predict'}
            onPress={() => {
              console.log(this.state.image);
              predict(this.state.image);
            }}
          />
        </View>
        <ClothesImagePicker setImage={this.setImage} />
      </>
    );
  }
}

export default SavedImages;
