import React, {useState, useEffect} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';

const CreateCard = () => {
  const [imageSources, setImageSources] = useState([]);
  const [cards, setCards] = useState([]);

  const [cardname, setCardname] = useState('');
  const [cardtitle, setCardtitle] = useState('');
  const [carddescription, setCarddescription] = useState('');
  useEffect(() => {
    // console.log('imageSources: ' + imageSources);
    // console.log('type: ' + imageSources[1]);
    // Load previously stored images when the component mounts
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
        // Set the image sources from the selected images
        const selectedImages = images.map(image => image.path);
        setImageSources(selectedImages);
        console.log(selectedImages);
        // Save the selected images to AsyncStorage for persistence
        // saveImagesToStorage(selectedImages);
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

  // const saveImagesToStorage = async images => {
  //   try {
  //     await AsyncStorage.setItem('@MyApp:images', JSON.stringify(images));
  //     console.log('Images saved to AsyncStorage');
  //   } catch (error) {
  //     console.log('Error saving images to AsyncStorage: ', error);
  //   }
  // };

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
    // Remove the image at the specified index from the state
    const updatedImages = [...imageSources];
    updatedImages.splice(index, 1);
    setImageSources(updatedImages);

    // Save the updated images to AsyncStorage
    // saveImagesToStorage(updatedImages);
  };

  const cleanAllImages = async () => {
    try {
      // Remove all images from AsyncStorage
      await AsyncStorage.removeItem('@MyApp:cards');
      // Clear the imageSources state
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

    // Add the new card to the array of cards
    setCards([...cards, newCard]);

    // Save the updated array of cards to AsyncStorage
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
    <SafeAreaView>
      <ScrollView>
        {imageSources.map((imageSource, index) => (
          <View key={index}>
            <Image source={{uri: imageSource}} style={styles.image} />
            <Button title="Delete" onPress={() => deleteImage(index)} />
          </View>
        ))}
        <View style={styles.container}>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={cardname}
            onChangeText={setCardname}
            placeholder="Enter name..."
          />

          <Text>Title:</Text>
          <TextInput
            style={styles.input}
            value={cardtitle}
            onChangeText={setCardtitle}
            placeholder="Enter title..."
          />

          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={carddescription}
            onChangeText={setCarddescription}
            placeholder="Enter description..."
          />
        </View>
        <Button title="Select Multiple Images" onPress={selectMultipleImages} />
        <Button title="Save Card" onPress={saveCard} />
        <Button title="Cleanup" onPress={clean} />
        <Button title="Clean All Images" onPress={cleanAllImages} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default CreateCard;
