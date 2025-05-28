import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  ImageBackground,
  Text,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const flatListRef = useRef(null);

  const { movies } = useSelector((state: any) => state.movies);

  const openModal = (item : any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => openModal(item)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.poster_url || 'https://via.placeholder.com/300x450' }}
        style={styles.posterImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const handleScroll = (event : any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (ITEM_WIDTH + 20)); 
    setActiveIndex(index);
  };

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Movies</Text>

      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 20}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        viewabilityConfig={viewConfigRef.current}
      />

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {selectedItem && (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.mainContainer}>
              <View style={styles.imageView}>
                <ImageBackground
                  blurRadius={5}
                  source={{ uri: selectedItem.poster_url || 'https://via.placeholder.com/300x450' }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <View style={{ margin: 50, marginTop: 70 }}>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity onPress={closeModal}>
                        <Image
                          source={require('../assets/icons/close2.png')}
                          style={{ height: 30, width: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{ uri: selectedItem.poster_url || 'https://via.placeholder.com/300x450' }}
                      style={{ width: '100%', height: 450 }}
                    />
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.MovieDescription}>
                <View style={styles.MovieNameData}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
                    {selectedItem.title || 'Untitled'}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
                    <View style={styles.genreBadge}>
                      <Text style={{ color: 'white' }}>{selectedItem.genre || 'Action'}</Text>
                    </View>
                  </View>
                  <Text style={{ color: 'white' }}>
                    {selectedItem.tagline || 'No way back one way out'}
                  </Text>
                </View>

                <View style={styles.movieMeta}>
                  <Text>⭐️</Text>
                  <Text style={{ color: 'white' }}>{selectedItem.rating || '8.5'}</Text>
                  <Text style={styles.releaseYear}>
                    {selectedItem.releaseYear || '2024'}
                  </Text>
                </View>

                <View style={styles.MovieDes}>
                  <Text style={{ color: 'white', lineHeight: 20 }}>
                    {selectedItem.description || 'No description available for this movie.'}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  flatListContent: {
    paddingHorizontal: width * 0.15,
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 24,
    padding: 10,
    paddingLeft: 20,
    top: -10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
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
  genreBadge: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    borderColor: 'white',
    padding: 5,
  },
  movieMeta: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
  releaseYear: {
    color: 'white',
    marginLeft: 120,
    fontWeight: '600',
  },
  MovieDes: {
    marginTop: 10,
    padding: 10,
  },
});
