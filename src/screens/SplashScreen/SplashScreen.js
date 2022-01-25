import React from 'react';
import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './SplashScreenStyle';

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.splashScreen}>
        <LottieView
          source={require('../../assets/animations/splash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => this.props.navigation.replace('Detector')}
        />
        <Text style={styles.title}>Fashion Lens</Text>
      </View>
    );
  }
}

export default SplashScreen;
