import React from 'react';

import ClothesImagePicker from '../../components/ImagePicker/ImagePicker';
import {Button, View} from 'react-native';

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
            }}
          />
        </View>
        <ClothesImagePicker setImage={this.setImage} />
      </>
    );
  }
}

export default SavedImages;
