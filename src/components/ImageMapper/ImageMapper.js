import React, {Component} from 'react';
import {ImageBackground, View, TouchableOpacity} from 'react-native';

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

  buildStyle(width, height, item) {
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
    const {height, width, source, imgMap, style} = this.props;
    return (
      <View style={style}>
        <ImageBackground style={{height: height, width: width}} source={source}>
          {imgMap.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={event => this.props.onPress(item, index, event)}
              style={[
                {
                  position: 'absolute',
                  borderWidth: 4,
                  borderColor: this.getRandomColor(),
                },
                this.buildStyle(width, height, item),
              ]}
            />
          ))}
        </ImageBackground>
      </View>
    );
  }
}

export default ImageMapper;
