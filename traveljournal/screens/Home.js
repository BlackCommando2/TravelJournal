import React from 'react';
import {Button, View, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  // const cleanAllImages = async () => {
  //   try {
  //     // Remove all images from AsyncStorage
  //     await AsyncStorage.removeItem('@MyApp:images');
  //     // Clear the imageSources state
  //     // setImageSources([]);
  //     console.log('All images cleaned from AsyncStorage');
  //   } catch (error) {
  //     console.log('Error cleaning images from AsyncStorage: ', error);
  //   }
  // };
  return (
    <View>
      <Button
        title="Go to Journal"
        onPress={() => navigation.navigate('Journal')}
      />
      <Button
        title="Create Card"
        onPress={() => navigation.navigate('Create Card')}
      />
      {/* <Button title="Clean All Images" onPress={cleanAllImages} /> */}
    </View>
  );
};

export default Home;
