import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Popular = ({ movies }) => {
  const [updatedMovies, setUpdatedMovies] = useState([]);

  useEffect(() => {
    if (movies && movies.length) {
      const filtered = movies.filter((item) => item.rating >= 8);
      setUpdatedMovies(filtered);
      console.log("Updated Movies",movies)
    }
  }, [movies]);

  return (
    <View>
      <View style={{ padding: 10, marginBottom: 8 }}>
        <Text style={styles.action}>Popular Now</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {updatedMovies.map((item: any) => (
          <Card data={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  action: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
});
