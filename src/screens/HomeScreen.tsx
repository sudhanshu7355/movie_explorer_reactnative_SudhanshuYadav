import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Popular from '../components/Popular';
import Trending from '../components/Trending';
import { getAllMovies } from '../axiosRequest/Axiosrequest';
import Action from '../components/Action';
import Sci from '../components/Sci';
import Romance from '../components/Romance';


const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovies = async () => {
    try {
      const fetchedMovies = await getAllMovies();
      setMovies(fetchedMovies);
      setLoading(false);
    } catch (err) {
      setError('Failed to load movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Header />
      <ScrollView>
        <Carousel />
        <Popular movies={movies} />
        <Trending movies={movies} />
        <Action movies={movies} />
        <Sci movies={movies} />
        <Romance  movies={movies} />
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  now: {
    color: '#fff',
    fontSize: 24,
    left: 20,
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
