import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { createMovie } from '../axiosRequest/Axiosrequest';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

interface ImageData {
  url: string;
  name: string;
  type: string;
}

interface FormData {
  title: string;
  genre: string;
  release_year: number;
  rating: number;
  director: string;
  description: string;
  duration: number;
  is_premium: string;
  main_lead: string;
  poster: ImageData | null;
  banner: ImageData | null;
}

const Addmovie = () => {
  const [modalopen, setmodalopen] = useState(false);
    const userToken = useSelector((state : any) => state.user.token);
  console.log(userToken)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    genre: '',
    release_year: 0,
    rating: 0,
    director: '',
    description: '',
    duration: 0,
    is_premium: 'false',
    main_lead: '',
    poster: null,
    banner: null,
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (isNaN(formData.rating) || isNaN(formData.release_year)) {
      Alert.alert('Error', 'Rating and Release Year must be valid numbers');
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'poster' || key === 'banner') {
          if (value) {
            formDataToSend.append(`movie[${key}]`, {
              uri: value.url,
              name: value.name,
              type: value.type,
            });
          }
        } else {
          formDataToSend.append(`movie[${key}]`, value);
        }
      });

      const result = await createMovie(formDataToSend , userToken);
      console.log(result)
      if (result) {
        Alert.alert('Success', 'Movie added successfully!');
        setmodalopen(false);
        resetForm();
      } else {
        Alert.alert('Error', 'Movie creation failed');
      }
    } catch (err) {
      console.error('Error saving movie:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      genre: '',
      release_year: 0,
      rating:0,
      director: '',
      description: '',
      duration: 0,
      is_premium: 'false',
      main_lead: '',
      poster: null,
      banner: null,
    });
  };

  const handleImagePick = async (type: 'poster' | 'banner') => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
    };
    try {
      const result = await launchImageLibrary(options);
      const asset = result.assets?.[0];
      if (!asset?.uri) return;

      const imageData: ImageData = {
        url: asset.uri,
        name: asset.fileName || 'image.jpg',
        type: asset.type || 'image/jpeg',
      };

      setFormData((prev) => ({
        ...prev,
        [type]: imageData,
      }));
    } catch (error) {
      Alert.alert('Error', 'Image picking failed');
    }
  };

  const isValidUri = (uri: string | undefined): boolean => {
    return typeof uri === 'string' && uri.length > 0 && (uri.startsWith('file://') || uri.startsWith('http://') || uri.startsWith('https://'));
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        <Image
          source={require('../assets/icons/add.png')}
          tintColor={'white'}
          style={styles.add}
        />
      </TouchableOpacity>

      <Modal visible={modalopen} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoidingContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => setmodalopen(false)} style={styles.closeButton}>
                    <Image
                      source={require('../assets/icons/close2.png')}
                      style={styles.closeform}
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Add New Movie</Text>

                  {([
                    'title',
                    'genre',
                    'release_year',
                    'rating',
                    'director',
                    'description',
                    'duration',
                    'is_premium',
                    'main_lead',
                  ] as (keyof FormData)[]).map((field, index) => (
                    <TextInput
                      key={index}
                      style={styles.input}
                      placeholder={
                        field === 'is_premium' ? 'Is Premium (true/false)' : field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      placeholderTextColor={'#000'}
                      value={typeof formData[field] === 'string' ? formData[field] : ''}
                      onChangeText={(value) => handleChange(field, value)}
                      keyboardType={['releaseYear', 'rating'].includes(field) ? 'numeric' : 'default'}
                    />
                  ))}

                  <Text style={styles.imageLabel}>Poster Image</Text>
                  <TouchableOpacity style={styles.imageButton} onPress={() => handleImagePick('poster')}>
                    <Text style={styles.imageButtonText}>Choose Poster</Text>
                  </TouchableOpacity>
                  {formData.poster?.url && isValidUri(formData.poster.url) && (
                    <Image source={{ uri: formData.poster.url }} style={styles.imagePreview} />
                  )}

                  <Text style={styles.imageLabel}>Banner Image</Text>
                  <TouchableOpacity style={styles.imageButton} onPress={() => handleImagePick('banner')}>
                    <Text style={styles.imageButtonText}>Choose Banner</Text>
                  </TouchableOpacity>
                  {formData.banner?.url && isValidUri(formData.banner.url) && (
                    <Image source={{ uri: formData.banner.url }} style={styles.imagePreview} />
                  )}

                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Movie</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default Addmovie;

const styles = StyleSheet.create({
  add: {
    width: width * 0.09,
    height: height * 0.04,
    right: width * 0.09,
    marginTop: width * 0.1,
  },
  closeform: {
    marginTop: 10,
    marginLeft: 10,
    width:width*0.11,
    height:height*0.05,

  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: 'rgb(147, 145, 145)',
    borderRadius: 16,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: '#eee',
    color: '#000',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  imageLabel: {
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#000',
  },
  imagePreview: {
    width: 150,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#e50914',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
});
