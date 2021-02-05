import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import CustomActivityIndicator from '../components/UI/CustomActivityIndicator'

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unmounted = false;

    const tryLogin = async () => {

      const getData = await AsyncStorage.getItem('userData');

      if (!getData) {
        dispatch(authActions.setDidTryAL())
        return;
      }

      const conversion = JSON.parse(getData)
      const { token, userId, expiryDate } = conversion
      const expirationDate = new Date(expiryDate)

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL())
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()
      dispatch(authActions.authenticate(userId, token, expirationTime))
    }

    setTimeout(() => tryLogin(), 1000);

    return () => { unmounted = true };

  }, [dispatch])


  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: 80 }} />
      <CustomActivityIndicator />
    </View>
  )
};


export default StartupScreen;