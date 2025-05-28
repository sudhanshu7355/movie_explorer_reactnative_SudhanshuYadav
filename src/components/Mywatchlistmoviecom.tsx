import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal, ImageBackground, TextInput, Dimensions, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { deleteMovie } from '../axiosRequest/Axiosrequest';
import { updateMovie } from '../axiosRequest/Axiosrequest';

const { width } = Dimensions.get('window');

const Mywatchlistmoviecom = ({
  id,
  title,
  year,
  duration,
  rating,
  genre,
  searchQuery,
  image,
  description,
  onDelete,

}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const role = useSelector((state) => state.user.role);
  const userToken = useSelector((state) => state.user.token);
  const [isAdmin, setIsAdmin] = useState(false);


  const [titleInput, setTitleInput] = useState(title);
  const [genreInput, setGenreInput] = useState(genre);
  const [yearDurationInput, setYearDurationInput] = useState(`${year} • ${duration}`);
  const [ratingInput, setRatingInput] = useState(rating);
  const [descriptionInput, setDescriptionInput] = useState(description || '');

  useEffect(() => {
    if (role === 'supervisor') {
      setIsAdmin(true);
    }
  }, [role]);
  
useEffect(() => {
  setTitleInput(title);
  setGenreInput(genre);
  setYearDurationInput(`${year} • ${duration}`);
  setRatingInput(rating);
  setDescriptionInput(description || '');
}, [title, genre, year, duration, rating, description]);


  const lowerSearch = searchQuery.toLowerCase();
  const isVisible =
    title.toLowerCase().includes(lowerSearch) ||
    genre?.toLowerCase().includes(lowerSearch);

  if (!isVisible) return null;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const handleSave = async () => {
    if (!isAdmin) {
      Alert.alert('Permission Denied', 'Only admins can update movie details.');
      return;
    }

    try {

      const [year, duration] = yearDurationInput.split(' • ').map((item) => item.trim());


      const formData = new FormData();
      formData.append('movie[title]', titleInput);
      formData.append('movie[genre]', genreInput);
      formData.append('movie[year]', year);
      formData.append('movie[duration]', duration);
      formData.append('movie[rating]', ratingInput);
      formData.append('movie[description]', descriptionInput);


      const updatedMovie = await updateMovie(id, userToken, formData);


      Alert.alert('Success', 'Movie updated successfully!');
      console.log('Updated movie:', updatedMovie);

      // if (typeof onUpdate === 'function') {
      //   onUpdate({
      //     id,
      //     title: titleInput,
      //     genre: genreInput,
      //     year,
      //     duration,
      //     rating: ratingInput,
      //     description: descriptionInput,
      //     image,
      //   });
      // }


      setModalVisible(false);
    } catch (error) {

      console.error('Error updating movie:', error);
      Alert.alert('Error', 'Failed to update movie. Please try again.');
    }
  };

  const handleLongPress = () => {
    if (role?.toLowerCase() === 'supervisor') {
      Alert.alert(
        'Delete Movie',
        'Are you sure you want to delete this movie?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              console.log('Deleting movie:', id);
              const success = await deleteMovie(id, userToken);
              if (success) {
                Alert.alert('deleted')
                console.log(success)
                if (onDelete) {
                  onDelete(id);
                }
                closeModal();
              }
              else {
                Alert.alert('error')
              }
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert('You do not have permission to delete this movie.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ flexDirection: 'row', flex: 1, }}
        onPress={openModal}

        onLongPress={handleLongPress}
        delayLongPress={500}
      >
        <View style={styles.imageview}>
          <View style={styles.imagePlaceholder}>
            <Image
              source={{ uri: image }}
              style={{ flex: 1, resizeMode: 'cover', borderRadius: 15 }}
            />
          </View>
        </View>
        <View style={styles.descView}>
          <Text style={styles.moviedesctextname}>{title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.moviedesctext}>{year}</Text>
            <Text style={styles.moviedesctext}>{duration}</Text>
          </View>
          <Text style={styles.moviedesctext}>⭐️ {rating}</Text>
          <Text style={styles.moviedesctext}>{genre}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.mainContainer}>
          <View style={styles.imageView}>
            <ImageBackground
              blurRadius={5}
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
            >
              <View style={{ margin: 20, marginTop: 70 }}>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={closeModal}>
                    <Image
                      source={require('../assets/icons/close2.png')}
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: 450, borderRadius: 10 }}
                />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.MovieDescription}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.MovieNameData}>
                {isAdmin ? (
                  <>
                    <TextInput
                      style={styles.inputTitle}
                      value={titleInput}
                      onChangeText={setTitleInput}
                    />
                    <View style={styles.genreBox}>
                      <TextInput
                        style={styles.inputGenre}
                        value={genreInput}
                        onChangeText={setGenreInput}
                      />
                    </View>
                    <TextInput
                      style={styles.inputYear}
                      value={yearDurationInput}
                      onChangeText={setYearDurationInput}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.inputTitle}>{title}</Text>
                    <View style={styles.genreBox}>
                      <Text style={styles.inputGenre}>{genre}</Text>
                    </View>
                    <Text style={styles.inputYear}>{year} • {duration}</Text>
                  </>
                )}
              </View>

              <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                
                {isAdmin ? (
                  <TextInput
                    style={styles.ratingInput}
                    value={ratingInput}
                    onChangeText={setRatingInput}
                  />
                ) : (
                  <Text style={{ color: '#fff' }}>⭐️{rating}</Text>
                )}
              </View>

              <View style={styles.MovieDes}>
                {isAdmin ? (
                  <TextInput
                    style={styles.descriptionInput}
                    multiline
                    value={descriptionInput}
                    onChangeText={setDescriptionInput}
                  />
                ) : (
                  <Text style={styles.descriptionInput}>
                    {description || 'No description available for this movie.'}
                  </Text>
                )}
              </View>

              {isAdmin && (
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={{ fontSize: 17, color: '#fff', fontWeight: '700' }}>
                      Save data
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* <View style={{ alignItems: 'center', marginBottom: 20 }}>
                {isAdmin && (
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      closeModal();
                      handleLongPress();
                    }}
                  >
                    <Text style={{ fontSize: 17, color: '#fff', fontWeight: '700' }}>
                      Remove from watchlist
                    </Text>
                  </TouchableOpacity>
                )}
              </View> */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Mywatchlistmoviecom;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    margin: 15,
    height: 150,
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    margin: 10,
    flex: 1,
    borderRadius: 15,
  },
  imageview: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  descView: {
    flex: 3,
    borderWidth: 1,
    backgroundColor: '#2f3030',
  },
  moviedesctext: {
    color: 'grey',
    margin: 5,
  },
  moviedesctextname: {
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
    margin: 5,
  },
  mainContainer: {
    flex: 1,
  },
  imageView: {
    flex: 1,
  },
  MovieDescription: {
    flex: 1,
    backgroundColor: 'black',
  },
  MovieNameData: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#333',
    paddingBottom: 10,
  },
  MovieDes: {
    marginTop: 10,
    padding: 20,
  },
  inputTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  inputGenre: {
    color: 'white',
  },
  inputYear: {
    color: 'white',
    marginVertical: 5,
  },
  ratingInput: {
    color: 'white',
    marginLeft: 5,
  },
  descriptionInput: {
    color: 'white',
    lineHeight: 20,
  },
  saveBtn: {
    height: 50,
    width: 160,
    marginVertical: 15,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2,
  },
  deleteBtn: {
    height: 50,
    width: 200,
    backgroundColor: '#444',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#555',
  },
  genreBox: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    borderColor: 'white',
    padding: 5,
  },
});