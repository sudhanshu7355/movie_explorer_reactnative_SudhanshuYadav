import { StyleSheet, Text, TextInput, View, FlatList, Alert, TouchableOpacity, Image, ActivityIndicator, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Mywatchlistmoviecom from '../components/Mywatchlistmoviecom'
import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import Addmovie from '../components/Addmovie';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const MyListScreen = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [localMovies, setLocalMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const { movies } = useSelector(state => state.movies);
  const userrole = useSelector((state) => state.user.role);
  const [isadmin, setisadmin] = useState(false);
  const [modalopen, setmodalopen] = useState(false);
  const dispatch = useDispatch();


  const MOVIES_PER_PAGE = 5;

  useEffect(() => {
    setLocalMovies(movies);
    if (userrole === 'supervisor') {
      setisadmin(true);
    }
  }, [movies]);


  useEffect(
    () => {
      loadInitialMovies();

    }, [localMovies]);

  const loadInitialMovies = () => {
    if (localMovies.length === 0) {
      setDisplayedMovies([]);
      setHasMoreMovies(false);
      return;
    }

    const initialMovies = localMovies.slice(0, MOVIES_PER_PAGE);
    setDisplayedMovies(initialMovies);
    setPage(1);
    setHasMoreMovies(localMovies.length > MOVIES_PER_PAGE);
  };

  const loadMoreMovies = useCallback(() => {
    if (!hasMoreMovies || isLoading) return;

    setIsLoading(true);


    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * MOVIES_PER_PAGE;
      const endIndex = startIndex + MOVIES_PER_PAGE;
      const newMovies = localMovies.slice(startIndex, endIndex);

      if (newMovies.length > 0) {
        setDisplayedMovies(prevMovies => [...prevMovies, ...newMovies]);
        setPage(nextPage);
        setHasMoreMovies(endIndex < localMovies.length);
      } else {
        setHasMoreMovies(false);
      }

      setIsLoading(false);


      if (newMovies.length > 0) {
        //alert
      } else {
        // alert

      }
    }, 1000);
  }, [page, localMovies, hasMoreMovies, isLoading]);

  const handleSearch = useDebouncedCallback((query) => {
    if (query === "") {
      setLocalMovies(movies);
    } else {
      setLocalMovies(movies.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.toLowerCase().includes(query.toLowerCase())
      ));
    }
  }, 500);

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <Text style={styles.emptyText}>
        {searchQuery ?
          "No movies found matching your search." :
          "Your watchlist is empty. Add some movies to get started!"}
      </Text>
    );
  };
  const handleDeleteMovie = (id) => {
    const updatedList = localMovies.filter(movie => movie.id !== id);
    setLocalMovies(updatedList);

    const updatedDisplayed = displayedMovies.filter(movie => movie.id !== id);
    setDisplayedMovies(updatedDisplayed);
  };
  const handleUpdateMovie = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? { ...movie, ...updatedMovie } : movie
      )
    );
  };

  return (
    <View style={styles.maincontainer} testID='mainContainer'>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <Text style={styles.headerText} testID='Heading'>My Watchlist</Text>
        {isadmin && (
          <Addmovie />
        )}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search your movies...'
          placeholderTextColor={'white'}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
          value={searchQuery}
        />
      </View>

      <FlatList
        data={displayedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Mywatchlistmoviecom
            id={item.id}
            title={item.title}
            year={item.release_year}
            duration={item.duration}
            rating={item.rating}
            genre={item.genre}
            searchQuery={searchQuery}
            image={item.poster_url}
            description={item.description}
            onDelete={handleDeleteMovie}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            {renderFooter()}
            {hasMoreMovies && displayedMovies.length > 0 && (
              <TouchableOpacity
                style={[styles.loadMoreButton, isLoading && styles.loadMoreButtonDisabled]}
                onPress={loadMoreMovies}
                disabled={isLoading}
              >
                <Text style={styles.loadMoreText}>
                  {isLoading ? 'Loading...' : 'Load More Movies'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      <Modal
        visible={modalopen}
        animationType='slide'

      >
        <TouchableOpacity onPress={() => setmodalopen(false)}>
          <Image source={require('../assets/icons/close2.png')} />

        </TouchableOpacity>


      </Modal>
    </View>
  )
}

export default MyListScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    padding: 10,
    color: '#fff',
    marginTop: height * 0.04,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'white'
  },
  listContainer: {
    paddingBottom: 20
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  add: {
    width: width * 0.11,
    height: height * 0.05,
    right: width * 0.09,
    marginTop: width * 0.1,


  },
  loaderContainer: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center'
  },
  loadMoreButton: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
    marginBottom: 50
  },
  loadMoreButtonDisabled: {
    backgroundColor: '#5c5c5c',
  },
  loadMoreText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

});