import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Colors from '../constants/colors';

// import { Container } from './styles';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = ({rounds, correctNumber, onPlayAgain}) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The game is over!</Text>
      <Image resizeMode='cover' style={styles.image} source={require('../assets/success.png')} />
      <View style={styles.resultContainer}>
        <Text style={{...DefaultStyles.bodyText, ...styles.textResult}}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds
            to guess the number <Text style={styles.highlight}>{correctNumber}</Text>.
        </Text>
      </View>
      <Button title="PLAY AGAIN" color={Colors.primary} onPress={onPlayAgain}/>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginTop: 50,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    margin: 40
  },
  textResult: {
    textAlign: 'center',
    fontSize: 20
  }
})