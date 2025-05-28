import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.mainheading}>
      <Text style={styles.mainheadingtext}>
        <Text style={styles.mainheadingtext1}>Movie</Text> Buzz
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainheading: {
    margin: 15,
    flexDirection: 'row',
  },
  mainheadingtext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  mainheadingtext1: {
    color: 'red',
  },
});

export default Header;
