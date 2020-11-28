import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';


const StartupScreen = props => {

  useEffect(() => {
    const tryLogin = async () => {
      const getData = await AsyncStorage.getItem('userData')
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
      props.navigation.navigate('Shop')

    }
    tryLogin()
  })

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