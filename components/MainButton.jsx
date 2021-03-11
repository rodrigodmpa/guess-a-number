import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native';

// import { Container } from './styles';
import Colors from '../constants/colors'
const MainButton = ({children, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
})