import {Image, Linking, Text, TouchableOpacity} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {SwipeablePanel} from 'rn-swipeable-panel';
import React, {FC, ReactElement} from 'react';
import styles from './styles';

interface Cloth {
  id: string;
  imgURL: string;
  text: string;
}

const ClothCard: FC<{item: Cloth}> = ({item}) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.container}
      onPress={() => Linking.openURL(item.imgURL)}>
      <Image
        source={{uri: item.imgURL}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageTitle}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const renderItem = ({item}: {item: Cloth, index?: number}): ReactElement => {
  return <ClothCard item={item} />;
};

const SimilarClothesPanel = props => {
  return (
    <SwipeablePanel
      fullWidth={true}
      isActive={props.isPanelActive}
      onClose={() => {}}>
      <Text style={styles.titleText}>Explore similar clothes</Text>
      <MasonryList
        contentContainerStyle={styles.imageContainer}
        numColumns={2}
        data={props.data}
        renderItem={renderItem}
      />
    </SwipeablePanel>
  );
};

export default SimilarClothesPanel;
