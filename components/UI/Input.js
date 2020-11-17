import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR"

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state
  }
}

const Input = props => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid ? props.initiallyValid : '',
    touched: false
  })

  const { onInputChange } = props

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange])

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    // if (props.email && !emailRegex.test(text.toLowerCase())) {
    //   isValid = false;
    // }
    // if (props.min != null && +text < props.min) {
    //   isValid = false;
    // }
    // if (props.max != null && +text > props.max) {
    //   isValid = false;
    // }
    // if (props.minLength != null && text.length < props.minLength) {
    //   isValid = false;
    // }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
  }

  const focusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.titleText}>{props.label}</Text>
        {!inputState.isValid ?
          <Text style={styles.validationText}>{props.errorText}</Text>
          : null}
      </View>
      <TextInput
        {...props}
        style={styles.inputStyle}
        value={inputState.value}
        returnKeyType='next'
        onChangeText={text => textChangeHandler('title', text)}
        onBlur={focusHandler}
      ></TextInput>
    </View>
  )
};


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
  titleText: {
    flex: 2,
    textAlign: 'left'
  },
  validationText: {
    flex: 2,
    color: 'red',
    marginBottom: 5,
    opacity: 0.6,
    textAlign: 'right'
  }
})

export default Input 