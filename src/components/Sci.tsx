import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Sci = ({ movies }) => {
  const [updatedMovies, setUpdatedMovies] = useState([]);

  useEffect(() => {
    if (movies && movies.length) {
      const filtered = movies.filter((item) => item.genre === "Adventure");
      setUpdatedMovies(filtered);
    }
  }, [movies]);

  return (
    <View>
      <View style={{ padding: 10, marginBottom: 8 }}>
        <Text style={styles.action}>Sci-Fi</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {updatedMovies.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </ScrollView>
      <View style={{marginBottom:70}}></View>
    </View>
  );
};

export default Sci;

const styles = StyleSheet.create({
  action: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
});
