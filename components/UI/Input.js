import React, {useReducer} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'

const INPUT_CHANGE = "INPUT_CHANGE";

const inputReducer =(state, action) => {
  switch(action.type) {
    case INPUT_CHANGE:

    default:
      return state
  }
}

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid ?props.initiallyValid : '',
    touched : false
  })

  const textChangeHandler = text => {
    dispatch({type: INPUT_CHANGE, value: text})
  }
  return (
    <View>
      <TextInput
      {...props}
      style={styles.inputStyle}
      value={props.value}
      keyboardType='default'
      onChangeText={text => textChangeHandler('title', text)}
      autoCapitalize='sentences'
      autoCorrect
      returnKeyType='next'
      ></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
    margin: 5,
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    borderColor: 'grey',
    borderBottomWidth: 1
  },
})

export default Input 