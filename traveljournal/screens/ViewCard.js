import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewCard = ({ route, navigation }) => {
  const { card } = route.params;
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
        console.log("View Card Storage: " + storedCards);
      }
    } catch (error) {
      console.log('Error loading cards from AsyncStorage: ', error);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      const updatedCards = cards.filter(deletecard => deletecard.id !== cardId);
      setCards(updatedCards);
      await saveCardsToStorage(updatedCards);
      console.log('card cleaned from AsyncStorage');
      navigation.goBack();
    } catch (error) {
      console.log('Error cleaning images from AsyncStorage: ', error);
    }
  };

  const saveCardsToStorage = async cardsArray => {
    try {
      await AsyncStorage.setItem('@MyApp:cards', JSON.stringify(cardsArray));
      console.log('Cards saved to AsyncStorage');
    } catch (error) {
      console.log('Error saving cards to AsyncStorage: ', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {card.images.map((imageSource, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: imageSource }} style={styles.image} />
            </View>
          ))}
          <Text style={styles.textcontainer}>Title: {card.title}</Text>
          <Text style={styles.textcontainer}>Description: {card.description}</Text>
          <Button title="Delete" onPress={() => deleteCard(card.id)} color='#e74c3c' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  deleteButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 500,
    resizeMode: 'contain',
    marginBottom: 20,
    alignItems: 'center',
  },
  textcontainer: {
    backgroundColor: '#303030',
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
});

export default ViewCard;
