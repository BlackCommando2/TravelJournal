import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateCard = () => {
  const [imageSources, setImageSources] = useState([]);
  const [cards, setCards] = useState([]);

  const [cardname, setCardname] = useState('');
  const [cardtitle, setCardtitle] = useState('');
  const [carddescription, setCarddescription] = useState('');
  useEffect(() => {
    loadStoredCards();
    console.log('Create: ' + cards);
  }, []);

  const selectMultipleImages = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      cropperCircleOverlay: false,
      multiple: true,
    })
      .then(images => {
        let selectedImages = images.map(image => image.path);
        selectedImages = [...imageSources, ...selectedImages];
        setImageSources(selectedImages);
        console.log(selectedImages);
        console.log(imageSources);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const clean = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  const loadStoredCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('@MyApp:cards');
      if (storedCards !== null) {
        const importcard = JSON.parse(storedCards);
        setCards(importcard);
        console.log('Cards loaded from AsyncStorage');
      }
    } catch (error) {
      console.log('Error loading images from AsyncStorage: ', error);
    }
  };

  const deleteImage = async index => {
    const updatedImages = [...imageSources];
    updatedImages.splice(index, 1);
    setImageSources(updatedImages);
  };

  const cleanAllImages = async () => {
    try {
      await AsyncStorage.removeItem('@MyApp:cards');
      setImageSources([]);
      setCards([]);
      console.log('All images cleaned from AsyncStorage');
    } catch (error) {
      console.log('Error cleaning images from AsyncStorage: ', error);
    }
  };

  const saveCard = () => {
    const newCard = {
      id: cardname,
      title: cardtitle,
      description: carddescription,
      images: imageSources,
    };
    setCards([...cards, newCard]);
    saveCardsToStorage([...cards, newCard]);
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {imageSources.map((imageSource, index) => (
          <View key={index}>
            <Image source={{ uri: imageSource }} style={styles.image} />
            <View style={styles.deleteButton}>
              <Button title="Delete Image" onPress={() => deleteImage(index)} color="#e74c3c" />
            </View>
          </View>
        ))}
        <View style={styles.textcontainer}>
          <Text style={styles.text}>Name:</Text>
          <TextInput
            style={styles.input}
            value={cardname}
            onChangeText={setCardname}
            placeholder="Enter name..."
          />

          <Text style={styles.text}>Title:</Text>
          <TextInput
            style={styles.input}
            value={cardtitle}
            onChangeText={setCardtitle}
            placeholder="Enter title..."
          />

          <Text style={styles.text}>Description:</Text>
          <TextInput
            style={styles.input}
            value={carddescription}
            onChangeText={setCarddescription}
            placeholder="Enter description..."
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Add Image"
            onPress={selectMultipleImages}
            color="#3498db" // Custom button color
          />
          <Button
            title="Save Card"
            onPress={saveCard}
            color="#27ae60" // Custom button color
          />
          {/* <Button
            title="Cleanup"
            onPress={clean}
            color="#e74c3c" // Custom button color
          />
          <Button
            title="Clean All Images"
            onPress={cleanAllImages}
            color="#e74c3c" // Custom button color
          /> */}
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
  buttonContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textcontainer: {
    backgroundColor: '#303030',
    padding: 20,
    marginBottom: 20,
    width: '100%',

  },
  input: {
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
});

export default CreateCard;
