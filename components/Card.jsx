import React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';

// import { Container } from './styles';

const Card = ({title, children, style}) => {
  return (
    <View style={{...styles.card, ...style}}>
      {children}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0, 
      height: 2
    },
    shadowRadius: 16,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  
})