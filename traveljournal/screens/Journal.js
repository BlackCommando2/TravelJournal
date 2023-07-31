import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ViewCard from './ViewCard';
const Journal = ({navigation}) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log(cards);
    loadCardsFromStorage();
  }, []);

  const loadCardsFromStorage = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('@MyApp:cards');
      if (storedCards !== null) {
        const parsedCards = JSON.parse(storedCards);
        setCards(parsedCards);
      }
    } catch (error) {
      console.log('Error loading cards from AsyncStorage: ', error);
    }
  };

  const navigateToViewCard = card => {
    navigation.navigate('ViewCard', {card});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigateToViewCard(item)}>
      <View style={styles.cardContainer}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* Add other components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default Journal;
