import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth';

const FORM_REDUCER_UPDATE = "FORM_REDUCER_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_REDUCER_UPDATE) {
    const updatedState = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updateValidities) {
      updatedFormIsValid = updatedFormIsValid && updateValidities[key]
    }
    return {
      inputValues: updatedState,
      inputValidities: updateValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
}

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      Alert.alert("Error with Auth occurred", error, [{ text: 'OK' }])
    }
  }, [error])

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    }

    setError(null)
    setIsLoading(true)
    try {
      await dispatch(action)
      // redux state re-config to change pages in AppNavigator 
      // props.navigation.navigate('Shop')
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_REDUCER_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );


  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#fffeff', '#c4c4c4']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address'
              onInputChange={inputChangeHandler}
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
              errorText='Please enter the correct password'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              {isLoading ?
                < ActivityIndicator size='small' color="black" /> :
                <View style={styles.button}>
                  <Button title={isSignup ? "Sign-Up" : "Login"} color='grey' onPress={authHandler} />
                </View>
              }
              <View style={styles.button}>
                <Button title={isSignup ? 'If you already have an account switch to Login' : 'Switch to Sign-up'} color='orange' onPress={() => {
                  setIsSignup(prevState => !prevState)
                }} />
              </View>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export const screenOptions = {
  headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    flex: 1,
    width: '80%',
    maxWidth: 400,
    maxHeight: 330,
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 12
  },
  screen: {
    flex: 1,
    width: '100%'
  },
  button: {
    width: 200
  }
})

export default AuthScreen