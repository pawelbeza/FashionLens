import React, {Component} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import styles from './ImageMapperStyles';

class ImageMapper extends Component {
  getRandomColor = () => {
    return (
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')'
    );
  };

  buildStyle(item) {
    const {x1, y1, x2, y2} = item;

    const style = {
      left: x1,
      top: y1,
    };

    style.width = x2 - x1;
    style.height = y2 - y1;

    return style;
  }

  render() {
    const {source, imgMap, setIsLoading} = this.props;
    return (
      <View>
        <ImageBackground
          resizeMode={'contain'}
          style={styles.imageBackground}
          source={source}>
          {imgMap.map(item => {
            const borderColor = this.getRandomColor();
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  item.onPress(source, setIsLoading);
                }}
                style={[
                  styles.boundingBoxRegion,
                  {borderColor: borderColor},
                  this.buildStyle(item),
                ]}>
                <Text
                  style={[
                    styles.boundingBoxText,
                    {backgroundColor: borderColor},
                  ]}>
                  {item.name + ': ' + item.probability}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ImageBackground>
      </View>
    );
  }
}

export default ImageMapper;
