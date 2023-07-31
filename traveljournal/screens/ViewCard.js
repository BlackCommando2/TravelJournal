import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ViewCard = ({route}) => {
  const {card} = route.params;
  //   useEffect(() => {
  //     console.log(card.images);
  //   }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {card.images.map((imageSource, index) => (
            <View key={index}>
              <Image source={{uri: imageSource}} style={styles.image} />
              {/* <Button title="Delete" onPress={() => deleteImage(index)} /> */}
            </View>
          ))}
          <Text>{card.title}</Text>
          <Text>{card.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default ViewCard;
