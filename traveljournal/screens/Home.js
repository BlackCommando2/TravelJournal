import React from 'react';
import {Button, View, Text} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to Journal"
        onPress={() => navigation.navigate('Journal')}
      />
      <Button title="Create Card" onPress={() => navigation.navigate('Card')} />
      <Text>Home</Text>
    </View>
  );
};

export default Home;
