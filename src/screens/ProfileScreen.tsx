import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GetsubscriptionStatus } from '../axiosRequest/Axiosrequest';

const ProfileScreen = () => {
  const userrole = useSelector((state) => state.user.role);
  const userToken = useSelector((state) => state.user.token);
  const [planStatus, setPlanStatus] = useState('');
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const res = await GetsubscriptionStatus(userToken);
      setPlanStatus(res.plan_type || 'No Active Plan');
    };
    getSubscriptionStatus();
  },[userToken]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const profileOptions = [
    {
      title: 'Account',
      subtitles: ['Edit profile', 'Change Password'],
      icon: require('../assets/icons/profile.png'),
      navigateTo: 'EditProfile',
    },
    {
      title: 'Settings',
      subtitles: ['Themes', 'Permissions'],
      icon: require('../assets/icons/setting.png'),
      navigateTo: 'Settings',
    },
    {
      title: 'Offers & Referrals',
      subtitles: ['Check Offers'],
      icon: require('../assets/icons/discount.png'),
      navigateTo: 'Offers',
    },
    {
      title: 'About',
      subtitles: ['About Movies', 'More'],
      icon: require('../assets/icons/info.png'),
      navigateTo: 'About',
    },
  ];

  return (
    <LinearGradient colors={['#1a1a1a', '#2c2c2c']} style={styles.maincontainer}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/icons/picofme.png')}
        />
        <Text style={styles.profileNameText}>{userrole}</Text>
        <Text style={styles.planStatusText}>
          {planStatus.replace('_', ' ').toUpperCase()}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {profileOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => navigation.navigate(option.navigateTo)}
          >
            <LinearGradient
              colors={['#2a2a2a', '#353535']}
              style={styles.optionGradient}
            >
              <View style={styles.optionContent}>
                <Image source={option.icon} style={styles.icon} />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  {option.subtitles.map((subtitle, subIndex) => (
                    <Text key={subIndex} style={styles.optionSubtitle}>
                      • {subtitle}
                    </Text>
                  ))}
                </View>
                <Text style={styles.arrow}>›</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <Animated.View style={[styles.logoutContainer, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <LinearGradient
              colors={['#E50914', '#b2070f']}
              style={styles.logoutGradient}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#E50914',
  },
  profileNameText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 15,
  },
  planStatusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E50914',
    marginTop: 10,
  },
  optionsContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  optionCard: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  optionGradient: {
    padding: 15,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#ffffff',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#b0b0b0',
    marginTop: 5,
  },
  arrow: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '700',
  },
  logoutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutGradient: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});