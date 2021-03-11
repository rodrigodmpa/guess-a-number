import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
// import { Container } from './styles';

const Input = (props) => {
  return <TextInput 
    {...props}
    style={{...props.style, ...styles.input}} 
  />;
}

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: Colors.gray,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
})