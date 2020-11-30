import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unmounted = false;

    const tryLogin = async () => {
      const getData = await AsyncStorage.getItem('userData');

      if (!getData) {
        props.navigation.navigate('Auth')
        return;
      }

      const conversion = JSON.parse(getData)
      const { token, userId, expiryDate } = conversion
      const expirationDate = new Date(expiryDate)

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth')
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()
      props.navigation.navigate('Shop')
      dispatch(authActions.authenticate(userId, token, expirationTime))
    }

    tryLogin()
    return () => { unmounted = true };

  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color='black' />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default StartupScreen;