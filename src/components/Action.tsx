import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Action = ({ movies = [] }: any) => {
  const [updatedMovies, setUpdatedMovies] = useState<any>([]);

  useEffect(() => {
    if (Array.isArray(movies) && movies.length) {
      const filtered = movies.filter((item) => 
        item.genre?.toLowerCase() === 'action'
      );
      setUpdatedMovies(filtered);
    } else {
      setUpdatedMovies([]); 
    }
  }, [movies]);

  return (
    <View>
      <View style={{ padding: 10, marginBottom: 8 }}>
        <Text style={styles.action}>Action</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {updatedMovies.length > 0 ? (
          updatedMovies.map((item:any) => (
            <Card data={item} key={item.id} />
          ))
        ) : (
          <Text style={styles.noMovies}>No action movies available</Text>
        )}
      </ScrollView>
      <View style={{ marginBottom: 70 }} />
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  action: {
    fontSize: 24,
    color: '#fff', 
    fontWeight: '700',
  },
  noMovies: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
  },
});