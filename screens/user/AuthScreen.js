import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, Button } from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';

const AuthScreen = props => {

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id='email'
            label='E-mail'
            keyboardType='email-address'
            required
            email
            autoCapitalize='none'
            errorMessage='Please enter a valid email address'
            onInputChange={() => { }}
            initialValue=''
          />
          <Input
            id='password'
            label='Password'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            autoCapitalize='none'
            errorMessage='Please enter the correct password'
            onInputChange={() => { }}
            initialValue=''
          />
          <View style={styles.buttonContainer}>
            <Button title="LOGIN" color='grey' onPress={() => { }} />
            <Button title="TO SIGN UP" color='orange' onPress={() => { }} />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    alignItems: 'center',
    padding: 20
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default AuthScreen