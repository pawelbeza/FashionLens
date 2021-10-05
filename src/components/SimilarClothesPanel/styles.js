import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 5,
    padding: 5,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'whitesmoke',
    marginRight: 5,
    marginTop: 5,
  },
  titleTextContainer: {
    alignItems: 'center',
  },
  titleText: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    paddingHorizontal: 5,
  },
  image: {
    flex: 1,
  },
  imageTitle: {
    marginTop: 4,
  },
});

export default styles;
