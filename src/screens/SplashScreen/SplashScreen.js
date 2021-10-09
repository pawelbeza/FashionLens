import React from 'react';
import {Text, View} from 'react-native';

import LottieView from 'lottie-react-native';

class SplashScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          source={require('../../assets/animations/splash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => this.props.navigation.replace('Detector')}
        />
        <Text
          style={{
            marginTop: 220,
            fontFamily: 'FreestyleScript',
            fontSize: 70,
            fontWeight: '300',
          }}>
          Fashion Lens
        </Text>
      </View>
    );
  }
}

export default SplashScreen;
