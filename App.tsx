import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import StackNavigation from './src/navigation/StackNavigation';
import {Alert, PermissionsAndroid} from 'react-native';
import messaging, { getToken } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'

const App = () => {

  useEffect(() => {
    requestPermissionAndroid()
  },[])

  const requestPermissionAndroid = async() => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED){
      getToken()
      // Alert.alert("Permission granted");
    } else {
      // Alert.alert("Permission Denied");
    }
  }

    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        onDisplayNotification(remoteMessage);
      });
  
      return unsubscribe;
    }, []);


    const onDisplayNotification = async remoteMessage => {
      
  
      
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
  
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          smallIcon: 'name-of-a-small-icon', 
          pressAction: {
            id: 'default',
          },
        },
      });
    }


    const getToken = async() => {
      const token = await messaging().getToken();
      console.log("token", token)
    }

  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
};

export default App;