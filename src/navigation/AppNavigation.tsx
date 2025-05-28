import { Image, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExplorerScreen from '../screens/ExplorerScreen';

const Tab = createBottomTabNavigator();

const icons = {
  Home: require('../assets/icons/homes.png'),
  Explorer: require('../assets/icons/search1.png'),
  Premium: require('../assets/icons/premium1.png'),
  Profile: require('../assets/icons/profile.png'),
};

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#ff3b3b',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginBottom: 5,
        },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          elevation: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#000000',
          position: 'absolute',
          paddingTop: 5,
        },
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Image
              source={icons[route.name]}
              style={focused ? styles.focusedIcon : styles.icon}
              resizeMode="contain"
            />
            {focused && <View style={styles.indicator} />}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explorer" component={ExplorerScreen} />
      <Tab.Screen name="Premium" component={PremiumScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  focusedIcon: {
    width: 28,
    height: 28,
    tintColor: '#ff3b3b',
  },
  
})