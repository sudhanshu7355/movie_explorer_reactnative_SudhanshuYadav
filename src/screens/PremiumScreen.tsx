import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Plan from '../components/Plan';

const PremiumScreen = () => {
  const basicPlan = {
    name: '1_day',
    device: 'Mobile Phone',
    feature: ['Standard Quality', 'No Cancellation', 'Valid for 1 Month'],
    price: '$9.99/month',
  };

  const standardPlan = {
    name: '7_days',
    device: 'Mobile Phone & Tablet',
    feature: ['HD Quality', 'Cancel within 7 Days', 'Valid for 2 Months'],
    price: '$14.99/month',
  };

  const premiumPlan = {
    name: '1_month',
    device: 'Any Device',
    feature: ['4K Ultra HD', 'Cancel Anytime', 'Valid for 4 Months'],
    price: '$40/month',
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2c2c2c']}
      style={styles.maincontainer}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Choose Your Plan</Text>
            <Text style={styles.subheading}>Unlimited movies and shows, tailored for you</Text>
          </View>

          <View style={styles.plansContainer}>
            <Plan data={basicPlan} />
            <Plan data={standardPlan} />
            <Plan data={premiumPlan} />
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service & Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  plansContainer: {
    paddingHorizontal: 15,
  },
  heading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subheading: {
    color: '#b0b0b0',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  termsContainer: {
    alignItems: 'center',
    marginVertical: 30,
    paddingBottom: 50,
  },
  termsText: {
    color: '#808080',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default PremiumScreen;