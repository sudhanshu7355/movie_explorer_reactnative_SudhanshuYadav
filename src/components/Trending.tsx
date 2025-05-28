import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Card from './Card';

const Trending = ({ movies }) => {
  return (
    <View>
      <View style={{ padding: 10, marginBottom: 8 }}>
        <Text style={styles.action}>Trending Now</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {Array.isArray(movies) && movies.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  action: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
});
