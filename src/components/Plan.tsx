import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createSubscription } from '../axiosRequest/Axiosrequest';

interface PlanData {
  name: string;
  price: string;
  device: string;
  feature: string[];
}

const Plan = ({ data }: { data: PlanData }) => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.user.token);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePayment = async () => {
    const res = await createSubscription(data.name, token);
    const checkOut_url = res.url;
    const session = res.session_id;
    navigation.navigate('Payment', { url: checkOut_url, session });
  };

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

  return (
    <View style={styles.subscriptionbox}>
      <LinearGradient
        colors={['#2a2a2a', '#353535']}
        style={styles.cardGradient}
      >
        <Text style={styles.planname}>{data.name.replace('_', ' ').toUpperCase()}</Text>
        <Text style={styles.planprice}>{data.price}</Text>
        <Text style={styles.plantext}>{data.device}</Text>
        {data.feature?.map((item, index) => (
          <Text key={index} style={styles.plantext}>
            • {item}
          </Text>
        ))}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={handlePayment}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.buttoncontainer}
          >
            <LinearGradient
              colors={['#E50914', '#b2070f']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buyButton}>Buy Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  subscriptionbox: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    padding: 20,
  },
  plantext: {
    color: '#d0d0d0',
    fontSize: 16,
    marginVertical: 5,
  },
  planprice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginVertical: 10,
  },
  planname: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
  },
  buttoncontainer: {
    marginTop: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyButton: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default Plan;