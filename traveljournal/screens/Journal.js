import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Journal = ({ navigation }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
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
    navigation.navigate('ViewCard', { card });
  };

  const renderItem = ({ item }) => (
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Create Card')}
      >
        <Text style={styles.addButtonText}>Add New Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f1f1f',
    color: '#FFFFFF',
  },
  cardContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Journal;
