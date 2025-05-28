import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { GetSubscriptionStatus } from '../axiosRequest/Axiosrequest';

type PaymentRouteParams = {
  params: {
    url: string;
    session: string;
  };
};

const Payment = () => {
  const route = useRoute<RouteProp<PaymentRouteParams, 'params'>>();
  const { url, session } = route.params;
  const navigation = useNavigation();

  const [hasReachedSuccessUrl, setHasReachedSuccessUrl] = useState(false);
  const [finalRedirectUrl, setFinalRedirectUrl] = useState<string | null>(null);

 

  const handleNavigationChange = async(navState) => {
    const currentUrl = navState.url;
    console.log('Navigated to:', currentUrl);

    if(currentUrl.includes('shruti')) {
      console.log('Success URL reached:', currentUrl);
      setHasReachedSuccessUrl(true);
      let x = await GetSubscriptionStatus(session);
      console.log(x)
      console.log(x?.status === 200 ? 'Subscription status fetched successfully' : 'Failed to fetch subscription status');
      if (x?.status === 200) {
        navigation.replace('Main');
      }
      
    }
    
     else if (hasReachedSuccessUrl && !finalRedirectUrl) {
      setFinalRedirectUrl(currentUrl);
      console.log('Final redirected URL after success:', currentUrl);
      
      Alert.alert("payment failed");
      navigation.replace('Main'); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} testID="payment-screen">
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationChange}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});